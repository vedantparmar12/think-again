# Codex Thinking Skills Package

**Version:** 1.0.0
**Package:** codex-thinking-skills.zip
**Size:** ~67 KB

## What's Included

This package contains three powerful skills for OpenAI Codex CLI:

### 🧠 Ultrathink
Deep reasoning mode for complex problems
- Step-by-step analysis
- Multiple approach exploration
- Assumption validation
- Issue prevention

### 📋 Plan Mode
Read-only planning before implementation
- Codebase analysis without modifications
- Detailed ExecPlan creation
- Milestone-based structure
- Approval workflow

### ✅ Execute Plan
Systematic milestone-by-milestone implementation
- Progress tracking
- Step verification
- Discovery documentation
- Automated updates

## Quick Start

### 1. Download
Download `codex-thinking-skills.zip` from your distribution source.

### 2. Extract
Extract the zip file to a temporary location.

### 3. Install

#### Windows
```powershell
# Create skills directory if needed
mkdir "$env:USERPROFILE\.codex\skills" -Force

# Copy skills (from extracted folder)
Copy-Item -Recurse ultrathink "$env:USERPROFILE\.codex\skills\"
Copy-Item -Recurse plan-mode "$env:USERPROFILE\.codex\skills\"
Copy-Item -Recurse execute-plan "$env:USERPROFILE\.codex\skills\"
```

#### macOS / Linux
```bash
# Create skills directory if needed
mkdir -p ~/.codex/skills

# Copy skills (from extracted folder)
cp -r ultrathink plan-mode execute-plan ~/.codex/skills/
```

### 4. Restart Codex
```bash
# Exit if running
exit

# Start Codex
codex
```

### 5. Verify
```bash
# In Codex, run:
/skills
```

You should see:
- ✅ ultrathink
- ✅ plan-mode
- ✅ execute-plan

## Package Contents

```
codex-thinking-skills.zip
├── ultrathink/                      # Deep reasoning skill
│   ├── SKILL.md                     # Main skill definition
│   ├── README.md                    # Full documentation
│   ├── QUICKSTART.md               # Quick start guide
│   └── examples/
│       └── debugging.md             # Real-world examples
│
├── plan-mode/                       # Planning skill
│   ├── SKILL.md                     # Main skill definition
│   ├── README.md                    # Full documentation
│   ├── assets/
│   │   └── execplan-template.md    # Plan template
│   ├── references/
│   │   └── planning-guide.md       # Detailed examples
│   └── scripts/
│       └── plan-helper.js          # Plan management CLI
│
├── execute-plan/                    # Execution skill
│   ├── SKILL.md                     # Main skill definition
│   └── README.md                    # Full documentation
│
├── INSTALL_SKILLS.md               # Detailed installation guide
├── COMPLETE_WORKFLOW_GUIDE.md      # How all 3 skills work together
├── QUICK_REFERENCE.md              # Quick reference card
├── TEST_SKILLS.md                  # Testing guide
└── PLAN_MODE_QUICKSTART.md         # Plan mode quick start
```

## First Steps After Installation

1. **Read INSTALL_SKILLS.md** - Detailed installation instructions
2. **Read QUICK_REFERENCE.md** - Quick command reference
3. **Try a test** - Run `/ultrathink What is recursion?`
4. **Read COMPLETE_WORKFLOW_GUIDE.md** - Learn the full workflow

## Quick Test

After installation, test each skill:

### Test 1: Ultrathink
```bash
/ultrathink Explain the difference between var, let, and const in JavaScript
```
Should provide deep, step-by-step analysis.

### Test 2: Plan Mode
```bash
/plan-mode Create a simple TODO list API
```
Should ask questions and create a plan document.

### Test 3: Complete Workflow
```bash
/ultrathink + /plan-mode Add user registration feature
```
Should think deeply about approach, then create detailed plan.

## Usage Examples

### Example 1: Debug Complex Issue
```bash
/ultrathink My app crashes after 2 hours of running
```
→ Systematic analysis → Root cause identification → Solution recommendation

### Example 2: Plan Feature Implementation
```bash
/plan-mode Add email notifications
```
→ Codebase analysis → Questions → Detailed plan creation → Approval wait

