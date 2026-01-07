---
name: code-intelligence
description: Enhanced code analysis using LSP 3.17 (Language Server Protocol). Provides go-to-definition, find-references, hover info, symbol search, PLUS inlay hints, code lens, type hierarchy, semantic tokens, and folding ranges for comprehensive code intelligence. Automatically integrates with all skills.
metadata:
  short-description: Advanced LSP-powered code analysis (LSP 3.17)
  version: 1.3.0
  author: Custom
  tags: [lsp, analysis, code-intelligence, navigation, inlay-hints, code-lens, type-hierarchy, semantic-tokens]
  integrates-with: [ultrathink, plan-mode, code-review, test-generator, bug-hunter, refactor-assistant, doc-generator]
---

# CODE INTELLIGENCE - Advanced LSP 3.17 Integration

## 🎉 NEW in v1.3.0: 5 Advanced LSP Capabilities!

You now have access to cutting-edge **Language Server Protocol 3.17** features:

### ✨ New Features
1. **Inlay Hints** - Display type information inline
2. **Code Lens** - Show references, tests, and metrics inline
3. **Type Hierarchy** - Visualize inheritance trees
4. **Semantic Tokens** - Smart code classification
5. **Folding Ranges** - Analyze code structure

These features dramatically improve code analysis for ALL 9 skills!

---

## Core LSP Capabilities (v1.0)

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

---

## 🆕 Advanced Features (LSP 3.17)

### 6. Inlay Hints ⭐⭐⭐⭐⭐

**Display type information inline without modifying code!**

Shows parameter names, types, and return values directly in the code view.

**Example:**

Before:
```javascript
function calculate(amount, rate) {
  const result = amount * rate;
  return result;
}
```

With Inlay Hints:
```javascript
function calculate(amount: number, rate: number): number {
  const result: number = amount * rate;
  return result;
}
```

The type annotations (`: number`) are displayed inline but aren't in the actual file!

**Benefits:**
- Understand types without jumping to definitions
- See parameter names at call sites
- Identify type mismatches instantly
- No need to modify source files

**Use cases:**
```
"Show type information for this function"
"Display parameter types inline"
"What are the inferred types here?"
```

**Supported languages:**
- ✅ TypeScript/JavaScript (excellent)
- ✅ Rust (excellent)
- ✅ Go (good)
- ✅ Python (requires Pylance)
- ✅ Java (good)
- ✅ C++ (good)
- ✅ C# (good)

---

### 7. Code Lens ⭐⭐⭐⭐⭐

**Show actionable information above code elements!**

Displays reference counts, test status, git information, and more inline.

**Example:**

```javascript
// 23 references | 5 tests ✅ | Last modified: 2 days ago
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// 8 references | No tests ⚠️ | Last modified: 5 months ago
function validateOrder(order) {
  if (!order.items) throw new Error('No items');
}

// 12 references | 3 tests ⚠️ | Missing JSDoc | Last modified: 1 day ago
function processOrder(order) {
  validateOrder(order);
  return calculateTotal(order.items);
}
```

**Information shown:**
- **Reference count** - How many places use this
- **Test status** - How many tests cover this
- **Documentation** - Is it documented?
- **Git info** - When was it last modified?
- **Complexity** - Code complexity metrics

**Benefits:**
- Instant impact analysis
- Test coverage visibility
- Identify untested code
- Track code age

**Use cases:**
```
"How many places use this function?"
"Is this function tested?"
"Show code metrics for this file"
"Which functions are most used?"
```

**Supported languages:**
- ✅ All 40+ languages (universal support)

---

### 8. Type Hierarchy ⭐⭐⭐⭐⭐

**Visualize inheritance and implementation relationships!**

Shows complete class hierarchies, super types, and sub types.

**Example:**

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

**Benefits:**
- Understand inheritance structure
- Safe refactoring of base classes
- Identify Liskov Substitution violations
- Map type relationships

**Use cases:**
```
"Show class hierarchy for UserService"
"What extends BaseController?"
"Find all implementations of IService"
"Show subclasses of this class"
```

**Supported languages:**
- ✅ TypeScript/JavaScript (excellent)
- ✅ Java (excellent)
- ✅ C# (excellent)
- ✅ Python (good)
- ✅ Go (interfaces)
- ✅ Rust (traits)
- ✅ C++ (inheritance)

---

### 9. Semantic Tokens ⭐⭐⭐⭐⭐

