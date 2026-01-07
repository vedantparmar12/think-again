---
name: test-generator
description: Automatically generate comprehensive test cases from code using LSP-powered analysis. Creates unit tests, integration tests, edge cases, and mocks. Integrates with execute-plan for test milestones and code-intelligence for accurate test generation.
metadata:
  short-description: Generate tests from code automatically
  version: 1.0.0
  author: Custom
  tags: [testing, unit-tests, integration-tests, tdd, lsp]
  integrates-with: [code-intelligence, execute-plan]
---

# TEST GENERATOR MODE - Automated Test Creation

You are now in **TEST GENERATOR MODE**. This mode automatically generates comprehensive test cases from existing code, ensuring high coverage and quality.

## 🎯 What This Skill Does

Generates multiple types of tests:

### 1. Unit Tests
- Function/method tests
- Class tests
- Pure function tests
- Component tests (React/Vue)
- Edge case coverage
- Error condition tests

### 2. Integration Tests
- API endpoint tests
- Database integration
- Service interaction tests
- External API mocking
- End-to-end scenarios

### 3. Test Coverage
- Happy path scenarios
- Edge cases
- Error conditions
- Boundary values
- Null/undefined handling
- Type validation

### 4. Mocks & Fixtures
- Mock data generation
- Stub creation
- Test fixtures
- Factory functions
- Setup/teardown helpers

## 🔍 LSP Integration

Uses LSP (Language Server Protocol) for:
- **Function signatures** - Generate tests matching actual signatures
- **Type information** - Create type-appropriate test data
- **Dependencies** - Identify what needs mocking
- **Call hierarchy** - Understand function usage
- **References** - Find real usage patterns

## 🔗 Integration with Execute-Plan

Works with execute-plan to:
- Add test milestones automatically
- Verify test coverage after each milestone
- Generate tests for new features
- Update tests when code changes

## Test Generation Workflow

### Step 1: Analyze Code

```
📖 Analyzing code to test...

Using LSP:
- Reading function signatures
- Analyzing parameter types
- Finding dependencies
- Understanding return types
- Identifying side effects
```

**For each function/class:**
- Read implementation
- Identify inputs/outputs
- Find dependencies (via LSP)
- Determine test framework
- Check existing tests

### Step 2: Identify Test Cases

```
🎯 Identifying test scenarios

For function: [functionName]
Signature: [signature from LSP]

Test categories needed:
- [ ] Happy path (basic functionality)
- [ ] Edge cases (boundaries, limits)
- [ ] Error cases (invalid input, failures)
- [ ] Integration (with dependencies)
- [ ] Performance (if applicable)
```

**Generate comprehensive test list:**

```
Test Cases for [functionName]:

Happy Path:
1. ✅ Should [expected behavior] when [normal condition]
2. ✅ Should [expected behavior] with [valid input]

Edge Cases:
3. ✅ Should handle empty input
4. ✅ Should handle maximum values
5. ✅ Should handle minimum values
6. ✅ Should handle special characters
7. ✅ Should handle large datasets

Error Cases:
8. ✅ Should throw error when [invalid condition]
9. ✅ Should return error for null input
10. ✅ Should handle network failure
11. ✅ Should validate input types

Integration:
12. ✅ Should work with [dependency A]
13. ✅ Should mock [external service]
```

### Step 3: Generate Test Code

For each test case, generate actual test code:

```
## Test Suite: [FunctionName]

### Test 1: Happy Path

```[language]
describe('[FunctionName]', () => {
  it('should [expected behavior] when [condition]', () => {
    // Arrange
    const input = [test data];
    const expected = [expected output];

    // Act
    const result = functionName(input);

    // Assert
    expect(result).toEqual(expected);
  });
});
```

Reasoning:
[Why this test is important]
[What it validates]
```

### Step 4: Generate Mocks

```
## Mocks & Fixtures

### Mock: [DependencyName]

```[language]
// Mock for [dependency]
const mock[Dependency] = {
  method1: jest.fn().mockResolvedValue([value]),
  method2: jest.fn().mockRejectedValue(new Error('[error]'))
};
```

Purpose:
- Isolates unit under test
- Simulates [dependency] behavior
- Controls test scenarios
```

### Step 5: Generate Setup/Teardown

```
## Test Setup

```[language]
describe('[Module]', () => {
  // Setup
  beforeEach(() => {
    // Initialize test environment
    [setup code]
  });

  // Teardown
  afterEach(() => {
    // Clean up
    [cleanup code]
  });

  // Tests here...
});
```
```

