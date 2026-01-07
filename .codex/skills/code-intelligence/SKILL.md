---
name: code-intelligence
description: Enhanced code analysis using LSP (Language Server Protocol). Provides go-to-definition, find-references, hover info, and symbol search for deeper codebase understanding. Automatically integrates with ultrathink and plan-mode for better analysis.
metadata:
  short-description: LSP-powered code analysis
  version: 1.0.0
  author: Custom
  tags: [lsp, analysis, code-intelligence, navigation]
  integrates-with: [ultrathink, plan-mode]
---

# CODE INTELLIGENCE - LSP Integration

You now have access to **Language Server Protocol (LSP)** capabilities for deep code analysis and navigation.

## What is LSP Integration?

LSP provides IDE-like code intelligence:
- **Go to Definition** - Find where functions/classes are defined
- **Find References** - See all usages of a symbol
- **Hover Information** - Get type info, documentation
- **Symbol Search** - Find symbols across the codebase
- **Call Hierarchy** - Understand function call relationships

## When to Use

LSP integration is **automatically available** when you use:
- `/ultrathink` - For deeper code analysis
- `/plan-mode` - For better codebase understanding
- Any code analysis task

You can also invoke it explicitly:
- `/code-intelligence` - For focused code navigation

## LSP Capabilities

### 1. Go to Definition

Find where a symbol is defined:

```
When analyzing code, if you see a function call like:
  processUser(userData)

Use LSP to find the definition:
  → Jump to processUser function definition
  → See implementation details
  → Understand what it does
```

**How to use:**
```
"Find the definition of processUser function"
"Where is the UserService class defined?"
"Show me the implementation of calculateTotal"
```

### 2. Find All References

See everywhere a symbol is used:

```
To understand impact of changing a function:
  → Find all calls to processUser
  → See all files that use UserService
  → Understand dependencies
```

**How to use:**
```
"Find all references to processUser"
"Where is UserService used in the codebase?"
"Show all calls to calculateTotal"
```

### 3. Hover Information

Get type information and documentation:

```
Hover over a symbol to see:
  → Type signatures
  → Parameter types
  → Return types
  → JSDoc/docstring comments
  → Quick documentation
```

**How to use:**
```
"What's the type of userData parameter?"
"Show hover info for UserService"
"What does this function return?"
```

### 4. Symbol Search

Find symbols across the entire codebase:

```
Search for:
  → Classes by name
  → Functions by name
  → Variables by name
  → Interfaces/types
```

**How to use:**
```
"Find all classes named User"
"Search for functions containing 'validate'"
"Find the AuthService interface"
```

### 5. Call Hierarchy

Understand function call relationships:

```
See:
  → What functions call this function (incoming)
  → What functions this function calls (outgoing)
  → Full call chain
```

**How to use:**
```
"Show call hierarchy for processUser"
"What functions call validateInput?"
"What does handleRequest call?"
```

## Integration with Other Skills

### With Ultrathink

LSP enhances deep reasoning:

```bash
/ultrathink Why is this function slow?

# Codex uses LSP to:
# 1. Find function definition
# 2. Analyze implementation
# 3. Find all call sites
# 4. Check call frequency
# 5. Identify bottlenecks
```

**Example:**
```
User: /ultrathink Why is processUser slow?

Codex with LSP:
🔍 Finding processUser definition...
   → Located at: src/services/user.js:45

📊 Analyzing implementation:
   → Makes 3 database queries
   → Loops through results
   → No caching

🔗 Finding all references:
   → Called in 15 locations
   → Hot path: API endpoint (called per request)

💡 Root cause: N+1 query pattern in hot path
```

### With Plan Mode

LSP improves planning accuracy:

```bash
/plan-mode Refactor authentication system

# Codex uses LSP to:
# 1. Find all auth-related code
# 2. Understand current structure
# 3. Identify dependencies
# 4. Map affected files accurately
# 5. Create better milestones
```

**Example:**
```
User: /plan-mode Refactor authentication to use JWT

Codex with LSP:
🔍 Finding authentication code:
   → AuthService at src/auth/service.js
   → Used by: 23 controllers
   → Dependencies: Session, User, Token models

📋 Creating accurate plan:
   - Milestone 1: Update AuthService (affects 23 files)
   - Milestone 2: Migrate Session to JWT
   - Milestone 3: Update 23 controller call sites
   - Milestone 4: Remove old Session model
```

