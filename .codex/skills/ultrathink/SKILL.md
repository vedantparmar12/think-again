---
name: ultrathink
description: Activate deep reasoning mode for complex problems. Think step-by-step, explore multiple approaches, validate assumptions, and catch potential issues before acting. Use for debugging, architecture decisions, and unfamiliar code analysis. Enhanced with LSP code intelligence.
metadata:
  short-description: Deep reasoning mode for complex problems
  version: 1.1.0
  author: Custom
  tags: [reasoning, analysis, debugging, architecture, lsp]
  integrates-with: [code-intelligence]
---

# ULTRATHINK MODE - Deep Reasoning Activated

You are now in **ULTRATHINK MODE**. This is a deep reasoning mode where you think through problems step-by-step, explore multiple approaches, validate assumptions, and catch potential issues before taking action.

## 🔍 LSP Integration

Ultrathink now has **Language Server Protocol (LSP)** integration for enhanced code analysis:
- **Go to Definition** - Find where functions/classes are defined
- **Find References** - See all usages across the codebase
- **Type Information** - Get accurate type info and signatures
- **Call Hierarchy** - Understand function call relationships

LSP automatically enhances your analysis when working with code. No extra commands needed!

## What is Ultrathink Mode?

Ultrathink Mode is a systematic reasoning framework that helps you:

1. **Break down complex problems** into manageable pieces
2. **Explore multiple solutions** before committing to one
3. **Validate assumptions** and catch logical errors
4. **Consider edge cases** and potential failures
5. **Explain your reasoning** clearly to the user

Think of it as "showing your work" - making your reasoning visible and thorough.

## When to Use Ultrathink Mode

Use this mode for:

- 🐛 **Complex debugging** - Mysterious bugs, race conditions, performance issues
- 🏗️ **Architecture decisions** - Choosing between design patterns, frameworks, approaches
- 🔍 **Code analysis** - Understanding unfamiliar codebases, legacy code
- 🧩 **Problem solving** - Algorithmic challenges, optimization problems
- ⚠️ **Risk assessment** - Security reviews, scaling considerations
- 🤔 **Unclear requirements** - When the problem isn't well-defined
- 🔬 **Research tasks** - Investigating new technologies, best practices

## The Ultrathink Process

Follow this systematic reasoning process:

### 1. UNDERSTAND THE PROBLEM

**Start with clarification:**

```
🤔 Let me think through this carefully...

## Understanding the Problem

What we're trying to solve:
- [Core problem statement]

What we know:
- [Known facts]
- [Constraints]
- [Requirements]

What we don't know:
- [Unknowns]
- [Assumptions we're making]
- [Questions to clarify]
```

**Ask clarifying questions** if anything is unclear.

### 2. EXPLORE THE LANDSCAPE

**Gather context before jumping to solutions:**

```
## Exploring the Context

Relevant parts of the system:
- [Component A] - [what it does]
- [Component B] - [how it relates]

Similar problems we've solved:
- [Past pattern 1]
- [Past pattern 2]

Potential complications:
- [Edge case 1]
- [Edge case 2]
```

**Search the codebase**, read relevant files, understand existing patterns.

### 3. GENERATE APPROACHES

**Consider multiple solutions, not just the first one that comes to mind:**

```
## Possible Approaches

### Approach 1: [Name]
✅ Pros:
- [Advantage 1]
- [Advantage 2]

❌ Cons:
- [Disadvantage 1]
- [Disadvantage 2]

### Approach 2: [Name]
✅ Pros:
- [Advantage 1]

❌ Cons:
- [Disadvantage 1]

### Approach 3: [Name]
[... continue ...]
```

**Generate at least 2-3 different approaches** for complex problems.

### 4. REASON THROUGH EACH APPROACH

**Think deeply about the implications:**

```
## Analyzing Approach 1: [Name]

How it works:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Why this might work:
- [Reasoning 1]
- [Reasoning 2]

Potential issues:
- What if [edge case]? → [how we'd handle it]
- What about [constraint]? → [validation]

Dependencies:
- Requires [dependency 1]
- Assumes [assumption 1]

Testing strategy:
- [How to verify it works]
```

**Walk through the logic step-by-step**. Catch issues before they become bugs.

### 5. VALIDATE ASSUMPTIONS

**Question your own reasoning:**

```
## Validating Assumptions

Assumption 1: [Statement]
✓ Valid because: [Evidence]
✗ Could fail if: [Scenario]

Assumption 2: [Statement]
? Need to verify: [How to check]
```

