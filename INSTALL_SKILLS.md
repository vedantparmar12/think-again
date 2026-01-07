# Installation Guide: Ultrathink, Plan Mode & Execute Plan Skills

Three powerful skills for OpenAI Codex CLI that enable systematic development: Think → Plan → Execute

## What You're Installing

### 🧠 **Ultrathink**
Deep reasoning mode for complex problems
- Think step-by-step through debugging, architecture decisions, and code analysis
- Explore multiple approaches before committing
- Validate assumptions and catch issues early

### 📋 **Plan Mode**
Read-only planning before implementation
- Analyze codebase without making changes
- Create detailed ExecPlan documents with milestones
- Get approval before executing

### ✅ **Execute Plan**
Systematic milestone-by-milestone implementation
- Work through approved plans systematically
- Track progress automatically
- Verify each step and document discoveries

## Installation

### For Windows

#### Step 1: Locate Codex Skills Directory

Your Codex skills directory is at:
```
C:\Users\<YourUsername>\.codex\skills\
```

If it doesn't exist, create it:
```powershell
mkdir "$env:USERPROFILE\.codex\skills"
```

#### Step 2: Extract Skills

1. Download the `codex-thinking-skills.zip` file
2. Extract the contents
3. Copy the three skill folders to your skills directory:
   ```powershell
   # Navigate to where you extracted the zip
   cd path\to\extracted\folder

   # Copy skills
   Copy-Item -Recurse ultrathink "$env:USERPROFILE\.codex\skills\"
   Copy-Item -Recurse plan-mode "$env:USERPROFILE\.codex\skills\"
   Copy-Item -Recurse execute-plan "$env:USERPROFILE\.codex\skills\"
   ```

#### Step 3: Verify Installation

Check that skills are in place:
```powershell
dir "$env:USERPROFILE\.codex\skills"
```

You should see:
- `ultrathink\`
- `plan-mode\`
- `execute-plan\`

#### Step 4: Restart Codex

```bash
# Exit Codex if running
exit

# Start Codex
codex
```

### For macOS / Linux

#### Step 1: Locate Codex Skills Directory

Your Codex skills directory is at:
```
~/.codex/skills/
```

If it doesn't exist, create it:
```bash
mkdir -p ~/.codex/skills
```

#### Step 2: Extract Skills

1. Download the `codex-thinking-skills.zip` file
2. Extract and copy skills:
   ```bash
   # Navigate to where you extracted the zip
   cd /path/to/extracted/folder

   # Copy skills
   cp -r ultrathink ~/.codex/skills/
   cp -r plan-mode ~/.codex/skills/
   cp -r execute-plan ~/.codex/skills/
   ```

Or in one command:
```bash
# From the extracted folder
cp -r ultrathink plan-mode execute-plan ~/.codex/skills/
```

#### Step 3: Verify Installation

Check that skills are in place:
```bash
ls ~/.codex/skills/
```

You should see:
- `ultrathink/`
- `plan-mode/`
- `execute-plan/`

Verify structure:
```bash
ls ~/.codex/skills/ultrathink/
# Should show: SKILL.md, README.md, QUICKSTART.md, examples/

ls ~/.codex/skills/plan-mode/
# Should show: SKILL.md, README.md, assets/, references/, scripts/

ls ~/.codex/skills/execute-plan/
# Should show: SKILL.md, README.md
```

#### Step 4: Restart Codex

```bash
# Exit Codex if running
exit

# Start Codex
codex
```

## Verification

### Check Skills Are Loaded

After restarting Codex, run:
```bash
/skills
```

You should see in the list:
- ✅ `ultrathink` - Deep reasoning mode for complex problems
- ✅ `plan-mode` - Create implementation plans before coding
- ✅ `execute-plan` - Execute approved implementation plans

### Quick Test

Try each skill:

**Test Ultrathink:**
```bash
/ultrathink What's the difference between async/await and Promises?
```
Should give detailed step-by-step analysis.

**Test Plan Mode:**
```bash
/plan-mode Add input validation to a form
```
Should ask questions and create a plan document.

**Test Execute Plan:**
(After creating a plan)
```bash
/execute-plan <plan-name>
```
Should work through milestones systematically.

## File Structure

After installation, your directory should look like:

```
~/.codex/skills/  (or C:\Users\<You>\.codex\skills\ on Windows)
├── ultrathink/
│   ├── SKILL.md                    # Main skill definition
│   ├── README.md                   # Full documentation
│   ├── QUICKSTART.md              # Quick start guide
│   └── examples/
│       └── debugging.md            # Example usage
├── plan-mode/
│   ├── SKILL.md                    # Main skill definition
│   ├── README.md                   # Full documentation
│   ├── assets/
│   │   └── execplan-template.md   # Plan template
│   ├── references/
│   │   └── planning-guide.md      # Detailed examples
│   └── scripts/
│       └── plan-helper.js         # Plan management tool
└── execute-plan/
    ├── SKILL.md                    # Main skill definition
    └── README.md                   # Full documentation