### Step 6: Framework-Specific Generation

#### JavaScript/TypeScript (Jest/Vitest)

```javascript
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { functionName } from './module';

describe('functionName', () => {
  it('should return correct value', () => {
    const result = functionName(input);
    expect(result).toBe(expected);
  });

  it('should handle edge case', () => {
    expect(() => functionName(invalid)).toThrow();
  });
});
```

#### Python (pytest)

```python
import pytest
from module import function_name

def test_function_returns_correct_value():
    result = function_name(input)
    assert result == expected

def test_function_handles_edge_case():
    with pytest.raises(ValueError):
        function_name(invalid)
```

#### Go (testing)

```go
package mypackage

import "testing"

func TestFunctionName(t *testing.T) {
    result := FunctionName(input)
    if result != expected {
        t.Errorf("Expected %v, got %v", expected, result)
    }
}

func TestFunctionNameEdgeCase(t *testing.T) {
    defer func() {
        if r := recover(); r == nil {
            t.Errorf("Expected panic")
        }
    }()
    FunctionName(invalid)
}
```

#### Java (JUnit)

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class FunctionNameTest {
    @Test
    void shouldReturnCorrectValue() {
        var result = functionName(input);
        assertEquals(expected, result);
    }

    @Test
    void shouldHandleEdgeCase() {
        assertThrows(IllegalArgumentException.class,
            () -> functionName(invalid));
    }
}
```

#### Rust (cargo test)

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_function_returns_correct_value() {
        let result = function_name(input);
        assert_eq!(result, expected);
    }

    #[test]
    #[should_panic]
    fn test_function_handles_edge_case() {
        function_name(invalid);
    }
}
```

## Test Pattern Templates

### Pattern 1: Simple Function Test

```
Testing: Pure function with no dependencies

Template:
```javascript
describe('[functionName]', () => {
  it('should [behavior] when [input]', () => {
    const input = [value];
    const result = functionName(input);
    expect(result).toBe([expected]);
  });
});
```

### Pattern 2: Async Function Test

```
Testing: Async/Promise-based function

Template:
```javascript
describe('[asyncFunctionName]', () => {
  it('should resolve with [value]', async () => {
    const result = await asyncFunctionName(input);
    expect(result).toEqual([expected]);
  });

  it('should reject on error', async () => {
    await expect(asyncFunctionName(invalid))
      .rejects.toThrow('[error message]');
  });
});
```

### Pattern 3: Class Test

```
Testing: Class with methods and state

Template:
```javascript
describe('[ClassName]', () => {
  let instance;

  beforeEach(() => {
    instance = new ClassName([params]);
  });

  describe('constructor', () => {
    it('should initialize with correct state', () => {
      expect(instance.property).toBe([value]);
    });
  });

  describe('[methodName]', () => {
    it('should [behavior]', () => {
      const result = instance.methodName([params]);
      expect(result).toBe([expected]);
    });
  });
});
```

### Pattern 4: API Endpoint Test

```
Testing: HTTP API endpoint

Template:
```javascript
describe('POST /api/[endpoint]', () => {
  it('should return 200 on success', async () => {
    const response = await request(app)
      .post('/api/[endpoint]')
      .send([payload])
      .expect(200);

    expect(response.body).toEqual([expected]);
  });

  it('should return 400 on invalid input', async () => {
    const response = await request(app)
      .post('/api/[endpoint]')
      .send([invalid])
      .expect(400);

    expect(response.body.error).toBeDefined();
  });

  it('should return 401 without authentication', async () => {
    await request(app)
      .post('/api/[endpoint]')
      .expect(401);
  });
});
```

### Pattern 5: Database Integration Test

```
Testing: Database operations

Template:
```javascript
describe('[DatabaseOperation]', () => {
  beforeEach(async () => {
    await setupTestDatabase();
  });

  afterEach(async () => {
    await cleanupTestDatabase();
  });

  it('should save to database', async () => {
    const data = [testData];
    await saveToDb(data);

    const retrieved = await getFromDb(data.id);
    expect(retrieved).toEqual(data);
  });

  it('should handle duplicate key error', async () => {
    await saveToDb([data]);
    await expect(saveToDb([data]))
      .rejects.toThrow('Duplicate key');
  });
});
```

### Pattern 6: React Component Test

```
Testing: React component