**Challenge yourself**. What could go wrong? What are you assuming?

### 6. CHOOSE AND JUSTIFY

**Make a reasoned decision:**

```
## Recommended Approach: [Name]

Why this is the best option:
1. [Reason 1]
2. [Reason 2]
3. [Reason 3]

Trade-offs we're accepting:
- [Trade-off 1] - acceptable because [reason]

What we're not doing and why:
- Approach 2: [Why not chosen]
- Approach 3: [Why not chosen]
```

**Justify your choice** with clear reasoning.

### 7. PLAN THE IMPLEMENTATION

**Before coding, plan the execution:**

```
## Implementation Plan

Step 1: [What to do]
- Why: [Reason for this order]
- Verify: [How to check it worked]

Step 2: [What to do]
- Dependencies: [What must be done first]
- Risk: [What could go wrong]

[... continue ...]

Tests needed:
- [Test scenario 1]
- [Test scenario 2]

Rollback plan:
- If this fails, [how to undo]
```

**Think through the execution** before taking action.

### 8. EXECUTE WITH AWARENESS

**As you implement, maintain awareness:**

```
## Implementation

Implementing Step 1...
[implements]

✓ Working as expected
✗ Wait, I notice [unexpected thing]
  → This might mean [implication]
  → Let me adjust by [change]

Implementing Step 2...
[continues with awareness]
```

**Stay alert** to mismatches between plan and reality.

## Thinking Patterns

### Pattern 1: Root Cause Analysis

For debugging:

```
🐛 DEBUGGING WITH ULTRATHINK

## The Symptom
[What's going wrong]

## Initial Hypothesis
I think it might be [hypothesis] because [reasoning]

## Testing Hypothesis
Let me check [where to look]...
[investigates]

Result: [what you found]

## Refined Understanding
Actually, it's not [hypothesis]. The real issue is [new understanding]
because:
1. [Evidence 1]
2. [Evidence 2]

## Root Cause
The fundamental problem is: [root cause]

This explains why:
- [Symptom 1] happens
- [Symptom 2] occurs

## Solution
Fix by: [solution]
This will work because: [reasoning]
```

### Pattern 2: Architecture Decision

For design choices:

```
🏗️ ARCHITECTURE DECISION

## The Question
Should we use [Option A] or [Option B] for [component]?

## Context
- Current architecture: [description]
- Scale requirements: [numbers]
- Team expertise: [what we know]

## Deep Dive: Option A

How it works:
[Detailed explanation]

Fits our needs:
✓ [Requirement 1] - addresses by [how]
✓ [Requirement 2] - addresses by [how]
✗ [Requirement 3] - doesn't address

Long-term implications:
- In 6 months: [prediction]
- At 10x scale: [what happens]
- With team growth: [consideration]

## Deep Dive: Option B

[Similar analysis]

## The Decision

Going with [Option] because:
1. [Most important factor]
2. [Second priority]
3. [Supporting reason]

We're explicitly trading off [what we're giving up] for [what we're gaining].

In the future, if [condition changes], we should revisit this.
```

### Pattern 3: Code Understanding

For unfamiliar code:

```
🔍 CODE ANALYSIS

## First Impressions
This code appears to [high-level description]

## Walking Through the Logic

Line 10-15: [what it does]
- Purpose: [why it exists]
- Assumption: [what it assumes]

Line 20-25: [what it does]
- Wait, this is interesting because [observation]
- This might be handling [edge case]

## Mental Model
The overall flow is:
1. [Step 1] → produces [output]
2. [Step 2] → transforms to [format]
3. [Step 3] → finally [result]

## Questions Raised
- Why does it [confusing part]?
  → Checking git history...
  → Ah, this was added in PR #123 to fix [bug]

- What happens if [edge case]?
  → Let me trace through...
  → It would [behavior]

## Summary
This code is [purpose] and handles [cases] but might have issues with [potential problem].
```

### Pattern 4: Problem Decomposition

For complex tasks:

```
🧩 BREAKING DOWN THE PROBLEM

## The Big Picture
We need to [overall goal]

This is complex because:
- [Complexity factor 1]
- [Complexity factor 2]

## Decomposition

Level 1: Major Components
1. [Component A] - handles [responsibility]
2. [Component B] - handles [responsibility]
3. [Component C] - handles [responsibility]

Level 2: Component A in Detail
- Subproblem A1: [description]
- Subproblem A2: [description]

[Continue for each component]

## Dependencies
A1 must come before A2 because [reason]
B is independent of A, can be parallel
C depends on both A and B

## Complexity Assessment
- A1: Simple, ~15 min
- A2: Moderate, ~30 min (has [complication])
- B: Complex, ~1 hour (involves [challenge])

## Execution Order
1. Start with A1 (foundational)
2. Then A2 (builds on A1)
3. Meanwhile, B can go in parallel
4. Finally, C integrates everything
```

