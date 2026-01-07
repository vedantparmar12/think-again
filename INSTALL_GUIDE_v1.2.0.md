# Installation Guide: Codex Thinking Skills v1.2.0

Complete guide to installing all 9 skills for the full development workflow.

## What You're Installing

**Complete Workflow - 9 Skills:**

### **Thinking & Planning**
- 🧠 **ultrathink** (v1.1.0) - Deep reasoning for complex problems
- 📋 **plan-mode** (v1.1.0) - Read-only planning with LSP
- ✅ **execute-plan** (v1.0.0) - Milestone-by-milestone execution

### **Code Intelligence**
- 🔍 **code-intelligence** (v1.1.0) - LSP integration for 40+ languages

### **Quality & Testing** (NEW in v1.2.0!)
- 🔍 **code-review** (v1.2.0) - Comprehensive automated reviews
- 🧪 **test-generator** (v1.2.0) - Automated test generation
- 🐛 **bug-hunter** (v1.2.0) - Deep bug analysis

### **Improvement & Documentation** (NEW in v1.2.0!)
- ♻️ **refactor-assistant** (v1.2.0) - Safe refactoring
- 📚 **doc-generator** (v1.2.0) - Automated documentation

## Prerequisites

- OpenAI Codex CLI installed
- Basic understanding of command line

## Installation

### Windows (PowerShell)

#### Step 1: Create Skills Directory

```powershell
# Create directory if it doesn't exist
mkdir "$env:USERPROFILE\.codex\skills" -Force
```

#### Step 2: Extract and Install

```powershell
# Download codex-thinking-skills-v1.2.0.zip
# Extract it to a temporary location
# Then navigate to the extracted folder

cd path\to\extracted\codex-thinking-skills-v1.2.0

# Copy all 9 skills at once
Copy-Item -Recurse ultrathink,plan-mode,execute-plan,code-intelligence,code-review,test-generator,bug-hunter,refactor-assistant,doc-generator "$env:USERPROFILE\.codex\skills\"
```

#### Step 3: Verify Installation

```powershell
# List installed skills
dir "$env:USERPROFILE\.codex\skills"

# You should see all 9 folders:
# ultrathink\
# plan-mode\
# execute-plan\
# code-intelligence\
# code-review\
# test-generator\
# bug-hunter\
# refactor-assistant\
# doc-generator\
```

#### Step 4: Restart Codex

```powershell
# Exit Codex if running
exit

# Start Codex
codex
```

#### Step 5: Verify Skills Loaded

```bash
# In Codex, run:
/skills

# You should see all 9 skills listed
```

### macOS / Linux (Bash)

#### Step 1: Create Skills Directory

```bash
# Create directory if it doesn't exist
mkdir -p ~/.codex/skills
```

#### Step 2: Extract and Install

```bash
# Download codex-thinking-skills-v1.2.0.zip
# Extract it to a temporary location
# Then navigate to the extracted folder

cd /path/to/extracted/codex-thinking-skills-v1.2.0

# Copy all 9 skills at once
cp -r ultrathink plan-mode execute-plan code-intelligence code-review test-generator bug-hunter refactor-assistant doc-generator ~/.codex/skills/
```

#### Step 3: Verify Installation

```bash
# List installed skills
ls -la ~/.codex/skills/

# You should see all 9 directories:
# ultrathink/
# plan-mode/
# execute-plan/
# code-intelligence/
# code-review/
# test-generator/
# bug-hunter/
# refactor-assistant/
# doc-generator/
```

#### Step 4: Restart Codex

```bash
# Exit Codex if running
exit

# Start Codex
codex
```

#### Step 5: Verify Skills Loaded

```bash
# In Codex, run:
/skills

# You should see all 9 skills listed
```

## Installing LSP Servers (Recommended)

For full LSP-powered code intelligence, install LSP servers for your languages:

### JavaScript/TypeScript

```bash
npm install -g typescript-language-server typescript
```

### Python

```bash
pip install pyright
```

### Java

Download from: https://download.eclipse.org/jdtls/snapshots/

### Go

```bash
go install golang.org/x/tools/gopls@latest
```

### C#/.NET

```bash
dotnet tool install -g csharp-ls
```

### C/C++

```bash
# macOS
brew install llvm

# Ubuntu/Debian
sudo apt install clangd

# Windows (with Chocolatey)
choco install llvm
```

### More Languages

See `.codex/skills/code-intelligence/README.md` for 40+ languages

## Upgrading from Previous Versions

### From v1.1.0 to v1.2.0

Just add the 5 new skills:

#### Windows

```powershell
cd path\to\extracted\codex-thinking-skills-v1.2.0

Copy-Item -Recurse code-review,test-generator,bug-hunter,refactor-assistant,doc-generator "$env:USERPROFILE\.codex\skills\"

# Restart Codex
exit && codex
```

#### macOS / Linux

```bash
cd /path/to/extracted/codex-thinking-skills-v1.2.0

cp -r code-review test-generator bug-hunter refactor-assistant doc-generator ~/.codex/skills/

# Restart Codex
exit && codex
```

### From v1.0.0 to v1.2.0

Replace old skills and add new ones:

#### Windows

```powershell
# Remove old versions
Remove-Item "$env:USERPROFILE\.codex\skills\ultrathink" -Recurse -Force
Remove-Item "$env:USERPROFILE\.codex\skills\plan-mode" -Recurse -Force

# Copy all v1.2.0 skills
cd path\to\extracted\codex-thinking-skills-v1.2.0
Copy-Item -Recurse * "$env:USERPROFILE\.codex\skills\"

# Restart Codex
exit && codex
```