Template:
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('should render with props', () => {
    render(<ComponentName prop={value} />);
    expect(screen.getByText([text])).toBeInTheDocument();
  });

  it('should handle user interaction', () => {
    const handleClick = jest.fn();
    render(<ComponentName onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should update on state change', () => {
    const { rerender } = render(<ComponentName value={1} />);
    expect(screen.getByText('1')).toBeInTheDocument();

    rerender(<ComponentName value={2} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
```

## Edge Cases to Always Test

### Numerical Functions
```
✅ Zero
✅ Negative numbers
✅ Maximum/minimum values
✅ Infinity
✅ NaN
✅ Floating point precision
```

### String Functions
```
✅ Empty string
✅ Single character
✅ Very long string
✅ Special characters
✅ Unicode/emoji
✅ Null/undefined
```

### Array Functions
```
✅ Empty array
✅ Single element
✅ Large array
✅ Nested arrays
✅ Sparse arrays
✅ Null/undefined
```

### Object Functions
```
✅ Empty object
✅ Null/undefined
✅ Missing properties
✅ Extra properties
✅ Nested objects
✅ Circular references
```

### Date/Time Functions
```
✅ Valid dates
✅ Invalid dates
✅ Edge of month/year
✅ Leap years
✅ Timezones
✅ DST transitions
```

## Test Data Generation

### Generate Realistic Test Data

```
## Test Data Factory

```javascript
// User test data
const createTestUser = (overrides = {}) => ({
  id: '123',
  username: 'testuser',
  email: 'test@example.com',
  createdAt: new Date('2024-01-01'),
  ...overrides
});

// Edge case users
const testUsers = {
  valid: createTestUser(),
  withoutEmail: createTestUser({ email: null }),
  withLongName: createTestUser({ username: 'a'.repeat(100) }),
  withSpecialChars: createTestUser({ username: 'test@#$%' })
};
```

### Generate Test Cases from Types

Using LSP type information:

```
From function signature:
function processOrder(order: Order, user: User): Promise<Receipt>

Generate tests for:
- Valid Order + Valid User → Receipt
- Invalid Order → throws ValidationError
- Null Order → throws TypeError
- Non-existent User → throws NotFoundError
- Database error → throws DatabaseError
```

## Coverage Analysis

After generating tests, analyze coverage:

```
## Test Coverage Report

Function: [functionName]

Coverage:
- Statements: [X%]
- Branches: [X%]
- Functions: [X%]
- Lines: [X%]

Uncovered scenarios:
- [ ] [Scenario 1]
- [ ] [Scenario 2]

Additional tests needed:
1. Test for [uncovered case]
2. Test for [uncovered branch]
```

## Examples

### Example 1: Simple Function

Input code:
```javascript
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

Generated tests:
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

Input code:
```javascript
async function fetchUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) throw new Error('User not found');
  return response.json();
}
```

Generated tests:
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

Input code:
```jsx
function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Generated tests:
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

## Integration with Execute-Plan

When used with execute-plan:

```
Milestone: Implement user authentication

After implementation, auto-generate tests:

📝 Generating tests for milestone...

Functions to test (from LSP):
- login(username, password)
- logout()
- validateToken(token)
- refreshToken(token)

Generated test suite:
✅ auth.test.js (45 tests)
  - login: 15 tests
  - logout: 8 tests
  - validateToken: 12 tests
  - refreshToken: 10 tests

Coverage: 94%

Running tests...
✅ All tests passing

Milestone test verification: PASSED
```

## Best Practices

### Write Descriptive Test Names
```javascript
// ❌ Bad
it('works', () => { ... });

// ✅ Good
it('should return user data when valid ID provided', () => { ... });
```

### Follow AAA Pattern
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

### One Assertion Per Test (Usually)
```javascript
// ✅ Good - Tests one thing
it('should validate email format', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
});

it('should reject invalid email', () => {
  expect(isValidEmail('invalid')).toBe(false);
});
```

### Use Meaningful Test Data
```javascript
// ❌ Bad - Magic values
const user = { name: 'x', age: 1 };

// ✅ Good - Clear intent
const user = { name: 'John Doe', age: 25 };
```

## Remember

Good tests are:
- **Fast** - Run quickly
- **Independent** - Don't depend on each other
- **Repeatable** - Same result every time
- **Self-validating** - Pass or fail clearly
- **Timely** - Written with the code

Generate tests that help developers, not just increase coverage numbers.

---

**TEST GENERATOR MODE ACTIVATED. Generating comprehensive test cases from code.**
