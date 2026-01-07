# Ultrathink: Debugging Examples

Real-world examples of using Ultrathink Mode for debugging complex issues.

## Example 1: Memory Leak Investigation

### The Problem

```
User: Our Node.js server's memory usage keeps growing and eventually crashes after 2-3 days of running.
```

### Ultrathink Process

```
🤔 ULTRATHINK MODE ACTIVATED

## Understanding the Problem

Symptom: Memory grows continuously over 2-3 days → crash
Type: Memory leak
Environment: Node.js server

Questions to clarify:
- Does it happen with all requests or specific endpoints?
- Is there a pattern to the growth rate?
- What monitoring data do we have?

Let me ask: Do you have heap snapshots or memory profiling data?

---

User: We have heap snapshots from day 1 and day 3. Memory grows from 200MB to 2GB.

## Initial Hypotheses

Possible causes of memory leaks in Node.js:

1. **Event listener accumulation**
   - Adding listeners without removing them
   - Common pattern: Every request adds listener, never removed

2. **Closures retaining large objects**
   - Callbacks holding references to big data
   - Prevents garbage collection

3. **Global state accumulation**
   - Pushing to arrays in global scope
   - Caching without limits

4. **Third-party library issue**
   - Known leaks in dependencies
   - Need to check versions

Let me examine the codebase systematically...

## Investigating: Event Listeners

Searching for .on() and addEventListener patterns...

[searches codebase]

Found in `server.js` line 45:
```javascript
app.use((req, res, next) => {
  req.on('close', handleAbort);
  next();
});
```

⚠️ POTENTIAL ISSUE: This adds a listener on every request!

Checking if it's removed...
[searches for .removeListener or .off]

No removal found! This is likely leaking.

But let me verify if this alone explains 2GB growth...

Math check:
- 1 request = ~1 listener = ~100 bytes
- For 2GB = 2,000,000,000 bytes
- Would need 20,000,000 requests
- Over 3 days = ~77 requests/second

That's plausible for a production server!

## Investigating: Global State

Searching for global arrays/objects that accumulate...

[searches codebase]

Found in `cache.js` line 12:
```javascript
const cache = {};

