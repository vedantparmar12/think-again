# Think Again: Codex Thinking Skills

Three powerful skills for OpenAI Codex CLI that enable systematic development workflows.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)
![License](https://img.shields.io/badge/license-Free-green)

## 🎯 What Are These Skills?

Transform your Codex CLI experience with three complementary skills:

### 🧠 **Ultrathink**
Deep reasoning mode for complex problems
- Think step-by-step through debugging and architecture decisions
- Explore multiple approaches before committing
- Validate assumptions and catch issues early
- Show transparent reasoning process

### 📋 **Plan Mode**
Read-only planning before implementation
- Analyze codebase without making changes
- Create detailed ExecPlan documents with milestones
- Document architectural decisions
- Get approval before executing

### ✅ **Execute Plan**
Systematic milestone-by-milestone implementation
- Work through approved plans systematically
- Track progress automatically
- Verify each step thoroughly
- Document discoveries along the way

## 🚀 Quick Start

### Download

**Latest Release:** [codex-thinking-skills-v1.0.0.zip](../../releases/latest)

### Installation

#### Windows
```powershell
# Extract the zip, then from the extracted folder:
Copy-Item -Recurse ultrathink,plan-mode,execute-plan "$env:USERPROFILE\.codex\skills\"

# Restart Codex
exit
codex
```

#### macOS / Linux
```bash
# Extract the zip, then from the extracted folder:
cp -r ultrathink plan-mode execute-plan ~/.codex/skills/

# Restart Codex
exit
codex
```

### Verify Installation
```bash
# In Codex, run:
/skills

# You should see:
# ✅ ultrathink - Deep reasoning mode for complex problems
# ✅ plan-mode - Create implementation plans before coding
# ✅ execute-plan - Execute approved implementation plans
```

## 💡 Usage Examples

### Example 1: Debug a Complex Issue
```bash
/ultrathink My API is slow with large datasets
```
→ Deep systematic analysis → Identifies bottlenecks → Recommends solutions

### Example 2: Plan a Feature
```bash
/plan-mode Add user authentication with JWT
```
→ Analyzes codebase → Asks questions → Creates detailed plan → Waits for approval

### Example 3: Execute the Plan
```bash
approve
/execute-plan 2025-01-07-user-authentication
```
→ Works milestone by milestone → Tracks progress → Verifies each step

## 🎨 The Complete Workflow

```
THINK → PLAN → APPROVE → EXECUTE

/ultrathink        Deep reasoning about approach
     ↓
/plan-mode         Create detailed implementation plan
     ↓
User Review        Approve or revise the plan
     ↓
/execute-plan      Implement milestone by milestone
```

## 📚 Documentation

All documentation is included in the download:

- `INSTALL_SKILLS.md` - Detailed installation guide
- `COMPLETE_WORKFLOW_GUIDE.md` - How all 3 skills work together
- `QUICK_REFERENCE.md` - Command quick reference card
- Plus skill-specific documentation and examples

## 📦 What's Included

- **ultrathink/** - Deep reasoning skill
- **plan-mode/** - Planning skill  
- **execute-plan/** - Execution skill
- Complete documentation and examples
- Helper scripts and templates

## 🚀 Get Started

1. **Download**: [codex-thinking-skills-v1.0.0.zip](../../releases/latest)
2. **Extract**: Unzip to a temporary location
3. **Install**: Copy skills to `~/.codex/skills/`
4. **Restart**: Restart Codex CLI
5. **Verify**: Run `/skills`
6. **Test**: Try `/ultrathink What is recursion?`

---

**Transform your development workflow with systematic thinking!** 🧠📋✅

*Version 1.0.0 | January 2026*
