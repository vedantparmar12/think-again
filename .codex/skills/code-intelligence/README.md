# Code Intelligence Skill v1.3.0

**Advanced LSP 3.17 Integration for Deep Code Analysis**

## 🎉 What's New in v1.3.0

This release adds **5 cutting-edge LSP 3.17 capabilities** that transform code analysis:

1. **Inlay Hints** ⭐⭐⭐⭐⭐ - Display types inline without modifying code
2. **Code Lens** ⭐⭐⭐⭐⭐ - Show references, tests, and metrics inline
3. **Type Hierarchy** ⭐⭐⭐⭐⭐ - Visualize inheritance trees
4. **Semantic Tokens** ⭐⭐⭐⭐⭐ - Smart code classification beyond syntax
5. **Folding Ranges** ⭐⭐⭐⭐ - Analyze code structure and complexity

**These features enhance ALL 9 Codex skills!**

---

## Quick Start

```bash
# Use automatically with any skill
/ultrathink Why is this function slow?
/code-review src/services/
/bug-hunter "Function returns undefined"
/refactor-assistant analyze src/

# Or invoke directly
/code-intelligence Show type hierarchy for UserService
```

LSP 3.17 features are **automatically available** - no configuration needed!

---

## Core LSP Capabilities

### 1. Go to Definition
Find where symbols are defined instantly.

### 2. Find All References
See everywhere a symbol is used in the codebase.

### 3. Hover Information
Get type signatures and documentation inline.

### 4. Symbol Search
Find classes, functions, and variables across the workspace.

### 5. Call Hierarchy
Understand what calls a function and what it calls.

---

## 🆕 Advanced LSP 3.17 Features

### 1. Inlay Hints ⭐⭐⭐⭐⭐

**See types inline without modifying source files!**

#### What It Does

Displays parameter names, variable types, and return types directly in the code view.

#### Example

**Before:**
```javascript
function calculate(amount, rate) {
  const result = amount * rate;
  return result;
}
```

**With Inlay Hints:**
```javascript
function calculate(amount: number, rate: number): number {
  const result: number = amount * rate;
  return result;
}
```

The `: number` annotations are displayed inline but **aren't in the actual file**!

#### Benefits

- ✅ Understand types without jumping to definitions
- ✅ See parameter names at call sites
- ✅ Identify type mismatches instantly
- ✅ No source file modifications needed

#### Supported Languages

TypeScript/JavaScript (excellent), Rust (excellent), Go (good), Python (requires Pylance), Java, C++, C# (good)

---

### 2. Code Lens ⭐⭐⭐⭐⭐

**Show actionable metrics above code elements!**

#### Example

```javascript
// 23 references | 5 tests ✅ | Last modified: 2 days ago
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// 8 references | No tests ⚠️ | Last modified: 5 months ago
function validateOrder(order) {
  if (!order.items) throw new Error('No items');
}
```

#### Information Shown

- **Reference count** - How many places use this
- **Test status** - Test coverage
- **Documentation status** - Is it documented?
- **Git info** - Last modification date
- **Complexity** - Code complexity metrics

#### Use Cases

✅ Instant impact analysis before refactoring
✅ Identify untested code
✅ Track code age and maintenance status
✅ Assess refactoring safety

#### Supported Languages

All 40+ languages (universal support)

---

### 3. Type Hierarchy ⭐⭐⭐⭐⭐

**Visualize complete inheritance trees!**

#### Example

```
📊 Type Hierarchy for UserService

UserService (src/services/UserService.js)
├─ ↑ Extends: BaseService (src/base/BaseService.js)
│  └─ ↑ Implements: IService (src/interfaces/IService.ts)
│
└─ ↓ Extended by (Subtypes):
   ├─ AdminUserService (src/admin/AdminUserService.js)
   │  └─ Used in 12 files
   ├─ GuestUserService (src/guest/GuestUserService.js)
   │  └─ Used in 8 files
   └─ PremiumUserService (src/premium/PremiumUserService.js)
      └─ Used in 15 files

⚠️ IMPACT: Changing UserService affects 3 subclasses and 35 total files
```

#### Benefits

✅ Understand inheritance structure
✅ Safe refactoring of base classes
✅ Identify Liskov Substitution violations
✅ Map complete type relationships

