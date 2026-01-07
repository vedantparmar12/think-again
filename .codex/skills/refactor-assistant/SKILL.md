---
name: refactor-assistant
description: Safe code refactoring guidance using LSP-powered impact analysis. Suggests improvements, analyzes dependencies, ensures backward compatibility, and validates changes. Integrates with plan-mode for refactor planning and code-intelligence for accurate analysis.
metadata:
  short-description: Safe refactoring with impact analysis
  version: 1.0.0
  author: Custom
  tags: [refactoring, code-quality, technical-debt, lsp, architecture]
  integrates-with: [code-intelligence, plan-mode, ultrathink]
---

# REFACTOR ASSISTANT MODE - Safe Code Improvement

You are now in **REFACTOR ASSISTANT MODE**. This mode helps you safely refactor code, reduce technical debt, and improve code quality without breaking functionality.

## 🎯 What This Skill Does

Comprehensive refactoring assistance:

### 1. Refactoring Opportunities
- Code duplication detection
- Complex function identification
- Design pattern suggestions
- Architecture improvements
- Performance optimizations
- Naming improvements

### 2. Impact Analysis
- Find all affected code (LSP)
- Identify breaking changes
- Assess risk level
- Estimate effort
- Plan migration path

### 3. Safe Refactoring
- Generate refactored code
- Maintain backward compatibility
- Preserve functionality
- Update all references
- Update tests

### 4. Validation
- Ensure tests still pass
- Verify no regressions
- Check performance impact
- Validate type safety

## 🔍 LSP-Powered Analysis

Uses LSP for accuracy:
- **Find all references** - Know exactly what's affected
- **Call hierarchy** - Understand usage patterns
- **Go to definition** - Find implementation details
- **Type information** - Ensure type safety
- **Symbol search** - Find similar patterns

## 📋 Integration with Plan-Mode

For large refactors:
- Create detailed refactoring plan
- Break into safe milestones
- Document decisions
- Get approval before changes

## 🧠 Integration with Ultrathink

For complex decisions:
- Architectural trade-offs
- Multiple refactoring approaches
- Performance implications
- Design pattern choices

## Refactoring Workflow

### Step 1: Identify Refactoring Need

```
🔍 Analyzing Code Quality

Target: [file or directory]

Scanning for refactoring opportunities...

Found issues:
1. 🔴 High Priority
   - [Issue type] at [file:line]
   - Impact: [description]
   - Effort: [Small/Medium/Large]

2. 🟡 Medium Priority
   - [Issue type] at [file:line]
   - Impact: [description]
   - Effort: [Small/Medium/Large]

3. 🟢 Low Priority
   - [Issue type] at [file:line]
   - Impact: [description]
   - Effort: [Small/Medium/Large]
```

### Step 2: Select Refactoring Type

```
## Refactoring Types

Which refactoring do you want to perform?

1. Extract Method
   - Break large function into smaller ones
   - Improve readability and reusability

2. Extract Class
   - Separate concerns into different classes
   - Improve organization

3. Rename
   - Improve naming for clarity
   - Update all references safely

4. Remove Duplication
   - Consolidate duplicate code
   - Create reusable functions

5. Simplify Conditionals
   - Reduce complexity
   - Improve readability

6. Introduce Parameter Object
   - Group related parameters
   - Reduce parameter count

7. Replace Conditional with Polymorphism
   - Use inheritance/interfaces
   - More extensible design

8. Move Method
   - Relocate to more appropriate class
   - Better organization

9. Inline Method/Variable
   - Remove unnecessary indirection
   - Simplify code

10. Introduce Design Pattern
    - Apply appropriate pattern
    - Improve architecture
```

### Step 3: Impact Analysis with LSP

```
📊 Impact Analysis

Target for refactoring: [function/class name]
Location: [file:line]

LSP Analysis:

References found: [X]
- [file1:line1] - [context]
- [file2:line2] - [context]
- [file3:line3] - [context]
[... list all references]

Call hierarchy:
Incoming calls ([Y] callers):
- [caller1] → target
- [caller2] → target
- [caller3] → target

Outgoing calls ([Z] dependencies):
- target → [dependency1]
- target → [dependency2]

Type analysis:
- Parameters: [types]
- Return type: [type]
- Generic types: [types if any]

Files affected: [N]
Functions affected: [M]
Test files to update: [T]

Risk assessment:
- [ ] Low risk - Few references, simple change
- [ ] Medium risk - Multiple references, moderate complexity
- [ ] High risk - Many references, complex change, public API

Estimated effort: [hours/days]
```

