# Complete Workflow Guide: Ultrathink + Plan Mode + Execute Plan

Master the complete workflow from deep thinking through systematic execution.

## The Three Skills

You now have a powerful trilogy of skills that work together:

### 1. **Ultrathink** 🧠
Deep reasoning for complex problems
- Think step-by-step
- Explore alternatives
- Validate assumptions
- Show reasoning

### 2. **Plan Mode** 📋
Read-only analysis and planning
- Analyze codebase
- Create detailed plans
- Document decisions
- Get approval

### 3. **Execute Plan** ✅
Systematic implementation
- Work milestone by milestone
- Track progress
- Verify each step
- Document discoveries

## The Complete Workflow

```
ULTRATHINK → PLAN MODE → USER APPROVAL → EXECUTE PLAN
   (think)      (plan)       (review)        (implement)
```

### When to Use Each

| Situation | Use This Workflow |
|-----------|-------------------|
| Complex architecture change | Ultrathink → Plan Mode → Execute |
| Mysterious bug | Ultrathink → Plan Mode → Execute |
| Large feature | Plan Mode → Execute |
| Small feature | Plan Mode → Execute |
| Quick fix | Just do it (no skills needed) |
| Debugging | Ultrathink (analysis only) |
| Code review | Ultrathink (understanding only) |

## Real-World Examples

### Example 1: Complex Feature with Uncertainty

```bash
# SITUATION: "Add real-time notifications, but I'm not sure how"

# Step 1: Think deeply about approaches
> /ultrathink What's the best way to add real-time notifications?

🤔 ULTRATHINK MODE

Options to consider:
1. WebSockets (bidirectional)
2. Server-Sent Events (SSE, one-way)
3. Long polling (fallback)

For your use case:
- Browser to server: REST API (already have)
- Server to browser: Need push

Analysis:
[deep reasoning about each option]

Recommendation: Server-Sent Events (SSE)
- Simpler than WebSockets
- Perfect for one-way notifications
- Native browser support
- Falls back gracefully

# Step 2: Create detailed plan
> /plan-mode Add real-time notifications using SSE

📋 PLAN MODE

[Codex analyzes codebase]
[Asks clarifying questions]
[Creates detailed plan with milestones]

✅ Plan created: .codex/plans/2025-01-07-notifications.md

# Step 3: Review and approve
> [Review the plan]
> approve

# Step 4: Execute systematically
> /execute-plan 2025-01-07-notifications

🎯 Milestone 1: SSE endpoint...
✅ Complete

🎯 Milestone 2: Client connection...
✅ Complete

[... continues through all milestones ...]

✅ All milestones complete!
```

### Example 2: Debugging Mystery → Fix

```bash
# SITUATION: "App crashes randomly, no clear pattern"

# Step 1: Deep debugging analysis
> /ultrathink App crashes randomly after 2-3 hours of use

🤔 ULTRATHINK MODE

Random crashes after time → suggests:
- Memory leak?
- Resource exhaustion?
- Background task issue?

Let me investigate systematically...
[reads code, checks logs, analyzes patterns]

Found: Memory leak in event listeners
- Every request adds listener
- Never removed
- Accumulates over hours

Root cause identified: server.js line 45

# Step 2: Create fix plan
> /plan-mode Fix the memory leak in event listeners

📋 PLAN MODE

[Creates plan with:]
- Immediate fix (remove listeners)
- Add tests to prevent regression
- Audit other similar patterns
- Add memory monitoring

✅ Plan created

# Step 3: Execute the fix
> approve
> /execute-plan 2025-01-07-memory-leak-fix

[Implements all milestones]
✅ Fix complete and verified
```

### Example 3: Architecture Decision → Implementation

