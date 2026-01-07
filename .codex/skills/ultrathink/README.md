# Ultrathink Skill

A deep reasoning mode for Codex CLI that encourages systematic thinking, exploration of alternatives, and thorough validation before acting.

## What is Ultrathink?

Ultrathink is inspired by Claude Code's thinking mode. It activates a systematic reasoning process where Codex:

- 🧠 **Thinks step-by-step** through complex problems
- 🔄 **Explores multiple approaches** before choosing one
- ✅ **Validates assumptions** and catches logical errors
- 🎯 **Shows its reasoning** process clearly
- 🐛 **Catches issues early** before they become bugs

Think of it as "showing your work" - making the reasoning visible and thorough.

## When to Use Ultrathink

### ✅ Perfect For:

- **Complex Debugging**
  - Mysterious bugs that don't have obvious causes
  - Race conditions and timing issues
  - Performance problems
  - Memory leaks

- **Architecture Decisions**
  - Choosing between design patterns
  - Selecting libraries or frameworks
  - Designing system components
  - Scaling considerations

- **Unfamiliar Code**
  - Understanding legacy codebases
  - Analyzing third-party libraries
  - Reviewing complex algorithms
  - Reverse engineering

- **Complex Problem Solving**
  - Algorithmic challenges
  - Optimization problems
  - Data structure design
  - Security analysis

- **Unclear Requirements**
  - Ambiguous specifications
  - Conflicting constraints
  - Multiple valid approaches

### ❌ Skip For:

- Simple, well-understood tasks
- Quick fixes with obvious solutions
- Following existing patterns exactly
- When you've already thoroughly analyzed the problem

## Quick Start

### Basic Usage

```bash
/ultrathink Why is my app crashing when uploading large files?
```

Codex will:
1. Think through the problem systematically
2. Explore the codebase
3. Consider multiple root causes
4. Reason through solutions
5. Recommend an approach with justification

### Combined with Other Skills

```bash
# Deep analysis before planning
/ultrathink + /plan-mode Refactor authentication system

# Deep reasoning during execution
/ultrathink Debug this performance issue
```

## How It Works

Ultrathink follows a systematic process:

### 1. Understand the Problem

```
🤔 Let me think through this carefully...

What we're trying to solve:
- [Clear problem statement]

What we know:
- [Facts and constraints]

What we need to clarify:
- [Questions to ask]
```

### 2. Explore the Context

```
Relevant parts of the system:
- [Component A] - does [X]
- [Component B] - relates to A by [Y]

Similar patterns in the codebase:
- [Found pattern 1]
- [Found pattern 2]
```

### 3. Generate Approaches

```
## Possible Approaches

### Approach 1: [Name]
✅ Pros: [advantages]
❌ Cons: [disadvantages]

### Approach 2: [Name]
✅ Pros: [advantages]
❌ Cons: [disadvantages]

[... at least 2-3 options ...]
```

### 4. Reason Through Each

```
## Analyzing Approach 1

How it works:
1. [Step-by-step explanation]

Why this might work:
- [Reasoning]

Potential issues:
- What if [edge case]?
  → [How to handle]
```

### 5. Validate Assumptions

```
Assumption: "X is always true"
✓ Valid because: [evidence from codebase]

Assumption: "Y will work"
? Need to verify: [how to check]
```

### 6. Choose and Justify

```
Recommended: Approach 2

Why:
1. [Most important reason]
2. [Supporting reason]
3. [Additional factor]

Trade-offs we're accepting:
- [What we're giving up]
- [Why it's acceptable]
```

## Example Sessions

### Example 1: Debugging