function cacheResult(key, value) {
  cache[key] = value; // No TTL, no max size!
}
```

⚠️ ANOTHER ISSUE: Unbounded cache!

How much data could this be?
- Checking usage: cacheResult called in data processing endpoint
- Each cached item: ~50KB (processing result)
- If 10,000 unique requests: 500MB
- Over 3 days: Could explain significant portion

## Investigating: Closures

Searching for closures that might retain data...

[searches for common patterns]

Found in `processor.js` line 67:
```javascript
async function processData(largeDataSet) {
  const results = [];

  largeDataSet.forEach(item => {
    setTimeout(() => {
      // This closure captures entire results array!
      results.push(processItem(item));
    }, item.delay);
  });

  // Returns immediately, but timeouts still running
  return results;
}
```

🤔 Interesting... but actually this is more of a logic bug than leak.
The setTimeout callbacks will eventually run.
Unless... let me check the delays...

Ah! Some items have delay: 86400000 (24 hours!)
So results arrays from previous days are still in memory!

## Analyzing Heap Snapshots

Let me check what the heap snapshots tell us...

[reads snapshot comparison]

Retained size by type:
- Array: 1.2GB (60%)
- Object: 600MB (30%)
- Function (closures): 200MB (10%)

Drilling into Arrays:
- Most are "results" arrays from processData
- Average 50MB each
- 24 of them retained

24 results arrays × 50MB = 1.2GB ✓ Matches!

## Root Cause Identified

The primary leak: `processData` function

Why it leaks:
1. Function creates `results` array
2. Schedules timeouts that capture this array
3. Returns immediately (array looks "done")
4. But timeouts are still pending (holds array in memory)
5. With 24-hour delays, we accumulate 3 days worth

Secondary issues:
1. Event listeners never removed (smaller impact)
2. Unbounded cache (medium impact)

## Solution Analysis

### Solution 1: Fix processData to await timeouts

```javascript
async function processData(largeDataSet) {
  const results = [];

  await Promise.all(
    largeDataSet.map(item =>
      new Promise(resolve => {
        setTimeout(() => {
          results.push(processItem(item));
          resolve();
        }, item.delay);
      })
    )
  );

  return results;
}
```

Pros:
✅ Properly waits for all timeouts
✅ Results array can be GC'd after function completes

Cons:
❌ Blocks for up to 24 hours (terrible UX!)
❌ Doesn't solve the architectural problem

Verdict: Wrong approach

### Solution 2: Don't use setTimeout, process immediately

```javascript
async function processData(largeDataSet) {
  return largeDataSet.map(item => processItem(item));
}
```

Pros:
✅ Simple
✅ No memory leak
✅ Fast

Cons:
❌ Loses the "delayed processing" feature

Question: Why do we need delays anyway?

Let me check git history...

[checks git blame]

Commit message: "Add delays to avoid overwhelming downstream service"

Ah! The delays are for rate limiting.

### Solution 3: Use a job queue instead

```javascript
async function processData(largeDataSet) {
  const jobIds = [];

  for (const item of largeDataSet) {
    const jobId = await jobQueue.enqueue({
      task: 'processItem',
      data: item,
      runAt: Date.now() + item.delay
    });
    jobIds.push(jobId);
  }

  return { jobIds, status: 'queued' };
}
```

Pros:
✅ No memory leak (queue manages jobs)
✅ Survives server restarts
✅ Can monitor progress
✅ Scales better

Cons:
❌ Need to implement job queue infrastructure
❌ Changes API (returns job IDs, not results)

Verdict: Best long-term solution, but requires architecture change

### Solution 4: Fix the immediate leak, plan migration

Immediate fix (today):
```javascript
async function processData(largeDataSet) {
  // Cap delay at 1 minute to prevent unbounded memory growth
  const maxDelay = 60000; // 1 minute

  const results = [];

  await Promise.all(
    largeDataSet.map(item =>
      new Promise(resolve => {
        const safeDelay = Math.min(item.delay, maxDelay);
        setTimeout(() => {
          results.push(processItem(item));
          resolve();
        }, safeDelay);
      })
    )
  );

  return results;
}
```

Plus:
- Fix event listener leak
- Add max size to cache

Long-term (next sprint):
- Implement proper job queue
- Migrate delayed processing

## Validation

Let me verify this solution addresses the heap snapshot data...

Before:
- 24 results arrays × 50MB = 1.2GB
- 24-hour delays = accumulate 3 days worth

After:
- Max 1-minute delays = only 1-2 results arrays in memory at once
- 2 arrays × 50MB = 100MB max

Expected improvement: 1.2GB → 100MB (12x reduction)

Plus cache and event listener fixes: ~200MB additional reduction

Total: 2GB → 600MB (3x improvement)

Should prevent crashes, buys time for proper queue implementation.

## Recommended Implementation Plan

Phase 1 (Today - Emergency Fix):
1. Cap delays to 1 minute in processData
2. Fix event listener leak (add removeListener)
3. Add max size to cache (LRU cache, 1000 items)
4. Deploy to production
5. Monitor memory usage

Phase 2 (Next Sprint - Proper Solution):
1. Evaluate job queue libraries (Bull, BeeQueue)
2. Implement job queue infrastructure
3. Migrate processData to use queue
4. Add monitoring for queue health
5. Gradual rollout

Phase 3 (Following Sprint - Optimization):
1. Review other caching patterns
2. Add memory leak detection (heap snapshot automation)
3. Set up alerts for memory growth

## Assumptions to Validate

Before implementing:
- ✓ Capping delays won't break downstream service (need to verify rate limit)
- ? Do we have Redis available for proper job queue?
- ? Are there other places using similar setTimeout patterns?

Should I proceed with the investigation of these assumptions?
```

## Key Techniques Demonstrated

1. **Systematic Hypothesis Generation** - Listed multiple possible causes
2. **Evidence-Based Investigation** - Used heap snapshots to confirm
3. **Math Validation** - Calculated if hypothesis matched symptoms
4. **Multiple Solutions** - Explored 4 different approaches
5. **Practical Compromise** - Immediate fix + long-term solution
6. **Assumption Validation** - Identified what still needs verification

---

## Example 2: Race Condition Bug

### The Problem

```
User: Our voting feature sometimes counts votes twice, but only occasionally. Can't reproduce consistently.
```

### Ultrathink Process

