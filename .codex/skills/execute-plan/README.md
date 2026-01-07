# Execute Plan Skill

A companion skill to `plan-mode` that systematically implements approved ExecPlans milestone by milestone.

## What Does This Skill Do?

After you've created and approved a plan using the `plan-mode` skill, this skill helps Codex:

1. **Execute methodically** - Work through milestones in order
2. **Verify thoroughly** - Check each milestone's success criteria
3. **Track progress** - Update the plan document as work completes
4. **Document learnings** - Record unexpected discoveries
5. **Maintain quality** - Follow the approved approach faithfully

## Quick Start

### 1. Create and Approve a Plan

First, use the `plan-mode` skill:

```bash
/plan-mode Add user authentication
# Codex creates a plan at .codex/plans/2025-01-07-user-authentication.md
# Review and approve it
```

### 2. Execute the Plan

```bash
/execute-plan .codex/plans/2025-01-07-user-authentication.md
```

Or simply:

```bash
Execute the approved authentication plan
```

### 3. Codex Works Through Milestones

Codex will:
- Announce each milestone before starting
- Implement exactly as specified in the plan
- Run verification steps
- Update progress in the plan file
- Ask to continue after each milestone

### 4. Review Progress

The plan file is continuously updated with:
- Checkmarks for completed milestones
- Timestamps of completion
- Documented surprises and discoveries
- New decisions made during implementation

## How It Works

### Milestone-by-Milestone Execution

```
🎯 Starting Milestone 1: Create Database Migration
[implements migration]
✅ Milestone 1 Complete (verified in 15 min)

🎯 Starting Milestone 2: Create Model
[implements model]
✅ Milestone 2 Complete (verified in 20 min)

Continue to Milestone 3? (yes/no)
```

### Progress Tracking

The plan file's Progress section updates automatically:

```markdown
## Progress

- [x] Milestone 1: Database Migration ✅ Completed 2025-01-07 14:30
- [x] Milestone 2: Create Model ✅ Completed 2025-01-07 14:50
- [ ] Milestone 3: API Endpoints (In Progress)
- [ ] Milestone 4: Frontend Component
- [ ] Milestone 5: Integration Tests
```

### Discovery Documentation

Unexpected findings are recorded:

```markdown
## Surprises & Discoveries

- **Milestone 1**: Found existing migration helper, used it instead of writing custom SQL
- **Milestone 2**: Database already had partial schema, extended it rather than creating new
- **Milestone 3**: Library updated API in v3.0, adjusted implementation accordingly
```

## When to Use This Skill

### ✅ Use `execute-plan` when:

- You have an approved ExecPlan to implement
- You want systematic, tracked execution
- The plan has clear milestones and verification steps
- You want documentation of the implementation process

### ❌ Don't use `execute-plan` for:

- Quick fixes without a plan
- Exploratory coding
- When you want Codex to figure out the approach (use `plan-mode` first)

## Features

### 1. Faithful Implementation

Codex follows the approved plan's:
- Technical approach and architecture
- Library and framework choices
- File organization and naming
- Testing strategies
- Verification criteria

### 2. Verification at Every Step

Each milestone is verified before proceeding:
- Runs specified tests
- Checks expected behaviors
- Confirms no regressions
- Validates success criteria

### 3. Adaptive Execution

When unexpected issues arise:
- **Minor issues**: Documented and resolved
- **Major blockers**: Execution pauses, user is consulted
- **New decisions**: Added to the Decision Log

### 4. Clear Communication

Codex keeps you informed:
- Announces each milestone start
- Reports verification results
- Documents discoveries
- Asks before continuing
- Summarizes completion

## Handling Deviations

Sometimes implementation reveals issues the plan didn't anticipate:

### Minor Adjustments

Codex handles automatically and documents:
```markdown
## Surprises & Discoveries

- **Milestone 2**: Variable naming typo in plan, used correct camelCase convention
```

### Major Changes

