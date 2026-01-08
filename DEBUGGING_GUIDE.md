# Debugging Guide - v2.0.0

**Complete guide to live debugging with Debug Adapter Protocol (DAP)**

---

## Overview

v2.0.0 introduces professional live debugging capabilities via the Debug Adapter Protocol (DAP). This guide walks you through:
1. Understanding DAP debugging
2. Installing debug adapters
3. Configuration for your language
4. Using breakpoints, watches, and step execution
5. Advanced debugging workflows
6. Troubleshooting

---

## What is DAP Debugging?

**Debug Adapter Protocol (DAP)** is a standardized protocol that enables:
- **Breakpoints**: Pause execution at specific lines
- **Step execution**: Step over/into/out of functions
- **Variable inspection**: See exact values at any point
- **Watch expressions**: Monitor variables continuously
- **Call stack**: View complete execution path
- **Debug console**: Execute code in debug context

**vs Console.log Debugging:**

| Feature | console.log | DAP Debugging |
|---------|-------------|---------------|
| See variable values | ✅ Manual | ✅ Automatic |
| Pause execution | ❌ No | ✅ Yes |
| Step through code | ❌ No | ✅ Yes |
| Conditional breaks | ❌ No | ✅ Yes |
| Performance impact | 🔴 High | 🟢 Low |
| Time to find bug | 🔴 Hours | 🟢 Minutes |

---

## Quick Start

### Step 1: Check if Debugger is Available

```bash
# Start Codex
codex

# Try debugging
/bug-hunter "API returns 500 error"

# If debugger works, you'll see:
🐛 Bug Hunter with Live Debugging:
✅ Debugger available for Python
⏸ Setting breakpoint...

# If debugger not available, you'll see:
⚠️ Debugger not available for this language
📝 Using static analysis instead...
```

### Step 2: Install Debug Adapter (if needed)

See language-specific sections below for installation instructions.

---

## Language Support

### Python - debugpy ⭐⭐⭐⭐⭐

**Best support, recommended for Python development**

#### Installation

```bash
# Install debugpy
pip install debugpy

# Verify installation
python -c "import debugpy; print(debugpy.__version__)"
# Should show version (e.g., 1.8.0)
```

#### Configuration

```yaml
# ~/.codex/config/dap.yml
debug_adapters:
  python:
    type: debugpy
    port: 5678
    host: localhost
    justMyCode: false  # Debug into libraries
    showReturnValue: true
```

#### Example Usage

```bash
/bug-hunter "Function crashes with TypeError"

🐛 Bug Hunter:
Step 1: Setting breakpoint in calculate_total()
✅ Breakpoint set: src/calculator.py:15

Step 2: Running program...
⏸ Breakpoint hit!

Step 3: Variables:
  items = [{'price': 10, 'qty': 2}, {'price': None, 'qty': 1}]
  total = 20
  item = {'price': None, 'qty': 1}  ❌ PROBLEM!

Step 4: Stepping to next line...
Line 16: total += item['price'] * item['qty']
         ^^^^^^^^^^^^^^^^^^^^^^
         TypeError: unsupported operand type(s) for *: 'NoneType' and 'int'

🎯 Root Cause: Missing null check for price
💡 Fix: Add validation before multiplication
```

---

### JavaScript/TypeScript - js-debug ⭐⭐⭐⭐⭐

**Excellent support for Node.js and browser debugging**

#### Installation

```bash
# js-debug comes with VS Code, or install standalone:
npm install -g js-debug

# For Node.js debugging, no additional setup needed
# Node has built-in debugger support
```

#### Configuration

```yaml
# ~/.codex/config/dap.yml
debug_adapters:
  javascript:
    type: js-debug
    port: 9229
    sourceMaps: true  # Enable for TypeScript
    skipFiles:
      - "<node_internals>/**"
      - "node_modules/**"

  typescript:
    type: js-debug
    port: 9229
    sourceMaps: true
    outFiles: ["${workspaceFolder}/dist/**/*.js"]
```

#### Example Usage (Node.js)

