# Documentation Generator Skill

Automatically generate comprehensive documentation from code using LSP.

## Quick Start

```bash
# Generate API documentation
/doc-generator --api src/

# Generate README
/doc-generator --readme

# Generate architecture docs
/doc-generator --architecture

# Generate all documentation
/doc-generator --all src/
```

## What It Does

### 📝 API Documentation
- Function/method documentation
- Parameter descriptions
- Return value documentation
- Usage examples
- Type definitions

### 📖 README Files
- Project overview
- Installation instructions
- Usage examples
- Configuration guide

### 🏗️ Architecture Documentation
- System architecture
- Component diagrams
- Data flow
- Design decisions

### 💬 Code Comments
- Function headers
- Complex logic explanation
- JSDoc/Docstring generation
- Type annotations

### 📋 Changelogs
- Version history
- Breaking changes
- New features
- Bug fixes

## Examples

### Example 1: Function Documentation

**Input Code:**
```javascript
function calculateTotal(items, discount = 0) {
  return items.reduce((sum, item) =>
    sum + item.price * item.quantity, 0
  ) * (1 - discount);
}
```

**Generated Documentation:**
````markdown
## calculateTotal

Calculate the total price of items with optional discount.

### Signature

```javascript
function calculateTotal(items: Item[], discount?: number): number
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `items` | `Item[]` | Yes | Array of items to calculate total for |
| `discount` | `number` | No | Discount percentage (0-1). Default: 0 |

### Returns

`number` - The total price after applying discount

### Example

```javascript
const items = [
  { price: 10, quantity: 2 },
  { price: 20, quantity: 1 }
];

const total = calculateTotal(items);
// Returns: 40

const totalWithDiscount = calculateTotal(items, 0.1);
// Returns: 36 (10% discount)
```

### Throws

- `TypeError` - If items is not an array
- `ValidationError` - If discount is not between 0 and 1
````

### Example 2: Class Documentation

**Input Code:**
```javascript
class UserService {
  constructor(database) {
    this.db = database;
  }

  async findById(id) {
    return this.db.users.findOne({ id });
  }

  async create(userData) {
    return this.db.users.create(userData);
  }
}
```

**Generated Documentation:**
````markdown
## UserService

Service for managing user operations.

### Constructor

```javascript
constructor(database: Database)
```

Creates a new UserService instance.

**Parameters:**
- `database` - Database connection instance

### Methods

#### findById

```javascript
async findById(id: string): Promise<User | null>
```

Find a user by their unique identifier.

**Parameters:**
- `id` - User's unique identifier

**Returns:** User object if found, null otherwise

**Example:**
```javascript
const user = await userService.findById('user-123');
if (user) {
  console.log(user.name);
}
```

#### create

```javascript
async create(userData: CreateUserDTO): Promise<User>
```

Create a new user.

**Parameters:**
- `userData` - User data object

**Returns:** Created user object

**Throws:**
- `ValidationError` - If user data is invalid
- `DuplicateError` - If email already exists
````

### Example 3: README Generation

**Generated README:**
```markdown
# My Awesome Project

Brief description of the project.

## Features

- ✅ User authentication
- ✅ RESTful API
- ✅ Database integration
- ✅ Real-time updates

## Installation

```bash
npm install my-awesome-project
```

## Quick Start

```javascript
import { MyProject } from 'my-awesome-project';

const app = new MyProject();
await app.start();
```

## API Documentation

See [API.md](./docs/API.md) for complete API documentation.

## Configuration

```javascript
{
  port: 3000,
  database: {
    host: 'localhost',
    port: 5432
  }
}
```

## Contributing

Pull requests are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
```

### Example 4: Code Comments

**Before:**
```javascript
function processPayment(amount, card) {
  const fee = amount * 0.029 + 0.30;
  const total = amount + fee;

  if (total > card.limit) {
    throw new Error('Exceeds limit');
  }

  return charge(card, total);
}
```

**After:**
```javascript
/**
 * Process a payment with the given card
 *
 * Calculates the total including processing fees (2.9% + $0.30)
 * and validates against the card limit before charging.
 *
 * @param {number} amount - Payment amount in dollars
 * @param {Card} card - Credit card object
 * @returns {Promise<Transaction>} Completed transaction
 * @throws {Error} If total exceeds card limit
 *
 * @example
 * const transaction = await processPayment(100.00, card);
 * console.log(transaction.id);
 */
function processPayment(amount, card) {
  // Calculate processing fee: 2.9% + $0.30
  const fee = amount * 0.029 + 0.30;
  const total = amount + fee;

  // Validate against card limit
  if (total > card.limit) {
    throw new Error('Exceeds limit');
  }

  return charge(card, total);
}
```

### Example 5: Changelog Generation

**From Git History:**
```markdown
# Changelog

All notable changes to this project.

## [Unreleased]

