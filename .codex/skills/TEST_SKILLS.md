# Skill Testing Guide

## ✅ Skills Installation Verified

Your skills are properly installed at: `C:\Users\vedan\.codex\skills\`

All three new skills have correct format:
- ✅ `ultrathink` - Deep reasoning mode
- ✅ `plan-mode` - Read-only planning
- ✅ `execute-plan` - Systematic execution

## How to Test

### Step 1: Restart Codex CLI

Codex loads skills at startup, so restart your session:

```bash
# If Codex is running, exit it
exit

# Start Codex in any directory
cd C:\Users\vedan
codex
```

### Step 2: Check Skills Are Loaded

In Codex, run:

```bash
/skills
```

You should see in the list:
- `ultrathink` - Deep reasoning mode for complex problems
- `plan-mode` - Create implementation plans before coding
- `execute-plan` - Execute approved implementation plans

### Step 3: Test Each Skill

#### Test Ultrathink

```bash
/ultrathink What's the difference between Promise.all and Promise.allSettled in JavaScript?
```

Expected behavior:
- Codex enters deep reasoning mode
- Thinks through the problem step-by-step
- Explains both, compares them
- Shows pros/cons of each
- Gives recommendation when to use each

#### Test Plan Mode

```bash
/plan-mode Create a simple REST API endpoint for getting user data
```

Expected behavior:
- Codex enters read-only mode
- Asks clarifying questions (What framework? Express? Existing patterns?)
- Searches existing codebase (if in a project)
- Creates a plan document at `.codex/plans/YYYY-MM-DD-user-endpoint.md`
- Plan has milestones, verification steps, file paths

#### Test Execute Plan

First, you need an approved plan. You can either:
- Use the plan from test #2 above, or
- Create a simple test plan manually

```bash
# After approving a plan
/execute-plan YYYY-MM-DD-user-endpoint
```

Expected behavior:
- Codex loads the plan
- Works through milestones one by one
- Updates progress in the plan file
- Asks to continue after each milestone

### Step 4: Test Combined Workflow

```bash
/ultrathink + /plan-mode Should I use MongoDB or PostgreSQL for a blog application?
```

Expected behavior:
1. Ultrathink analyzes both options deeply
2. Considers use case (blog with posts, comments, users)
3. Recommends one with reasoning
4. Plan Mode creates implementation plan based on chosen approach

## Quick Smoke Tests

### Smoke Test 1: Simple Question
```bash
/ultrathink Why would a for loop be slower than forEach in JavaScript?
```

Should give detailed reasoning, not just a quick answer.

### Smoke Test 2: Simple Planning
```bash
/plan-mode Add input validation to a login form
```

Should create a plan, not implement directly.

### Smoke Test 3: Check Restrictions
```bash
/plan-mode Fix this bug: [describe a bug]
```

During planning, Codex should:
- ✅ Read files
- ✅ Search code
- ❌ NOT modify any files
- ❌ NOT run commands

## Troubleshooting

### Problem: Skills don't appear in /skills list

**Solution:**
1. Check files exist: `dir C:\Users\vedan\.codex\skills\ultrathink`
2. Restart Codex CLI completely
3. Make sure you're using latest Codex version

### Problem: Skill activates but doesn't follow instructions

**Possible causes:**
1. Model might not be following the skill instructions well
2. Try being more explicit: "Please enter ultrathink mode and..."

**Example:**
Instead of:
```bash
Why is this slow?
```

Try:
```bash
/ultrathink Please analyze step-by-step why this code is slow
```

### Problem: Plan mode writes code

**This shouldn't happen!** If it does:
1. Interrupt and say: "You are in PLAN MODE. Do not write code. Only create a plan."
2. The skill instructions explicitly forbid this

### Problem: Skills not loading

**Check:**
```bash
# Verify skill file exists
cat C:\Users\vedan\.codex\skills\ultrathink\SKILL.md | head -20
```

Should show YAML frontmatter with `name: ultrathink`

## Expected vs Unexpected Behavior

### ✅ Expected Behavior

**Ultrathink:**
- Shows thinking process (🤔 Let me think...)
- Considers multiple options
- Explains reasoning
- Validates assumptions

**Plan Mode:**
- Asks clarifying questions
- Only uses read-only tools
- Creates .md plan file
- Waits for approval

**Execute Plan:**
- Works milestone by milestone
- Updates progress
- Asks to continue
- Documents discoveries

### ❌ Unexpected Behavior (Report if you see this)

**Ultrathink:**
- Gives quick answer without reasoning
- Doesn't consider alternatives
- Jumps to conclusions

**Plan Mode:**
- Writes code before approval
- Modifies files during planning
- Skips creating plan document

**Execute Plan:**
- Implements everything at once
- Doesn't track progress
- Skips verification steps

## Verification Checklist

After testing, verify:

- [ ] `/skills` command lists all three new skills
- [ ] `/ultrathink` activates deep reasoning mode
- [ ] `/plan-mode` creates plan documents in `.codex/plans/`
- [ ] Plan mode does NOT modify files
- [ ] `/execute-plan` works with created plans
- [ ] Skills can be combined with `+`
- [ ] Progress is tracked in plan files
- [ ] Helper script works: `node C:\Users\vedan\.codex\skills\plan-mode\scripts\plan-helper.js list`

## Success Criteria

✅ **Skills are working correctly if:**

1. They appear in `/skills` list
2. They activate with `/skill-name` command
3. They follow their core behaviors:
   - Ultrathink: Deep reasoning
   - Plan Mode: Read-only analysis → plan creation
   - Execute Plan: Milestone-by-milestone execution
4. They create proper artifacts:
   - Plans in `.codex/plans/`
   - Progress tracking
   - Documentation

## Real-World Test

Try this realistic scenario:

```bash
# 1. Think deeply about an approach
/ultrathink I need to add real-time notifications to my app.
What's better: WebSockets, Server-Sent Events, or Long Polling?

