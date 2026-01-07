# Plan Mode Quick Start Guide

Get started with systematic, plan-first development using Codex CLI.

## What You've Installed

Two complementary skills that implement a **Plan → Review → Execute** workflow:

1. **`plan-mode`** - Read-only analysis and planning
2. **`execute-plan`** - Systematic implementation of approved plans

## Installation Check

Your skills are installed at:
```
C:\Users\vedan\.codex\skills\
├── plan-mode\
│   ├── SKILL.md
│   ├── README.md
│   ├── assets\
│   │   └── execplan-template.md
│   ├── references\
│   │   └── planning-guide.md
│   └── scripts\
│       └── plan-helper.js
└── execute-plan\
    ├── SKILL.md
    └── README.md
```

## Quick Start: Your First Plan

### 1. Start a Codex session

```bash
cd your-project
codex
```

### 2. Request a plan

```bash
/plan-mode Add user profile editing functionality
```

Or implicitly:
```bash
I need a detailed plan for implementing user profile editing
```

### 3. Watch Codex analyze

Codex will:
- ✅ Read your codebase
- ✅ Search for existing patterns
- ✅ Ask clarifying questions
- ✅ Research best practices
- ❌ NOT write any code yet!

### 4. Review the plan

Codex creates: `.codex\plans\2025-01-07-user-profile-editing.md`

The plan includes:
- Purpose and context
- Detailed milestones
- Verification steps
- File-level changes
- Time estimates
- Architectural decisions

### 5. Approve or revise

Reply with:
- `approve` - Start implementation
- `Can you add milestones for testing?` - Revise the plan
- `Use React instead of Vue` - Adjust approach
- `reject` - Start over with different strategy

### 6. Execute the plan

After approval:
```bash
/execute-plan 2025-01-07-user-profile-editing
```

Codex will:
- Work milestone by milestone
- Verify each step
- Update progress
- Document discoveries
- Ask before continuing

### 7. Review and deploy

When complete:
- All tests pass ✅
- All milestones verified ✅
- Progress documented ✅
- Ready for review ✅

## Common Workflows

### Workflow 1: Feature Development

```bash
# Plan
/plan-mode Add email notification system

# Review plan at .codex/plans/YYYY-MM-DD-email-notifications.md
# Edit if needed, then approve

# Execute
/execute-plan YYYY-MM-DD-email-notifications

# Codex implements milestone by milestone
```

### Workflow 2: Refactoring

```bash
# Plan
/plan-mode Refactor authentication to use repository pattern

# Review and approve

# Execute
/execute-plan YYYY-MM-DD-auth-refactor
```

### Workflow 3: Bug Fix with Analysis

```bash
# Plan
/plan-mode Investigate and fix memory leak in data processing

# Codex analyzes, identifies root cause, creates fix plan
# Review and approve

# Execute
/execute-plan YYYY-MM-DD-memory-leak-fix
```

## Managing Plans

Use the helper script to manage your plans:

### Create a new plan manually
```bash
node C:\Users\vedan\.codex\skills\plan-mode\scripts\plan-helper.js create "feature name"
```

### List all plans
```bash
node C:\Users\vedan\.codex\skills\plan-mode\scripts\plan-helper.js list
```

Output:
```
📋 Plans (3 total)

Status      | Plan ID                          | Milestones | Last Modified
------------|----------------------------------|------------|---------------
✅ approved | 2025-01-07-user-profile-editing  | 5          | 2025-01-07
🚧 in-progress | 2025-01-07-email-notifications | 7          | 2025-01-07
📝 draft    | 2025-01-06-dark-mode             | 4          | 2025-01-06
```

### Check plan progress
```bash
node C:\Users\vedan\.codex\skills\plan-mode\scripts\plan-helper.js status 2025-01-07-email-notifications
```

Output:
```
📊 Plan Status: 2025-01-07-email-notifications

Status: in-progress
Total Milestones: 7

📈 Progress (3/7 completed)

✅ 1. Create email service interface
✅ 2. Implement SMTP adapter
✅ 3. Add email templates
⬜ 4. Create notification queue
⬜ 5. Add retry logic
⬜ 6. Write tests
⬜ 7. Add documentation

████████████░░░░░░░░ 43%
```

### View full plan
```bash
node C:\Users\vedan\.codex\skills\plan-mode\scripts\plan-helper.js show 2025-01-07-email-notifications
```

## Tips for Success

### 1. Be Specific in Requests

❌ "Add authentication"
✅ "Add JWT-based authentication with refresh tokens and role-based access control"

More detail → Better plans

### 2. Answer Clarifying Questions

Codex may ask:
- "Should this be backward compatible?"
- "Which library: A or B?"
- "Performance or simplicity priority?"

Your answers shape the plan.

### 3. Edit Plans Before Approval

Plans are markdown files. You can:
- Add notes
- Reorder milestones
- Adjust estimates
- Add verification steps

### 4. Use Checkpoints

Between milestones:
- Review the code
- Test manually
- Check quality
- Decide whether to continue

### 5. Document Learnings

The "Surprises & Discoveries" section becomes valuable documentation:
- What worked well
- What didn't match expectations
- What to plan differently next time