```bash
# SITUATION: "Should we use SQL or NoSQL for new feature?"

# Step 1: Think through decision
> /ultrathink We're adding a content management system.
> Should we use PostgreSQL or MongoDB?

🤔 ULTRATHINK MODE

Context questions:
- Data structure? (varies by content type)
- Query patterns? (complex filtering)
- Relationships? (yes, nested content)
- Scale? (10k documents)
- Team expertise? (strong SQL)

Analysis of options:
[detailed comparison]

Recommendation: PostgreSQL with JSONB
- Structured schema for core fields
- JSONB for flexible content
- Complex queries supported
- Team knows it well

# Step 2: Plan the implementation
> /plan-mode Build CMS using PostgreSQL with JSONB

📋 PLAN MODE

[Creates comprehensive plan:]
- Database schema design
- Migration strategy
- API endpoints
- Admin interface
- Testing approach

✅ Plan created

# Step 3: Execute
> approve
> /execute-plan 2025-01-07-cms-implementation

[Implements milestone by milestone]
✅ CMS complete
```

## Skill Combinations

### Ultrathink + Plan Mode

Best for: Complex problems with multiple approaches

```bash
/ultrathink + /plan-mode [task]
```

What happens:
1. Ultrathink analyzes deeply
2. Considers alternatives
3. Chooses best approach
4. Plan Mode creates detailed plan based on that approach

Example:
```bash
> /ultrathink + /plan-mode Refactor authentication to support OAuth

🤔 First, thinking about OAuth integration...

Options:
1. Replace current auth entirely
2. Add OAuth alongside existing
3. Gradual migration

Recommendation: Option 2 (add alongside)
[reasoning...]

📋 Now creating detailed plan...

Milestones:
1. Add OAuth library
2. Create OAuth routes
3. Link OAuth to existing users
4. Update login UI
[...]
```

### Ultrathink Alone

Best for: Understanding without implementing

```bash
/ultrathink [question]
```

Use cases:
- "How does this code work?"
- "Why is this architecture designed this way?"
- "What are the trade-offs of approach X?"
- "Should we use library A or B?"

No plan, no implementation. Just deep thinking and analysis.

### Plan Mode → Execute Plan

Best for: Well-understood features

```bash
/plan-mode [feature]
# ... approve ...
/execute-plan [plan-id]
```

Skip ultrathink when:
- Approach is clear
- Standard implementation
- No major decisions needed

### Standalone Execute Plan

Best for: Resuming previous plans

```bash
/execute-plan 2025-01-05-previous-feature
```

Use when:
- Plan already exists
- Want to continue interrupted work
- Implementing approved design doc

## Decision Tree

```
Start with a task
      |
      ▼
Is the problem complex/unclear?
      |
      ├─ Yes ─→ /ultrathink
      |              |
      |              ▼
      |         Decision made
      |              |
      |              ▼
      |         /plan-mode
      |
      └─ No ──→ Is it a multi-step feature?
                     |
                     ├─ Yes ─→ /plan-mode
                     |              |
                     |              ▼
                     |         Approve plan
                     |              |
                     |              ▼
                     |         /execute-plan
                     |
                     └─ No ──→ Just implement directly
```

## Best Practices

### 1. Match Tool to Task Complexity

| Task Complexity | Workflow |
|----------------|----------|
| Trivial fix | No skills |
| Simple feature | Plan → Execute |
| Complex feature | Plan → Execute |
| Mystery/Debug | Ultrathink → Plan → Execute |
| Architecture decision | Ultrathink → Plan → Execute |
| Code review/learning | Ultrathink only |

### 2. Don't Over-Engineer Simple Tasks

❌ Don't:
```bash
# For changing a variable name
/ultrathink + /plan-mode Rename userId to user_id
```

✅ Do:
```bash
# Just do it
Rename userId to user_id in all files
```

### 3. Use Checkpoints

After each phase:
- **After Ultrathink**: Validate the reasoning
- **After Plan**: Review the milestones
- **During Execute**: Check each milestone

### 4. Document Everything

The workflow creates documentation:
- Ultrathink: Reasoning process
- Plan: Implementation blueprint
- Execute: Progress tracking

Commit these to version control!

### 5. Iterate and Learn

After completing projects:
- Review the plan accuracy
- Check time estimates
- Note what was missed
- Improve future planning

## Common Workflows

### Workflow 1: The Full Stack Feature

```
Request: "Add user dashboard with analytics"

1. /ultrathink What analytics are most valuable?
   → Decides on key metrics

2. /plan-mode Build user dashboard with [metrics]
   → Creates implementation plan

3. Approve plan

4. /execute-plan dashboard
   → Implements systematically
```

### Workflow 2: The Performance Investigation

