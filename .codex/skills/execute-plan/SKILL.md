---
name: execute-plan
description: Execute an approved ExecPlan milestone by milestone, updating progress and documenting discoveries. Works with plans created by plan-mode skill.
metadata:
  short-description: Execute approved implementation plans
  version: 1.0.0
  author: Custom
  tags: [execution, implementation, tracking]
  requires: [plan-mode]
---

# EXECUTE PLAN - Systematic Implementation

You are executing an **approved ExecPlan**. Follow the plan precisely, working milestone by milestone, and document your progress.

## Your Mission

Implement the approved plan systematically:
1. Work through milestones in order
2. Verify each milestone before proceeding
3. Update progress in the plan document
4. Document surprises and learnings
5. Make deliberate decisions when needed

## Execution Workflow

### 1. LOAD THE PLAN

The user will provide either:
- A plan file path: `.codex/plans/YYYY-MM-DD-feature.md`
- A plan ID: `YYYY-MM-DD-feature`

Read the entire plan to understand:
- Overall purpose and approach
- All milestones and their dependencies
- Verification criteria for each milestone
- Architectural decisions already made

### 2. WORK MILESTONE BY MILESTONE

For each milestone in sequence:

#### A. Announce the Milestone

```
🎯 Starting Milestone X: [Milestone Name]

Goal: [milestone goal]
Files: [files to be modified]
Estimated: [time estimate]
```

#### B. Implement the Milestone

Follow the implementation details exactly as specified in the plan:
- Create/modify the files listed
- Follow the patterns and conventions mentioned
- Use the libraries and approaches specified
- Handle errors as described
- Add tests as specified

**Stay True to the Plan**: The plan was approved for a reason. Only deviate if:
- You discover a blocker not anticipated in planning
- You find a critical bug or security issue
- Technical constraints prevent the planned approach

If you need to deviate, **stop and ask the user first**.

#### C. Verify the Milestone

Run all verification steps listed in the milestone:
- Execute tests specified
- Check expected behaviors
- Verify success criteria
- Confirm no regressions

#### D. Update Progress

After successful verification, update the plan file:

```markdown
## Progress

- [x] Milestone 1: [Name] ✅ Completed YYYY-MM-DD HH:MM
- [ ] Milestone 2: [Name]
```

Add completion timestamp and checkmark.

#### E. Document Discoveries

If you encountered anything unexpected, update the plan:

```markdown
## Surprises & Discoveries

- **Milestone 1**: [What you found] - [How you handled it]
```

Examples:
- "Found existing helper function that simplified implementation"
- "Database already had partial schema, reused it"
- "Library version incompatibility, upgraded to v3.2.1"
- "Test revealed edge case, added validation for null values"

### 3. PAUSE BETWEEN MILESTONES

After completing each milestone:
1. Summarize what was accomplished
2. Show the verification results
3. Ask if you should continue to the next milestone

This gives the user checkpoints to review progress.

### 4. HANDLE UNEXPECTED ISSUES

When you encounter problems not addressed in the plan:

#### Minor Issues (quick fixes)
- Document in "Surprises & Discoveries"
- Fix and continue
- Example: "Variable name typo in plan, used correct name"

#### Major Issues (blockers)
- **STOP implementation**
- Describe the issue clearly
- Propose solutions
- Ask the user how to proceed
- Example: "Planned library doesn't support feature X. Options: 1) Use library Y instead, 2) Implement custom solution. Which approach?"

Update the Decision Log if the user makes a new decision:

```markdown
## Decision Log

### Decision X: [New Decision Title]
- **Context:** [Why this came up during implementation]
- **Options Considered:** [List options]
- **Decision:** [What was chosen]
- **Rationale:** [Why]
```

### 5. COMPLETE THE PLAN

When all milestones are verified:

#### A. Run Final Verification

- Run the full test suite
- Check that all acceptance criteria are met
- Verify no regressions in other parts of the system
- Test edge cases mentioned in the plan

#### B. Update Plan Status

```markdown
---
status: completed
completed: YYYY-MM-DDTHH:MM:SSZ
---
```

#### C. Create Summary

```markdown
## Implementation Summary

**Completed:** YYYY-MM-DD
**Total Time:** [actual time spent]
**Milestones Completed:** [X/X]

### What Was Built
[Brief description of what was implemented]

### Key Outcomes
- [Outcome 1]
- [Outcome 2]

### Deviations from Plan
[List any changes made to the original plan and why]

### Lessons Learned
[Things discovered during implementation that inform future planning]
```

#### D. Present to User

```
✅ Plan Execution Complete: [Plan Name]

All [X] milestones have been successfully implemented and verified.

Summary:
[Brief summary of what was built]

Key Files Modified:
- [file1]
- [file2]

Tests Passing: ✅
Verification Complete: ✅

The implementation is ready for review.

See full details in: .codex/plans/[plan-file].md
```

## Execution Principles

### 1. Fidelity to the Plan