```

## Post-Installation

### Create Plans Directory (Optional but Recommended)

Plans are saved to `.codex/plans/` by default. Create it:

**Windows:**
```powershell
mkdir "$env:USERPROFILE\.codex\plans"
```

**macOS/Linux:**
```bash
mkdir -p ~/.codex/plans
```

### Read the Documentation

Start with:
1. **Quick Reference**: `~/.codex/skills/QUICK_REFERENCE.md`
2. **Complete Workflow Guide**: `~/.codex/skills/COMPLETE_WORKFLOW_GUIDE.md`
3. **Ultrathink Guide**: `~/.codex/skills/ultrathink/QUICKSTART.md`

## Troubleshooting

### Skills Don't Appear in `/skills` List

**Solution:**
1. Verify files are in correct location:
   ```bash
   # Windows
   dir "$env:USERPROFILE\.codex\skills\ultrathink"

   # macOS/Linux
   ls ~/.codex/skills/ultrathink/
   ```

2. Check SKILL.md has correct format:
   ```bash
   # Windows
   type "$env:USERPROFILE\.codex\skills\ultrathink\SKILL.md" | Select-Object -First 10

   # macOS/Linux
   head -10 ~/.codex/skills/ultrathink/SKILL.md
   ```
   Should show YAML frontmatter with `name: ultrathink`

3. Completely restart Codex CLI

4. Check Codex version (skills require recent version)

### Skills Load But Don't Work Correctly

**If Ultrathink gives quick answers without reasoning:**
- Try explicit invocation: "Please use ultrathink skill to analyze..."
- Be more specific in your question

**If Plan Mode writes code immediately:**
- Interrupt and say: "You are in PLAN MODE. Only create a plan, do not write code."

**If Execute Plan doesn't track progress:**
- Make sure you have a valid plan file in `.codex/plans/`
- Check plan file has proper ExecPlan format

### Permission Issues (macOS/Linux)

If you get permission errors:
```bash
chmod -R 755 ~/.codex/skills/
```

## Usage Examples

### Example 1: Debug a Complex Issue
```bash
/ultrathink My API is slow with large datasets
```
→ Deep analysis → Identifies multiple issues → Prioritizes fixes

### Example 2: Plan and Implement a Feature
```bash
# Step 1: Create plan
/plan-mode Add user authentication with JWT

# Step 2: Review plan at .codex/plans/YYYY-MM-DD-authentication.md

# Step 3: Approve and execute
approve
/execute-plan YYYY-MM-DD-authentication
```

### Example 3: Make an Architecture Decision
```bash
/ultrathink Should I use MongoDB or PostgreSQL for my blog?
```
→ Analyzes requirements → Compares options → Recommends with reasoning

### Example 4: Full Workflow
```bash
# Think about approach
/ultrathink + /plan-mode Add real-time notifications

# Executes:
# 1. Analyzes different approaches (WebSockets, SSE, polling)
# 2. Recommends best option
# 3. Creates implementation plan
# 4. Waits for approval
```

## Plan Management

Use the helper script to manage plans:

**List all plans:**
```bash
# Windows
node "$env:USERPROFILE\.codex\skills\plan-mode\scripts\plan-helper.js" list

# macOS/Linux
node ~/.codex/skills/plan-mode/scripts/plan-helper.js list
```

**Check plan progress:**
```bash
# Windows
node "$env:USERPROFILE\.codex\skills\plan-mode\scripts\plan-helper.js" status <plan-id>

# macOS/Linux
node ~/.codex/skills/plan-mode/scripts/plan-helper.js status <plan-id>
```

## Customization

You can customize skills for your needs by editing the SKILL.md files:

**Add your tech stack:**
- Reference your frameworks and libraries
- Include your coding conventions
- Add your architectural patterns

**Example:**
```bash
# Windows
notepad "$env:USERPROFILE\.codex\skills\plan-mode\SKILL.md"

# macOS/Linux
nano ~/.codex/skills/plan-mode/SKILL.md
```

## Uninstallation

To remove the skills:

**Windows:**
```powershell
Remove-Item -Recurse "$env:USERPROFILE\.codex\skills\ultrathink"
Remove-Item -Recurse "$env:USERPROFILE\.codex\skills\plan-mode"
Remove-Item -Recurse "$env:USERPROFILE\.codex\skills\execute-plan"
```

**macOS/Linux:**
```bash
rm -rf ~/.codex/skills/ultrathink
rm -rf ~/.codex/skills/plan-mode
rm -rf ~/.codex/skills/execute-plan
```

Then restart Codex.

## Getting Help

### Documentation
- **Complete Guide**: `COMPLETE_WORKFLOW_GUIDE.md`
- **Quick Reference**: `QUICK_REFERENCE.md`
- **Test Guide**: `TEST_SKILLS.md`

### Skill-Specific Help
- **Ultrathink**: See `ultrathink/README.md` and `ultrathink/QUICKSTART.md`
- **Plan Mode**: See `plan-mode/README.md` and example plans in `plan-mode/references/planning-guide.md`
- **Execute Plan**: See `execute-plan/README.md`

### Examples
- Debugging examples: `ultrathink/examples/debugging.md`
- Planning examples: `plan-mode/references/planning-guide.md`

## What's Next?

1. ✅ Skills installed and verified
2. 📚 Read the `COMPLETE_WORKFLOW_GUIDE.md`
3. 🧪 Try the test examples in `TEST_SKILLS.md`
4. 🚀 Use on a real project
5. ⚙️ Customize for your workflow

---

## About These Skills

These skills implement a systematic development workflow:

**Think (Ultrathink)** → Analyze deeply, consider alternatives, validate assumptions

**Plan (Plan Mode)** → Create detailed implementation plan, get approval

**Execute (Execute Plan)** → Implement systematically, track progress, verify

Inspired by Anthropic's Claude Code plan mode and thinking capabilities, adapted for OpenAI Codex CLI.

**Version:** 1.0.0
**Author:** Custom Skills
**License:** Free to use and modify

---

**Enjoy your new superpowers!** 🚀🧠📋✅
