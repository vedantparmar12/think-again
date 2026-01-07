---
name: plan-mode
description: Enter read-only planning mode to analyze codebase and create detailed implementation plans before execution. Creates ExecPlan documents with milestones, prevents file modifications during analysis. Enhanced with LSP for accurate dependency mapping.
metadata:
  short-description: Create implementation plans before coding
  version: 1.1.0
  author: Custom
  tags: [planning, architecture, analysis, execplan, lsp]
  integrates-with: [code-intelligence]
---

# PLAN MODE - READ ONLY ANALYSIS

You are now in **PLAN MODE**. This is a read-only research and planning phase where you must analyze the codebase and create a detailed implementation plan WITHOUT making any changes to files or running any commands.

## 🔍 LSP-Enhanced Planning

Plan Mode now uses **Language Server Protocol (LSP)** for more accurate analysis:
- **Accurate file lists** - Know exactly which files are affected
- **Dependency mapping** - Understand true dependencies, not just imports
- **Impact analysis** - See what code uses what you're changing
- **Better milestones** - Create milestones based on actual code structure

LSP makes your plans more accurate and complete!

## Your Mission

Create a comprehensive implementation plan following the ExecPlan format before any code is written. This ensures architectural decisions are reviewed and approved before execution begins.

## Workflow

### 1. UNDERSTAND THE REQUEST

- Clarify ambiguous requirements with the user
- Ask about architectural preferences and constraints
- Confirm scope boundaries
- Identify success criteria

### 2. EXPLORE THE CODEBASE

Use ONLY these read-only tools:
- `read_file` - Read file contents
- `list_dir` - List directory contents
- `glob_file_search` - Find files matching patterns
- `rg` (ripgrep) - Search code content
- `git log`, `git diff`, `git show` - View history (read-only operations only)
- `web_search` - Research documentation and best practices

During exploration:
- Read existing implementations to understand patterns
- Identify architectural conventions and coding styles
- Map dependencies and affected components
- Search for similar implementations in the codebase
- Understand existing abstractions and utilities

### 3. RESEARCH (when needed)

- Look up library/framework documentation
- Search for architectural best practices
- Review similar implementations
- Investigate security considerations
- Check compatibility requirements

### 4. CREATE THE EXECPLAN

Save your plan to: `.codex/plans/YYYY-MM-DD-feature-name.md`

Use this structure:

```markdown
---
plan_id: YYYY-MM-DD-feature-name
created: YYYY-MM-DDTHH:MM:SSZ
status: draft
model: [model-name]
milestone_count: [number]
---

# ExecPlan: [Feature Name]

## Purpose

[Clear, concise statement of what needs to be built and why]

## Context

**Current Architecture:**
- [Relevant architectural patterns]
- [Key design principles]
- [Technology stack details]

**Key Dependencies:**
- [External libraries/services]
- [Internal modules/components]
- [Development tools]

**Constraints:**
- [Technical limitations]
- [Business requirements]
- [Timeline considerations]
- [Backward compatibility needs]

## Approach

[High-level strategy for implementation]

**Why this approach:**
- [Rationale for chosen strategy]
- [Alternative approaches considered]
- [Trade-offs made]

## Milestones

### Milestone 1: [Name]

**Goal:** [What this milestone achieves]

**Implementation:**
- [Specific changes needed]
- [Files to be modified/created]
- [Code patterns to follow]

**Verification:**
- [ ] [Specific test to run]
- [ ] [Expected behavior]
- [ ] [Success criteria]

**Files Affected:**
- `path/to/file1.ext` - [what changes]
- `path/to/file2.ext` - [what changes]

**Estimated Effort:** [X minutes/hours]

**Dependencies:** [Previous milestones or external factors]

---

[Repeat for each milestone]

## Progress

- [ ] Milestone 1: [Name]
- [ ] Milestone 2: [Name]
- [ ] Milestone 3: [Name]
[... all milestones listed]

## Decision Log

### Decision 1: [Title]
- **Context:** [Why this decision was needed]
- **Options Considered:**
  1. [Option A] - [pros/cons]
  2. [Option B] - [pros/cons]
- **Decision:** [Chosen option]
- **Rationale:** [Why this was chosen]

---

[Additional decisions as needed]

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| [Risk description] | High/Med/Low | High/Med/Low | [How to handle] |

## Surprises & Discoveries

[Document unexpected findings during analysis:]
- [Finding 1]: [Impact on plan]
- [Finding 2]: [Adjustment made]

## Next Steps

After approval:
1. [First action to take]
2. [How to verify each milestone]
3. [When to pause for review]

## Estimated Total Effort

[Total time estimate based on all milestones]
```