#### macOS / Linux

```bash
# Remove old versions
rm -rf ~/.codex/skills/ultrathink
rm -rf ~/.codex/skills/plan-mode

# Copy all v1.2.0 skills
cd /path/to/extracted/codex-thinking-skills-v1.2.0
cp -r * ~/.codex/skills/

# Restart Codex
exit && codex
```

## Verification

After installation, test each skill:

### Test Thinking & Planning

```bash
# Test ultrathink
/ultrathink What is the best way to structure a React application?

# Test plan-mode
/plan-mode Add a simple REST API endpoint

# After plan created
/execute-plan 2026-01-08-rest-api
```

### Test Code Intelligence

```bash
# Test LSP integration (requires LSP server installed)
cd your-project
/code-intelligence Check LSP status
```

### Test Quality & Testing

```bash
# Test code review
/code-review src/

# Test test generator
/test-generator src/utils/helpers.js

# Test bug hunter
/bug-hunter "Describe a bug you want to investigate"
```

### Test Improvement & Documentation

```bash
# Test refactor assistant
/refactor-assistant analyze src/

# Test doc generator
/doc-generator --api src/
```

## Troubleshooting

### Skills Not Showing Up

```bash
# Check skills directory exists
# Windows
dir "$env:USERPROFILE\.codex\skills"

# macOS/Linux
ls ~/.codex/skills/

# Ensure each skill has a SKILL.md file
# Windows
dir "$env:USERPROFILE\.codex\skills\ultrathink\SKILL.md"

# macOS/Linux
ls ~/.codex/skills/ultrathink/SKILL.md
```

### Permission Errors (macOS/Linux)

```bash
# Fix permissions
chmod -R 755 ~/.codex/skills/
```

### LSP Not Working

```bash
# Check LSP server installed
which typescript-language-server
which pyright
which gopls

# Verify in skill
cd your-project
/code-intelligence Check LSP availability
```

### Skill Errors

```bash
# Check Codex logs
# Windows
type "%USERPROFILE%\.codex\logs\codex.log"

# macOS/Linux
cat ~/.codex/logs/codex.log
```

## Quick Test After Installation

Run this complete workflow test:

```bash
# 1. Start with thinking
/ultrathink How should I test my new feature?

# 2. Plan implementation
/plan-mode Add user profile feature

# 3. Execute the plan
/execute-plan 2026-01-08-user-profile

# 4. Generate tests
/test-generator src/profile/

# 5. Review code
/code-review src/profile/

# 6. Generate docs
/doc-generator --api src/profile/

# 7. If bugs found
/bug-hunter "Profile avatar not showing"

# 8. Refactor if needed
/refactor-assistant analyze src/profile/
```

If all these work, you're all set! 🎉

## Uninstallation

To remove all skills:

### Windows

```powershell
Remove-Item "$env:USERPROFILE\.codex\skills\ultrathink" -Recurse -Force
Remove-Item "$env:USERPROFILE\.codex\skills\plan-mode" -Recurse -Force
Remove-Item "$env:USERPROFILE\.codex\skills\execute-plan" -Recurse -Force
Remove-Item "$env:USERPROFILE\.codex\skills\code-intelligence" -Recurse -Force
Remove-Item "$env:USERPROFILE\.codex\skills\code-review" -Recurse -Force
Remove-Item "$env:USERPROFILE\.codex\skills\test-generator" -Recurse -Force
Remove-Item "$env:USERPROFILE\.codex\skills\bug-hunter" -Recurse -Force
Remove-Item "$env:USERPROFILE\.codex\skills\refactor-assistant" -Recurse -Force
Remove-Item "$env:USERPROFILE\.codex\skills\doc-generator" -Recurse -Force

# Restart Codex
exit && codex
```

### macOS / Linux

```bash
rm -rf ~/.codex/skills/ultrathink
rm -rf ~/.codex/skills/plan-mode
rm -rf ~/.codex/skills/execute-plan
rm -rf ~/.codex/skills/code-intelligence
rm -rf ~/.codex/skills/code-review
rm -rf ~/.codex/skills/test-generator
rm -rf ~/.codex/skills/bug-hunter
rm -rf ~/.codex/skills/refactor-assistant
rm -rf ~/.codex/skills/doc-generator

# Restart Codex
exit && codex
```

## Next Steps

1. **Read the Documentation**
   - Each skill folder has a README.md
   - Check out COMPLETE_WORKFLOW_GUIDE.md
   - Review QUICK_REFERENCE.md

2. **Try Example Workflows**
   - See RELEASE_NOTES_v1.2.0.md for examples
   - Start with simple tasks
   - Build up to complex workflows

3. **Install LSP Servers**
   - Install for your primary languages
   - Dramatically improves accuracy
   - See code-intelligence/README.md

4. **Integrate into Your Process**
   - Use with git workflow
   - Add to your development routine
   - Combine skills for best results

## Support

- **Issues**: Check skill README files
- **Examples**: See RELEASE_NOTES_v1.2.0.md
- **Workflows**: See COMPLETE_WORKFLOW_GUIDE.md
- **GitHub**: https://github.com/vedantparmar12/think-again

---

**Welcome to the complete development workflow!**

🧠 Think → 📋 Plan → ✅ Execute → 🧪 Test → 🔍 Review → 📚 Document → ♻️ Refactor

*Version 1.2.0 | January 2026*
