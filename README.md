# Think Again: Codex Thinking Skills

Four powerful skills for OpenAI Codex CLI that enable systematic development workflows with LSP-powered code intelligence.

![Version](https://img.shields.io/badge/version-1.1.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)
![License](https://img.shields.io/badge/license-Free-green)

## 🎉 What's New in v1.1.0

**LSP Integration** - IDE-like code intelligence for 40+ languages!
- Go to Definition, Find References, Hover Info, Call Hierarchy
- Automatically enhances ultrathink and plan-mode
- More accurate code analysis and dependency mapping
- **40+ Languages**: JavaScript/TypeScript, Python, Java, C#, Go, Rust, Swift, Kotlin, PHP, Ruby, Scala, Elixir, R, Julia, Terraform, Docker, and many more!

[See Release Notes](RELEASE_NOTES_v1.1.0.md)

## 🎯 What Are These Skills?

Transform your Codex CLI experience with four complementary skills:

### 🔍 **Code Intelligence** (NEW!)
LSP-powered code analysis for deeper understanding
- Go to Definition - Find where symbols are defined
- Find All References - See all usages across codebase
- Hover Information - Get type info and documentation
- Call Hierarchy - Understand function relationships
- Automatically integrates with ultrathink and plan-mode

### 🧠 **Ultrathink** (Enhanced with LSP!)
Deep reasoning mode for complex problems
- Think step-by-step through debugging and architecture decisions
- Explore multiple approaches before committing
- Validate assumptions and catch issues early
- Show transparent reasoning process
- Now uses LSP for accurate code analysis

### 📋 **Plan Mode** (Enhanced with LSP!)
Read-only planning before implementation
- Analyze codebase without making changes
- Create detailed ExecPlan documents with milestones
- Document architectural decisions
- Get approval before executing
- LSP-powered dependency mapping

### ✅ **Execute Plan**
Systematic milestone-by-milestone implementation
- Work through approved plans systematically
- Track progress automatically
- Verify each step thoroughly
- Document discoveries along the way

## 🚀 Quick Start

### Download

**Latest Release:** [codex-thinking-skills-v1.1.0.zip](codex-thinking-skills-v1.1.0.zip)

### Installation

#### Windows
```powershell
# Extract the zip, then from the extracted folder:
Copy-Item -Recurse ultrathink,plan-mode,execute-plan,code-intelligence "$env:USERPROFILE\.codex\skills\"

# Restart Codex
exit
codex
```

#### macOS / Linux
```bash
# Extract the zip, then from the extracted folder:
cp -r ultrathink plan-mode execute-plan code-intelligence ~/.codex/skills/

# Restart Codex
exit
codex
```

### Install LSP Servers (Optional but Recommended)

For full code intelligence features:

```bash
# JavaScript/TypeScript
npm install -g typescript-language-server typescript

# Python
pip install pyright

# Go
go install golang.org/x/tools/gopls@latest
```

See [code-intelligence/QUICKSTART.md](code-intelligence/QUICKSTART.md) for more languages.

### Verify Installation
```bash
# In Codex, run:
/skills

# You should see:
# ✅ ultrathink - Deep reasoning mode for complex problems
# ✅ plan-mode - Create implementation plans before coding
# ✅ execute-plan - Execute approved implementation plans
# ✅ code-intelligence - LSP-powered code analysis
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

- **code-intelligence/** - NEW! LSP-powered code analysis
- **ultrathink/** - Deep reasoning skill (Enhanced with LSP)
- **plan-mode/** - Planning skill (Enhanced with LSP)
- **execute-plan/** - Execution skill
- Complete documentation and examples
- Helper scripts and templates
- LSP integration guides

## 🚀 Get Started

1. **Download**: [codex-thinking-skills-v1.1.0.zip](codex-thinking-skills-v1.1.0.zip)
2. **Extract**: Unzip to a temporary location
3. **Install**: Copy skills to `~/.codex/skills/`
4. **Install LSP** (optional): Install LSP servers for your languages
5. **Restart**: Restart Codex CLI
6. **Verify**: Run `/skills`
7. **Test**: Try `/ultrathink Where is UserService defined?`

---

**Transform your development workflow with systematic thinking and LSP-powered code intelligence!** 🔍🧠📋✅

*Version 1.1.0 | January 2026*