Codex stops and asks:
```
⚠️ Blocker Encountered in Milestone 3

Issue: Planned library doesn't support async/await syntax

Impact: Cannot implement as specified in plan

Proposed Solutions:
1. Upgrade to library v3.0 (supports async/await)
2. Use callback-based approach instead
3. Switch to alternative library

Recommendation: Upgrade to v3.0 (backward compatible)

How should I proceed?
```

## Integration with Plan Mode

These skills work together:

```mermaid
plan-mode → User Review → execute-plan → Completion
    ↓           ↓              ↓
  Analysis    Approval      Implementation
```

### Full Workflow

1. **Planning Phase** (`plan-mode`)
   - Analyze codebase
   - Create detailed plan
   - Document decisions
   - Get approval

2. **Execution Phase** (`execute-plan`)
   - Implement milestone by milestone
   - Verify each step
   - Track progress
   - Document learnings

3. **Completion**
   - All milestones verified
   - Progress documented
   - Ready for review

## Example Session

```bash
# Step 1: Create the plan
/plan-mode Add dark mode support
# [Codex analyzes and creates plan]

# Step 2: Review and approve
# [You review .codex/plans/2025-01-07-dark-mode.md]
approve

# Step 3: Execute the plan
/execute-plan 2025-01-07-dark-mode

# Codex executes:
🎯 Milestone 1: CSS Variable Setup
✅ Complete (10 min)

🎯 Milestone 2: Theme Context
✅ Complete (25 min)

🎯 Milestone 3: Toggle Component
✅ Complete (20 min)

🎯 Milestone 4: Persistence Layer
✅ Complete (15 min)

✅ All milestones complete!
Dark mode support fully implemented and verified.
```

## Best Practices

### 1. Let Milestones Complete

Don't skip ahead or request changes mid-milestone. Let each milestone finish and verify before adjusting.

### 2. Review Between Milestones

Use the natural pauses to:
- Verify the implementation matches expectations
- Check code quality
- Test functionality manually
- Decide whether to continue

### 3. Trust the Verification

The plan's verification steps were designed during planning. If they pass, the milestone is complete.

### 4. Document Everything

The plan file becomes a valuable record:
- What was built
- How it was built
- What was learned
- Decisions made

Commit it to version control.

### 5. Iterate on Plans

Implementation often reveals improvements for future planning:
- Were time estimates accurate?
- Were verification steps sufficient?
- Were dependencies correctly identified?
- Were risks properly assessed?

Use these learnings to improve future plans.

## Troubleshooting

### Codex isn't following the plan

Remind Codex:
```
Please follow the approved plan exactly as written.
Only deviate if you encounter a blocker.
```

### Milestones are too large

If a milestone takes too long:
```
Please break the current milestone into smaller sub-tasks
and verify each one individually.
```

### Want to skip a milestone

```
Skip Milestone 3 for now. Mark it as skipped and proceed to Milestone 4.
```

Update the plan:
```markdown
- [~] Milestone 3: Feature X (Skipped - will implement later)
```

### Need to add a new milestone

```
The plan is missing error handling. Please add a new milestone
after Milestone 4 to implement error handling, then continue.
```

## Files

```
.codex/skills/execute-plan/
├── SKILL.md       # Main skill instructions
└── README.md      # This file
```

Plans are stored in:
```
.codex/plans/
├── 2025-01-07-feature-a.md
├── 2025-01-07-feature-b.md
└── ...
```

## Learn More

- **Plan Mode Skill**: `.codex/skills/plan-mode/` - Create plans
- **Planning Guide**: `.codex/skills/plan-mode/references/planning-guide.md` - Examples and best practices
- **Plan Helper**: `.codex/skills/plan-mode/scripts/plan-helper.js` - Manage plans

## Version History

- **1.0.0** (2025-01-07): Initial release
  - Milestone-by-milestone execution
  - Progress tracking
  - Discovery documentation
  - Verification enforcement

## Tips

- **Be patient**: Good execution takes time. Trust the process.
- **Review frequently**: Use the pauses between milestones.
- **Document liberally**: Future you will appreciate the notes.
- **Iterate and improve**: Use learnings to create better plans.

---

**Remember**: The plan was created for a reason. Execute it faithfully, verify thoroughly, and document learnings for next time.
