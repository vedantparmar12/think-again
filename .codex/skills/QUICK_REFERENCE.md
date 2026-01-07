# Skills Quick Reference Card

## 🎯 Your Three New Skills

| Skill | When to Use | Command | What It Does |
|-------|-------------|---------|--------------|
| **Ultrathink 🧠** | Complex problems, debugging, decisions | `/ultrathink [question]` | Deep step-by-step reasoning |
| **Plan Mode 📋** | Multi-step features, refactoring | `/plan-mode [task]` | Creates detailed implementation plan |
| **Execute Plan ✅** | After plan approval | `/execute-plan [plan-id]` | Implements plan systematically |

## 💡 Quick Examples

### Example 1: Debug a Mystery
```bash
/ultrathink My app crashes randomly but I don't know why
```
→ Deep analysis of possible causes → Root cause identification

### Example 2: Plan a Feature
```bash
/plan-mode Add user authentication with JWT
```
→ Analyzes codebase → Creates detailed plan → Waits for approval

### Example 3: Execute the Plan
```bash
approve
/execute-plan 2025-01-07-user-authentication
```
→ Works milestone by milestone → Tracks progress → Verifies each step

### Example 4: Full Workflow
```bash
# Think about approach
/ultrathink What's the best way to add caching to my API?

# Create plan based on recommendation
/plan-mode Implement [chosen caching strategy]

# Execute after approval
approve
/execute-plan 2025-01-07-caching
```

## 🔄 Workflow Patterns

### Pattern 1: Simple Feature
```
/plan-mode → approve → /execute-plan
```

### Pattern 2: Complex Feature
```
/ultrathink → /plan-mode → approve → /execute-plan
```

### Pattern 3: Architecture Decision
```
/ultrathink [question] → Review reasoning → Decide
```

### Pattern 4: Understanding Code
```
/ultrathink What does this algorithm do?
```

## 🎨 Combining Skills

```bash
# Think deeply, then plan
/ultrathink + /plan-mode [task]

# What happens:
# 1. Deep reasoning about approaches
# 2. Chooses best approach
# 3. Creates detailed plan
```

## 📋 Plan Files

Plans are saved to:
```
.codex/plans/YYYY-MM-DD-feature-name.md
```

View plans:
```bash
node C:\Users\vedan\.codex\skills\plan-mode\scripts\plan-helper.js list
```

Check progress:
```bash
node C:\Users\vedan\.codex\skills\plan-mode\scripts\plan-helper.js status [plan-id]
```

## ✅ Testing Checklist

Run these tests to verify skills work:

### Test 1: Skills Load
```bash
/skills
```
Should list: ultrathink, plan-mode, execute-plan

### Test 2: Ultrathink Works
```bash
/ultrathink What's the difference between REST and GraphQL?
```
Should give detailed analysis, not just quick answer

### Test 3: Plan Mode Works
```bash
/plan-mode Add a simple contact form
```
Should ask questions, create plan, NOT write code immediately

### Test 4: Execute Plan Works
```bash
# After creating and approving a plan
/execute-plan [plan-name]
```
Should work milestone by milestone

## 🚨 Red Flags (Skills NOT Working)

❌ Skills don't appear in `/skills` list
❌ Ultrathink gives quick answers without reasoning
❌ Plan mode writes code before approval
❌ Execute plan implements everything at once
❌ No plan files created in `.codex/plans/`

If you see these, check:
1. Codex CLI is restarted
2. Skill files exist in `C:\Users\vedan\.codex\skills\`
3. SKILL.md files have YAML frontmatter

## 📚 Documentation

| What | Where |
|------|-------|
| Quick start all skills | `COMPLETE_WORKFLOW_GUIDE.md` |
| Ultrathink guide | `ultrathink/QUICKSTART.md` |
| Plan mode guide | `plan-mode/README.md` |
| Execute plan guide | `execute-plan/README.md` |
| Examples | `ultrathink/examples/debugging.md` |
| Testing guide | `TEST_SKILLS.md` |

## 🎓 Pro Tips

1. **Start small**: Try ultrathink on a simple question first
2. **Interact**: Ask "why?" to understand reasoning
3. **Review plans**: Don't just auto-approve, read them
4. **Track progress**: Check plan files to see progress
5. **Customize**: Edit skill files to match your stack

## 🔧 Common Issues & Fixes

### Issue: Skill doesn't activate
**Fix:** Use explicit command: `/ultrathink` not just "think about"

### Issue: Plan mode writes code
**Fix:** Interrupt: "You are in PLAN MODE. Only create a plan, don't code."

### Issue: No plan file created
**Fix:** Check `.codex/plans/` directory exists, create if needed

### Issue: Skills not in /skills list
**Fix:** Restart Codex CLI completely

## 💪 Your Skills Are Ready!

Files installed:
```
✅ C:\Users\vedan\.codex\skills\ultrathink\SKILL.md
✅ C:\Users\vedan\.codex\skills\plan-mode\SKILL.md
✅ C:\Users\vedan\.codex\skills\execute-plan\SKILL.md
```

Next steps:
1. Restart Codex: `exit` then `codex`
2. Check skills: `/skills`
3. Try a test: `/ultrathink How does binary search work?`
4. Read guides: Start with `COMPLETE_WORKFLOW_GUIDE.md`

**Go build something amazing!** 🚀
