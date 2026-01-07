# Think Again: Codex Thinking Skills

Nine powerful skills for OpenAI Codex CLI that provide a complete development workflow with LSP-powered code intelligence.

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)
![License](https://img.shields.io/badge/license-Free-green)
![Skills](https://img.shields.io/badge/skills-9-brightgreen)

## 🎉 What's New in v1.2.0

**Complete Development Workflow** - 5 NEW skills for the full development cycle!

### New Skills:
- 🔍 **Code Review** - Comprehensive automated code reviews (security, performance, quality)
- 🧪 **Test Generator** - Automatically generate comprehensive test suites
- 🐛 **Bug Hunter** - Deep bug analysis with root cause identification
- ♻️ **Refactor Assistant** - Safe refactoring with LSP-powered impact analysis
- 📚 **Doc Generator** - Automated documentation from code

**Complete Workflow:** Think → Plan → Execute → Test → Review → Document → Refactor

[See Release Notes](RELEASE_NOTES_v1.2.0.md) | [v1.1.0 Notes](RELEASE_NOTES_v1.1.0.md)

## 🎯 What Are These Skills?

Transform your Codex CLI experience with nine complementary skills covering the complete development workflow:

### **Thinking & Planning**

#### 🧠 **Ultrathink** (v1.1.0 - Enhanced with LSP)
Deep reasoning mode for complex problems
- Think step-by-step through debugging and architecture decisions
- Explore multiple approaches before committing
- Validate assumptions and catch issues early
- LSP-powered accurate code analysis

#### 📋 **Plan Mode** (v1.1.0 - Enhanced with LSP)
Read-only planning before implementation
- Analyze codebase without making changes
- Create detailed ExecPlan documents with milestones
- Document architectural decisions
- LSP-powered dependency mapping

#### ✅ **Execute Plan** (v1.0.0)
Systematic milestone-by-milestone implementation
- Work through approved plans systematically
- Track progress automatically
- Verify each step thoroughly

### **Code Intelligence**

#### 🔍 **Code Intelligence** (v1.1.0)
LSP-powered code analysis for 40+ languages
- Go to Definition, Find References, Hover Info
- Call Hierarchy and Type Information
- Automatically integrates with all skills

### **Quality & Testing** (NEW in v1.2.0!)

#### 🔍 **Code Review**
Comprehensive automated code reviews
- Security vulnerability detection (SQL injection, XSS, etc.)
- Performance issue identification (N+1 queries, complexity)
- Code quality analysis (duplication, naming, complexity)
- Best practices enforcement
- LSP-powered impact analysis

#### 🧪 **Test Generator**
Automatically generate comprehensive test suites
- Unit tests from functions/classes
- Integration test scaffolds
- Edge case identification
- Mock and fixture generation
- Works with Jest, pytest, JUnit, Go test, Rust, and more

#### 🐛 **Bug Hunter**
Deep bug analysis and root cause identification
- Systematic bug reproduction
- LSP-powered code tracing
- Root cause analysis with ultrathink
- Fix generation with explanations
- Regression test generation

### **Improvement & Documentation** (NEW in v1.2.0!)

#### ♻️ **Refactor Assistant**
Safe code refactoring with LSP-powered analysis
- Refactoring opportunity detection
- Impact analysis finds ALL affected code
- Multiple refactoring patterns (Extract Method, Remove Duplication, etc.)
- Backward compatibility checking
- Safe, incremental changes

#### 📚 **Doc Generator**
Automated documentation from code
- API documentation (functions, classes, parameters)
- README generation
- Architecture documentation
- Code comments (JSDoc, Docstrings, GoDoc, RustDoc)
- Changelog generation from git history

## 🚀 Quick Start

### Download

**Latest Release:** [codex-thinking-skills-v1.2.0.zip](codex-thinking-skills-v1.2.0.zip)

### Installation

#### Windows
```powershell
# Extract the zip, then from the extracted folder:
Copy-Item -Recurse ultrathink,plan-mode,execute-plan,code-intelligence,code-review,test-generator,bug-hunter,refactor-assistant,doc-generator "$env:USERPROFILE\.codex\skills\"

# Restart Codex
exit
codex
```

#### macOS / Linux
```bash
# Extract the zip, then from the extracted folder:
cp -r ultrathink plan-mode execute-plan code-intelligence code-review test-generator bug-hunter refactor-assistant doc-generator ~/.codex/skills/

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

# You should see all 9 skills:
# ✅ ultrathink - Deep reasoning mode
# ✅ plan-mode - Implementation planning
# ✅ execute-plan - Milestone execution
# ✅ code-intelligence - LSP integration (40+ languages)
# ✅ code-review - Comprehensive code reviews (NEW!)
# ✅ test-generator - Automated test generation (NEW!)
# ✅ bug-hunter - Bug analysis and fixing (NEW!)
# ✅ refactor-assistant - Safe refactoring (NEW!)
# ✅ doc-generator - Automated documentation (NEW!)
```

## 💡 Usage Examples

### Example 1: Complete Feature Development
```bash
# 1. Think through approach
/ultrathink Add user authentication with JWT

# 2. Plan implementation
/plan-mode Implement JWT authentication

# 3. Execute milestone by milestone
/execute-plan 2026-01-08-jwt-auth

# 4. Generate tests
/test-generator src/auth/

# 5. Review code
/code-review src/auth/

# 6. Generate docs
/doc-generator --api src/auth/
```

### Example 2: Bug Fixing Workflow
```bash
# 1. Hunt the bug
/bug-hunter "Users can't login on mobile"

# 2. Apply fix (guided by bug-hunter)

# 3. Generate regression tests
/test-generator --regression login-fix

# 4. Review the fix
/code-review src/auth/login.js
```

### Example 3: Code Quality Improvement
```bash
# 1. Find refactoring opportunities
/refactor-assistant analyze src/services/

# 2. Plan the refactor
/plan-mode Refactor UserService

# 3. Execute refactor
/execute-plan 2026-01-08-refactor-user-service

# 4. Update tests
/test-generator src/services/

# 5. Validate improvement
/code-review src/services/
```

## 🎨 The Complete Workflow

```
THINK → PLAN → EXECUTE → TEST → REVIEW → DOCUMENT → REFACTOR

/ultrathink           Deep reasoning about approach
     ↓
/plan-mode            Create detailed implementation plan
     ↓
User Review           Approve or revise the plan
     ↓
/execute-plan         Implement milestone by milestone
     ↓
/test-generator       Generate comprehensive tests
     ↓
/code-review          Review for quality & security
     ↓
/doc-generator        Generate documentation
     ↓
/refactor-assistant   Improve code quality
     ↑
/bug-hunter ←─────────┘ (when bugs found)
```

## 📚 Documentation

All documentation is included in the download:

- `INSTALL_SKILLS.md` - Detailed installation guide
- `COMPLETE_WORKFLOW_GUIDE.md` - How all 3 skills work together
- `QUICK_REFERENCE.md` - Command quick reference card
- Plus skill-specific documentation and examples

## 📦 What's Included

**9 Complete Skills:**

**Thinking & Planning:**
- **ultrathink** (v1.1.0) - Deep reasoning skill (Enhanced with LSP)
- **plan-mode** (v1.1.0) - Planning skill (Enhanced with LSP)
- **execute-plan** (v1.0.0) - Execution skill

**Code Intelligence:**
- **code-intelligence** (v1.1.0) - LSP integration for 40+ languages

**Quality & Testing (NEW!):**
- **code-review** (v1.2.0) - Comprehensive code reviews
- **test-generator** (v1.2.0) - Automated test generation
- **bug-hunter** (v1.2.0) - Bug analysis and fixing

**Improvement & Documentation (NEW!):**
- **refactor-assistant** (v1.2.0) - Safe refactoring
- **doc-generator** (v1.2.0) - Automated documentation

**Plus:**
- Complete documentation and examples for all skills
- Helper scripts and templates
- LSP integration guides for 40+ languages
- Complete workflow guides

## 🚀 Get Started

1. **Download**: [codex-thinking-skills-v1.2.0.zip](codex-thinking-skills-v1.2.0.zip)
2. **Extract**: Unzip to a temporary location
3. **Install**: Copy all 9 skills to `~/.codex/skills/`
4. **Install LSP** (optional): Install LSP servers for your languages
5. **Restart**: Restart Codex CLI
6. **Verify**: Run `/skills` to see all 9 skills
7. **Test**: Try `/code-review` on your project!

---

**Transform your development workflow with the complete skill suite!**

**Think → Plan → Execute → Test → Review → Document → Refactor**

🧠 📋 ✅ 🔍 🧪 🐛 ♻️ 📚

*Version 1.2.0 | January 2026*