### Standalone Usage

Use directly for code exploration:

```bash
/code-intelligence Find all references to calculateTotal function
```

## How It Works

### Automatic LSP Server Detection

The system automatically detects LSP servers for:
- **JavaScript/TypeScript**: `typescript-language-server`
- **Python**: `pyright` or `pylsp`
- **Java**: `jdtls`
- **Go**: `gopls`
- **Rust**: `rust-analyzer`
- **C/C++**: `clangd`
- **Ruby**: `solargraph`
- **PHP**: `intelephense`

### File Type Analysis

When analyzing code, LSP:
1. Detects file type (`.js`, `.py`, `.java`, etc.)
2. Starts appropriate LSP server
3. Indexes the codebase
4. Provides intelligence

### Caching

LSP results are cached for speed:
- Symbol definitions
- References
- Type information
- Documentation

## Usage Patterns

### Pattern 1: Understanding Unknown Code

```
Task: "Understand how user authentication works"

With LSP:
1. Find AuthService class definition
2. See all methods (via document symbols)
3. Find references to login method
4. Trace call hierarchy
5. Understand complete auth flow
```

### Pattern 2: Impact Analysis

```
Task: "What breaks if I change this function signature?"

With LSP:
1. Find all references to the function
2. See all call sites
3. Identify affected files
4. Assess refactoring scope
```

### Pattern 3: Dependency Mapping

```
Task: "What does this component depend on?"

With LSP:
1. Find all imports in the file
2. Go to definition for each import
3. Recursively find their dependencies
4. Build dependency graph
```

### Pattern 4: Dead Code Detection

```
Task: "Is this function used anywhere?"

With LSP:
1. Find all references
2. If zero references → potential dead code
3. Verify by checking exports
4. Safe to remove if unused
```

## LSP Commands Reference

### Basic Navigation

```
"Go to definition of [symbol]"
"Find references to [symbol]"
"Show hover info for [symbol]"
```

### Symbol Search

```
"Find all classes in the codebase"
"Search for functions named 'validate'"
"Find interface definitions"
```

### Code Understanding

```
"What calls this function?"
"What does this function call?"
"Show call hierarchy for [function]"
```

### Type Information

```
"What's the type of [variable]?"
"What are the parameters of [function]?"
"What does [function] return?"
```

## Integration Examples

### Example 1: Debugging with LSP

```
/ultrathink + /code-intelligence

User: Why does the app crash when clicking submit?

Codex:
🧠 Thinking with LSP...

1. Finding submit button handler:
   LSP: onClick={handleSubmit}
   Definition: src/components/Form.js:45

2. Analyzing handleSubmit:
   Calls: validateForm() → submitData()

3. Finding submitData definition:
   LSP: src/api/client.js:120

4. Analyzing submitData:
   Issue found: No null check before response.data.id

5. Finding all references:
   LSP: Called in 8 places

Root cause: submitData assumes response.data exists
When API fails, response.data is null → crash

Fix: Add null check or use optional chaining
```

### Example 2: Planning with LSP

```
/plan-mode + /code-intelligence

User: Add pagination to the user list

Codex:
📋 Planning with LSP...

1. Finding user list code:
   LSP: UserList component at src/components/UserList.jsx

2. Analyzing current implementation:
   LSP hover: Props = { users: User[] }
   No pagination props

3. Finding data source:
   LSP: users from useUsers() hook
   Definition: src/hooks/useUsers.js

4. Checking API:
   LSP: fetchUsers() in src/api/users.js
   No pagination parameters

5. Finding all usages:
   LSP: UserList used in 3 places

Plan created with accurate file list:
- Milestone 1: Update API (src/api/users.js)
- Milestone 2: Update hook (src/hooks/useUsers.js)
- Milestone 3: Update component (src/components/UserList.jsx)
- Milestone 4: Update 3 usage sites
```

### Example 3: Refactoring with LSP