## Example: Complete Session

```bash
# Start Codex
$ codex

# Request a plan
> /plan-mode Add dark mode toggle to user settings

# Codex analyzes the codebase
🔍 Reading existing theme implementation...
🔍 Found CSS variables in styles/theme.css
🔍 Checking for existing theme context...

# Codex asks questions
? Should the theme preference sync for authenticated users? (yes)
? Respect system theme preference with 'auto' option? (yes)
? Store guest preferences in localStorage? (yes)

# Codex creates the plan
📝 Creating implementation plan...

✅ Plan created: .codex/plans/2025-01-07-dark-mode-toggle.md

## Plan Summary

**Purpose:** Add user-controlled dark mode with persistent preferences

**Milestones:** 5
1. CSS variable refactoring (15 min)
2. Theme context implementation (30 min)
3. Toggle UI component (20 min)
4. Persistence layer (25 min)
5. Testing and verification (20 min)

**Total Estimate:** ~2 hours

Please review the plan. Reply with 'approve' to begin execution.

# You review the plan
> The plan looks good, but can you add a milestone for updating documentation?

# Codex updates the plan
✅ Added Milestone 6: Documentation updates (15 min)

Updated plan saved. Total estimate now ~2.25 hours.

Ready to execute?

# You approve
> approve

# Codex executes
🎯 Starting Milestone 1: CSS Variable Refactoring

Implementing:
- Extracting hardcoded colors to CSS variables
- Creating light and dark theme definitions
- Updating existing styles to use variables

[implements changes]

Running verification:
✅ All colors use CSS variables
✅ Theme variables defined for both modes
✅ No visual regressions in light mode
✅ Dark mode variables render correctly

Updating progress...

✅ Milestone 1 Complete (12 minutes)

Continue to Milestone 2? (yes/no)

# You continue
> yes

🎯 Starting Milestone 2: Theme Context Implementation

[Codex continues through all milestones...]

✅ Plan Execution Complete: Dark Mode Toggle

All 6 milestones successfully implemented and verified.

Summary:
- Dark mode toggle added to user settings
- Preferences persist for authenticated users
- Guests use localStorage
- System preference detection works
- Full test coverage added
- Documentation updated

Tests Passing: ✅ 15/15
Verification Complete: ✅

Ready for review and deployment.
```

## Advanced Usage

### Work with Version Control

Commit approved plans:
```bash
# After approval
git add .codex/plans/2025-01-07-feature.md
git commit -m "Add implementation plan for feature X"
```

### Share with Team

Plans become:
- Design documents
- Implementation guides
- Code review context
- Architectural decision records

### Iterate on Plans

After execution:
1. Review actual vs. estimated time
2. Check if milestones were sized well
3. Note what was missed during planning
4. Use learnings in next plan

### Create Plan Templates

For common tasks, create templates in:
```
.codex/skills/plan-mode/assets/
├── execplan-template.md        # Default
├── api-endpoint-template.md    # Custom
├── database-migration-template.md
└── ui-component-template.md
```

## Troubleshooting

### Codex writes code during planning

Remind Codex:
```
You are in PLAN MODE. Do not write code. Only analyze and create the plan.
```

### Plan is too vague

Request more detail:
```
Please add specific file paths, function names, and implementation details to each milestone.
```

### Want to modify an in-progress plan

```
Let's revise the plan. I want to change Milestone 4 to use library X instead of library Y.
```

### Execution diverges from plan

```
Please stick to the approved plan. If you need to deviate, explain why and ask for approval first.
```

## Learning Resources

### Detailed Documentation

1. **Plan Mode Skill**
   - Location: `C:\Users\vedan\.codex\skills\plan-mode\README.md`
   - What: How to use plan-mode skill
   - When: Before creating your first plan

2. **Planning Guide**
   - Location: `C:\Users\vedan\.codex\skills\plan-mode\references\planning-guide.md`
   - What: Examples of good vs. bad plans, patterns, best practices
   - When: When learning to create better plans

3. **Execute Plan Skill**
   - Location: `C:\Users\vedan\.codex\skills\execute-plan\README.md`
   - What: How execution works, handling deviations
   - When: Before executing your first plan

### Example Plans

See the planning guide for complete examples:
- User authentication implementation
- API endpoint creation
- Database migrations
- Frontend components
- Refactoring patterns

## Next Steps

1. **Try it out**: Create a plan for a small feature
2. **Review the examples**: Read the planning guide
3. **Customize**: Adjust skill instructions for your stack
4. **Share**: Show your team the workflow
5. **Iterate**: Improve plans based on learnings

## Support

These skills are based on:
- Claude Code's Plan Mode architecture
- OpenAI's ExecPlan format
- Codex CLI skills framework

They can be customized for your:
- Tech stack
- Coding standards
- Team processes
- Project structure

## Philosophy

> **Think before acting. Plan before implementing. Verify before proceeding.**

Plan Mode isn't about creating perfect plans. It's about:
- Making informed decisions
- Avoiding costly mistakes
- Documenting the journey
- Learning for next time

Start planning! 🚀

---

**Remember**: A good plan today is better than a perfect plan tomorrow. Start simple, learn, and iterate.
