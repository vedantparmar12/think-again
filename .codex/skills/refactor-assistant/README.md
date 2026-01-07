# Refactor Assistant Skill

Safe code refactoring with LSP-powered impact analysis.

## Quick Start

```bash
# Find refactoring opportunities
/refactor-assistant analyze src/

# Refactor specific file
/refactor-assistant src/services/UserService.js

# Plan large refactor
/refactor-assistant --plan legacy-module/

# Extract method
/refactor-assistant --extract-method calculateTotal
```

## What It Does

### 🔍 Opportunity Detection
- Code duplication
- Complex functions
- Design pattern suggestions
- Architecture improvements
- Performance optimizations

### 📊 Impact Analysis
- Find ALL affected code (LSP)
- Identify breaking changes
- Assess risk level
- Estimate effort

### ♻️ Safe Refactoring
- Generate refactored code
- Maintain backward compatibility
- Preserve functionality
- Update all references
- Update tests

### ✅ Validation
- Tests still pass
- No regressions
- Performance maintained
- Types remain correct

## Refactoring Types

### 1. Extract Method
Break large functions into smaller ones:

**Before:**
```javascript
function processOrder(order) {
  // Validate (20 lines)
  if (!order.items || order.items.length === 0) {
    throw new Error('No items');
  }
  // ... more validation

  // Calculate total (15 lines)
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  // ... more calculation

  // Apply tax (10 lines)
  const taxRate = 0.1;
  total += total * taxRate;
  // ... more tax logic

  return { ...order, total };
}
```

**After:**
```javascript
function processOrder(order) {
  validateOrder(order);
  const subtotal = calculateSubtotal(order.items);
  const total = applyTax(subtotal);
  return { ...order, total };
}

function validateOrder(order) {
  if (!order.items || order.items.length === 0) {
    throw new Error('No items');
  }
  // validation logic
}

function calculateSubtotal(items) {
  return items.reduce((sum, item) =>
    sum + item.price * item.quantity, 0
  );
}

function applyTax(amount) {
  const TAX_RATE = 0.1;
  return amount + (amount * TAX_RATE);
}
```

### 2. Remove Duplication
Consolidate duplicate code:

**Before:**
```javascript
function getActiveUsers() {
  const users = db.query('SELECT * FROM users');
  return users.filter(u => u.status === 'active')
               .map(u => ({ id: u.id, name: u.name }));
}

function getInactiveUsers() {
  const users = db.query('SELECT * FROM users');
  return users.filter(u => u.status === 'inactive')
               .map(u => ({ id: u.id, name: u.name }));
}
```

**After:**
```javascript
function getUsersByStatus(status) {
  const users = db.query(
    'SELECT * FROM users WHERE status = ?',
    [status]
  );
  return users.map(formatUser);
}

function formatUser(user) {
  return { id: user.id, name: user.name };
}

const getActiveUsers = () => getUsersByStatus('active');
const getInactiveUsers = () => getUsersByStatus('inactive');
```

### 3. Simplify Conditionals
Reduce complexity:

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

  if (customer.isPremium) return 5;
  return total > 50 ? 10 : 15;
}
```

### 4. Introduce Parameter Object
Group related parameters:

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
  zipCode
) {
  // Implementation
}
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
    zipCode
  } = userData;

  // Implementation
}

// Usage
createUser({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '555-1234',
  address: '123 Main St',
  city: 'Springfield',
  state: 'IL',
  zipCode: '62701'
});
```

### 5. Extract Class
Separate concerns:

**Before:**
```javascript
class Order {
  // Order properties
  items = [];

  // Customer properties
  customerName = '';
  customerEmail = '';
  customerPhone = '';

  // Mixed responsibilities
  addItem(item) { }
  setCustomerName(name) { }
  validateCustomer() { }
  calculateTotal() { }
}
```

**After:**
```javascript
class Customer {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  validate() {
    // Customer validation
  }
}

class Order {
  constructor(customer) {
    this.items = [];
    this.customer = customer;
  }

  addItem(item) { }
  calculateTotal() { }
}
```

### 6. Replace Conditional with Polymorphism

**Before:**
```javascript
class Animal {
  constructor(type) {
    this.type = type;
  }

  makeSound() {
    if (this.type === 'dog') return 'Woof!';
    if (this.type === 'cat') return 'Meow!';
    if (this.type === 'bird') return 'Tweet!';
  }
}
```

**After:**
```javascript
class Animal {
  makeSound() {
    throw new Error('Subclass must implement');
  }
}

class Dog extends Animal {
  makeSound() { return 'Woof!'; }
}

class Cat extends Animal {
  makeSound() { return 'Meow!'; }
}

class Bird extends Animal {
  makeSound() { return 'Tweet!'; }
}
```

## LSP-Powered Impact Analysis