```bash
/bug-hunter "Server crashes on POST request"

🐛 Bug Hunter:
Step 1: Setting breakpoint in handleRequest()
✅ Breakpoint set: src/server.js:42

Step 2: Starting server with debugger...
⏸ Breakpoint hit on POST /api/users!

Step 3: Request data:
  req.body = { name: "John", email: "invalid-email" }
  user = undefined
  errors = []

Step 4: Step into validation...
Line 45: const email = user.email.toLowerCase()
                       ^^^^^^^^^
         TypeError: Cannot read property 'email' of undefined

🎯 Root Cause: User object not created before validation
💡 Fix: Create user object from req.body first
```

#### Example Usage (TypeScript)

```bash
# Ensure tsconfig.json has source maps enabled
{
  "compilerOptions": {
    "sourceMap": true
  }
}

# Debug TypeScript (will map to .ts files)
/bug-hunter "Type error in authentication"
```

---

### Go - delve ⭐⭐⭐⭐⭐

**Excellent support for Go debugging**

#### Installation

```bash
# Install delve
go install github.com/go-delve/delve/cmd/dlv@latest

# Verify installation
dlv version
# Should show: Delve Debugger Version: 1.x.x
```

#### Configuration

```yaml
# ~/.codex/config/dap.yml
debug_adapters:
  go:
    type: delve
    port: 2345
    mode: debug  # or "test" for test debugging
    buildFlags: "-tags=integration"
```

#### Example Usage

```bash
/bug-hunter "Goroutine panic in handler"

🐛 Bug Hunter:
Step 1: Setting breakpoint in processRequest()
✅ Breakpoint set: main.go:67

Step 2: Running program...
⏸ Breakpoint hit!

Step 3: Goroutine state:
  goroutine 42:
    request = &Request{ID: "123", Data: map[]}
    ctx = context.Background()
    ch = nil  ❌ PROBLEM!

Step 4: Stepping to next line...
Line 68: result := <-ch
         ^^^^^^^^^^^^^
         panic: send on closed channel

🎯 Root Cause: Channel never initialized
💡 Fix: Initialize channel before use
```

---

### Rust - lldb ⭐⭐⭐⭐

**Good support via LLDB**

#### Installation

```bash
# Install LLDB (comes with LLVM)
# macOS: (pre-installed)
# Linux:
sudo apt install lldb

# Windows:
# Download from https://llvm.org/builds/

# Install rust-lldb helper
rustup component add lldb
```

#### Configuration

```yaml
# ~/.codex/config/dap.yml
debug_adapters:
  rust:
    type: lldb
    port: 13000
    sourceMap:
      "/rustc/*": "${env:HOME}/.rustup/toolchains/*/lib/rustlib/src/rust"
```

#### Example Usage

```bash
/bug-hunter "Panic in vector access"

🐛 Bug Hunter:
Step 1: Setting breakpoint in process_items()
✅ Breakpoint set: src/main.rs:45

Step 2: Running program...
⏸ Breakpoint hit!

Step 3: Variables:
  items = vec![1, 2, 3]
  index = 5  ❌ PROBLEM!

Step 4: Stepping to access...
Line 46: let value = items[index];
                     ^^^^^^^^^^^^
         panic: index out of bounds: len is 3 but index is 5

🎯 Root Cause: Index not validated
💡 Fix: Use items.get(index) or add bounds check
```

---

### Java - java-debug ⭐⭐⭐⭐

**Good support for Java debugging**

#### Installation

```bash
# Install Java Debug Server
# Download from: https://github.com/microsoft/java-debug

# Or use VS Code Java extension which includes it
```

#### Configuration

```yaml
# ~/.codex/config/dap.yml
debug_adapters:
  java:
    type: java-debug
    port: 5005
    mainClass: com.example.Main
    classPaths:
      - "${workspaceFolder}/target/classes"
      - "${workspaceFolder}/lib/*"
```

#### Example Usage

