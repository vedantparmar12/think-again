# Bug Hunter Skill

Deep bug analysis and root cause identification with LSP-powered tracing.

## Quick Start

```bash
# Hunt a specific bug
/bug-hunter "Users can't login on mobile"

# Debug mysterious issue
/bug-hunter "App crashes randomly"

# Trace execution path
/bug-hunter --trace login-flow

# Find similar bugs
/bug-hunter --pattern null-pointer
```

## What It Does

### 🐛 Bug Reproduction
- Understand trigger conditions
- Identify minimal reproduction steps
- Test consistency
- Document environment factors

### 🔍 Root Cause Analysis
- Trace execution flow with LSP
- Analyze state changes
- Identify exact failure point
- Find related bugs

### 💡 Fix Generation
- Propose fix with explanation
- Validate no regressions
- Consider edge cases
- Update all affected code

### 🛡️ Prevention
- Generate regression tests
- Identify similar patterns
- Suggest preventive refactors

## Integration

### With Ultrathink
For complex bugs:
```bash
/bug-hunter "Authentication fails on Tuesdays"
# Automatically uses ultrathink for deep reasoning
```

### With LSP
Uses LSP to:
- Trace execution path
- Find all references
- Analyze call hierarchy
- Check type safety

### With Test Generator
After fixing:
```bash
/bug-hunter fix-login-bug
# Generates regression test automatically
```

## Bug Hunting Process

### Step 1: Understanding
```
🐛 Bug Report Analysis

What happens:
- Users see "Invalid credentials" error
- Only occurs on mobile browsers
- Started after v2.1 deploy

Questions to clarify:
- Which mobile browsers?
- All users or specific accounts?
- Any error logs?
```

### Step 2: Reproduction
```
🔄 Attempting Reproduction

Steps:
1. Open mobile browser (iOS Safari)
2. Navigate to /login
3. Enter valid credentials
4. Click submit

Result: ✅ Bug reproduced
Consistency: Every time
Conditions: iOS Safari only
```

### Step 3: Investigation
```
🔍 Investigating with LSP

Error occurs at: src/auth/login.js:67

LSP Call Hierarchy:
LoginComponent → submitLogin → validateCredentials ← BUG HERE
                                      ↓
                                verifyPassword

LSP shows:
- validateCredentials expects string
- Mobile sends FormData object
- Type mismatch!
```

### Step 4: Root Cause
```
🎯 Root Cause Identified

The bug occurs because:
Mobile browsers send FormData, desktop sends JSON

Code assumes string input:
function validateCredentials(credentials) {
  const email = credentials.email; // Works with JSON
  // Fails with FormData!
}

Why it wasn't caught:
- Tests only used JSON objects
- Desktop browsers serialize differently
```

### Step 5: Fix
```
💡 Proposed Fix

Before:
function validateCredentials(credentials) {
  const email = credentials.email;
  const password = credentials.password;
  // ...
}

After:
function validateCredentials(credentials) {
  // Handle both FormData and JSON
  const email = credentials instanceof FormData
    ? credentials.get('email')
    : credentials.email;

  const password = credentials instanceof FormData
    ? credentials.get('password')
    : credentials.password;

  // ...
}

Why this works:
- Handles both FormData and JSON
- Backward compatible
- No breaking changes
```

### Step 6: Regression Test
```javascript
// Generated regression test
describe('Bug Fix: Mobile login FormData', () => {
  it('should accept FormData credentials', () => {
    const formData = new FormData();
    formData.append('email', 'user@example.com');
    formData.append('password', 'password123');

    const result = validateCredentials(formData);
    expect(result.valid).toBe(true);
  });

  it('should still accept JSON credentials', () => {
    const json = {
      email: 'user@example.com',
      password: 'password123'
    };

    const result = validateCredentials(json);
    expect(result.valid).toBe(true);
  });
});
```

## Common Bug Patterns

### Pattern 1: Null/Undefined Error
```
Symptom: TypeError: Cannot read property 'x' of undefined

Investigation:
🔍 Using LSP to find where value should be set...
- Defined at: auth.js:23
- Set in: login() function
- Used at: getUserProfile() ← undefined here

Root cause: login() returns undefined on network error

Fix: Add error handling and null checks
```

### Pattern 2: Race Condition
```
Symptom: Data loads sometimes, sometimes doesn't

Investigation:
🔍 Analyzing async operations...
- fetchData() takes ~100ms
- processData() runs immediately
- Race condition!

Root cause: Missing await keyword

Fix: await fetchData() before processData()
```

### Pattern 3: Off-by-One Error
```
Symptom: Array index out of bounds

Investigation:
🔍 Analyzing loop bounds...
Loop: for (let i = 0; i <= array.length; i++)
                            ↑ Should be: <

Root cause: Using <= instead of <

Fix: Change to i < array.length
```