### Example 3: Execute Approved Plan
```bash
# After plan approval
/execute-plan 2025-01-07-email-notifications
```
→ Milestone-by-milestone → Progress tracking → Verification

### Example 4: Architecture Decision
```bash
/ultrathink Should we use REST or GraphQL?
```
→ Deep comparison → Trade-off analysis → Recommendation with reasoning

## Features

### Ultrathink Features
- 🧠 Systematic problem decomposition
- 🔄 Multiple solution exploration
- ✅ Assumption validation
- 📊 Transparent reasoning process
- 🎯 Issue detection before implementation

### Plan Mode Features
- 🔒 Read-only codebase analysis
- 📝 ExecPlan document generation
- 🎯 Milestone-based structure
- 📋 Decision documentation
- ⏸️ Approval workflow

### Execute Plan Features
- ✅ Milestone-by-milestone execution
- 📈 Automatic progress tracking
- 🔍 Step-by-step verification
- 📓 Discovery documentation
- 🔄 Plan file updates

## Complete Workflow

```
THINK → PLAN → APPROVE → EXECUTE

/ultrathink        Deep reasoning
     ↓
/plan-mode         Create detailed plan
     ↓
User Review        Approve or revise
     ↓
/execute-plan      Implement systematically
```

## System Requirements

- **Codex CLI**: Latest version recommended
- **Platform**: Windows, macOS, or Linux
- **Node.js**: Required for plan-helper.js script (optional)
- **Disk Space**: ~200 KB for skills

## Documentation

All documentation is included in the package:

| Document | Purpose |
|----------|---------|
| INSTALL_SKILLS.md | Installation instructions (Windows & Mac) |
| COMPLETE_WORKFLOW_GUIDE.md | How to use all 3 skills together |
| QUICK_REFERENCE.md | Quick command reference |
| TEST_SKILLS.md | Testing and verification guide |
| ultrathink/README.md | Ultrathink full documentation |
| plan-mode/README.md | Plan mode full documentation |
| execute-plan/README.md | Execute plan full documentation |

## Support

### Common Issues

**Skills don't appear in `/skills` list:**
- Restart Codex completely
- Verify installation location
- Check SKILL.md files have YAML frontmatter

**Skills don't follow instructions:**
- Use explicit commands: `/ultrathink`, `/plan-mode`
- Be specific in your requests
- Read the relevant documentation

**Plan files not created:**
- Ensure `.codex/plans/` directory exists
- Check write permissions
- Review plan-mode documentation

### Getting Help

1. Read `INSTALL_SKILLS.md` for installation issues
2. Read `TEST_SKILLS.md` for verification steps
3. Check skill-specific README files
4. Review examples in `ultrathink/examples/` and `plan-mode/references/`

## Customization

Skills can be customized by editing SKILL.md files:
- Add your tech stack specifics
- Include your coding conventions
- Reference your architectural patterns
- Adjust thinking depth

## Version History

### v1.0.0 (2025-01-07)
- Initial release
- Three core skills: Ultrathink, Plan Mode, Execute Plan
- Complete documentation
- Cross-platform support (Windows, macOS, Linux)
- Helper scripts and examples

## License

Free to use and modify for personal and commercial projects.

## Credits

Inspired by:
- Anthropic's Claude Code plan mode
- OpenAI's ExecPlan format
- Codex CLI skills framework

Created for the developer community to enhance systematic development workflows.

---

## Quick Installation (TL;DR)

**Windows:**
```powershell
# Extract zip, then:
Copy-Item -Recurse ultrathink,plan-mode,execute-plan "$env:USERPROFILE\.codex\skills\"
# Restart Codex
```

**macOS/Linux:**
```bash
# Extract zip, then:
cp -r ultrathink plan-mode execute-plan ~/.codex/skills/
# Restart Codex
```

**Verify:**
```bash
/skills  # Should show: ultrathink, plan-mode, execute-plan
```

**First Test:**
```bash
/ultrathink What is the difference between a stack and a queue?
```

---

**Happy coding with systematic thinking!** 🚀🧠📋✅