#### Supported Languages

TypeScript/JavaScript, Java, C#, Python (excellent), Go (interfaces), Rust (traits), C++ (inheritance)

---

### 4. Semantic Tokens ⭐⭐⭐⭐⭐

**Smart code classification beyond syntax highlighting!**

#### Example

```javascript
// Semantic classification visible
const API_KEY = process.env.API_KEY;  // [constant] [global] [readonly]
let counter = 0;                       // [mutable] [global] [number]
var total = 100;                       // [mutable] [global] [deprecated-var]

function process() {                   // [function] [exported]
  counter++;                           // [mutable-write] [global]
  total = total + counter;             // [mutable-write] [mutable-read]
}

class UserService {                    // [class] [exported]
  private db;                          // [property] [private]

  async fetchUser(id) {                // [method] [async] [public]
    return this.db.find(id);           // [property-read] [method-call]
  }
}
```

#### Token Types Identified

- **Types:** namespace, class, enum, interface, struct
- **Members:** typeParameter, parameter, variable, property
- **Functions:** function, method, macro
- **Modifiers:** readonly, static, deprecated, async, public, private

#### Benefits

✅ Identify mutable vs immutable variables
✅ Detect deprecated API usage
✅ Find global state
✅ Understand visibility (public/private)
✅ Spot async functions

#### Use Cases

✅ Find all mutable global variables (security)
✅ Identify deprecated API usage (maintainability)
✅ Detect race condition risks
✅ Audit visibility and access control

#### Supported Languages

All 40+ languages (universal support)

---

### 5. Folding Ranges ⭐⭐⭐⭐

**Analyze code structure and complexity!**

#### Example

```
📊 Code Structure for processCheckout()

function processCheckout (lines 1-145, 145 lines total) [VERY COMPLEX]
├─ validateCart (lines 5-32, 28 lines) ⚠️ EXTRACT RECOMMENDED
│  ├─ validateItems (lines 7-15, 9 lines)
│  ├─ validateStock (lines 17-24, 8 lines)
│  └─ validatePrices (lines 26-31, 6 lines)
│
├─ calculateTotals (lines 34-67, 34 lines) 🔴 MUST EXTRACT
│  ├─ calculateSubtotal (lines 36-45, 10 lines)
│  ├─ calculateTax (lines 47-54, 8 lines)
│  ├─ calculateShipping (lines 56-61, 6 lines)
│  └─ applyDiscounts (lines 63-66, 4 lines)

🎯 Refactoring Recommendations:
1. Extract calculateTotals (34 lines → 4 function calls)
2. Extract processPayment (30 lines → 3 function calls)

Result: 145 lines → 35 lines + 4 extracted functions
Complexity: 23 → 4 (Excellent!)
```

#### Benefits

✅ Identify extract-method opportunities
✅ Measure code complexity automatically
✅ Understand nesting depth
✅ Find overly complex functions

#### Supported Languages

All 40+ languages (universal support)

---

## Integration with Skills

### With code-review

```bash
/code-review src/services/UserService.js

📊 Code Review with Advanced LSP

🔍 Code Lens Analysis:
- calculateTotal: 23 refs | 5 tests ✅
- validateOrder: 8 refs | NO TESTS ⚠️

🎯 Inlay Hints Analysis:
- Found 3 type mismatches
- Line 45: expects string, receives number

📊 Type Hierarchy Impact:
- UserService has 3 subclasses
- Changes affect 35 files

🧬 Semantic Tokens Analysis:
- Found 2 mutable global variables ⚠️
- counter: modified in 5 locations (race condition risk)

📐 Folding Ranges Analysis:
- processOrder: 145 lines (complexity: 23) 🔴 VERY COMPLEX
```

---

### With bug-hunter

```bash
/bug-hunter "calculateTotal returns NaN"

🐛 Bug Hunter with Advanced LSP

🔍 Inlay Hints:
function calculateTotal(items: Item[]): number {
  return items.reduce((sum: number, item: Item): number =>
    sum + item.price, 0
  );
}

❌ Found: item.price might be undefined!

🔍 Semantic Tokens:
- item.price: [property-read] [possibly-undefined]

🎯 Root Cause:
API returns incomplete item objects (missing price field)
sum + undefined = NaN

💡 Fix: sum + (item.price || 0)
```