```
Request: "App is slow under load"

1. /ultrathink Why is the app slow?
   → Identifies bottlenecks

2. /plan-mode Fix performance bottlenecks
   → Plans optimizations

3. Approve plan

4. /execute-plan performance-fix
   → Implements fixes
```

### Workflow 3: The Architecture Refactor

```
Request: "Move from monolith to microservices"

1. /ultrathink Should we go microservices? What's the strategy?
   → Analyzes trade-offs, chooses approach

2. /plan-mode Refactor to microservices using [strategy]
   → Creates migration plan

3. Approve plan (this might take multiple iterations!)

4. /execute-plan microservices-migration
   → Executes phase by phase
```

### Workflow 4: The Learning Session

```
Request: "Explain this legacy code"

1. /ultrathink What does this code do?
   → Deep analysis and explanation

DONE (no plan or execution needed)
```

## Tips for Success

### Start Small

First projects:
1. Try Ultrathink on a debugging problem
2. Try Plan Mode on a small feature
3. Try Execute Plan with that plan
4. Then combine them for bigger tasks

### Interact Actively

Don't just watch:
- Ask "why?" questions
- Challenge assumptions
- Provide corrections
- Request deeper analysis

### Trust the Process

The workflow seems slow at first, but:
- Thinking prevents mistakes (saves time)
- Planning prevents rework (saves time)
- Systematic execution prevents bugs (saves time)

Net result: Faster overall delivery

### Customize the Skills

Edit the skill files to:
- Match your tech stack
- Include your conventions
- Reference your patterns
- Use your terminology

## Measuring Success

Before skills:
```
Attempt 1: Quick implementation
↓
Bugs found in testing
↓
Attempt 2: Fix bugs
↓
Performance issues
↓
Attempt 3: Optimize
↓
Missing edge cases
↓
Attempt 4: Finally works

Total: 4 iterations, 2 weeks
```

After skills:
```
Ultrathink: Understand deeply (30 min)
↓
Plan Mode: Design correctly (1 hour)
↓
Execute Plan: Build systematically (1 week)
↓
Works correctly first time

Total: 1 iteration, 1.2 weeks
```

## Advanced Techniques

### Technique 1: Iterative Deepening

```bash
# Quick analysis
> /plan-mode Add caching

# Realizes more complexity
> Actually, let me think about this more deeply
> /ultrathink What's the best caching strategy?

# Then back to planning with better approach
> /plan-mode Implement [chosen strategy]
```

### Technique 2: Parallel Thinking

```bash
# Think about multiple aspects
> /ultrathink What are the security implications of this feature?
> /ultrathink What are the performance considerations?
> /ultrathink What are the UX best practices?

# Then synthesize into plan
> /plan-mode Build feature considering security, performance, and UX
```

### Technique 3: Checkpoint Reviews

```bash
# After planning
> Show me the plan summary

# During execution
> What's our progress?
> Show completion status

# After milestone
> Review what we just built
```

## Troubleshooting

### "It's too slow"

Remember:
- Complex problems deserve deep thought
- Time "lost" thinking is saved avoiding mistakes
- For simple tasks, skip the skills

### "The plan changed during execution"

That's normal!
- Update the plan as you learn
- Document why in "Surprises & Discoveries"
- Plans are guides, not contracts

### "I don't know which skill to use"

When in doubt:
1. Is it complex? → Start with Ultrathink
2. Is it multi-step? → Use Plan Mode
3. Have a plan? → Use Execute Plan
4. Is it simple? → Skip the skills

## Next Steps

1. **Read the individual skill guides**
   - `ultrathink/README.md`
   - `plan-mode/README.md`
   - `execute-plan/README.md`

2. **Try a simple example**
   - Small feature
   - Use Plan → Execute
   - Get comfortable

3. **Try a complex example**
   - Hard debugging problem
   - Use Ultrathink → Plan → Execute
   - See the full power

4. **Customize for your needs**
   - Edit skill files
   - Add your patterns
   - Make it yours

5. **Share with team**
   - Show the workflow
   - Create team conventions
   - Improve together

---

**The Goal**: Think deeply, plan thoroughly, execute systematically.

The skills work together to help you build better software, faster, with fewer mistakes.

Happy coding! 🚀
