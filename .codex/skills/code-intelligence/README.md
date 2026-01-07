# Code Intelligence Skill

LSP (Language Server Protocol) integration for Codex CLI that provides IDE-like code intelligence.

## What is This?

Code Intelligence brings LSP capabilities to your Codex skills:
- 🔍 Go to Definition
- 🔗 Find All References
- 📊 Hover Information
- 🔎 Symbol Search
- 📞 Call Hierarchy
- 🎯 Type Information

## Why LSP?

### Without LSP
```
Codex: "Let me search for 'processUser' with grep..."
→ Finds strings in comments
→ Finds similar function names
→ May miss actual references
→ Can't find definition easily
```

### With LSP
```
Codex: "Using LSP to find processUser..."
→ Finds exact definition
→ Lists all 47 actual references
→ Shows type information
→ Understands call hierarchy
```

## Integration with Other Skills

### Automatically Works With

#### 🧠 Ultrathink
```bash
/ultrathink Why is this function slow?
```
Codex automatically uses LSP to:
- Find function definition
- Analyze implementation
- Find all call sites
- Understand call patterns

#### 📋 Plan Mode
```bash
/plan-mode Refactor authentication system
```
Codex automatically uses LSP to:
- Find all auth-related code
- Map dependencies accurately
- Identify affected files
- Create better milestones

## Quick Examples

### Example 1: Find Definition
```bash
# In ultrathink or plan mode
"Where is the UserService class defined?"
```
LSP response:
```
Definition: src/services/UserService.js:15
Class: UserService
Methods: 12
Used by: 23 files
```

### Example 2: Find References
```bash
"Find all references to calculateTotal"
```
LSP response:
```
Found 15 references:
- src/cart/Cart.js:45 (call)
- src/checkout/Summary.js:78 (call)
- src/api/orders.js:123 (call)
- tests/cart.test.js:34 (call in test)
[... 11 more]
```

### Example 3: Call Hierarchy
```bash
"What calls the processPayment function?"
```
LSP response:
```
Incoming calls (3):
- handleCheckout → processPayment
- retryPayment → processPayment
- handleSubscription → processPayment

Outgoing calls (5):
- processPayment → validateCard
- processPayment → authorizePayment
- processPayment → createTransaction
- processPayment → sendReceipt
- processPayment → logPayment
```

## Standalone Usage

You can also use code intelligence directly:

```bash
/code-intelligence Find all references to User class
/code-intelligence Show call hierarchy for handleLogin
/code-intelligence What's the type of userData parameter?
```

## Supported Languages

### Fully Supported (LSP servers available)
- ✅ **JavaScript/TypeScript** - `typescript-language-server`
- ✅ **Python** - `pyright` or `pylsp`
- ✅ **Java** - `jdtls`
- ✅ **Go** - `gopls`
- ✅ **Rust** - `rust-analyzer`
- ✅ **C/C++** - `clangd`

### Partial Support
- 🟡 **Ruby** - `solargraph`
- 🟡 **PHP** - `intelephense`
- 🟡 **C#** - `omnisharp`

### Requires Manual Setup
- ⚙️ **Kotlin**
- ⚙️ **Swift**
- ⚙️ **Scala**

## Installation of LSP Servers

Code Intelligence requires LSP servers to be installed for your languages.

### JavaScript/TypeScript
```bash
npm install -g typescript-language-server typescript
```

### Python
```bash
pip install pyright
# or
pip install python-lsp-server
```

### Go
```bash
go install golang.org/x/tools/gopls@latest
```

### Rust
```bash
rustup component add rust-analyzer
```

### Java
Download from: https://github.com/eclipse/eclipse.jdt.ls

### C/C++
```bash
# macOS
brew install llvm

# Ubuntu/Debian
apt install clangd

# Windows
# Download from LLVM releases
```

## How It Works

### 1. Automatic Detection

When you use ultrathink or plan mode:
1. Detects file types in your project
2. Starts appropriate LSP servers
3. Indexes the codebase
4. Provides intelligence

### 2. Caching