```bash
> /ultrathink The API is slow, taking 5+ seconds per request

🤔 ULTRATHINK MODE ACTIVATED

## Understanding the Problem

Symptom: API requests taking 5+ seconds
Context needed:
- Which endpoints are slow? All or specific ones?
- When did this start?
- What's changed recently?

Let me ask: Is this affecting all endpoints or specific ones?

> Mainly the /api/users endpoint

## Exploring the Context

Checking the /api/users endpoint...
[reads code]

Observations:
- Line 34: Database query without indexes
- Line 45: N+1 query pattern (fetches each user's posts in a loop)
- Line 60: Large dataset serialization

Let me check the database schema...
[reads migration files]

Finding: `users` table has 50,000 rows, no index on `created_at`
The query sorts by `created_at` → full table scan!

## Possible Root Causes

1. **Missing database index** (Line 34)
   - Probability: High
   - Impact: High
   - Verification: Check query execution plan

2. **N+1 query problem** (Line 45)
   - Probability: High
   - Impact: High
   - Verification: Count actual queries made

3. **Large payload serialization** (Line 60)
   - Probability: Medium
   - Impact: Medium
   - Verification: Profile serialization time

## Testing Hypotheses

Hypothesis 1: Missing index
Let me check the query execution plan...
[checks database logs]

Result: SEQUENTIAL SCAN on 50,000 rows - confirmed!
Estimated cost: 4,500ms

Hypothesis 2: N+1 queries
Let me count the queries...
[checks query logs]

Result: Making 1 + 50 queries (1 for users, 50 for individual posts)
Each taking ~100ms = 5,000ms total

BOTH issues are present!

## Solution Analysis

### Solution 1: Add Index Only
Time saved: ~4,500ms
Remaining time: ~5,000ms (still slow due to N+1)
Effort: 5 minutes

### Solution 2: Fix N+1 Only
Time saved: ~5,000ms
Remaining time: ~4,500ms (still slow due to missing index)
Effort: 15 minutes

### Solution 3: Fix Both
Time saved: ~9,500ms
Final time: ~500ms (acceptable!)
Effort: 20 minutes

## Recommendation

Fix BOTH issues:

Step 1: Add database index (5 min)
- Create migration for index on `created_at`
- Deploy migration
- Verify query plan shows INDEX SCAN

Step 2: Fix N+1 with eager loading (15 min)
- Change query to include posts
- Use JOIN or eager loading
- Verify single query in logs

Expected result: 5,000ms → 500ms (10x improvement)

Ready to implement?
```

### Example 2: Architecture Decision

```bash
> /ultrathink Should we use REST or GraphQL for our new API?

🤔 ULTRATHINK MODE ACTIVATED

## Understanding the Question

We're designing a new API and need to choose:
- RESTful architecture
- GraphQL architecture

Context needed:
- What kind of clients? (Web, mobile, third-party?)
- Team experience with each?
- Expected data access patterns?
- Performance requirements?

Let me ask these questions...

> Web and mobile clients, team knows REST well but not GraphQL,
> lots of related data (users, posts, comments, likes)

## Refined Context

Clients:
- Web app (our own)
- Mobile app (our own)
- Possible third-party integrations (future)

Team:
- Strong REST experience
- No GraphQL experience
- 4 backend engineers

Data characteristics:
- Highly relational (users → posts → comments → likes)
- Clients need different subsets of data
- Mobile needs to minimize bandwidth

## Deep Analysis: REST

### How it would work:
```
GET /api/users/:id
GET /api/users/:id/posts
GET /api/posts/:id/comments
GET /api/posts/:id/likes
```

### Pros:
✅ Team already expert in REST
✅ Simple to understand and debug
✅ Great tooling (Postman, curl, browser)
✅ Well-established caching strategies
✅ Easy for third-party integration

### Cons:
❌ Over-fetching (getting more data than needed)
❌ Under-fetching (multiple requests for related data)
❌ Mobile app needs to make 3-4 requests for one screen
❌ API versioning gets complex
❌ Hard to optimize for different client needs

### Example: Mobile Feed Screen

To load a feed of posts with user info and comments:
```
1. GET /api/posts?page=1 (get posts)
2. GET /api/users/1,2,3,4,5 (get user details)
3. GET /api/posts/1/comments (get comments for post 1)
4. GET /api/posts/2/comments (get comments for post 2)
... (50+ requests for one screen!)
```

Waterfall latency: ~3 seconds on mobile

Could optimize with:
- Compound endpoints: `/api/feed` (custom endpoint per view)
- Field selection: `/api/posts?fields=id,title`
- Include parameters: `/api/posts?include=user,comments`

But this gets messy and hard to maintain.

## Deep Analysis: GraphQL

### How it would work:
```graphql
query Feed {
  posts(limit: 10) {
    id
    title
    author { id, name, avatar }
    comments(limit: 3) {
      id
      text
      author { name }
    }
    likesCount
  }
}
```

### Pros:
✅ Single request for complex data
✅ Client specifies exactly what it needs
✅ No over-fetching (great for mobile bandwidth)
✅ Strong typing (catches errors early)
✅ Self-documenting API (GraphiQL)
✅ Evolves without versioning

### Cons:
❌ Steep learning curve for team
❌ More complex server implementation
❌ Caching is harder
❌ Could enable inefficient queries (N+1 problem on server)
❌ Harder to debug (single endpoint)
❌ Less familiar for third-party developers

### Example: Same Mobile Feed Screen
```
One request gets everything:
- Posts
- Author details
- Comments
- Like counts

