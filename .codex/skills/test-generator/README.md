# Test Generator Skill

Automatically generate comprehensive test suites from your code.

## Quick Start

```bash
# Generate tests for a function
/test-generator src/utils/calculateTotal.js

# Generate tests for entire module
/test-generator src/services/UserService.js

# Generate tests for directory
/test-generator src/api/

# Generate with coverage analysis
/test-generator --coverage src/
```

## What It Does

Generates multiple types of tests:

### 🧪 Unit Tests
- Function/method tests
- Class tests
- Component tests (React/Vue)
- Edge case coverage
- Error condition tests

### 🔗 Integration Tests
- API endpoint tests
- Database integration
- Service interaction tests
- External API mocking

### 📊 Test Coverage
- Happy path scenarios
- Edge cases
- Error conditions
- Boundary values
- Null/undefined handling

### 🎭 Mocks & Fixtures
- Mock data generation
- Stub creation
- Test fixtures
- Setup/teardown helpers

## Framework Support

Generates tests for multiple frameworks:

### JavaScript/TypeScript
```javascript
// Jest/Vitest
describe('calculateTotal', () => {
  it('should calculate total correctly', () => {
    expect(calculateTotal([{price: 10}])).toBe(10);
  });
});
```

### Python
```python
# pytest
def test_calculate_total():
    result = calculate_total([{'price': 10}])
    assert result == 10
```

### Go
```go
// testing
func TestCalculateTotal(t *testing.T) {
    result := CalculateTotal([]Item{{Price: 10}})
    if result != 10 {
        t.Errorf("Expected 10, got %d", result)
    }
}
```

### Java
```java
// JUnit
@Test
void shouldCalculateTotalCorrectly() {
    assertEquals(10, calculateTotal(items));
}
```

### Rust
```rust
#[test]
fn test_calculate_total() {
    assert_eq!(calculate_total(&items), 10);
}
```

## Integration

### With Execute-Plan
Automatically generate tests for each milestone:
```bash
/execute-plan my-feature
# After each milestone, prompts:
# "Generate tests for this milestone? (Y/n)"
```

### With LSP
Uses LSP to:
- Get exact function signatures
- Understand parameter types
- Find dependencies to mock
- Generate realistic test data

### In Workflow
```bash
# After implementing feature
/execute-plan auth-feature

# Generate comprehensive tests
/test-generator src/auth/

# Review the implementation
/code-review src/auth/
```

## Examples

### Example 1: Simple Function

**Input Code:**
```javascript
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**Generated Tests:**
```javascript
describe('calculateTotal', () => {
  it('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('should sum single item price', () => {
    const items = [{ price: 10 }];
    expect(calculateTotal(items)).toBe(10);
  });

  it('should sum multiple item prices', () => {
    const items = [
      { price: 10 },
      { price: 20 },
      { price: 30 }
    ];
    expect(calculateTotal(items)).toBe(60);
  });

  it('should handle negative prices', () => {
    const items = [{ price: -10 }];
    expect(calculateTotal(items)).toBe(-10);
  });

  it('should handle decimal prices', () => {
    const items = [
      { price: 10.50 },
      { price: 20.75 }
    ];
    expect(calculateTotal(items)).toBeCloseTo(31.25);
  });
});
```

### Example 2: Async API Function

**Input Code:**
```javascript
async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) throw new Error('User not found');
  return response.json();
}
```

**Generated Tests:**
```javascript
describe('fetchUser', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should fetch user successfully', async () => {
    const mockUser = { id: '123', name: 'Test' };
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockUser
    });

    const user = await fetchUser('123');
    expect(user).toEqual(mockUser);
    expect(global.fetch).toHaveBeenCalledWith('/api/users/123');
  });

  it('should throw error when user not found', async () => {
    global.fetch.mockResolvedValue({ ok: false });

    await expect(fetchUser('999'))
      .rejects.toThrow('User not found');
  });

  it('should handle network error', async () => {
    global.fetch.mockRejectedValue(new Error('Network error'));

    await expect(fetchUser('123'))
      .rejects.toThrow('Network error');
  });
});
```

### Example 3: React Component

**Input Code:**
```jsx
function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**Generated Tests:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
  it('should render with default initial value', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should render with custom initial value', () => {
    render(<Counter initialValue={10} />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should increment when button clicked', () => {
    render(<Counter initialValue={5} />);

    const button = screen.getByText('Increment');
    fireEvent.click(button);

    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('should increment multiple times', () => {
    render(<Counter />);

    const button = screen.getByText('Increment');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
```

## Test Patterns

### AAA Pattern (Arrange, Act, Assert)
```javascript
it('should calculate correctly', () => {
  // Arrange - Setup
  const input = [1, 2, 3];
  const expected = 6;

  // Act - Execute
  const result = sum(input);

  // Assert - Verify
  expect(result).toBe(expected);
});
```

### Given-When-Then (BDD Style)
```javascript
describe('User login', () => {
  it('should authenticate with valid credentials', () => {
    // Given valid credentials
    const credentials = { email: 'user@example.com', password: 'pass123' };

    // When user attempts login
    const result = login(credentials);

    // Then authentication succeeds
    expect(result.success).toBe(true);
    expect(result.token).toBeDefined();
  });
});
```

## Coverage Analysis

After generating tests:

```
## Test Coverage Report

Function: calculateTotal

Coverage:
- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%

Test cases generated: 5
- Happy path: 2 tests
- Edge cases: 2 tests
- Error cases: 1 test

All scenarios covered ✅
```

## Tips

### Generate Tests Incrementally
```bash
# As you write code
/test-generator src/newFeature.js

# Don't wait until the end
```

### Review Generated Tests
- Tests are starting points
- Add domain-specific edge cases
- Adjust assertions to match requirements

### Run Tests Immediately
```bash
# After generation
npm test
# or
pytest
# or
go test
```

### Update Tests with Code
When code changes:
```bash
# Regenerate tests
/test-generator --update src/modified.js
```

## Best Practices

### 1. One Assertion Per Test (Usually)
```javascript
// ✅ Good - Tests one thing
it('should validate email format', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
});

it('should reject invalid email', () => {
  expect(isValidEmail('invalid')).toBe(false);
});
```

### 2. Descriptive Test Names
```javascript
// ❌ Bad
it('works', () => { ... });

// ✅ Good
it('should return user data when valid ID provided', () => { ... });
```

### 3. Use Test Data Factories
```javascript
const createTestUser = (overrides = {}) => ({
  id: '123',
  email: 'test@example.com',
  ...overrides
});
```

### 4. Mock External Dependencies
```javascript
// Mock database
jest.mock('./database');

// Mock API calls
global.fetch = jest.fn();
```

## Language Support

Supports test generation for:
- JavaScript/TypeScript (Jest, Vitest, Mocha)
- Python (pytest, unittest)
- Java (JUnit, TestNG)
- Go (testing package)
- Rust (cargo test)
- C# (NUnit, xUnit)
- PHP (PHPUnit)
- Ruby (RSpec, Minitest)

## Remember

Good tests are:
- **Fast** - Run quickly
- **Independent** - Don't depend on each other
- **Repeatable** - Same result every time
- **Self-validating** - Pass or fail clearly
- **Timely** - Written with the code

Generated tests help you get started - refine them to match your needs!

---

**Part of Think Again Skills v1.2.0**