# Wait for analysis...

# 2. Create a plan based on the recommendation
/plan-mode Implement [whatever ultrathink recommended]

# Review the plan at .codex/plans/YYYY-MM-DD-*.md

# 3. Approve and execute
approve

/execute-plan YYYY-MM-DD-*

# Watch it work through milestones
```

If all three phases work smoothly, your skills are functioning perfectly! 🎉

## Next Steps After Successful Test

1. **Read the guides:**
   - `ultrathink/QUICKSTART.md`
   - `plan-mode/README.md`
   - `COMPLETE_WORKFLOW_GUIDE.md`

2. **Try on real project:**
   - Navigate to your actual project
   - Use skills for real tasks
   - See how they improve workflow

3. **Customize:**
   - Edit skill files to match your tech stack
   - Add your patterns and conventions
   - Make them yours

## Getting Help

If skills don't work as expected:

1. **Check skill format:**
   ```bash
   head -20 C:\Users\vedan\.codex\skills\ultrathink\SKILL.md
   ```
   Should have YAML frontmatter

2. **Check Codex version:**
   ```bash
   codex --version
   ```

3. **Try explicit invocation:**
   ```bash
   I want to use the ultrathink skill to analyze this problem
   ```

4. **Check logs** (if Codex has debug mode)

## Report Results

After testing, you should be able to say:

✅ "Skills load correctly in /skills list"
✅ "Ultrathink provides deep reasoning"
✅ "Plan mode creates plans without coding"
✅ "Execute plan works milestone by milestone"
✅ "Skills can be combined effectively"

Or identify specific issues:
❌ "Skill X doesn't appear in list"
❌ "Plan mode writes code during planning"
❌ "Execute plan doesn't track progress"

---

**Ready to test!** Start Codex and try `/skills` to see your new capabilities! 🚀