Latency: ~500ms (6x faster!)
```

## Deeper Considerations

### Performance:
REST: Multiple requests = higher latency
GraphQL: Single request, but needs DataLoader to avoid N+1

### Security:
REST: Rate limiting per endpoint (simple)
GraphQL: Query depth limiting, complexity analysis (harder)

### Monitoring:
REST: Easy (track each endpoint)
GraphQL: Harder (all requests to one endpoint, need query parsing)

### Third-party Integration:
REST: Everyone knows it
GraphQL: Growing adoption, but might confuse some partners

### Team Velocity:
REST: Fast (using existing knowledge)
GraphQL: Slow initially (learning curve), fast later

## Validation of Assumptions

Assumption: "Mobile needs to minimize requests"
✓ Valid - mobile has higher latency, battery concerns

Assumption: "Team can't learn GraphQL"
✗ Not true - team is capable, just takes time

Assumption: "We need third-party integration soon"
? Unknown - should ask product team

Let me ask: Are third-party integrations planned in next 6 months?

> Not in the next 6 months, maybe in a year

## The Decision

Recommended: **Start with GraphQL**

### Why:

1. **Mobile performance is critical**
   - User research shows mobile is 70% of traffic
   - 3-second load times → high bounce rate
   - GraphQL's single-request model is 6x faster

2. **Investment in learning pays off**
   - Team has capacity (not in crunch mode)
   - Long-term velocity benefit
   - Industry trend (growing adoption)

3. **Data model is perfect fit**
   - Highly relational data
   - Different clients need different subsets
   - GraphQL designed for exactly this

4. **Third-party integration not immediate**
   - Have time to document well
   - Can provide REST wrapper later if needed
   - By then, more developers know GraphQL

### Trade-offs Accepted:

- Slower initial development → Worth it for long-term benefits
- Learning curve → Team is capable and has time
- Complex caching → Can start simple, optimize later

### Implementation Plan:

Phase 1 (Week 1-2): Learning
- Team does GraphQL tutorial
- Build proof-of-concept
- Establish patterns

Phase 2 (Week 3-4): Core Schema
- Define types for users, posts, comments
- Implement queries
- Add DataLoader for N+1 prevention

Phase 3 (Week 5-6): Mobile Integration
- Update mobile app to use GraphQL
- Measure performance improvement
- Iterate

Fallback: If after 4 weeks team is struggling, we can pivot to REST with optimized endpoints

### Why Not REST:

While simpler, it doesn't solve our core problem:
- Mobile app would still be slow
- Would need compound endpoints anyway (complexity similar to GraphQL)
- Would hit the same issues later, harder to change

## Alternative Considered: Hybrid Approach

Use GraphQL for mobile, REST for web/third-party

Pros: Best of both worlds
Cons: Maintaining two APIs is 2x work

Verdict: Not worth the complexity for our team size

Does this reasoning make sense? Any constraints I'm missing?
```

### Example 3: Code Understanding

