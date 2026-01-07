# Code Intelligence Quick Start

LSP-powered code analysis for Codex CLI. Get started in 5 minutes!

## What You Get

🔍 **Go to Definition** - Find where things are defined
🔗 **Find References** - See all usages
📊 **Hover Info** - Type and documentation
🔎 **Symbol Search** - Find across codebase
📞 **Call Hierarchy** - Understand call relationships

## Step 1: Install LSP Server (One-Time)

Choose your language(s):

### Most Popular

**JavaScript/TypeScript**
```bash
npm install -g typescript-language-server typescript
```

**Python**
```bash
pip install pyright
```

**Java**
```bash
# Download from: https://download.eclipse.org/jdtls/snapshots/
```

**Go**
```bash
go install golang.org/x/tools/gopls@latest
```

**C#/.NET**
```bash
dotnet tool install -g csharp-ls
```

**C/C++**
```bash
# macOS: brew install llvm
# Linux: sudo apt install clangd
# Windows: choco install llvm
```

### More Languages Supported

**Mobile**: Swift, Kotlin, Dart/Flutter
**Web**: PHP, HTML/CSS, Ruby
**Data Science**: R, Julia, SQL
**DevOps**: Terraform, Docker, YAML, Bash
**Systems**: Rust, Zig
**Functional**: Haskell, Scala, Clojure, Erlang
**Other**: Lua, Perl, LaTeX

See README.md for complete installation instructions for 40+ languages!

## Step 2: It Just Works!

LSP is **automatically enabled** in:
- `/ultrathink` mode
- `/plan-mode`
- Code analysis tasks

No configuration needed!

## Step 3: Try It

### Test 1: With Ultrathink
```bash
/ultrathink Where is the UserService class defined and how is it used?
```

You'll see LSP automatically:
- Find the definition
- Show all references
- Explain the structure

### Test 2: With Plan Mode
```bash
/plan-mode Refactor the authentication system
```

LSP automatically:
- Maps all auth-related code
- Identifies dependencies
- Creates accurate file lists

### Test 3: Standalone
```bash
/code-intelligence Find all references to calculateTotal
```

Direct LSP query!

## Quick Examples

### Example 1: Find a Function
```bash
"Where is processUser defined?"
```
→ `src/services/user.js:45`

### Example 2: See All Usages
```bash
"Find all references to UserService"
```
→ Shows 23 files using it

### Example 3: Understand Calls
```bash
"What calls the login function?"
```
→ Shows incoming call hierarchy

## Tips

### ✅ Do This
- Let LSP index on first use (30-60 seconds)
- Use with ultrathink for better analysis
- Trust LSP over grep

### ❌ Avoid This
- Don't query before indexing completes
- Don't use in non-project directories
- Don't compare with grep (LSP is more accurate)

## Common Questions

**Q: Do I need to do anything special?**
A: No! Just install the LSP server, it auto-works.

**Q: It's slow the first time?**
A: Yes, it's indexing. Wait 30-60 seconds, then it's fast.

**Q: Does it work for my language?**
A: Check README.md - most popular languages supported.

## Troubleshooting

### "LSP server not found"
Install the LSP server for your language (see Step 1)

### "No results"
Wait for indexing to complete (first use)

### "Still not working"
Restart Codex after installing LSP server

## What's Next?

1. Install LSP server for your main language
2. Try with `/ultrathink` on a real problem
3. See the improved analysis quality
4. Read full README.md for advanced features

---

**That's it! LSP is now enhancing your code analysis.** 🚀