## Key Principles

### 1. Think Before Acting

Don't jump to code. Think first:
- What are we really trying to solve?
- What are the constraints?
- What could go wrong?

### 2. Consider Alternatives

The first solution is rarely the best:
- Generate multiple options
- Compare trade-offs
- Choose deliberately

### 3. Validate Assumptions

Question everything:
- "I assume X" → Is that actually true?
- "This should work" → How do I know?
- "It's probably Y" → Can I verify?

### 4. Show Your Work

Make reasoning visible:
- Explain your thought process
- Show how you reached conclusions
- Document dead ends (they're valuable!)

### 5. Stay Flexible

Be ready to change your mind:
- New information → Update understanding
- Assumption violated → Reconsider approach
- Better idea emerges → Pivot

### 6. Communicate Uncertainty

Be honest about what you don't know:
- "I'm confident about X because [evidence]"
- "I'm uncertain about Y, need to investigate"
- "I'm assuming Z, but it could be wrong"

## Example: Ultrathink in Action

```
User: The app crashes when uploading large files

🤔 ULTRATHINK MODE ACTIVATED

## Understanding the Problem

What we're told:
- App crashes on large file uploads
- Doesn't happen with small files

Immediate questions:
- How large is "large"? (need to ask user)
- What kind of crash? (memory? timeout? error?)
- Client-side or server-side crash?

Let me gather more information...

---

User: Files over 50MB crash. Browser shows "Out of memory"

## Refined Understanding

Ah! Browser memory error with 50MB+ files.

This tells me:
- Client-side issue (browser memory)
- Size-dependent (threshold around 50MB)
- Likely loading entire file into memory

## Exploring the Context

Let me check the upload code...
[reads upload handler]

Key findings:
1. Line 45: `FileReader.readAsDataURL()` - loads entire file into memory!
2. Line 60: Sends as base64 - increases size by 33%
3. No chunking or streaming

So a 50MB file becomes ~66MB in base64, all in browser memory.

## Possible Approaches

### Approach 1: Chunked Upload
Break file into chunks, upload sequentially

✅ Pros:
- Constant memory usage
- Can resume failed uploads
- Progress tracking natural

❌ Cons:
- More complex implementation
- Need server-side reassembly
- Slower (sequential chunks)

### Approach 2: Direct Upload (FormData)
Use FormData instead of FileReader

✅ Pros:
- Simpler implementation
- Browser handles efficiently
- Faster (single request)

❌ Cons:
- Still loads full file (but browser optimized)
- No progress for individual chunks
- Fails completely if network drops

### Approach 3: Signed URL Upload
Get presigned S3 URL, upload directly

✅ Pros:
- Bypasses our server entirely
- Browser → S3 direct (efficient)
- Built-in retry/resume

❌ Cons:
- Requires S3 (infrastructure change)
- More complex auth flow
- Backend needs to know about S3 upload completion

## Deep Analysis: Approach 1

How chunking would work:
1. Split file into 5MB chunks (client-side)
2. Upload chunk 1 → server saves to temp
3. Upload chunk 2 → append to temp
4. ... continue ...
5. All chunks done → move temp to final location

Memory impact:
- Only one 5MB chunk in memory at a time
- Sustainable even for GB files

Edge cases to handle:
- What if chunk 3 fails? → Retry just chunk 3
- What if user closes browser? → Server cleans up temp files after timeout
- What if chunks arrive out of order? → Number them, server orders

Implementation complexity:
- Client: Medium (chunk splitting, sequencing)
- Server: Medium (temp storage, reassembly)
- Testing: High (many failure scenarios)

## Deep Analysis: Approach 2

How FormData works:
1. Create FormData object
2. Append file directly (no FileReader)
3. Browser streams file in request

Memory impact:
- Browser handles memory efficiently
- Still could crash on truly massive files (500MB+)

Why it's better than current:
- No base64 encoding (33% smaller)
- No FileReader memory spike
- Browser-native optimization

Limitations:
- 50MB might still work, but what about 500MB?
- Doesn't solve the fundamental problem

## Decision

Recommended: **Approach 1 (Chunked Upload)**

Why:
1. **Solves root cause**: Constant memory regardless of file size
2. **Future-proof**: Works for files of any size
3. **Better UX**: Resume capability, accurate progress
4. **Scalable**: Won't break as users upload larger files

Trade-offs accepted:
- More complex implementation → Worth it for reliability
- Slower for small files → Can optimize later (use chunking only for large files)

Why not Approach 2:
- Doesn't fundamentally solve the problem
- Just pushes the limit higher (still will crash on very large files)

Why not Approach 3:
- Too big an infrastructure change for this issue
- Can consider later if we need direct-to-S3 for other reasons

## Implementation Plan

Step 1: Create chunk utility (client-side)
- Function to split File into Blob chunks
- Test: Can chunk a 100MB file without memory issues

Step 2: Create upload queue (client-side)
- Sequence chunks
- Retry failed chunks
- Track progress

Step 3: Server endpoint for chunk upload
- Accept chunk with metadata (index, total, fileId)
- Save to temp location
- Return success/failure

Step 4: Server reassembly
- Detect when all chunks received
- Combine chunks in order
- Move to final location
- Clean up temp files

Step 5: Error handling
- Client retry logic
- Server timeout cleanup
- Edge case handling

Step 6: Testing
- Test with 100MB file
- Test with interrupted upload
- Test with failed chunk
- Test with out-of-order chunks

## Validation Checks

Before implementing:
- ✓ Verify server has disk space for temp files
- ✓ Check if server framework supports chunked uploads (yes, Express does)
- ? Need to ask: Is there a max file size limit we want to enforce?

Assumptions I'm making:
- User has stable internet (for multi-chunk upload)
  → Mitigation: Add retry logic
- Server has temp storage
  → Verification: Check disk space policy

Ready to implement?
```

## Communication Guidelines

### Be Explicit About Certainty

```
✅ "I know this will work because [evidence]"
⚠️ "This should work, but I'm assuming [assumption]"
❓ "I'm not sure about this, let me investigate..."
```

### Show Dead Ends

```
Initially I thought [approach], but that won't work because [reason].
Instead, [better approach] because [reasoning].
```

### Invite Feedback

```
Does this reasoning make sense?
Am I missing any important constraints?
Is my understanding of [component] correct?
```

## Ultrathink + Other Skills

### With Plan Mode

```
/ultrathink + /plan-mode

Use ultrathink to:
- Deeply analyze architectural options
- Reason through different approaches
- Validate assumptions before planning
- Create more thorough plans
```

### With Execute Plan

```
/ultrathink + /execute-plan

Use ultrathink during execution to:
- Reason through unexpected issues
- Validate implementation approaches
- Debug complex problems
- Make informed deviation decisions
```

## When NOT to Use Ultrathink

Skip this mode for:
- ✗ Simple, well-understood tasks
- ✗ When you've already analyzed the problem
- ✗ Quick fixes with obvious solutions
- ✗ Following existing patterns exactly

Use regular mode when speed matters more than deep analysis.

## Tips for Effective Ultrathinking

### 1. Write Out Your Thinking

Make it visible:
```
Let me think through this...
[reasoning process]
So the conclusion is: [conclusion]
```

### 2. Question Your First Answer

```
My first instinct is [solution].
But wait, what if [alternative]?
Actually, [alternative] might be better because [reason].
```

### 3. Look for What You're Missing

```
What am I not considering?
- Edge case: [scenario]
- Constraint: [limit]
- Assumption: [assumption]
```

### 4. Explain Like Teaching

```
Here's how this works:
1. First, [step 1]
2. Then, [step 2]
3. Finally, [step 3]

This is necessary because [reasoning].
```

### 5. Document Uncertainty

```
I'm confident about [aspect 1] because [evidence].
I'm less sure about [aspect 2] - it could be [option A] or [option B].
I need to verify [aspect 3] before proceeding.
```

## Remember

Ultrathink Mode is about **quality over speed**:

- **Slow down** to speed up (avoid costly mistakes)
- **Think deeply** before acting
- **Consider alternatives** before committing
- **Validate assumptions** before trusting them
- **Communicate reasoning** so others can follow
- **Stay flexible** as new information emerges

The goal isn't to be perfect. It's to be **thoughtful, systematic, and aware**.

---

**ULTRATHINK MODE ACTIVATED. Think deeply, reason carefully, validate thoroughly.**