The plan was reviewed and approved. Honor that by:
- Following the specified approach
- Using the agreed-upon libraries and patterns
- Implementing in the planned sequence
- Achieving the stated verification criteria

### 2. Incremental Progress

- Complete one milestone fully before starting the next
- Don't skip ahead or work in parallel (unless plan specifies)
- Each milestone should be independently verifiable
- Update progress after each milestone completion

### 3. Quality Standards

Even when following a plan, maintain quality:
- Write clean, readable code
- Add appropriate error handling
- Follow existing code style
- Write meaningful test cases
- Add helpful comments where needed

### 4. Communication

Keep the user informed:
- Announce each milestone start
- Report verification results
- Ask questions when uncertain
- Document unexpected findings
- Summarize after completion

### 5. Adaptability

Plans are guides, not contracts:
- If you discover a better way, propose it
- If something doesn't work, explain and suggest alternatives
- If requirements were misunderstood, clarify with the user
- If scope needs adjustment, discuss it

## Progress Tracking Format

Update the Progress section using this format:

```markdown
## Progress

- [x] Milestone 1: Database Schema ✅ Completed 2025-01-07 14:30
- [x] Milestone 2: Create Model ✅ Completed 2025-01-07 14:55
- [ ] Milestone 3: API Endpoints (In Progress)
- [ ] Milestone 4: Frontend Component
- [ ] Milestone 5: Integration Tests
```

Use:
- `[x]` for completed milestones
- `[ ]` for pending milestones
- Add ✅ and timestamp when completed
- Optionally mark current milestone with "(In Progress)"

## Verification Best Practices

For each milestone's verification steps:

### Run Tests
```bash
# Run the specific tests mentioned
npm test src/models/User.test.js

# Verify they pass
✅ All tests passing
```

### Manual Verification
```bash
# Test the functionality manually if specified
curl -X GET http://localhost:3000/api/users/123

# Verify expected response
✅ Returns user data correctly
```

### Check for Regressions
```bash
# Run full test suite to ensure nothing broke
npm test

# Verify no new failures
✅ No regressions detected
```

## Common Execution Patterns

### Pattern 1: Database Migration

```markdown
🎯 Starting Milestone 1: Database Migration

Implementing:
- Create migration file
- Define schema
- Add indexes
- Create rollback

[implements the migration]

Verification:
✅ Migration runs successfully
✅ Schema matches specification
✅ Can insert test data
✅ Rollback works

Updating progress...
```

### Pattern 2: API Endpoint

```markdown
🎯 Starting Milestone 2: GET /api/users/:id Endpoint

Implementing:
- Add route handler
- Validate input
- Query database
- Return response

[implements the endpoint]

Verification:
✅ Valid ID returns 200 with user data
✅ Invalid ID returns 400
✅ Nonexistent ID returns 404
✅ Integration tests pass

Updating progress...
```

### Pattern 3: Frontend Component

```markdown
🎯 Starting Milestone 3: UserCard Component

Implementing:
- Create component file
- Add props interface
- Implement rendering
- Add styles
- Write tests

[implements the component]

Verification:
✅ Component renders with data
✅ Props are correctly typed
✅ Unit tests pass (8/8)
✅ Storybook story renders

Updating progress...
```

## Handling Blockers

When you encounter a blocker:

```markdown
⚠️ Blocker Encountered in Milestone X

Issue: [Describe the problem]

Impact: [What this prevents]

Context: [Why the planned approach doesn't work]

Proposed Solutions:
1. [Option A] - [pros/cons]
2. [Option B] - [pros/cons]

Recommendation: [Your suggested approach]

Awaiting user decision before proceeding.
```

Wait for user input before continuing.

## Example Execution Session

```
🎯 Starting Milestone 1: Create Database Migration

Goal: Add user_preferences table to database

Implementing:
- Creating migration file: migrations/2025-01-07-add-user-preferences.js
- Defining schema with columns: id, user_id, theme, created_at, updated_at
- Adding unique constraint on user_id
- Adding foreign key to users table
- Creating rollback function

[creates the migration file]

Running verification:
$ npm run migrate

✅ Migration ran successfully
✅ Table created with correct schema
✅ Unique constraint prevents duplicates
✅ Foreign key enforces referential integrity
✅ Rollback tested successfully

Updating progress in plan...

✅ Milestone 1 Complete (20 minutes)

Ready to proceed to Milestone 2: Create UserPreferences Model
Continue? (yes/no)
```

## Remember

- **Follow the plan** - It was approved for a reason
- **Verify thoroughly** - Each milestone must meet its criteria
- **Document discoveries** - Future plans benefit from lessons learned
- **Communicate clearly** - Keep the user informed of progress
- **Maintain quality** - Following a plan doesn't mean cutting corners

The plan is your roadmap. Navigate it faithfully, but alert the user when you encounter unexpected terrain.

---

**You are executing an approved plan. Work milestone by milestone. Verify each step. Document your progress.**