```
🤔 ULTRATHINK MODE ACTIVATED

## Understanding the Problem

Symptom: Occasional duplicate vote counts
Frequency: Intermittent (can't reproduce reliably)
Impact: Data integrity issue

This pattern suggests: **Race condition**

Key word: "occasionally" = timing-dependent

Questions:
- When does it happen more? (high traffic? specific times?)
- Single server or multiple servers?
- Database type and transaction isolation level?

Let me ask: Are you running multiple server instances?

---

User: Yes, 3 instances behind a load balancer

## The Race Condition Hypothesis

Multiple servers = multiple simultaneous processes
Duplicate votes = likely a check-then-act race condition

Classic pattern:
1. Server A checks: "user hasn't voted yet" ✓
2. Server B checks: "user hasn't voted yet" ✓  (at same time!)
3. Server A inserts vote
4. Server B inserts vote (should have been rejected!)

Let me examine the voting code...

## Investigating the Code

[reads vote handler]

Found in `votes.controller.js`:

```javascript
async function castVote(userId, postId) {
  // Check if user already voted
  const existingVote = await db.query(
    'SELECT * FROM votes WHERE user_id = ? AND post_id = ?',
    [userId, postId]
  );

  if (existingVote.length > 0) {
    return { error: 'Already voted' };
  }

  // Insert vote
  await db.query(
    'INSERT INTO votes (user_id, post_id, created_at) VALUES (?, ?, NOW())',
    [userId, postId]
  );

  // Update count
  await db.query(
    'UPDATE posts SET vote_count = vote_count + 1 WHERE id = ?',
    [postId]
  );

  return { success: true };
}
```

🚨 CONFIRMED: Classic check-then-act race condition!

Time window:
```
Server A: SELECT (checks) → user hasn't voted
                ↓ (50ms gap)
Server B: SELECT (checks) → user hasn't voted (race!)
                ↓
Server A: INSERT (creates vote)
                ↓
Server B: INSERT (creates duplicate!)
```

The gap is usually milliseconds, but under load it's frequent enough to occur.

## Why It's Hard to Reproduce

Race conditions need:
1. Multiple requests from same user
2. At nearly the exact same time
3. Routed to different servers

Locally (single server): Can't happen
In production (3 servers): Rare but possible

During high traffic: More likely (more concurrent requests)

## Solution Analysis

### Solution 1: Database Unique Constraint

```sql
ALTER TABLE votes
ADD UNIQUE KEY unique_vote (user_id, post_id);
```

Then handle duplicate key error:
```javascript
try {
  await db.query(
    'INSERT INTO votes (user_id, post_id) VALUES (?, ?)',
    [userId, postId]
  );
} catch (error) {
  if (error.code === 'ER_DUP_ENTRY') {
    return { error: 'Already voted' };
  }
  throw error;
}
```

Pros:
✅ Database enforces uniqueness (atomic)
✅ Can't have duplicates even with race
✅ Simple to implement
✅ Works across all servers

Cons:
❌ Uses exception handling for flow control
❌ Still makes unnecessary INSERT attempt

Verdict: **Good solution**, idiomatic for SQL

### Solution 2: INSERT IGNORE

```javascript
const result = await db.query(
  'INSERT IGNORE INTO votes (user_id, post_id) VALUES (?, ?)',
  [userId, postId]
);

if (result.affectedRows === 0) {
  return { error: 'Already voted' };
}
```

Pros:
✅ Atomic
✅ No exception handling
✅ Simple

Cons:
❌ Silently fails (harder to debug)
❌ Requires unique constraint anyway

Verdict: Cleaner than try/catch if you have unique constraint

### Solution 3: Distributed Lock

```javascript
const lock = await redis.acquireLock(`vote:${userId}:${postId}`, 5000);