Results are cached for performance:
- Symbol definitions
- References
- Type information
- Documentation

### 3. Incremental Updates

LSP stays synchronized:
- Tracks file changes
- Updates index incrementally
- Provides real-time intelligence

## Real-World Examples

### Example 1: Debugging Mystery Bug

```bash
/ultrathink The app crashes when users click the submit button

🧠 Analyzing with LSP...

Step 1: Finding submit button handler
LSP: onClick={handleSubmit}
Definition: src/components/ContactForm.js:67

Step 2: Analyzing handleSubmit function
LSP hover shows:
  handleSubmit: (event: FormEvent) => void
  Calls: validateForm(), submitToApi()

Step 3: Finding submitToApi
LSP definition: src/api/contact.js:34
Implementation:
  fetch('/api/contact', { method: 'POST', body: data })

Step 4: Checking error handling
LSP: No .catch() on fetch promise!
Finding all similar patterns...
LSP: 12 fetch calls without error handling

Root Cause: Unhandled promise rejection
When API is down, uncaught error crashes app

Solution: Add error handling to all fetch calls
```

### Example 2: Refactoring Assessment

```bash
/plan-mode Rename getUserData to fetchUserData

📋 Planning with LSP...

Finding all references to getUserData:
LSP found 34 references across 8 files:

Files affected:
- src/api/users.js (definition + 2 calls)
- src/hooks/useUser.js (3 calls)
- src/components/UserProfile.js (1 call)
- src/components/Dashboard.js (2 calls)
- src/services/cache.js (1 call)
- tests/api.test.js (25 calls in tests)

Checking exports:
LSP: getUserData is exported from UserAPI
External imports: 0 (safe to rename)

Plan created:
✅ Safe to rename (no external dependencies)
Effort: Medium (34 references, mostly in tests)
Milestones:
1. Rename in src/api/users.js
2. Update 5 internal call sites
3. Update 25 test references
4. Verify with full test suite
```

### Example 3: Understanding Unknown Codebase

```bash
/ultrathink How does authentication work in this codebase?

🧠 Analyzing with LSP...

Step 1: Finding auth entry point
LSP workspace search: "login"
Found: LoginController at src/auth/LoginController.js

Step 2: Understanding LoginController
LSP document symbols shows:
- login(username, password)
- logout()
- refreshToken()
- validateSession()

Step 3: Tracing login flow
LSP call hierarchy:
login() calls:
  → AuthService.authenticate()
  → SessionManager.create()
  → TokenGenerator.generate()

Step 4: Finding session storage
LSP: SessionManager definition
Uses: Redis for session storage

Step 5: Finding token validation
LSP: Find references to validateSession
Called by: AuthMiddleware (on every request)

Authentication flow mapped:
1. User submits credentials → LoginController.login()
2. AuthService validates against DB
3. SessionManager creates Redis session
4. TokenGenerator creates JWT
5. AuthMiddleware validates on each request
```

## LSP Commands Reference

### Navigation Commands

| What You Want | How to Ask |
|---------------|------------|
| Find where something is defined | "Go to definition of [symbol]" |
| See all usages | "Find all references to [symbol]" |
| Get type info | "What's the type of [variable]?" |
| See documentation | "Show hover info for [symbol]" |

### Analysis Commands

| What You Want | How to Ask |
|---------------|------------|
| What calls this? | "Show incoming calls to [function]" |
| What does this call? | "Show outgoing calls from [function]" |
| Find all classes | "Search for all classes" |
| Find specific symbol | "Find [name] in the codebase" |

## Performance Tips

### First Use
- LSP servers need to index your codebase
- May take 30-60 seconds for large projects
- Subsequent queries are fast (cached)

### Large Codebases
- 10k files: ~30 seconds to index
- 100k files: ~2 minutes to index
- Indexes only once per session

### Optimization
- Keep LSP servers running (faster queries)
- Close servers you're not using (free memory)
- Let indexing complete before querying

## Troubleshooting

### LSP Not Working

**Problem:** "LSP server not found"