```bash
/bug-hunter "NullPointerException in service"

🐛 Bug Hunter:
Step 1: Setting breakpoint in getUserData()
✅ Breakpoint set: UserService.java:28

Step 2: Running application...
⏸ Breakpoint hit!

Step 3: Variables:
  userId = "123"
  user = null  ❌ PROBLEM!
  database = Database@4563

Step 4: Stepping through...
Line 29: return user.getName();
                ^^^^^^^^^^^^^^
         NullPointerException

🎯 Root Cause: User not found, missing null check
💡 Fix: Add Optional or null check
```

---

### C++ - lldb/gdb ⭐⭐⭐

**Fair support, works but requires more setup**

#### Installation

```bash
# LLDB (recommended for macOS)
# Comes with Xcode on macOS
# Linux:
sudo apt install lldb

# GDB (alternative, good for Linux)
sudo apt install gdb

# Windows: Use MinGW or WSL
```

#### Configuration

```yaml
# ~/.codex/config/dap.yml
debug_adapters:
  cpp:
    type: lldb  # or "gdb"
    port: 12345
    MIMode: lldb
    setupCommands:
      - text: "settings set target.process.stop-on-exec false"
```

#### Compilation (Important!)

```bash
# MUST compile with debug symbols
g++ -g -O0 main.cpp -o main

# Or in CMakeLists.txt:
set(CMAKE_BUILD_TYPE Debug)
```

---

### C# - netcoredbg ⭐⭐⭐⭐

**Good support for .NET Core**

#### Installation

```bash
# Install .NET SDK (includes debugger)
# Download from: https://dotnet.microsoft.com/download

# Or install netcoredbg separately
# https://github.com/Samsung/netcoredbg
```

#### Configuration

```yaml
# ~/.codex/config/dap.yml
debug_adapters:
  csharp:
    type: netcoredbg
    port: 4711
    program: "${workspaceFolder}/bin/Debug/net6.0/MyApp.dll"
```

---

## Advanced Debugging Features

### Conditional Breakpoints

**Break only when specific condition is true**

```yaml
# Example configuration
breakpoints:
  - file: src/api.js
    line: 45
    condition: "userId === '123'"  # Only break for this user

  - file: src/loop.py
    line: 12
    condition: "i > 100"  # Only break after 100 iterations

  - file: src/handler.go
    line: 67
    condition: "request.Method == 'POST'"  # Only break for POST
```

**Usage Example:**

```bash
/bug-hunter "Bug only happens for specific user"

🐛 Bug Hunter:
Step 1: Setting conditional breakpoint
✅ Breakpoint set: src/auth.js:23
   Condition: userId === 'problem-user-id'

Step 2: Running application...
(Normal requests pass through without stopping)

⏸ Breakpoint hit! (userId matches condition)

Step 3: Variables for problem user:
  userId = "problem-user-id"
  permissions = []  ❌ Empty!
  role = "admin"

🎯 Root Cause: Permissions not loaded for this user
```

### Watch Expressions

**Monitor variables continuously during execution**

```yaml
# Example watches
watches:
  - expression: "user.balance"
    name: "User Balance"

  - expression: "items.length"
    name: "Item Count"

  - expression: "Date.now() - startTime"
    name: "Elapsed Time (ms)"
```

**Usage Example:**

```bash
🐛 Bug Hunter with Watches:

📊 Watches:
  User Balance: $100.00
  Item Count: 3
  Elapsed Time: 45ms

⏸ Breakpoint hit at checkout()

📊 Watches (updated):
  User Balance: $100.00
  Item Count: 3
  Total Cost: $150.00  ❌ Exceeds balance!
  Elapsed Time: 87ms

🎯 Issue: No balance check before checkout
```

### Call Stack Inspection

**See complete execution path**

```bash
🐛 Bug Hunter:

Call Stack:
  1. main() - main.js:5
  2. startServer() - server.js:12
  3. handleRequest() - handler.js:45
  4. authenticate() - auth.js:23  ← Current
  5. validateToken() - auth.js:67
  6. decodeJWT() - jwt.js:34  ← Error originated here

🎯 Trace back to see how we got here
```

### Debug Console