---

### With refactor-assistant

```bash
/refactor-assistant analyze src/UserService.js

📊 Type Hierarchy:
UserService → 3 subclasses → 35 total files affected

🔍 Code Lens:
- login(): 23 references
- verifyToken(): 45 references ⚠️ CRITICAL

📐 Complexity:
- login(): 45 lines (complexity: 12) ⚠️ EXTRACT
- verifyToken(): 78 lines (complexity: 18) 🔴 MUST REFACTOR

🎯 Recommendations:
1. Extract login() into 3 methods (45 lines → 15 lines)
2. Extract verifyToken() into 5 methods (78 lines → 20 lines)
```

---

### With test-generator

```bash
/test-generator src/services/PaymentService.js

🔍 Inlay Hints - Type Information:
function processPayment(amount: number, card: Card): Promise<Transaction>

📊 Semantic Tokens - Test Scenarios:
- amount: [parameter] [number] → Test: positive, zero, negative, decimal
- card: [parameter] [object] → Test: valid, invalid, null

🎯 Generated 6 comprehensive test cases from LSP analysis!
```

---

### With doc-generator

```bash
/doc-generator --api src/services/UserService.js

📝 Generated Documentation:

#### findById

```typescript
async findById(id: string): Promise<User | null>
```

**Usage:** 23 references across 8 files ← (from Code Lens!)
**Visibility:** public ← (from Semantic Tokens!)
```

---

### With ultrathink

```bash
/ultrathink Why is this code slow?

🔍 Code Lens: loadUserDashboard() → 45 references (hot path!)

🔍 Inlay Hints:
function loadUserDashboard(userId: string): Promise<Dashboard> {
  const user: Promise<User> = fetchUser(userId);  // Not awaited!
  const posts: Promise<Post[]> = fetchPosts(userId);
  return { user, posts };
}

🔍 Semantic Tokens:
- fetchUser(): [async-function] [returns-promise]
- No await keywords detected!

🎯 Root Cause: Missing await → returning Promises instead of values
💡 Solution: await Promise.all([fetchUser(), fetchPosts()])
Result: 450ms → 200ms (55% faster!)
```

---

### With plan-mode

```bash
/plan-mode Refactor authentication to use JWT

🔍 Type Hierarchy:
AuthService → Used by 15 controllers (68 references)

🔍 Code Lens:
- verifyToken(): 45 references ⚠️ CRITICAL

🔍 Folding Ranges:
AuthService (245 lines) [COMPLEX]
├─ Session methods (76 lines) → REMOVE
├─ Token methods (57 lines) → MODIFY
└─ User methods (88 lines) → KEEP

🎯 Plan: 28 files to modify, 68 references to update
✅ Created with EXACT counts from LSP!
```

---

## Language Support

### Full Support (All 10 Features)

| Language | Hints | Lens | Hierarchy | Semantic | Folding |
|----------|-------|------|-----------|----------|---------|
| TypeScript | ✅ | ✅ | ✅ | ✅ | ✅ |
| JavaScript | ⚠️ | ✅ | ⚠️ | ✅ | ✅ |
| Rust | ✅ | ✅ | ✅ | ✅ | ✅ |
| Go | ✅ | ✅ | ✅ | ✅ | ✅ |
| Java | ✅ | ✅ | ✅ | ✅ | ✅ |
| C# | ✅ | ✅ | ✅ | ✅ | ✅ |
| Python | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| C++ | ✅ | ✅ | ✅ | ✅ | ✅ |

✅ = Full support | ⚠️ = Partial support

**Plus 32 more languages!** See [LANGUAGE_SUPPORT.md](../LANGUAGE_SUPPORT.md)

---

## Installation

### Prerequisites

Install LSP servers for your languages:

#### TypeScript/JavaScript
```bash
npm install -g typescript-language-server typescript
```

#### Python
```bash
pip install pyright
```

#### Rust
```bash
rustup component add rust-analyzer
```

#### Go
```bash
go install golang.org/x/tools/gopls@latest
```

#### Java
Download from: https://download.eclipse.org/jdtls/snapshots/

#### C#
```bash
dotnet tool install -g csharp-ls
```

#### C++
```bash
# macOS
brew install llvm

# Ubuntu/Debian
sudo apt install clangd

# Windows
choco install llvm
```