### Added
- New user profile page (#45)
- Export functionality (#67)

### Fixed
- Login bug on mobile (#52)
- Memory leak in cache (#58)

## [1.2.0] - 2024-01-15

### Added
- User authentication system (#23)
- Password reset feature (#34)

### Changed
- **BREAKING**: API endpoint changed from `/api/v1/users` to `/api/v2/users`
- Improved error messages

### Fixed
- Fixed race condition in auth (#43)
- Fixed validation bug (#44)

### Security
- Fixed SQL injection vulnerability (#45)

## [1.1.0] - 2024-01-01

### Added
- Search functionality (#12)
- User profiles (#18)

### Fixed
- Pagination bug (#20)

## [1.0.0] - 2023-12-01

- Initial release
```

## Language-Specific Formats

### JavaScript/TypeScript (JSDoc)
```javascript
/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier
 * @property {string} name - User's name
 * @property {string} email - User's email
 */

/**
 * @param {string} id - User ID
 * @returns {Promise<User|null>} User or null
 * @throws {DatabaseError} If query fails
 */
async function findUser(id) {
  // Implementation
}
```

### Python (Docstrings)
```python
def find_user(user_id: str) -> Optional[User]:
    """
    Find a user by their ID.

    Args:
        user_id: The user's unique identifier

    Returns:
        User object if found, None otherwise

    Raises:
        DatabaseError: If database query fails
        ValidationError: If user_id is invalid

    Example:
        >>> user = find_user("user-123")
        >>> if user:
        ...     print(user.name)
    """
    pass
```

### Go (GoDoc)
```go
// FindUser finds a user by their unique identifier.
//
// Returns the user if found, nil if not found, and an error
// if the database query fails.
//
// Example:
//
//  user, err := FindUser(ctx, "user-123")
//  if err != nil {
//      return err
//  }
//  if user != nil {
//      fmt.Println(user.Name)
//  }
func FindUser(ctx context.Context, id string) (*User, error) {
    // Implementation
    return nil, nil
}
```

### Rust (RustDoc)
```rust
/// Finds a user by their unique identifier.
///
/// # Arguments
///
/// * `id` - The user's unique identifier
///
/// # Returns
///
/// * `Ok(Some(User))` - User found
/// * `Ok(None)` - User not found
/// * `Err(DatabaseError)` - Database query failed
///
/// # Examples
///
/// ```
/// let user = find_user("user-123").await?;
/// if let Some(user) = user {
///     println!("Found: {}", user.name);
/// }
/// ```
pub async fn find_user(id: &str) -> Result<Option<User>, DatabaseError> {
    // Implementation
    Ok(None)
}
```

## Integration

### With LSP
Uses LSP to extract:
- Exact function signatures
- Parameter types
- Return types
- Dependencies
- Usage examples from real code

### In Workflow
```bash
# After implementing feature
/execute-plan auth-feature

# Generate tests
/test-generator src/auth/

# Review code
/code-review src/auth/

# Generate documentation
/doc-generator --api src/auth/
/doc-generator --readme
```

## Documentation Types

### API Documentation
```bash
# Single file
/doc-generator --api src/api/users.js

# Entire module
/doc-generator --api src/services/

# With examples
/doc-generator --api --examples src/
```

### README Generation
```bash
# Auto-generate README
/doc-generator --readme

# Include all sections
/doc-generator --readme --full
```

### Architecture Docs
```bash
# System architecture
/doc-generator --architecture

# Include diagrams
/doc-generator --architecture --diagrams
```

### Code Comments
```bash
# Add missing comments
/doc-generator --comments src/

# JSDoc format
/doc-generator --comments --jsdoc src/

# Update existing
/doc-generator --comments --update src/
```

### Changelog
```bash
# From git history
/doc-generator --changelog

# For specific version
/doc-generator --changelog --version 1.2.0

# Since last tag
/doc-generator --changelog --since v1.1.0
```

## Best Practices

### 1. Clear and Concise
```
❌ Bad: "This function does stuff"
✅ Good: "Calculates total price with discount"
```

### 2. Include Examples
```
✅ Always show how to use the API
✅ Include common use cases
✅ Show edge cases when relevant
```

### 3. Document Parameters
```
✅ Name, type, and description
✅ Required vs optional
✅ Default values
✅ Valid ranges
```

### 4. Document Errors
```
✅ What exceptions can be thrown
✅ Under what conditions
✅ How to handle them
```

### 5. Keep Updated
```
✅ Regenerate when code changes
✅ Review generated docs
✅ Add domain-specific details
```

## Output Formats

### Markdown
- README.md
- API.md
- ARCHITECTURE.md
- CHANGELOG.md

### HTML
- API documentation site
- GitHub Pages
- Docusaurus

### JSON/YAML
- OpenAPI/Swagger specs
- Postman collections
- API schemas

## Tips

### Generate Incrementally
```bash
# As you code
/doc-generator --api src/newFeature.js

# Don't wait until the end
```

### Review Generated Docs
- Check accuracy
- Add business context
- Include domain knowledge
- Clarify non-obvious behavior

### Use with CI/CD
```bash
# In pre-commit hook
/doc-generator --comments --check

# In CI pipeline
/doc-generator --api --validate
```

### Keep It Fresh
```bash
# After major changes
/doc-generator --all --update

# Verify docs match code
```

## Real-World Example

### Complete Documentation Workflow

```bash
# 1. Implement feature
/execute-plan user-auth

# 2. Generate tests
/test-generator src/auth/

# 3. Review code
/code-review src/auth/

# 4. Generate API docs
/doc-generator --api src/auth/

# 5. Update README
/doc-generator --readme --update

# 6. Generate changelog
/doc-generator --changelog --version 1.2.0

# 7. Add code comments
/doc-generator --comments src/auth/

# Ready to merge!
git add .
git commit -m "Add user authentication with tests and docs"
```

## Remember

Good documentation:
- **Is accurate** - Matches code exactly
- **Is complete** - Covers all public APIs
- **Is clear** - Easy to understand
- **Has examples** - Shows how to use
- **Is current** - Updated with code

Documentation is code for humans. Make it good!

---

**Part of Think Again Skills v1.2.0**