**Smart code classification beyond syntax highlighting!**

Distinguishes between different semantic meanings of identifiers.

**Example:**

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

**Token types identified:**
- namespace, class, enum, interface, struct
- typeParameter, parameter, variable, property
- enumMember, event, function, method, macro
- keyword, modifier, comment, string, number
- **Modifiers:** readonly, static, deprecated, async, declaration, definition

**Benefits:**
- Identify mutable vs immutable
- Detect deprecated usage
- Find global state
- Understand visibility (public/private)
- Spot async functions

**Use cases:**
```
"Find all mutable global variables"
"Identify deprecated API usage"
"Show all async functions"
"Find private methods being accessed"
```

**Supported languages:**
- ✅ All 40+ languages (universal support)

---

### 10. Folding Ranges ⭐⭐⭐⭐

**Analyze code structure and complexity!**

Identifies logical blocks and their nesting for structural analysis.

**Example:**

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
│
├─ processPayment (lines 69-98, 30 lines) ⚠️ EXTRACT RECOMMENDED
│  ├─ validatePaymentMethod (lines 71-76, 6 lines)
│  ├─ chargeCard (lines 78-89, 12 lines)
│  └─ handlePaymentError (lines 91-97, 7 lines)
│
└─ createOrder (lines 100-121, 22 lines) ⚠️ EXTRACT RECOMMENDED
   ├─ saveOrder (lines 102-108, 7 lines)
   └─ updateInventory (lines 110-115, 6 lines)

🎯 Refactoring Recommendations:
1. Extract calculateTotals (34 lines → 4 function calls)
2. Extract processPayment (30 lines → 3 function calls)
3. Extract validateCart (28 lines → 3 function calls)
4. Extract createOrder (22 lines → 2 function calls)

Result: 145 lines → 35 lines + 4 extracted functions
Complexity: 23 → 4 (Excellent!)
```

**Benefits:**
- Identify extract-method opportunities
- Measure code complexity
- Understand nesting depth
- Find overly complex functions

**Use cases:**
```
"Analyze code structure of this function"
"Find complex methods to refactor"
"Show nesting depth"
"Identify extraction candidates"
```

**Supported languages:**
- ✅ All 40+ languages (universal support)

---

## Integration with Other Skills (Enhanced!)

### With code-review ⭐⭐⭐⭐⭐

**Enhanced with 5 new capabilities:**

```bash
/code-review src/services/UserService.js

📊 Code Review with Advanced LSP

🔍 Code Lens Analysis:
- calculateTotal: 23 refs | 5 tests ✅
- validateOrder: 8 refs | NO TESTS ⚠️
- processOrder: 12 refs | 3 tests ⚠️

🎯 Inlay Hints Analysis:
- Found 3 potential type mismatches
- Line 45: expects string, receives number
- Line 67: nullable object accessed without check

📊 Type Hierarchy Impact:
- UserService has 3 subclasses
- Changes will affect 35 files
- Risk level: HIGH

🧬 Semantic Tokens Analysis:
- Found 2 mutable global variables ⚠️
- counter: modified in 5 locations (race condition risk)
- Found 1 deprecated API usage

📐 Folding Ranges Analysis:
- processOrder: 145 lines (complexity: 23) 🔴 VERY COMPLEX
- Recommendation: Extract 4 methods to reduce complexity

🎯 Issues Found:
1. validateOrder has NO tests (8 references) - HIGH RISK
2. Type mismatch at line 45 - MEDIUM RISK
3. Mutable global state (counter) - HIGH RISK
4. processOrder too complex (145 lines) - REFACTOR NEEDED
5. Using deprecated API at line 89 - UPDATE NEEDED
```

---

### With bug-hunter ⭐⭐⭐⭐⭐

**Enhanced debugging with inline type information:**

```bash
/bug-hunter "calculateTotal returns NaN"

🐛 Bug Hunter with Advanced LSP

🔍 Step 1: Inlay Hints (Type Analysis)
function calculateTotal(items: Item[]): number {
  return items.reduce((sum: number, item: Item): number =>
    sum + item.price, 0
  );
}

❌ Found issue: item.price might be undefined!

🔍 Step 2: Semantic Tokens (State Analysis)
- items: [parameter] [readonly]
- sum: [variable] [number]
- item: [variable] [object]
- item.price: [property-read] [possibly-undefined]

❌ item.price is not guaranteed to exist!

