# Ultrathink Quick Start

Get started with deep reasoning mode for complex problems.

## What is Ultrathink?

Ultrathink makes Codex **think step-by-step** through complex problems before acting:

- 🧠 Explores multiple approaches
- ✅ Validates assumptions
- 🐛 Catches issues early
- 📊 Shows reasoning process
- 🎯 Makes better decisions

## When to Use

### ✅ Perfect For:

- **Mysterious bugs** - "It crashes sometimes but I don't know why"
- **Architecture decisions** - "Should we use REST or GraphQL?"
- **Complex code** - "What does this algorithm do?"
- **Multiple solutions** - "What are the trade-offs?"
- **Unclear requirements** - "The specs are vague"

### ❌ Skip For:

- Simple fixes - "Change this variable name"
- Obvious solutions - "Add a null check"
- Well-understood tasks - "Create a standard CRUD endpoint"

## Basic Usage

Just add `/ultrathink` to your question:

```bash
/ultrathink Why is my app slow when there are many users?
```

Codex will:
1. Break down the problem
2. Explore possible causes
3. Analyze each one
4. Recommend a solution with reasoning

## Quick Examples

### Example 1: Debugging

```bash
> /ultrathink My API returns 500 errors randomly

🤔 Let me think through this systematically...

Random 500 errors suggest:
- Race condition?
- Resource exhaustion?
- Unhandled exception?

Let me check the error logs...
[investigates]

Found: Database connection pool exhausted under load
Root cause: Not releasing connections in error cases

Solution: Add proper cleanup in finally blocks
[explains why this works]
```

### Example 2: Architecture

```bash
> /ultrathink Should I use MongoDB or PostgreSQL for this project?

🤔 Let me reason through this decision...

Context needed:
- What kind of data? (structured/unstructured)
- Query patterns?
- Scale requirements?
- Team expertise?

[asks clarifying questions]

Based on your answers:
- Structured data with relationships
- Complex queries needed
- Team knows SQL

Recommendation: PostgreSQL

Why:
1. [Reason 1]
2. [Reason 2]

Why not MongoDB:
- [Limitation 1]
- [Limitation 2]
```

### Example 3: Code Understanding

```bash
> /ultrathink What does this function do? [complex code]

🤔 Let me walk through this step-by-step...

Lines 1-5: Initialization...
Lines 6-10: Main logic...
Lines 11-15: Edge case handling...

Overall pattern: This is implementing [algorithm name]

Why it works: [explanation]

Potential issues: [concerns]
```

## Combining with Other Skills

### Deep Planning

```bash
/ultrathink + /plan-mode Refactor our authentication system
```

Codex will:
1. Think deeply about architectural approaches
2. Create a detailed plan based on best approach

### Deep Analysis Then Execute

```bash
/ultrathink Debug this memory leak
# [reasoning happens]

Now execute the fix:
/execute-plan memory-leak-fix
```

## What You Get

### Systematic Thinking

Instead of:
```
"The bug is probably X. Let me fix it."
```

You get:
```
"Let me think through possible causes:
1. Could be X because [reason]
2. Could be Y because [reason]
3. Could be Z because [reason]

Let me investigate...
[checks evidence]

It's Y. Here's why...
```

### Visible Reasoning

You can see:
- How Codex reached its conclusion
- What it considered
- What it ruled out
- Why it chose this approach

### Better Solutions

By considering alternatives:
- Avoid obvious-but-wrong solutions
- Find non-obvious optimizations
- Understand trade-offs
- Make informed choices

## Tips

### 1. Give Context

Better:
```
❌ "This is slow"
✅ "This endpoint takes 5 seconds with 1000+ rows,
    but <1 second with fewer rows"
```

### 2. Ask "Why"

```
User: Why did you choose approach A over B?
Codex: Great question. Let me explain...
```

### 3. Challenge Assumptions

```
User: Actually, that assumption is wrong. We don't have Redis.
Codex: Ah! Let me reconsider without Redis...
```

### 4. Request More Depth

```
User: Can you think through this more carefully?
Codex: Let me do a deeper analysis...
```

## Common Patterns

### "I'm not sure, let me investigate"

Codex will:
- Read relevant code
- Check documentation
- Examine logs
- Then explain findings

### "Actually, wait..."

Codex will:
- Start with one idea
- Reconsider
- Find better approach
- Explain why

### "Multiple valid options"

Codex will:
- List 2-3 approaches
- Compare pros/cons
- Recommend based on context
- Explain trade-offs

## Real-World Example

```bash
> /ultrathink Users report the app is slow

🤔 ULTRATHINK MODE ACTIVATED

## Understanding the Problem

"Slow" is vague. Need to clarify:
- Which features are slow?
- For all users or specific ones?
- Always or at certain times?
- How slow? (2x? 10x? Unusable?)

Let me ask: Which specific features feel slow?

---

> The search feature, especially with many results

## Exploring the Context

Let me examine the search implementation...
[reads search code]

Observations:
- Line 23: Full text search on 3 columns
- Line 45: No pagination limit (could return 10,000 results!)
- Line 67: Fetching related data in a loop (N+1 query)

Let me check the database indexes...
[reads schema]

Missing indexes on search columns!

## Analyzing Root Causes

Found 3 performance issues:

1. **Missing indexes** (biggest impact)
   - Estimated: 1000ms → 50ms per query

2. **No result limiting** (medium impact)
   - Transferring MB of data
   - Client rendering 10,000 items

3. **N+1 query pattern** (high impact)
   - 1 search + 10,000 related queries
   - Could be 10+ seconds!

## Solution Strategy

Priority order:
1. Fix N+1 (most critical - 10s impact)
2. Add indexes (easy win - 950ms improvement)
3. Add pagination (better UX, less data)

Let me design the fixes...

[detailed solutions]

Expected improvement: 10,000ms → 200ms (50x faster!)

Ready to implement?
```

## Next Steps

1. **Try it**: Start with a complex problem
2. **Interact**: Ask questions, challenge reasoning
3. **Learn**: Watch how problems are broken down
4. **Apply**: Use the thinking patterns yourself

## Documentation

- **Full Guide**: `README.md`
- **Examples**: `examples/debugging.md`
- **Skill Definition**: `SKILL.md`

---

**Remember**: Ultrathink is for **quality over speed**. When the problem is complex, slow down, think deeply, and get it right.

Start ultrathinking! 🧠