**Execute code in debug context**

```bash
⏸ Breakpoint hit at: src/api.js:45

Debug Console:
> user
{ id: '123', name: 'John', email: 'john@example.com' }

> user.balance
100

> user.balance + 50
150

> validateBalance(user, 150)
false  ❌ Validation fails!

🎯 Test expressions interactively
```

---

## Common Debugging Workflows

### Workflow 1: Finding Crash Location

```bash
/bug-hunter "Application crashes randomly"

🐛 Bug Hunter Strategy:
1. Enable exception breakpoints (break on all errors)
2. Reproduce the crash
3. Examine call stack when crash occurs
4. Inspect variables at crash point
5. Step back through stack to find root cause
```

### Workflow 2: Tracing Data Flow

```bash
/bug-hunter "Wrong value in calculation"

🐛 Bug Hunter Strategy:
1. Set breakpoint at function start
2. Watch the variable that becomes wrong
3. Step through line by line
4. Identify exact line where value changes incorrectly
5. Fix the calculation
```

### Workflow 3: Finding Performance Bottleneck

```bash
/bug-hunter "Function is too slow"

🐛 Bug Hunter Strategy:
1. Set breakpoint at start and end of function
2. Add watch: "Date.now() - startTime"
3. Step through to find slow operations
4. Identify loops or blocking calls
5. Optimize hot path
```

### Workflow 4: Debugging Async Code

```bash
/bug-hunter "Promise never resolves"

🐛 Bug Hunter Strategy:
1. Set breakpoint in promise callback
2. Set breakpoint in error handler
3. Run and see which path executes
4. If neither hits, promise is lost
5. Add proper error handling
```

---

## Troubleshooting

### Issue: "Debugger failed to attach"

**Common causes:**

1. **Port already in use**
   ```bash
   # Check if port is in use
   # Windows:
   netstat -ano | findstr :5678

   # macOS/Linux:
   lsof -i :5678

   # Kill the process or use different port in config
   ```

2. **Debugger not installed**
   ```bash
   # Python
   pip install debugpy

   # Node.js (built-in, but check version)
   node --version  # Should be 12+

   # Go
   go install github.com/go-delve/delve/cmd/dlv@latest
   ```

3. **Firewall blocking connection**
   ```bash
   # Temporarily disable firewall to test
   # Or add exception for debugger port
   ```

### Issue: "Breakpoint not hit"

**Solutions:**

1. **Check file path matches**
   ```bash
   # Debugger looks for exact file path
   # If using transpiled code (TypeScript), ensure source maps enabled
   ```

2. **Code not executed**
   ```bash
   # Verify the code path is actually reached
   # Add console.log before breakpoint to confirm
   ```

3. **Optimized code**
   ```bash
   # Compile with debug flags
   # Python: No optimization needed
   # C++: gcc -g -O0
   # Rust: cargo build (debug mode default)
   ```

### Issue: "Variables show 'optimized out'"

**Solution:**
```bash
# Disable optimizations during debugging

# C++
g++ -g -O0 main.cpp

# Rust
cargo build --release  # DON'T use release mode for debugging
cargo build           # Use debug mode

# Go
go build -gcflags="all=-N -l"  # Disable optimizations
```

### Issue: "Source maps not working" (TypeScript/JavaScript)

**Solution:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "sourceMap": true,
    "inlineSourceMap": false,  // Use external source maps
    "outDir": "./dist"
  }
}
```

```yaml
# dap.yml
debug_adapters:
  typescript:
    sourceMaps: true
    outFiles: ["${workspaceFolder}/dist/**/*.js"]
```

### Issue: "Debugger too slow"

**Solutions:**

1. **Disable "Just My Code"**
   ```yaml
   # Only debug your code, skip libraries
   python:
     justMyCode: true
   ```

2. **Use fewer breakpoints**
   ```bash
   # Remove unnecessary breakpoints
   # Use conditional breakpoints to reduce hits
   ```

3. **Increase timeout**
   ```yaml
   debug_adapters:
     timeout: 30000  # 30 seconds
   ```

---

## Integration with Codex Skills

### bug-hunter Skill

```bash
/bug-hunter "Describe the issue"