🔍 Step 3: Code Lens (Usage Analysis)
- calculateTotal: 23 references
- Common pattern: Called with API response data
- API sometimes returns items without price field

🎯 Root Cause Found:
API returns incomplete item objects (missing price field)
calculateTotal doesn't validate price existence
sum + undefined = NaN

💡 Fix:
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) =>
    sum + (item.price || 0), 0
  );
}
```

---

### With refactor-assistant ⭐⭐⭐⭐⭐

**Safe refactoring with comprehensive impact analysis:**

```bash
/refactor-assistant analyze src/UserService.js

♻️ Refactor Assistant with Advanced LSP

📊 Type Hierarchy Analysis:
UserService
├─ Extends: BaseService
└─ Subclasses (3):
   ├─ AdminUserService (12 files use it)
   ├─ GuestUserService (8 files use it)
   └─ PremiumUserService (15 files use it)

⚠️ Impact: Changing UserService affects 3 subclasses + 35 total files

🔍 Code Lens Impact:
- login() method: 23 references
- logout() method: 12 references
- register() method: 18 references
- verifyToken() method: 45 references ⚠️ CRITICAL

📐 Folding Ranges - Complexity Analysis:
- login(): 45 lines (complexity: 12) ⚠️ EXTRACT RECOMMENDED
- verifyToken(): 78 lines (complexity: 18) 🔴 MUST REFACTOR

🧬 Semantic Analysis:
- Found 2 mutable instance variables
- this.currentUser: modified in 5 methods (state management issue)
- this.cache: modified in 3 methods

🎯 Refactoring Recommendations:

1. Extract login() into 3 methods (45 lines → 15 lines)
   Impact: 23 call sites (safe - internal refactor)

2. Extract verifyToken() into 5 methods (78 lines → 20 lines)
   Impact: 45 call sites ⚠️ CRITICAL - test thoroughly

3. Remove mutable instance state (currentUser, cache)
   Impact: 5+3 = 8 method modifications
   Recommendation: Use functional approach or state container

4. Consider splitting UserService (3 subclasses, 98 total references)
   Recommendation: Extract AuthService, ProfileService

All refactorings tracked by LSP - zero risk of missing references!
```

---

### With test-generator ⭐⭐⭐⭐⭐

**Generate accurate tests using type information:**

```bash
/test-generator src/services/PaymentService.js

🧪 Test Generator with Advanced LSP

🔍 Inlay Hints - Extracting Type Information:
function processPayment(amount: number, card: Card): Promise<Transaction> {
  const fee: number = amount * 0.029 + 0.30;
  const total: number = amount + fee;
  return charge(card: card, amount: total);
}

📊 Semantic Tokens - Identifying Test Scenarios:
- amount: [parameter] [number] → Test: positive, zero, negative, decimal
- card: [parameter] [object] → Test: valid, invalid, expired, null
- charge(): [async-function] → Test: success, failure, timeout

🎯 Generated Test Cases:

describe('processPayment', () => {
  // Happy path (from type info)
  it('should process payment with valid card', async () => {
    const card: Card = createTestCard();
    const result = await processPayment(100.00, card);
    expect(result.amount).toBe(103.20); // 100 + 2.9% + 0.30
  });

  // Edge cases (from semantic analysis)
  it('should handle zero amount', async () => {
    const card: Card = createTestCard();
    const result = await processPayment(0, card);
    expect(result.amount).toBe(0.30); // Just the $0.30 fee
  });

  it('should handle decimal amounts', async () => {
    const card: Card = createTestCard();
    const result = await processPayment(10.50, card);
    expect(result.amount).toBeCloseTo(11.10); // Decimal handling
  });

  // Error cases (from type hierarchy)
  it('should throw when card is null', async () => {
    await expect(processPayment(100, null))
      .rejects.toThrow('Invalid card');
  });

  it('should throw when amount is negative', async () => {
    await expect(processPayment(-10, createTestCard()))
      .rejects.toThrow('Invalid amount');
  });

  // Async cases (from semantic tokens)
  it('should handle charge API failure', async () => {
    mockChargeAPI.mockRejectedValue(new Error('Network error'));
    await expect(processPayment(100, createTestCard()))
      .rejects.toThrow('Network error');
  });
});

✅ Generated 6 comprehensive test cases from LSP analysis!
```

---

### With doc-generator ⭐⭐⭐⭐⭐

**Generate rich documentation from LSP data:**

```bash
/doc-generator --api src/services/UserService.js