**Solution:** Install the LSP server for your language
```bash
# Check what's installed
which typescript-language-server
which pyright
which gopls

# Install missing servers (see Installation section)
```

**Problem:** "No results from LSP"

**Possible causes:**
1. LSP still indexing (wait a moment)
2. File not part of a project (no package.json, go.mod, etc.)
3. LSP server crashed (restart Codex)

**Problem:** "LSP is slow"

**Causes:**
1. First query (indexing)
2. Very large codebase
3. Complex analysis (call hierarchy with many levels)

**Solutions:**
- Be patient on first use
- Consider excluding large directories (node_modules, etc.)
- Use simpler queries when possible

### Checking LSP Status

You can ask:
```bash
"Is LSP available for this project?"
"What LSP servers are running?"
"Check LSP status"
```

## Advanced Usage

### Combining LSP with Git

```bash
/ultrathink Why was this function changed?

# Codex uses both:
# - LSP: Shows current structure and usage
# - Git: Shows history and why it changed
# - Together: Complete picture
```

### LSP for Code Review

```bash
/ultrathink Review this pull request

# Codex uses LSP to:
# - Find all affected code paths
# - Check for breaking changes
# - Verify all references updated
# - Ensure tests cover changes
```

### LSP for Documentation

```bash
/plan-mode Document the API

# Codex uses LSP to:
# - Find all public functions
# - Extract type signatures
# - Get existing documentation
# - Generate complete API docs
```

## Best Practices

### 1. Let LSP Index First

On large projects:
```bash
# First time in a project
/code-intelligence Index the codebase

# Wait for completion, then:
/ultrathink [your question]
```

### 2. Use LSP for Refactoring

Before big refactors:
```bash
/code-intelligence Find all references to [symbol]

# Review scope, then:
/plan-mode Refactor [feature]
```

### 3. Combine with Search

```bash
# Broad search first
grep -r "TODO" .

# Then use LSP for specifics
/code-intelligence Go to definition of each TODO item
```

### 4. Trust LSP Over Text Search

```
❌ grep "UserService" → Finds comments, strings, etc.
✅ LSP find references → Only actual code usage
```

## Integration Details

### With Ultrathink

Ultrathink automatically uses LSP for:
- ✅ Finding function definitions
- ✅ Analyzing call patterns
- ✅ Understanding dependencies
- ✅ Type analysis
- ✅ Impact assessment

### With Plan Mode

Plan Mode automatically uses LSP for:
- ✅ Accurate file lists
- ✅ Dependency mapping
- ✅ Identifying affected code
- ✅ Better milestone creation
- ✅ Risk assessment

### Standalone

You can also use directly:
```bash
/code-intelligence [query]
```

## Configuration

### Enable/Disable LSP

In Codex config:
```toml
[code_intelligence]
enabled = true

# Specific languages
[code_intelligence.languages]
typescript = true
python = true
go = true
```

### Custom LSP Servers

```toml
[lsp_servers]
typescript = "typescript-language-server --stdio"
python = "pyright-langserver --stdio"
```

### Exclude Directories

```toml
[code_intelligence]
exclude = ["node_modules", ".git", "dist", "build"]
```

## FAQ

**Q: Do I need to install anything?**
A: Yes, LSP servers for your languages. See Installation section.

**Q: Will this slow down Codex?**
A: First use requires indexing (30-60 sec), then it's fast.

**Q: Can I use without installing LSP servers?**
A: Yes, skills will fall back to text search, but less accurate.

**Q: Which LSP server is best?**
A: Use the recommended one for your language (see Supported Languages).

**Q: Does this work for all languages?**
A: LSP servers exist for most popular languages. Check Supported Languages.

**Q: How much memory does LSP use?**
A: Varies by language and project size. ~100-500 MB per LSP server.

## Next Steps

1. **Install LSP servers** for your languages
2. **Try it out** with ultrathink or plan mode
3. **See the difference** in analysis quality
4. **Use standalone** for code exploration

---

**Code Intelligence makes your Codex skills smarter and more accurate!** 🔍💡
