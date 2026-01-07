# Plan Mode Skill

A Codex skill that implements a two-phase development workflow: read-only planning followed by approved execution.

## What is Plan Mode?

Plan Mode separates thinking from doing. Instead of immediately modifying code, Codex first:

1. **Analyzes** the codebase thoroughly
2. **Asks** clarifying questions
3. **Plans** the implementation in detail
4. **Presents** the plan for your review
5. **Executes** only after you approve

This prevents premature implementations, ensures architectural consistency, and gives you control over the approach before any code changes.

## When to Use Plan Mode

Use Plan Mode when:

- ✅ Implementing new features
- ✅ Making architectural changes
- ✅ Refactoring large sections of code
- ✅ Multiple approaches are possible
- ✅ You want to review the strategy first
- ✅ Changes affect multiple files/components

Skip Plan Mode for:

- ❌ Trivial fixes (typos, formatting)
- ❌ Well-understood, simple changes
- ❌ When you've already approved an approach

## Quick Start

### 1. Invoke the Skill

```bash
/plan-mode Implement user authentication with JWT
```

Or implicitly mention planning:

```bash
Create a plan for adding dark mode support
```

### 2. Codex Enters Plan Mode

Codex will:
- Only use read-only tools (no file modifications!)
- Explore your codebase
- Ask you questions about preferences
- Research best practices if needed

### 3. Review the ExecPlan

Codex creates a detailed plan at `.codex/plans/YYYY-MM-DD-feature-name.md`:

```markdown
# ExecPlan: User Authentication

## Purpose
Implement JWT-based authentication for API endpoints

## Milestones
### Milestone 1: Create Auth Middleware
- Goal: Verify JWT tokens on protected routes
- Files: src/middleware/auth.js (new)
- Verification: Unit tests pass
- Estimated: 30 minutes

[... more milestones ...]
```

### 4. Approve or Revise

Reply with:
- **"approve"** → Codex executes the plan
- **"edit [changes]"** → Codex updates the plan
- **"reject"** → Codex creates a new approach

### 5. Execution

After approval, Codex:
- Implements milestone by milestone
- Updates progress in the plan
- Verifies each milestone before proceeding
- Documents surprises and learnings

## File Structure

```
.codex/skills/plan-mode/
├── SKILL.md                          # Main skill instructions
├── README.md                         # This file
├── assets/
│   └── execplan-template.md          # Plan template
├── references/
│   └── planning-guide.md             # Examples and best practices
└── scripts/
    └── plan-helper.js                # Plan management utilities
```

## Using the Plan Helper Script

The included helper script makes managing plans easier:

### Create a new plan
```bash
node ~/.codex/skills/plan-mode/scripts/plan-helper.js create "user authentication"
```

### List all plans
```bash
node ~/.codex/skills/plan-mode/scripts/plan-helper.js list
```

### Show plan progress
```bash
node ~/.codex/skills/plan-mode/scripts/plan-helper.js status 2025-01-07-user-auth
```

### View full plan
```bash
node ~/.codex/skills/plan-mode/scripts/plan-helper.js show 2025-01-07-user-auth
```

## ExecPlan Format

Plans follow a structured format:

- **Purpose**: What needs to be built and why
- **Context**: Current architecture, dependencies, constraints
- **Approach**: High-level strategy and rationale
- **Milestones**: Incremental, verifiable steps with:
  - Clear goals
  - Specific implementation details
  - Verification criteria
  - Files affected
  - Time estimates
- **Decision Log**: Key architectural decisions and rationale
- **Risks**: Potential issues and mitigation strategies
- **Progress**: Checklist of milestone completion

See `references/planning-guide.md` for detailed examples.

## Plan Mode Rules

When in Plan Mode, Codex:

### ✅ CAN:
- Read any file
- Search code
- View git history
- Research documentation
- Ask you questions
- Create the ExecPlan document

### ❌ CANNOT:
- Modify any files
- Execute commands
- Run tests
- Install packages
- Commit changes
- Implement code

These restrictions are enforced through clear instructions. The skill guides Codex to strictly separate planning from execution.

## Integration with Other Workflows

### With Ralph Loop

Plan Mode works great with autonomous execution:

```bash
# Step 1: Create the plan
/plan-mode Build user dashboard

# Step 2: Approve the plan
approve

# Step 3: Execute autonomously (if using Ralph Loop pattern)
# Codex can now work through milestones autonomously
```

### With Version Control

Plans are markdown files that can be:
- Committed to version control
- Reviewed in pull requests
- Referenced in documentation
- Shared with team members

Consider committing approved plans to `docs/plans/` for team visibility.

## Best Practices

### 1. Be Specific in Your Request

❌ "Add authentication"
✅ "Add JWT-based authentication for API endpoints with refresh tokens"

### 2. Answer Questions Thoughtfully

Codex may ask about:
- Architectural preferences
- Library choices
- Backward compatibility needs
- Performance vs. simplicity trade-offs

Your answers shape the plan.

### 3. Review Plans Carefully

Check for:
- Missing edge cases
- Error handling gaps
- Testing coverage
- Security considerations
- Performance implications

### 4. Edit Plans Before Approval

Plans are markdown files. You can:
- Edit them directly
- Add implementation notes
- Adjust time estimates
- Reorder milestones

### 5. Use Plans as Documentation

Approved plans become:
- Implementation guides
- Architecture decision records
- Onboarding materials
- Historical context

## Troubleshooting

### Codex is trying to write code in Plan Mode

Remind Codex:
```
You are in PLAN MODE. Do not write code. Only create the plan.
```

The skill instructions should prevent this, but models can occasionally drift.

### Plan is too vague

Ask for more detail:
```
Please add more specific implementation details to each milestone,
including exact file paths and function names.
```

### Plan is missing important aspects

Request additions:
```
Please add milestones for:
- Error handling
- Unit tests
- Integration tests
- Documentation updates
```

### Want to start over

```
Reject this plan and create a new approach using [different strategy]
```

## Examples

See `references/planning-guide.md` for comprehensive examples including:

- ✅ Good vs. bad milestones
- Common planning patterns (database, API, frontend)
- Decision log examples
- Risk assessment examples
- Complete example plans

## Extending the Skill

### Add Custom Plan Templates

Create templates in `assets/` for specific scenarios:
- `api-endpoint-template.md`
- `database-migration-template.md`
- `ui-component-template.md`

### Customize for Your Stack

Edit `SKILL.md` to:
- Reference your architectural patterns
- Include your coding standards
- Mention your testing frameworks
- Link to your documentation

### Create Team Standards

Add to `references/`:
- Your team's planning guidelines
- Required sections for plans
- Review checklists
- Approval workflows

## Learn More

- **Planning Guide**: `references/planning-guide.md` - Detailed examples and patterns
- **Template**: `assets/execplan-template.md` - Blank plan structure
- **Skill Definition**: `SKILL.md` - Full instructions given to Codex

## Version History

- **1.0.0** (2025-01-07): Initial release
  - Core plan mode functionality
  - ExecPlan format
  - Helper scripts
  - Example documentation

## License

This skill is provided as-is for use with OpenAI Codex CLI.

## Feedback

Found a bug? Have a suggestion? The Plan Mode skill can be continuously improved based on your usage patterns and feedback.

---

**Remember**: The best plans balance detail with flexibility. Plan enough to make informed decisions, but stay adaptable when implementation reveals new insights.