📚 Documentation Generator with Advanced LSP

🔍 Extracting Information:
- Inlay Hints: Type signatures
- Type Hierarchy: Inheritance structure
- Code Lens: Usage statistics
- Semantic Tokens: Visibility and modifiers

📝 Generated Documentation:

## UserService

Service for managing user operations. Extends `BaseService`.

### Class Hierarchy

```
UserService (src/services/UserService.js)
├─ Extends: BaseService
└─ Subclasses:
   ├─ AdminUserService
   ├─ GuestUserService
   └─ PremiumUserService
```

### Constructor

```typescript
constructor(database: Database): UserService
```

Creates a new UserService instance.

**Parameters:**
- `database: Database` - Database connection instance

---

### Methods

#### findById

```typescript
async findById(id: string): Promise<User | null>
```

Find a user by their unique identifier.

**Parameters:**
- `id: string` - User's unique identifier

**Returns:** `Promise<User | null>` - User object if found, null otherwise

**Usage:** 23 references across 8 files ← (from Code Lens!)

**Example:**
```javascript
const user = await userService.findById('user-123');
if (user) {
  console.log(user.name);
}
```

---

#### create

```typescript
async create(userData: CreateUserDTO): Promise<User>
```

Create a new user.

**Parameters:**
- `userData: CreateUserDTO` - User data object
  - `email: string` - User email (required)
  - `password: string` - User password (required)
  - `name: string` - User name (optional)

**Returns:** `Promise<User>` - Created user object

**Throws:**
- `ValidationError` - If user data is invalid
- `DuplicateError` - If email already exists

**Usage:** 18 references across 5 files ← (from Code Lens!)

**Visibility:** public ← (from Semantic Tokens!)

✅ Complete API documentation generated from LSP!
```

---

### With ultrathink ⭐⭐⭐⭐⭐

**Deep reasoning enhanced with comprehensive type information:**

```bash
/ultrathink Why is this code slow?

🧠 Deep Analysis with Advanced LSP

🔍 Step 1: Code Lens Analysis
function loadUserDashboard(userId) {  // 45 references
  const user = fetchUser(userId);     // 23 references
  const posts = fetchPosts(userId);   // 34 references
  const friends = fetchFriends(userId); // 19 references
  return { user, posts, friends };
}

⚠️ Code Lens shows: Called in 45 places (hot path!)

🔍 Step 2: Inlay Hints Analysis
function loadUserDashboard(userId: string): Promise<Dashboard> {
  const user: Promise<User> = fetchUser(userId: userId);
  const posts: Promise<Post[]> = fetchPosts(userId: userId);
  const friends: Promise<Friend[]> = fetchFriends(userId: userId);
  return { user, posts, friends };
}

❌ Type hint shows: Returning object with Promise fields (not awaited!)

🔍 Step 3: Semantic Tokens Analysis
- fetchUser(): [async-function] [returns-promise]
- fetchPosts(): [async-function] [returns-promise]
- fetchFriends(): [async-function] [returns-promise]
- No await keywords detected!

🔍 Step 4: Folding Ranges - Call Structure
loadUserDashboard (1 line main, 3 sequential async calls)
├─ fetchUser (makes DB query) ~200ms
├─ fetchPosts (makes DB query) ~150ms
└─ fetchFriends (makes DB query) ~100ms

Total time: 450ms (sequential!)

🎯 Root Cause Analysis:

1. **Missing await** (from Inlay Hints)
   - Returning Promises instead of values
   - Template tries to render Promise objects → crashes

2. **Sequential execution** (from Semantic analysis)
   - 3 async calls executed one after another
   - Total time: 200 + 150 + 100 = 450ms

3. **Hot path** (from Code Lens)
   - Called in 45 places
   - Performance impact is multiplied

💡 Solution:

```javascript
async function loadUserDashboard(userId: string): Promise<Dashboard> {
  // Run in parallel with Promise.all
  const [user, posts, friends] = await Promise.all([
    fetchUser(userId),
    fetchPosts(userId),
    fetchFriends(userId)
  ]);

  return { user, posts, friends };
}
```

📊 Impact:
- Before: 450ms (sequential)
- After: 200ms (parallel - limited by slowest)
- Improvement: 55% faster!
- Multiplied across 45 call sites: Huge win!