See [LANGUAGE_SUPPORT.md](../LANGUAGE_SUPPORT.md) for all 40+ languages.

---

## Configuration

```yaml
# .codex/config.yml

lsp:
  inlayHints:
    enabled: true
    showParameterNames: true
    showVariableTypes: true
    showFunctionReturnTypes: true

  codeLens:
    enabled: true
    showReferences: true
    showTests: true
    showGitInfo: false

  typeHierarchy:
    enabled: true
    maxDepth: 10

  semanticTokens:
    enabled: true
    highlightDeprecated: true
    highlightMutable: true

  foldingRanges:
    enabled: true
    maxComplexity: 10
```

---

## Performance

### Automatic Optimization

- **Inlay Hints** - Cached per file, invalidated on edit
- **Code Lens** - Cached for 60 seconds, lazy resolved
- **Type Hierarchy** - Cached per type (rarely changes)
- **Semantic Tokens** - Incremental updates (delta)
- **Folding Ranges** - Cached per file structure

### Performance Tips

- ✅ First request may be slower (LSP indexing)
- ✅ Subsequent requests are instant (cached)
- ✅ Large files work on visible range only
- ✅ Very large codebases may take 30-60s to index

---

## Troubleshooting

### Inlay hints not showing

**Cause:** Language server doesn't support LSP 3.17

**Solution:**
```bash
npm update -g typescript-language-server  # TypeScript
pip install --upgrade pyright  # Python
```

### Code lens shows "0 references"

**Cause:** LSP indexing not complete

**Solution:** Wait 30 seconds for indexing, then retry

### Type hierarchy empty

**Cause:** No inheritance in selected type

**Solution:** Normal for non-class types (functions, primitives)

### Performance is slow

**Cause:** Large codebase indexing

**Solution:** Wait for initial indexing (30-60 seconds one-time)

---

## Best Practices

### 1. Use Inlay Hints for Understanding
```
1. Enable inlay hints
2. See all types inline
3. Understand data flow
4. Make changes confidently
```

### 2. Check Code Lens Before Refactoring
```
1. See reference count
2. Check test coverage
3. Assess impact
4. Plan refactoring
```

### 3. Use Type Hierarchy for Safe Changes
```
1. Check for subclasses
2. Understand inheritance
3. Verify Liskov Substitution
4. Refactor safely
```

### 4. Leverage Semantic Tokens
```
1. Find mutable state
2. Identify deprecated APIs
3. Spot global variables
4. Understand visibility
```

### 5. Use Folding Ranges for Complexity
```
1. Analyze structure
2. Identify complex functions
3. Plan extractions
4. Simplify code
```

---

## Comparison: Before vs After

### Before v1.3.0

```javascript
// Just plain code
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Questions:
// - What are the types?
// - How many places use this?
// - Is it tested?
// → Must search manually
```

### After v1.3.0

```javascript
// 23 references | 5 tests ✅ | Last modified: 2 days ago
function calculateTotal(items: Item[]): number {
  return items.reduce((sum: number, item: Item): number =>
    sum + (item.price || 0), 0
  );
}

// All questions answered instantly:
// ✅ Types shown inline
// ✅ 23 references visible
// ✅ 5 tests cover it
// ✅ Fixed undefined bug
```

---

## FAQ

**Q: Do I need to configure anything?**
A: No! LSP 3.17 features work automatically if you have LSP servers installed.

**Q: Which feature should I try first?**
A: Start with **Code Lens** - instant value by showing references and test coverage.

**Q: Does this work with my language?**
A: Check the Language Support Matrix above. Most popular languages have full support!

**Q: Is this slower than v1.2.0?**
A: No! All features use intelligent caching.

**Q: Can I disable specific features?**
A: Yes! See Configuration section.

---

## Version History

- **v1.3.0** (January 2026) - Added 5 advanced LSP 3.17 features
- **v1.2.0** (December 2025) - Integration with 5 new quality skills
- **v1.1.0** (November 2025) - Expanded to 40+ languages
- **v1.0.0** (October 2025) - Initial LSP integration

---

**The most powerful code intelligence system in any AI coding tool!** 🚀

**LSP 3.17 features are automatically available in all 9 skills!** ✨