```
📊 Impact Analysis

Refactoring: Extract method from processOrder()

LSP Analysis:
- Function: processOrder at src/orders.js:45
- References found: 23 across 8 files
- Call hierarchy: 12 direct callers
- Type changes: None (internal refactor)

Files affected:
✅ src/orders.js (definition)
✅ src/api/orders.js:23 (caller)
✅ src/services/checkout.js:67 (caller)
✅ tests/orders.test.js:34 (tests)
... 8 files total

Breaking changes: None
Tests to update: 5
Risk level: LOW

Safe to proceed ✅
```

## Integration

### With Plan Mode
For large refactors:
```bash
# Analyze and create plan
/refactor-assistant analyze legacy/

# Create detailed refactoring plan
/plan-mode Refactor legacy authentication

# Execute step by step
/execute-plan 2026-01-08-refactor-auth
```

### With LSP
Uses LSP to:
- Find ALL references (miss nothing)
- Understand call hierarchy
- Verify type safety
- Update everything automatically

### In Workflow
```bash
# After analysis reveals tech debt
/code-review src/

# Find refactoring opportunities
/refactor-assistant analyze src/

# Plan the refactor
/plan-mode Refactor for testability

# Execute
/execute-plan refactor-user-service

# Verify
/test-generator src/
/code-review src/
```

## Refactoring Patterns

### Guard Clauses
```javascript
// Before
function process(data) {
  if (data) {
    if (data.isValid) {
      // Process
    }
  }
}

// After
function process(data) {
  if (!data) return;
  if (!data.isValid) return;

  // Process
}
```

### Magic Numbers to Constants
```javascript
// Before
if (user.age >= 18) { }

// After
const MINIMUM_AGE = 18;
if (user.age >= MINIMUM_AGE) { }
```

### Strategy Pattern
```javascript
// Before
function calculate(type, value) {
  if (type === 'A') return value * 1.0;
  if (type === 'B') return value * 0.9;
  if (type === 'C') return value * 0.8;
}

// After
const strategies = {
  A: (value) => value * 1.0,
  B: (value) => value * 0.9,
  C: (value) => value * 0.8
};

function calculate(type, value) {
  return strategies[type](value);
}
```

## Safety Checklist

### Before Refactoring
- [ ] All tests passing
- [ ] Code committed to version control
- [ ] Created feature branch
- [ ] Understand current behavior
- [ ] LSP analysis complete

### During Refactoring
- [ ] Make small, incremental changes
- [ ] Run tests after each change
- [ ] Keep commits atomic
- [ ] Update tests as needed

### After Refactoring
- [ ] All tests passing
- [ ] No new warnings/errors
- [ ] Code review complete
- [ ] Documentation updated
- [ ] Performance validated

## Tips

### Start Small
- Refactor one thing at a time
- Don't mix refactoring with features
- Commit frequently

### Keep Tests Green
- Tests should pass after every change
- If test breaks, fix immediately
- Add tests for new code paths

### Use LSP
```bash
# Before renaming
/refactor-assistant --find-references myFunction

# Shows ALL places to update
# No surprises!
```

### Communicate
- Document why refactoring
- Explain trade-offs
- Get team buy-in

## Real-World Examples

### Example 1: Extracting Service Layer

**Before:**
```javascript
// Controller with business logic mixed in
app.post('/api/users', async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save to database
  const user = await db.users.create({
    email,
    password: hashedPassword
  });

  // Send welcome email
  await emailService.send(email, 'Welcome!');

  res.json(user);
});
```

**After:**
```javascript
// Clean controller
app.post('/api/users', async (req, res) => {
  try {
    const user = await userService.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Business logic in service
class UserService {
  async create(userData) {
    this.validate(userData);

    const hashedPassword = await this.hashPassword(
      userData.password
    );

    const user = await this.saveUser({
      email: userData.email,
      password: hashedPassword
    });

    await this.sendWelcomeEmail(user.email);

    return user;
  }

  validate(userData) {
    if (!userData.email || !userData.password) {
      throw new Error('Missing required fields');
    }
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async saveUser(userData) {
    return db.users.create(userData);
  }

  async sendWelcomeEmail(email) {
    return emailService.send(email, 'Welcome!');
  }
}
```

### Example 2: Reducing Complexity

**Before:** (Complexity: 23)
```javascript
function validateInput(input) {
  if (input.type === 'email') {
    if (input.value.includes('@')) {
      if (input.value.length > 5) {
        if (!input.value.startsWith('@')) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else if (input.type === 'phone') {
    // More nested conditions...
  }
  return false;
}
```

**After:** (Complexity: 6)
```javascript
function validateInput(input) {
  const validators = {
    email: validateEmail,
    phone: validatePhone
  };

  const validator = validators[input.type];
  return validator ? validator(input.value) : false;
}

function validateEmail(email) {
  if (!email.includes('@')) return false;
  if (email.length <= 5) return false;
  if (email.startsWith('@')) return false;
  return true;
}

function validatePhone(phone) {
  // Simple, focused logic
}
```

## Remember

Good refactoring:
- **Improves code** without changing behavior
- **Is incremental** - small, safe steps
- **Is tested** - verify at each step
- **Is reversible** - can roll back
- **Has clear goals** - know the "why"

Refactor to make code better, not just different!

---

**Part of Think Again Skills v1.2.0**