Advanced LSP found the bug AND the optimization in seconds!
```

---

### With plan-mode ⭐⭐⭐⭐⭐

**Better planning with complete type and structural information:**

```bash
/plan-mode Refactor authentication to use JWT

📋 Plan Mode with Advanced LSP

🔍 Step 1: Type Hierarchy - Find Auth Code
AuthService (src/auth/AuthService.js)
├─ Extends: BaseService
├─ Implements: IAuthService
└─ Used by:
   ├─ LoginController (12 references)
   ├─ SignupController (8 references)
   ├─ APIGateway (45 references)
   └─ 15 other controllers

🔍 Step 2: Code Lens - Assess Impact
login() method:
- 23 references across 8 files
- 5 test files
- Last modified: 3 months ago

verifyToken() method:
- 45 references across 15 files ⚠️ CRITICAL
- 8 test files
- Called in hot path

🔍 Step 3: Folding Ranges - Understand Structure
AuthService (245 lines total) [COMPLEX]
├─ Session methods (lines 23-98, 76 lines)
│  ├─ createSession
│  ├─ getSession
│  └─ destroySession
│
├─ Token methods (lines 100-156, 57 lines)
│  ├─ generateToken
│  └─ verifyToken ← 45 references!
│
└─ User methods (lines 158-245, 88 lines)
   ├─ login
   ├─ logout
   └─ register

🔍 Step 4: Semantic Analysis - Identify Dependencies
Dependencies found:
- Session: [class] [mutable-state] → REMOVE for JWT
- TokenStore: [class] [database] → REMOVE for JWT
- User: [class] [keep]
- bcrypt: [module] [keep]
- jsonwebtoken: [module] [ADD NEW]

🎯 Generated Plan:

## Milestone 1: Add JWT Infrastructure
Files to modify: 2 files
- Create JWTService (new file)
- Install jsonwebtoken package
Impact: None (new code)
Tests: 5 new tests

## Milestone 2: Update AuthService.verifyToken() ⚠️ CRITICAL
Files to modify: 1 file (src/auth/AuthService.js)
- Modify verifyToken to use JWT
- Keep backward compatibility with sessions (temporary)
Impact: 45 references in 15 files
- All references will still work (backward compatible)
Tests: Update 8 existing tests, add 3 new tests

## Milestone 3: Update AuthService.login()
Files to modify: 1 file
- Generate JWT token instead of session
- Return JWT in response
Impact: 23 references in 8 files
- Response structure changes (breaking change)
Tests: Update 5 existing tests

## Milestone 4: Update All Call Sites (8 controllers)
Files to modify: 8 files
- Update login call sites to handle JWT
- Remove session handling
Impact: 23 call sites
Tests: Update integration tests

## Milestone 5: Remove Session Infrastructure
Files to modify: 3 files
- Remove Session model
- Remove TokenStore
- Remove session middleware
Impact: Cleanup only
Tests: Remove 12 obsolete tests

## Milestone 6: Update Tests
Files to modify: 13 test files
- Update 23 existing tests
- Add 15 new JWT tests
- Remove 12 session tests

📊 Total Impact:
- Files to modify: 28 files
- References to update: 68 references
- Tests to modify/add: 38 tests
- Estimated time: 3-4 days
- Risk level: MEDIUM (45 references to critical verifyToken)

✅ Plan created with EXACT file counts from LSP!
```

---

## How Advanced Features Work Together

### Example: Complete Bug Investigation

```bash
User: /bug-hunter "Dashboard loads but shows undefined everywhere"

🐛 Bug Hunter - Multi-Feature Analysis

🔍 Feature 1: Code Lens (Find the code)
loadDashboard() → 12 references
  Most common caller: DashboardPage.jsx

🔍 Feature 2: Type Hierarchy (Understand inheritance)
DashboardPage extends BasePage
  → Uses loadDashboard() from parent

🔍 Feature 3: Inlay Hints (See the types)
async loadDashboard(): Promise<void> {
  this.data = await fetchDashboard();  // this.data: any
  this.render();
}

❌ Type shows this.data is any (no type safety!)

🔍 Feature 4: Semantic Tokens (Analyze the flow)
- fetchDashboard(): [async-function] [returns-promise]
- this.data: [property-write] [any-type] ⚠️
- this.render(): [method-call]

🔍 Feature 5: Folding Ranges (Check structure)
loadDashboard (3 lines)
├─ await fetchDashboard() → Sets this.data
└─ this.render() → Reads this.data