# Automatically:
1. Analyzes code with LSP
2. Identifies likely error location
3. Sets breakpoints
4. Runs with debugger
5. Inspects variables
6. Suggests fix
```

### test-generator Skill

```bash
/test-generator src/utils.js

# With debugging:
1. Generates test cases
2. Runs tests with debugger attached
3. If test fails, shows exact failure point
4. Shows variable values at failure
5. Suggests test improvements
```

### ultrathink Skill

```bash
/ultrathink "How does this function work?"

# With debugging:
1. Sets breakpoint at function entry
2. Steps through execution
3. Shows variable changes
4. Explains each step
5. Provides comprehensive understanding
```

---

## Best Practices

### 1. Strategic Breakpoint Placement

```bash
✅ Good:
- Function entry points
- Before complex calculations
- Error handling blocks
- Loop conditions

❌ Avoid:
- Inside tight loops (use conditional breakpoints)
- Library code (use justMyCode)
- Getter/setter methods
```

### 2. Use Conditional Breakpoints

```bash
# Instead of:
for (let i = 0; i < 1000; i++) {
  // Breaking here 1000 times is slow
}

# Use:
Breakpoint at line with condition: i === 999
```

### 3. Watch Key Variables

```bash
# Add watches for:
- Input parameters
- Return values
- State changes
- Error indicators
```

### 4. Clean Up

```bash
# Remove breakpoints when done
# Don't commit debug configurations to git
# Use .gitignore for .vscode/launch.json
```

---

## Performance Comparison

### Before DAP (console.log debugging)

```javascript
function calculateTotal(items) {
  console.log('items:', items);  // Add log
  let total = 0;
  console.log('total:', total);  // Add log
  for (let item of items) {
    console.log('item:', item);  // Add log
    total += item.price * item.quantity;
    console.log('total after item:', total);  // Add log
  }
  console.log('final total:', total);  // Add log
  return total;
}

// Run, check logs, add more logs, run again...
// Time: 30-60 minutes to find bug
```

### After DAP (live debugging)

```javascript
function calculateTotal(items) {
  let total = 0;  // Set breakpoint here
  for (let item of items) {
    total += item.price * item.quantity;
  }
  return total;
}

// Run with debugger
// Inspect 'items', 'total', 'item' in real-time
// Step through to see exact problem
// Time: 2-5 minutes to find bug
```

**Result: 10x faster debugging!**

---

## Verification

### Test Debugging Setup

```bash
# Create test file
cat > test_debug.py << EOF
def calculate(a, b):
    result = a + b  # Set breakpoint here
    return result

print(calculate(5, 3))
EOF

# Debug with Codex
codex
/bug-hunter "Test debugging"

# Should see:
✅ Debugger available for Python
⏸ Breakpoint set: test_debug.py:2
⏸ Breakpoint hit!
📊 Variables: a=5, b=3, result=8
```

---

## Next Steps

Once debugging is working:

1. **Practice with bug-hunter:**
   ```bash
   /bug-hunter "Find any issue in my code"
   ```

2. **Debug tests:**
   ```bash
   /test-generator src/myfile.js
   # Run generated tests with debugger
   ```

3. **Learn your language's debugger:**
   - Python: https://docs.python.org/3/library/pdb.html
   - Node.js: https://nodejs.org/en/docs/guides/debugging-getting-started/
   - Go: https://github.com/go-delve/delve
   - Rust: https://rust-lang.github.io/rustup-components-history/

4. **Explore advanced features:**
   - Logpoints (log without stopping)
   - Hit count breakpoints
   - Data breakpoints (break on value change)

---

## Support

**Issues:**
- Configuration problems: Check this guide
- Debugger not attaching: See troubleshooting section
- GitHub issues: https://github.com/vedantparmar12/think-again/issues

**Community:**
- GitHub Discussions: https://github.com/vedantparmar12/think-again/discussions

---

**Ready to debug 10x faster! 🐛**