### Pattern 4: Memory Leak
```
Symptom: App gets slower over time

Investigation:
🔍 Checking for memory leaks...
- Event listeners not cleaned up
- Closures retaining references
- Timers not cleared

Root cause: useEffect missing cleanup

Fix: Return cleanup function from useEffect
```

### Pattern 5: Type Coercion Bug
```
Symptom: Calculation returns wrong value

Investigation:
🔍 Checking types...
Code: sum = sum + input.value
Input: "5" (string)
Result: "05" (string concatenation!)

Root cause: Implicit type coercion

Fix: sum = sum + Number(input.value)
```

## Debugging Strategies

### Binary Search
```
Bug introduced between v1.5 and v2.0

Using git bisect:
1. Test v1.7 (midpoint) → Bug present
2. Test v1.6 → Bug not present
3. Bug introduced in commit abc123
```

### Rubber Duck Debugging
```
🦆 Walking through code step by step...

"First we fetch the user..."
→ That works ✅

"Then we check if user exists..."
→ Wait, we check user.id but what if user is null?
→ Found it! Missing null check ❌
```

### Logging Strategy
```javascript
console.log('BEFORE:', state);
doSomething(state);
console.log('AFTER:', state);
console.log('EXPECTED:', expectedState);
```

### Divide and Conquer
```
Complex bug: "Report generation fails"

Breaking down:
1. Data fetch? → Works ✅
2. Data parse? → Works ✅
3. Template render? → Fails ❌
4. Which part? → PDF generation fails
5. Why? → Missing font file

Root cause: Missing dependency
```

## Real-World Examples

### Example 1: Authentication Bug

**Bug Report:**
"Users logged out randomly"

**Investigation:**
```
🔍 Analyzing auth flow with LSP...

Session cookie expires after: 30 minutes (set correctly)
But token validation checks: 15 minutes (incorrect!)

Mismatch causes early logout

Fix: Align token and cookie expiration times
```

**Fix Applied:**
```javascript
// Before
const TOKEN_EXPIRY = 15 * 60 * 1000; // 15 minutes
const COOKIE_EXPIRY = 30 * 60 * 1000; // 30 minutes

// After
const SESSION_EXPIRY = 30 * 60 * 1000; // 30 minutes
const TOKEN_EXPIRY = SESSION_EXPIRY;
const COOKIE_EXPIRY = SESSION_EXPIRY;
```

### Example 2: Performance Bug

**Bug Report:**
"Dashboard loads slowly with many items"

**Investigation:**
```
🔍 Analyzing render performance...

Component re-renders: 100 times per second
Cause: Array created in render function
React sees new array → re-renders

Fix: Memoize array with useMemo
```

**Fix Applied:**
```javascript
// Before
function Dashboard() {
  const items = data.map(format); // New array every render!
  return <List items={items} />;
}

// After
function Dashboard() {
  const items = useMemo(
    () => data.map(format),
    [data] // Only recompute when data changes
  );
  return <List items={items} />;
}
```

### Example 3: Data Loss Bug

**Bug Report:**
"User changes not saved"

**Investigation:**
```
🔍 Tracing save operation with LSP...

User clicks save → calls saveUser()
saveUser() sends PUT request → succeeds
But page shows old data → cache not updated!

Root cause: Cache invalidation missing

Fix: Clear cache after successful save
```

**Fix Applied:**
```javascript
// Before
async function saveUser(user) {
  await api.put(`/users/${user.id}`, user);
  // Missing cache update!
}

// After
async function saveUser(user) {
  await api.put(`/users/${user.id}`, user);
  cache.invalidate(`users/${user.id}`);
  cache.set(`users/${user.id}`, user);
}
```

## Tips

### Reproduce First
- Can't fix what you can't reproduce
- Document exact steps
- Note environment details

### One Change at a Time
- Make small, testable changes
- Verify each change
- Keep commits atomic

### Add Tests
- Regression test prevents recurrence
- Edge case tests catch similar bugs
- Integration tests for complex flows

### Document Findings
- Why bug occurred
- How it was fixed
- What was learned

### Look for Patterns
- Similar bugs in related code
- Common mistake patterns
- Preventive refactoring opportunities

## Integration in Workflow

```bash
# Bug reported
/bug-hunter "Users can't checkout"

# Investigate and fix
# (Guided by bug-hunter)

# Generate regression test
/test-generator --regression checkout-bug

# Review fix
/code-review src/checkout/

# Commit
git commit -m "Fix: Checkout validation bug"
```

## Remember

Good debugging:
- **Is systematic** - Follow a process
- **Is patient** - Don't jump to conclusions
- **Is thorough** - Check all possibilities
- **Is documented** - Record findings
- **Learns** - Prevent similar bugs

Every bug is an opportunity to improve the codebase!

---

**Part of Think Again Skills v1.2.0**