### Step 4: Refactoring Plan

For complex refactors, create a plan:

```
## Refactoring Plan: [Name]

### Goal
[What we want to achieve]

### Current State
[How code currently works]
[Problems with current approach]

### Desired State
[How code will work after refactoring]
[Benefits of new approach]

### Approach
[High-level strategy]

### Milestones

#### Milestone 1: [Name]
**Changes:**
- [Change 1]
- [Change 2]

**Affected files:**
- [file1]
- [file2]

**Tests to update:**
- [test1]

**Verification:**
- [ ] All tests pass
- [ ] No breaking changes
- [ ] Performance unchanged

#### Milestone 2: [Name]
[Similar structure]

### Backward Compatibility
- [ ] Maintain old API temporarily
- [ ] Add deprecation warnings
- [ ] Provide migration guide
- [ ] Update documentation

### Rollback Plan
If something goes wrong:
1. [Rollback step 1]
2. [Rollback step 2]
```

### Step 5: Execute Refactoring

For each refactoring type:

#### Refactor 1: Extract Method

**Before:**
```javascript
function processOrder(order) {
  // Validate order
  if (!order.items || order.items.length === 0) {
    throw new Error('Order has no items');
  }
  if (!order.customer) {
    throw new Error('Order has no customer');
  }

  // Calculate total
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  if (order.discount) {
    total -= total * order.discount;
  }

  // Apply tax
  const taxRate = 0.1;
  total += total * taxRate;

  return { ...order, total };
}
```

**After:**
```javascript
function processOrder(order) {
  validateOrder(order);
  const subtotal = calculateSubtotal(order.items);
  const discounted = applyDiscount(subtotal, order.discount);
  const total = applyTax(discounted);
  return { ...order, total };
}

function validateOrder(order) {
  if (!order.items || order.items.length === 0) {
    throw new Error('Order has no items');
  }
  if (!order.customer) {
    throw new Error('Order has no customer');
  }
}

function calculateSubtotal(items) {
  return items.reduce((sum, item) =>
    sum + item.price * item.quantity, 0
  );
}

function applyDiscount(amount, discount) {
  return discount ? amount - (amount * discount) : amount;
}

function applyTax(amount) {
  const TAX_RATE = 0.1;
  return amount + (amount * TAX_RATE);
}
```

**Benefits:**
- Each function has single responsibility
- Easy to test individually
- Reusable components
- Clear naming documents behavior

#### Refactor 2: Remove Duplication

**Before:**
```javascript
function getActiveUsers() {
  const users = db.query('SELECT * FROM users');
  const active = users.filter(u => u.status === 'active');
  return active.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email
  }));
}

function getInactiveUsers() {
  const users = db.query('SELECT * FROM users');
  const inactive = users.filter(u => u.status === 'inactive');
  return inactive.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email
  }));
}
```

**After:**
```javascript
function getUsersByStatus(status) {
  const users = db.query('SELECT * FROM users WHERE status = ?', [status]);
  return users.map(formatUser);
}

function formatUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

function getActiveUsers() {
  return getUsersByStatus('active');
}

function getInactiveUsers() {
  return getUsersByStatus('inactive');
}
```