🔍 Follow the trail...
fetchDashboard() returns Promise<DashboardData>
DashboardData = { user, posts, stats }

Template expects: this.data.user.name
But gets: Promise { user, posts, stats }

🎯 ROOT CAUSE:
fetchDashboard IS async and IS awaited ✅
BUT: this.data is being read in render() BEFORE it's resolved!

Race condition: render() called before await completes

💡 FIX:
async loadDashboard(): Promise<void> {
  const data = await fetchDashboard();
  this.data = data;  // Now data is resolved
  await this.render();  // Make render async too
}

✅ Bug found using all 5 advanced LSP features!
```

---

## Language Support Matrix

### Full Support (All 10 Features)

| Language | Definition | References | Hover | Symbols | Calls | Hints | Lens | Hierarchy | Semantic | Folding |
|----------|-----------|-----------|-------|---------|-------|-------|------|-----------|----------|---------|
| TypeScript | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| JavaScript | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ |
| Rust | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Go | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Java | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| C# | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Python | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| C++ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

✅ = Full support | ⚠️ = Partial support

---

## Performance & Caching

### Automatic Optimization

All advanced features use intelligent caching:

1. **Inlay Hints** - Cached per file, invalidated on edit
2. **Code Lens** - Cached for 60 seconds, lazy resolved
3. **Type Hierarchy** - Cached per type, rarely changes
4. **Semantic Tokens** - Incremental updates (delta)
5. **Folding Ranges** - Cached per file structure

### Performance Tips

- First request may be slower (LSP indexing)
- Subsequent requests are instant (cached)
- Large files: Features work on visible range only
- Very large codebases (100k+ files): May take 30-60s to index

---

## Configuration

### Enable/Disable Features

```yaml
# .codex/config.yml

lsp:
  # Core features
  goToDefinition: true
  findReferences: true
  hover: true

  # Advanced features (v1.3.0)
  inlayHints:
    enabled: true
    showParameterNames: true
    showVariableTypes: true
    showFunctionReturnTypes: true

  codeLens:
    enabled: true
    showReferences: true
    showTests: true
    showGitInfo: false  # Disable git info

  typeHierarchy:
    enabled: true
    maxDepth: 10  # Maximum hierarchy depth

  semanticTokens:
    enabled: true
    highlightDeprecated: true
    highlightMutable: true

  foldingRanges:
    enabled: true
    maxComplexity: 10  # Warn if complexity > 10
```

---

## Best Practices

### 1. Use Inlay Hints for Understanding

Before modifying unfamiliar code:
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

### 4. Leverage Semantic Tokens for Analysis

```
1. Find mutable state
2. Identify deprecated APIs
3. Spot global variables
4. Understand visibility
```

### 5. Use Folding Ranges to Find Complexity

```
1. Analyze structure
2. Identify complex functions
3. Plan extractions
4. Simplify code
```

---

## Troubleshooting

### Issue: Inlay hints not showing

**Cause:** Language server doesn't support LSP 3.17

**Solution:**
```bash
# Update language server
npm update -g typescript-language-server  # TypeScript
pip install --upgrade pyright  # Python
```

### Issue: Code lens shows "0 references"

**Cause:** LSP indexing not complete

**Solution:** Wait 30 seconds for indexing, then retry

### Issue: Type hierarchy empty

**Cause:** No inheritance in selected type

**Solution:** This is normal for non-class types (functions, primitives)

### Issue: Semantic tokens look wrong

**Cause:** Outdated language server

**Solution:** Update to LSP 3.16+ compatible server

---

## Remember

### v1.3.0 adds 5 game-changing features:

1. **Inlay Hints** - See types without jumping around
2. **Code Lens** - Instant impact analysis
3. **Type Hierarchy** - Understand inheritance
4. **Semantic Tokens** - Smart code classification
5. **Folding Ranges** - Structural analysis

### All skills benefit:
- code-review: Better type checking, complexity analysis
- bug-hunter: Type mismatch detection, state analysis
- refactor-assistant: Safe refactoring, impact analysis
- test-generator: Type-aware test generation
- doc-generator: Richer documentation
- ultrathink: Deeper reasoning
- plan-mode: More accurate planning
- execute-plan: Better validation

**The most powerful code intelligence system in any AI coding tool!** 🚀

---

**LSP 3.17 is automatically available in all skills. The future of code analysis is here!** ✨