```bash
> /ultrathink What does this algorithm do? [shows complex sorting code]

🤔 ULTRATHINK MODE ACTIVATED

## Initial Observations

Looking at the code structure:
- 60 lines of code
- Nested loops (potentially O(n²)?)
- Some swapping happening
- Comments mention "optimization"

Let me walk through it step by step...

## Line-by-Line Analysis

Lines 1-5: Initialization
```python
def mystery_sort(arr):
    n = len(arr)
    for gap in range(n//2, 0, -1):
```

Interesting: `gap` starts at n//2 and decreases
This pattern reminds me of... shell sort? Let me verify.

Lines 6-15: Outer Loop
```python
    for i in range(gap, n):
        temp = arr[i]
        j = i
```

Starting from `gap` position, not 0
Saving current element in `temp`

Lines 16-25: Inner Loop
```python
        while j >= gap and arr[j-gap] > temp:
            arr[j] = arr[j-gap]
            j -= gap
        arr[j] = temp
```

Ah! Comparing elements `gap` positions apart
Shifting elements that are larger
This IS shell sort!

## Mental Model Building

What Shell Sort Does:
1. Start with large gap (n//2)
2. Compare elements gap positions apart
3. Sort those "sub-arrays"
4. Reduce gap
5. Repeat until gap = 1 (insertion sort)

Why It Works:
- Large gaps: Move elements roughly to right area (fast)
- Small gaps: Fine-tune positions (like insertion sort)
- More efficient than plain insertion sort

Visualization:
```
Gap = 4: [8, 3, 1, 9, 2, 6, 5, 7]
         Compare 8-2, 3-6, 1-5, 9-7

Gap = 2: [2, 3, 1, 7, 8, 6, 5, 9]
         Compare pairs 2 apart

Gap = 1: [1, 2, 3, 5, 6, 7, 8, 9]
         Final insertion sort pass
```

## Performance Analysis

Time Complexity:
- Worst case: O(n²) (if gap sequence is bad)
- Best case: O(n log n) (with good gap sequence)
- This implementation: ~O(n^1.5) (n//2 gap sequence)

Space Complexity: O(1) (in-place sorting)

## Answering the Question

This is **Shell Sort** (also called "diminishing increment sort")

Purpose: More efficient alternative to insertion sort

How it works:
1. Gaps start large (n//2) and shrink (gap //= 2)
2. At each gap size, do insertion sort on elements gap-apart
3. Final pass (gap=1) is regular insertion sort, but array is mostly sorted

Why it's better than insertion sort:
- Insertion sort is slow because it only swaps adjacent elements
- Shell sort moves elements large distances quickly
- By the time gap=1, array is almost sorted (insertion sort is fast on nearly-sorted arrays)

Historical note:
- Invented by Donald Shell in 1959
- First algorithm to break O(n²) barrier for sorting
- Gap sequence affects performance (this uses n/2ⁱ, not optimal but simple)

Code quality observations:
- Clean implementation
- Could use better variable names (`gap` is good, but `temp` could be `key`)
- Gap sequence could be optimized (Knuth's 3ⁱ-1 sequence is better)

Is this what you were looking for? Want me to explain any part in more depth?
```

## Tips for Using Ultrathink

### 1. Use for Complex, Not Simple

❌ Don't use for: "How do I reverse a string?"
✅ Do use for: "Why is this distributed system occasionally losing messages?"

### 2. Give Context

Better questions get better thinking:
```
❌ "Fix this bug"
✅ "This function crashes with inputs over 1000 but works fine
    for smaller inputs. The error is 'stack overflow'. Help me
    understand why and find a solution."
```

### 3. Engage with the Reasoning

When Codex is thinking through a problem:
- Ask questions about the reasoning
- Challenge assumptions
- Provide additional context
- Correct misunderstandings

### 4. Combine with Other Skills

```bash
# Think deeply, then plan
/ultrathink + /plan-mode

# Think deeply, then execute
/ultrathink [problem]
# ... reasoning happens ...
/execute-plan
```

## What Ultrathink Gives You

### 🧠 Systematic Thinking

Instead of jumping to solutions, Codex:
- Breaks down the problem
- Explores the context
- Considers alternatives
- Reasons through implications

### 🔍 Visible Reasoning

You can see:
- How Codex reached its conclusion
- What assumptions it's making
- What alternatives it considered
- Where uncertainty exists

### ✅ Validated Solutions

Before recommending an approach, Codex:
- Tests assumptions
- Considers edge cases
- Validates logic
- Checks for issues

### 📚 Learning Opportunity

Watching the reasoning process helps you:
- Understand complex problems better
- Learn new approaches
- See how to think through similar problems
- Identify gaps in your own reasoning

## Common Patterns

### Pattern: "I don't know, let me investigate"

```
I'm not sure why this is happening. Let me investigate...

[reads relevant code]
[checks documentation]
[examines error logs]

Ah, I see. The issue is [finding]. This explains [symptom] because [reason].
```

### Pattern: "Actually, wait..."

```
My first thought was to [approach 1].

But wait, that won't work because [reason].

Actually, [approach 2] is better because [reasoning].
```

### Pattern: "Multiple valid options"

```
There are three valid approaches here:

Option A: [description]
- Best for [scenario]
- Choose if [condition]

Option B: [description]
- Best for [scenario]
- Choose if [condition]

I recommend [option] based on [your context], but [other option]
would be better if [different condition].
```

## Troubleshooting

### "Codex isn't thinking deeply enough"

Try:
```
Please think through this more carefully. Consider:
- What are the alternative approaches?
- What assumptions are we making?
- What could go wrong?
```

### "Too much thinking, just give me the answer"

Exit ultrathink mode:
```
Skip the deep analysis. Just give me the straightforward solution.
```

Or don't use ultrathink for simple problems.

### "Thinking went down the wrong path"

Redirect:
```
Actually, you're thinking about [X], but the real issue is [Y].
Let's reason through [Y] instead.
```

## Files

```
.codex/skills/ultrathink/
├── SKILL.md              # Skill definition
├── README.md             # This file
└── examples/
    ├── debugging.md      # Debugging examples
    ├── architecture.md   # Architecture decision examples
    └── analysis.md       # Code analysis examples
```

## Learn More

- **Thinking Patterns**: See `examples/` for detailed examples
- **Combining Skills**: Use with `plan-mode` for thorough planning
- **Best Practices**: When to use deep reasoning vs. quick solutions

## Version History

- **1.0.0** (2025-01-07): Initial release
  - Systematic reasoning framework
  - Multiple thinking patterns
  - Integration with other skills

---

**Remember**: Ultrathink is for when **quality of reasoning matters more than speed**. For complex problems, slow down, think deeply, and get it right the first time.