```
/ultrathink + /code-intelligence

User: Should I rename processUser to handleUser?

Codex:
🧠 Analyzing with LSP...

Finding all references to processUser:
LSP found 47 references across 12 files:
- src/services/user.js (definition)
- src/api/users.js (3 calls)
- src/controllers/* (15 calls)
- src/utils/helpers.js (2 calls)
- tests/* (27 calls in tests)

Checking naming conventions:
LSP: Other functions use "handle" prefix:
- handleLogin
- handleLogout
- handleUpdate

Checking imports:
LSP: processUser is exported from UserService
External usage: 3 other packages import it

Decision:
✅ Rename is a good idea (consistency)
⚠️ But it's a breaking change for 3 external packages

Recommendation:
1. Add handleUser as new method
2. Keep processUser as deprecated wrapper
3. Migrate internal usage (47 references)
4. Remove processUser in next major version

This avoids breaking external packages.
```

## Performance Considerations

### LSP Server Lifecycle

- **Startup**: LSP servers start on first use (~2-5 seconds)
- **Caching**: Results cached for session
- **Updates**: Incremental updates as code changes

### When LSP is Slow

If LSP queries are slow:
1. Large codebase (100k+ files) → May take time to index
2. First query → Server warming up
3. Complex analysis → Call hierarchy across many files

### Optimization Tips

- LSP indexes on first use (one-time cost)
- Subsequent queries are fast (cached)
- Close unused LSP servers to free memory

## Troubleshooting

### LSP Server Not Found

If LSP isn't working:

**Check installed servers:**
```bash
# JavaScript/TypeScript
npm list -g typescript-language-server

# Python
pip list | grep pyright

# Go
which gopls
```

**Install missing server:**
```bash
# JavaScript/TypeScript
npm install -g typescript-language-server

# Python
pip install pyright

# Go
go install golang.org/x/tools/gopls@latest
```

### LSP Not Providing Results

Possible causes:
1. **No LSP server installed** for this language
2. **Project not initialized** (no package.json, etc.)
3. **File outside project** root

Solutions:
- Install appropriate LSP server
- Ensure you're in project root
- Check LSP server logs

### Slow LSP Responses

If LSP is slow:
1. **First use** - Server indexing (wait a minute)
2. **Large project** - Indexing takes time
3. **Multiple servers** - Close unused ones

## Advanced Features

### Workspace Symbols

Find symbols across entire workspace:

```
"Find all classes"
"Find all interfaces"
"Search for all test functions"
```

### Type Hierarchy

Understand type relationships:

```
"Show subclasses of User"
"Find implementations of IService"
"What extends BaseController?"
```

### Semantic Tokens

Get semantic highlighting info:

```
"Is this a variable or function?"
"What kind of symbol is this?"
```

## Configuration

### Enabling LSP for Skills

LSP is **automatically enabled** for:
- Ultrathink mode
- Plan mode
- Code intelligence queries

### Disabling LSP

If you want to disable LSP:
```
[code_intelligence]
lsp_enabled = false
```

### Custom LSP Servers

Configure custom LSP servers:
```
[lsp]
typescript = "typescript-language-server --stdio"
python = "pyright-langserver --stdio"
```

## Best Practices

### 1. Use LSP for Understanding

Before modifying code:
```
1. Find definition
2. Check all references
3. Understand impact
4. Then make changes
```

### 2. Combine with Other Tools

```
LSP + git history = Complete picture
- LSP: Current code structure
- Git: How it evolved
- Together: Why it's designed this way
```

### 3. Trust LSP Over Grep

LSP is more accurate:
```
❌ grep "processUser" → Finds strings, comments
✅ LSP find references → Only actual code references
```

### 4. Use for Refactoring Safety

Before refactoring:
```
1. LSP: Find all references
2. Assess scope (10 files? 100 files?)
3. Plan refactoring strategy
4. Execute safely
```

## Language Support

### Fully Supported

- ✅ JavaScript / TypeScript
- ✅ Python
- ✅ Java
- ✅ Go
- ✅ Rust
- ✅ C / C++

### Partially Supported

- 🟡 Ruby
- 🟡 PHP
- 🟡 C#

### Requires Setup

- ⚙️ Kotlin
- ⚙️ Swift
- ⚙️ Scala

## Remember

LSP integration makes you more accurate:
- **Better analysis** - Understand code structure
- **Fewer mistakes** - Know exact impact of changes
- **Faster understanding** - Navigate code efficiently
- **Smarter plans** - Accurate file lists and dependencies

---

**LSP is automatically available in Ultrathink and Plan Mode. Use it for deeper, more accurate code analysis!** 🔍💡