try {
  const existingVote = await db.query(...);
  if (existingVote.length > 0) {
    return { error: 'Already voted' };
  }

  await db.query('INSERT INTO votes...');
} finally {
  await lock.release();
}
```

Pros:
✅ Explicit synchronization
✅ Works for any race condition

Cons:
❌ Requires Redis (new dependency)
❌ More complex
❌ Lock can timeout
❌ Slower (extra round trips)

Verdict: Overkill for this case, but useful for more complex scenarios

### Solution 4: Optimistic Locking

```javascript
async function castVote(userId, postId) {
  const result = await db.query(`
    UPDATE posts
    SET vote_count = vote_count + 1,
        version = version + 1
    WHERE id = ? AND version = ?
  `, [postId, expectedVersion]);

  if (result.affectedRows === 0) {
    // Someone else updated, retry
    return castVote(userId, postId);
  }
}
```

Pros:
✅ No locks
✅ Good for high concurrency

Cons:
❌ Requires version column
❌ Retry logic needed
❌ Doesn't prevent duplicate vote rows

Verdict: Not applicable to this problem

## Recommended Solution

Use **Solution 1: Unique Constraint** with proper error handling

Why:
1. Database atomic operations are fastest
2. No external dependencies (Redis)
3. Automatically prevents duplicates
4. Standard SQL pattern

Implementation:

Step 1: Add unique constraint (migration)
```sql
ALTER TABLE votes
ADD UNIQUE KEY unique_vote (user_id, post_id);
```

Step 2: Update code
```javascript
async function castVote(userId, postId) {
  try {
    // Direct INSERT (let DB enforce uniqueness)
    await db.query(
      'INSERT INTO votes (user_id, post_id, created_at) VALUES (?, ?, NOW())',
      [userId, postId]
    );

    // Increment count
    await db.query(
      'UPDATE posts SET vote_count = vote_count + 1 WHERE id = ?',
      [postId]
    );

    return { success: true };
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return { error: 'Already voted' };
    }
    throw error; // Unexpected error
  }
}
```

Step 3: Clean up existing duplicates
```sql
DELETE v1 FROM votes v1
INNER JOIN votes v2
WHERE v1.id > v2.id
  AND v1.user_id = v2.user_id
  AND v1.post_id = v2.post_id;
```

## Testing the Fix

To verify race condition is fixed:

Test script:
```javascript
// Simulate race condition
async function testRace() {
  const userId = 123;
  const postId = 456;

  // Fire 10 simultaneous vote requests
  const promises = Array(10).fill().map(() =>
    fetch('/api/vote', {
      method: 'POST',
      body: JSON.stringify({ userId, postId })
    })
  );

  const results = await Promise.all(promises);

  console.log('Successful votes:', results.filter(r => r.success).length);
  // Should be exactly 1, not 2 or more!
}
```

Expected result:
- Before fix: Sometimes 2+ successful votes
- After fix: Always exactly 1 successful vote

## Edge Cases to Consider

1. **What if INSERT fails for other reasons?**
   - Generic error is re-thrown (correct behavior)

2. **What about vote_count sync?**
   - Potential issue: vote inserted but count update fails
   - Solution: Wrap in database transaction

Improved version:
```javascript
await db.transaction(async (trx) => {
  await trx.query('INSERT INTO votes...');
  await trx.query('UPDATE posts SET vote_count...');
});
```

3. **Performance impact of constraint?**
   - Unique indexes are fast (B-tree)
   - Negligible overhead
   - Actually faster than SELECT then INSERT

## Complete Solution

```javascript
async function castVote(userId, postId) {
  try {
    await db.transaction(async (trx) => {
      // Atomic insert (DB enforces uniqueness)
      await trx.query(
        'INSERT INTO votes (user_id, post_id, created_at) VALUES (?, ?, NOW())',
        [userId, postId]
      );

      // Update count (same transaction = atomic)
      await trx.query(
        'UPDATE posts SET vote_count = vote_count + 1 WHERE id = ?',
        [postId]
      );
    });

    return { success: true };
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return { error: 'Already voted' };
    }
    throw error;
  }
}
```

This is:
- ✅ Atomic (transaction)
- ✅ Race-condition proof (unique constraint)
- ✅ Consistent (count always matches votes)
- ✅ Simple (no external dependencies)
- ✅ Performant (single DB round trip)

Deploy and monitor!
```

## Key Techniques Demonstrated

1. **Pattern Recognition** - "Occasionally" suggests race condition
2. **Code Tracing** - Identified check-then-act pattern
3. **Timing Analysis** - Understood why it's hard to reproduce
4. **Multiple Solutions** - Compared 4 different approaches
5. **Edge Case Analysis** - Considered transaction consistency
6. **Testing Strategy** - Created reproduction test

---

These examples show how Ultrathink Mode helps debug complex, non-obvious issues by thinking systematically through the problem space.