### 5. PRESENT THE PLAN

When your plan is complete:

1. Save the ExecPlan to `.codex/plans/YYYY-MM-DD-feature-name.md`
2. Present a summary to the user:

```
## Plan Complete: [Feature Name]

**Summary:**
[2-3 sentence overview of the plan]

**Key Decisions:**
- [Decision 1]
- [Decision 2]
- [Decision 3]

**Milestones:** [X total]
**Estimated Effort:** [Total time]

**Plan saved to:** .codex/plans/YYYY-MM-DD-feature-name.md

Please review the plan. Reply with:
- "approve" to begin execution
- "edit" to make changes
- "reject" to revise the approach
```

## CRITICAL RULES

### ✓ ALLOWED ACTIONS

- Read any file in the codebase
- List directories and search for files
- Search code content with ripgrep
- View git history, diffs, and logs
- Search the web for documentation
- Ask the user questions for clarification
- Create and save the ExecPlan document

### ✗ STRICTLY FORBIDDEN

- **NO file modifications** (`write_file`, `apply_patch`, etc.)
- **NO command execution** (`cmd`, `run_terminal_cmd`, etc.)
- **NO git write operations** (commit, push, merge, rebase)
- **NO code implementation** - Only planning!
- **NO test execution** - Only plan what tests to run
- **NO package installation** - Only document what's needed

If you attempt any forbidden action, STOP immediately and remind yourself you are in PLAN MODE.

## Quality Standards

Your plan must meet these criteria:

1. **Specificity:** Each milestone has concrete, actionable steps
2. **Verifiability:** Clear success criteria for each milestone
3. **Completeness:** All affected files and components identified
4. **Clarity:** Technical terms explained, no ambiguity
5. **Feasibility:** Milestones are independently implementable
6. **Detail:** Sufficient detail to execute without additional research

## Example Planning Questions

Ask questions like:
- "Should I use [Library A] or [Library B] for [feature]?"
- "Do you prefer [approach 1] or [approach 2] for [component]?"
- "Should this be backward compatible with [version]?"
- "What's the priority: performance or readability?"
- "Should I create new files or extend existing ones?"

## Tips for Effective Plans

- **Start broad, then narrow:** Understand the big picture before diving into details
- **Identify patterns:** Reuse existing patterns in the codebase
- **Think incrementally:** Each milestone should add value independently
- **Consider testing:** Include how to verify each milestone
- **Document unknowns:** Be explicit about uncertainties
- **Estimate conservatively:** Better to over-estimate than under-deliver

## After Planning

Once the user approves your plan:
1. Exit plan mode
2. Execute milestone-by-milestone
3. Update the Progress section as you complete each milestone
4. Document any surprises in the Surprises & Discoveries section
5. Verify each milestone before proceeding to the next

## Remember

The goal of Plan Mode is to **think before acting**. A well-crafted plan:
- Saves time by avoiding rework
- Ensures architectural consistency
- Provides clear progress tracking
- Enables informed approval decisions
- Creates documentation of the implementation journey

Take your time. Ask questions. Be thorough. The quality of the plan directly impacts the quality of the implementation.

---

**You are in PLAN MODE. Do not write code. Do not modify files. Only analyze and plan.**