**Benefits:**
- DRY (Don't Repeat Yourself)
- Single source of truth
- Easier to maintain
- Database query optimized

#### Refactor 3: Simplify Conditionals

**Before:**
```javascript
function getShippingCost(order) {
  if (order.total > 100) {
    if (order.customer.isPremium) {
      return 0;
    } else {
      return 5;
    }
  } else {
    if (order.customer.isPremium) {
      return 5;
    } else {
      if (order.total > 50) {
        return 10;
      } else {
        return 15;
      }
    }
  }
}
```

**After:**
```javascript
function getShippingCost(order) {
  const { total, customer } = order;

  if (total > 100) {
    return customer.isPremium ? 0 : 5;
  }

  if (customer.isPremium) {
    return 5;
  }

  return total > 50 ? 10 : 15;
}
```

**Or even better with lookup table:**
```javascript
const SHIPPING_RATES = {
  premium: {
    over100: 0,
    under100: 5
  },
  standard: {
    over100: 5,
    over50: 10,
    under50: 15
  }
};

function getShippingCost(order) {
  const { total, customer } = order;
  const rates = customer.isPremium ? SHIPPING_RATES.premium : SHIPPING_RATES.standard;

  if (customer.isPremium) {
    return total > 100 ? rates.over100 : rates.under100;
  }

  if (total > 100) return rates.over100;
  if (total > 50) return rates.over50;
  return rates.under50;
}
```

**Benefits:**
- Reduced nesting
- Easier to read
- Easier to modify rates
- Less cognitive load

#### Refactor 4: Introduce Parameter Object

**Before:**
```javascript
function createUser(
  firstName,
  lastName,
  email,
  phone,
  address,
  city,
  state,
  zipCode,
  country
) {
  // Implementation
}

// Calling code
createUser(
  'John',
  'Doe',
  'john@example.com',
  '555-1234',
  '123 Main St',
  'Springfield',
  'IL',
  '62701',
  'USA'
);
```

**After:**
```javascript
function createUser(userData) {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zipCode,
    country
  } = userData;

  // Implementation
}

// Calling code
createUser({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '555-1234',
  address: '123 Main St',
  city: 'Springfield',
  state: 'IL',
  zipCode: '62701',
  country: 'USA'
});
```

**Benefits:**
- Named parameters (self-documenting)
- Easy to add/remove fields
- Optional parameters clear
- Better IDE support

#### Refactor 5: Extract Class

**Before:**
```javascript
class Order {
  constructor() {
    this.items = [];
    this.customerName = '';
    this.customerEmail = '';
    this.customerAddress = '';
    this.customerPhone = '';
  }

  addItem(item) { /*...*/ }
  removeItem(item) { /*...*/ }
  calculateTotal() { /*...*/ }

  setCustomerName(name) { this.customerName = name; }
  setCustomerEmail(email) { this.customerEmail = email; }
  setCustomerAddress(address) { this.customerAddress = address; }
  setCustomerPhone(phone) { this.customerPhone = phone; }

  validateCustomer() { /*...*/ }
  sendConfirmationEmail() { /*...*/ }
}
```

**After:**
```javascript
class Customer {
  constructor(name, email, address, phone) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
  }

  validate() { /*...*/ }
  sendConfirmationEmail() { /*...*/ }
}

class Order {
  constructor(customer) {
    this.items = [];
    this.customer = customer;
  }

  addItem(item) { /*...*/ }
  removeItem(item) { /*...*/ }
  calculateTotal() { /*...*/ }
}
```

**Benefits:**
- Single Responsibility Principle
- Better organization
- Reusable Customer class
- Clearer relationships

#### Refactor 6: Replace Conditional with Polymorphism

**Before:**
```javascript
class Animal {
  constructor(type) {
    this.type = type;
  }

  makeSound() {
    if (this.type === 'dog') {
      return 'Woof!';
    } else if (this.type === 'cat') {
      return 'Meow!';
    } else if (this.type === 'bird') {
      return 'Tweet!';
    }
  }

  move() {
    if (this.type === 'dog' || this.type === 'cat') {
      return 'Walking';
    } else if (this.type === 'bird') {
      return 'Flying';
    }
  }
}
```

**After:**
```javascript
class Animal {
  makeSound() {
    throw new Error('Subclass must implement makeSound()');
  }

  move() {
    throw new Error('Subclass must implement move()');
  }
}

class Dog extends Animal {
  makeSound() {
    return 'Woof!';
  }

  move() {
    return 'Walking';
  }
}

class Cat extends Animal {
  makeSound() {
    return 'Meow!';
  }

  move() {
    return 'Walking';
  }
}

class Bird extends Animal {
  makeSound() {
    return 'Tweet!';
  }

  move() {
    return 'Flying';
  }
}
```

**Benefits:**
- Open/Closed Principle
- Easy to add new animals
- No conditional logic
- Each class has clear responsibility

### Step 6: Update All References

Using LSP to find and update all references:

```
🔄 Updating References

LSP found [X] references to update:

1. [file1:line1]
   Before: oldFunction(a, b)
   After:  newFunction({ a, b })
   Status: ✅ Updated

2. [file2:line2]
   Before: oldFunction(x, y)
   After:  newFunction({ a: x, b: y })
   Status: ✅ Updated

3. [test.js:line]
   Before: expect(oldFunction(1, 2))
   After:  expect(newFunction({ a: 1, b: 2 }))
   Status: ✅ Updated

All references updated: ✅
No references missed: ✅ (verified with LSP)
```

### Step 7: Update Tests

```
🧪 Updating Tests

Existing tests for refactored code:
- [test1] - Update assertions ✅
- [test2] - Update mocks ✅
- [test3] - Still valid ✅

New tests needed:
- Test extracted function independently
- Test edge cases now more visible
- Test new error conditions

Running tests...
✅ All tests passing
```

### Step 8: Validation

```
✅ Refactoring Validation

Functional correctness:
- [ ] All tests pass
- [ ] Manual testing complete
- [ ] No regressions

Code quality:
- [ ] Complexity reduced
- [ ] Duplication removed
- [ ] Naming improved
- [ ] Better organized

Performance:
- [ ] No performance degradation
- [ ] Measured: [before] → [after]

Type safety:
- [ ] All types correct
- [ ] No type errors

Documentation:
- [ ] Code comments updated
- [ ] API docs updated
- [ ] Migration guide (if needed)
```

## Common Refactoring Patterns

### Pattern 1: Magic Numbers to Constants

```javascript
// Before
if (user.age >= 18) {
  // ...
}

// After
const MINIMUM_AGE = 18;
if (user.age >= MINIMUM_AGE) {
  // ...
}
```

### Pattern 2: Guard Clauses

```javascript
// Before
function processUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.email) {
        // Process user
      }
    }
  }
}

// After
function processUser(user) {
  if (!user) return;
  if (!user.isActive) return;
  if (!user.email) return;

  // Process user
}
```

### Pattern 3: Strategy Pattern

```javascript
// Before
function calculatePrice(type, base) {
  if (type === 'regular') {
    return base;
  } else if (type === 'premium') {
    return base * 0.9;
  } else if (type === 'vip') {
    return base * 0.8;
  }
}

// After
const pricingStrategies = {
  regular: (base) => base,
  premium: (base) => base * 0.9,
  vip: (base) => base * 0.8
};

function calculatePrice(type, base) {
  const strategy = pricingStrategies[type];
  return strategy ? strategy(base) : base;
}
```

## Refactoring Safety Checklist

### Before Refactoring
- [ ] All tests passing
- [ ] Code committed to version control
- [ ] Created feature branch
- [ ] Understand current behavior
- [ ] Identified all affected code (LSP)

### During Refactoring
- [ ] Make small, incremental changes
- [ ] Run tests after each change
- [ ] Keep commits atomic
- [ ] Update tests as you go

### After Refactoring
- [ ] All tests still passing
- [ ] No new warnings/errors
- [ ] Code review complete
- [ ] Documentation updated
- [ ] Performance validated

## Integration with Plan Mode

For large refactors:

```
/plan-mode Refactor authentication system

[Creates detailed plan with milestones]
[Each milestone is a safe, testable change]
[Get approval before starting]

Then:
/execute-plan 2026-01-08-auth-refactor
```

## Tips for Effective Refactoring

### Start Small
- Refactor one thing at a time
- Don't mix refactoring with feature work
- Commit frequently

### Keep Tests Green
- Tests should pass after every change
- If test breaks, fix immediately
- Add tests for new code paths

### Use LSP
- Find all references before renaming
- Check call hierarchy for impact
- Verify types with LSP

### Communicate
- Document why you're refactoring
- Explain trade-offs
- Get team buy-in

## Remember

Good refactoring:
- **Improves code** without changing behavior
- **Is incremental** - small steps
- **Is tested** - verify at each step
- **Is reversible** - can roll back
- **Has clear goals** - know why you're doing it

Refactor to make the code better, not just different.

---

**REFACTOR ASSISTANT MODE ACTIVATED. Improving code safely with LSP-powered analysis.**
