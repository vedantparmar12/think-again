---
name: doc-generator
description: Automatically generate comprehensive documentation from code using LSP-powered analysis. Creates API docs, README files, architecture documentation, code comments, and changelogs. Integrates with code-intelligence for accurate structure understanding.
metadata:
  short-description: Generate docs from code automatically
  version: 1.0.0
  author: Custom
  tags: [documentation, api-docs, readme, comments, lsp]
  integrates-with: [code-intelligence]
---

# DOCUMENTATION GENERATOR MODE - Automated Documentation

You are now in **DOCUMENTATION GENERATOR MODE**. This mode automatically generates comprehensive, accurate documentation from your codebase using LSP-powered analysis.

## 🎯 What This Skill Does

Generates multiple types of documentation:

### 1. API Documentation
- Function/method documentation
- Parameter descriptions
- Return value documentation
- Usage examples
- Type definitions

### 2. README Files
- Project overview
- Installation instructions
- Usage examples
- Configuration guide
- Contribution guidelines

### 3. Architecture Documentation
- System architecture
- Component diagrams
- Data flow
- Design decisions
- Technology stack

### 4. Code Comments
- Function headers
- Complex logic explanation
- TODO/FIXME tracking
- JSDoc/Docstring generation

### 5. Changelogs
- Version history
- Breaking changes
- New features
- Bug fixes

## 🔍 LSP Integration

Uses LSP for accurate information:
- **Function signatures** - Extract exact parameters and types
- **Type information** - Document types accurately
- **References** - Find usage examples
- **Symbol search** - Find all public APIs
- **Call hierarchy** - Understand relationships

## Documentation Workflow

### Step 1: Determine Documentation Type

```
📚 Documentation Type

What documentation do you need?

1. API Documentation
   - Document all public functions/classes
   - Generate from code signatures
   - Include examples

2. README
   - Project overview
   - Getting started guide
   - Usage examples

3. Architecture Docs
   - System design
   - Component relationships
   - Data flow

4. Code Comments
   - Add missing function headers
   - Document complex logic
   - Add type annotations

5. Changelog
   - Generate from git history
   - Categorize changes
   - Format for release

6. Full Documentation Suite
   - All of the above
```

### Step 2: Analyze Codebase

Using LSP to understand structure:

```
🔍 Analyzing Codebase with LSP

Discovering public APIs...

Modules found: [X]
- [module1] - [description]
- [module2] - [description]

Classes found: [Y]
- [Class1] - [purpose]
  - Methods: [count]
  - Properties: [count]

Functions found: [Z]
- [function1] - [signature]
- [function2] - [signature]

Types found: [T]
- [Type1] - [definition]
- [Type2] - [definition]
```

## Documentation Generation by Type

### Type 1: API Documentation

#### For Functions

Using LSP to get signature:

```
Function: calculateTotal
Signature: (items: Item[], discount?: number) => number
Location: src/utils/pricing.js:45
```

Generated documentation:

````markdown
## calculateTotal

Calculate the total price of items with optional discount.

### Signature

```typescript
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
  { name: 'Widget', price: 10, quantity: 2 },
  { name: 'Gadget', price: 20, quantity: 1 }
];

const total = calculateTotal(items);
// Returns: 40

const totalWithDiscount = calculateTotal(items, 0.1);
// Returns: 36 (10% discount applied)
```

### Throws

- `TypeError` - If items is not an array
- `ValidationError` - If discount is not between 0 and 1

### See Also

- [`applyDiscount`](#applydiscount) - Apply discount to a single value
- [`calculateTax`](#calculatetax) - Calculate tax on a total
````

#### For Classes

Using LSP to analyze class:

```
Class: UserService
Location: src/services/UserService.js
Methods: 8
Properties: 3
```

Generated documentation:

````markdown
## UserService

Service for managing user operations including authentication, profile management, and user queries.

### Constructor

```typescript
constructor(database: Database, logger: Logger)
```

Creates a new UserService instance.

**Parameters:**
- `database` - Database connection instance
- `logger` - Logger instance for service logs

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `db` | `Database` | Database connection (private) |
| `logger` | `Logger` | Logger instance (private) |
| `cache` | `Map<string, User>` | User cache for performance |

### Methods

#### findById

```typescript
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

```typescript
async create(userData: CreateUserDTO): Promise<User>
```

Create a new user.

**Parameters:**
- `userData` - User data transfer object containing:
  - `email` (string, required) - User's email
  - `name` (string, required) - User's full name
  - `password` (string, required) - User's password (will be hashed)

**Returns:** Created user object

**Throws:**
- `ValidationError` - If user data is invalid
- `DuplicateError` - If email already exists

**Example:**
```javascript
const newUser = await userService.create({
  email: 'john@example.com',
  name: 'John Doe',
  password: 'securepassword123'
});
```

### Usage Example

```javascript
import { UserService } from './services/UserService';
import { Database } from './database';
import { Logger } from './logger';

// Initialize service
const db = new Database(config);
const logger = new Logger();
const userService = new UserService(db, logger);

// Create user
const user = await userService.create({
  email: 'test@example.com',
  name: 'Test User',
  password: 'password123'
});

// Find user
const found = await userService.findById(user.id);

// Update user
await userService.update(user.id, { name: 'Updated Name' });

// Delete user
await userService.delete(user.id);
```
````

### Type 2: README Generation

```markdown
# [Project Name]

[Brief description from package.json or inferred from code]

[![Version](https://img.shields.io/badge/version-1.0.0-blue)]
[![License](https://img.shields.io/badge/license-MIT-green)]
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)]

## 📖 Overview

[Project overview - what it does, why it exists]

## ✨ Features

- ✅ [Feature 1 - detected from code]
- ✅ [Feature 2 - detected from code]
- ✅ [Feature 3 - detected from code]

## 🚀 Quick Start

### Prerequisites

```bash
# Requirements detected from package.json/requirements.txt
Node.js >= 16.0.0
npm >= 8.0.0
```

### Installation

```bash
# Installation command based on language
npm install [package-name]
```

### Basic Usage

```javascript
// Example generated from main exports
import { MainClass } from '[package-name]';

const instance = new MainClass(options);
const result = await instance.mainMethod();
```

## 📚 Documentation

### API Documentation

See [API.md](./API.md) for complete API documentation.

### Main Classes

- [`[MainClass]`](./docs/MainClass.md) - [Description]
- [`[OtherClass]`](./docs/OtherClass.md) - [Description]

### Configuration

```javascript
{
  // Configuration options detected from code
  option1: 'value',
  option2: true
}
```

## 🧪 Testing

```bash
# Test command from package.json
npm test
```

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [License Name] - see [LICENSE](./LICENSE) file.

## 👥 Authors

- [Author Name] - [GitHub Profile]

## 🙏 Acknowledgments

[If applicable - detected from package.json or comments]
```

### Type 3: Architecture Documentation

```markdown
# Architecture Documentation

## System Overview

[High-level description of the system]

## Architecture Diagram

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  API Layer  │
└──────┬──────┘
       │
       ├──────────┐
       ▼          ▼
┌──────────┐ ┌──────────┐
│ Service  │ │ Service  │
│ Layer    │ │ Layer    │
└────┬─────┘ └────┬─────┘
     │            │
     └──────┬─────┘
            ▼
     ┌──────────┐
     │   Data   │
     │  Layer   │
     └──────────┘
```

## Components

### [Component 1 Name]

**Purpose:** [What this component does]

**Location:** `[directory path]`

**Responsibilities:**
- [Responsibility 1]
- [Responsibility 2]

**Dependencies:**
- [Dependency 1]
- [Dependency 2]

**Key Classes/Functions:**
- `[Class1]` - [Purpose]
- `[Function1]` - [Purpose]

**Example:**
```javascript
[Usage example]
```

### [Component 2 Name]

[Similar structure]

## Data Flow

```
User Request
    ↓
API Endpoint (validates request)
    ↓
Controller (business logic)
    ↓
Service (data operations)
    ↓
Repository (database access)
    ↓
Database
    ↓
Response (back up the chain)
```

## Design Patterns Used

### 1. [Pattern Name]

**Where:** [Components using this pattern]
**Why:** [Reasoning for using this pattern]
**Example:** [Code example]

### 2. [Pattern Name]

[Similar structure]

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | [Tech] | [Purpose] |
| Backend | [Tech] | [Purpose] |
| Database | [Tech] | [Purpose] |
| Cache | [Tech] | [Purpose] |

## Security Considerations

- [Security measure 1]
- [Security measure 2]

## Performance Considerations

- [Performance optimization 1]
- [Performance optimization 2]

## Scalability

[How the system scales]

## Future Improvements

- [ ] [Improvement 1]
- [ ] [Improvement 2]
```

### Type 4: Code Comments Generation

For each function missing documentation:

```javascript
/**
 * Calculate the total price for a list of items
 *
 * This function sums up the prices of all items in the provided array,
 * multiplying each item's price by its quantity. An optional discount
 * can be applied to the final total.
 *
 * @param {Item[]} items - Array of items with price and quantity
 * @param {number} [discount=0] - Discount percentage (0-1)
 * @returns {number} The calculated total price
 * @throws {TypeError} If items is not an array
 * @throws {ValidationError} If discount is not between 0 and 1
 *
 * @example
 * const items = [
 *   { price: 10, quantity: 2 },
 *   { price: 20, quantity: 1 }
 * ];
 * const total = calculateTotal(items, 0.1);
 * // Returns: 36
 */
function calculateTotal(items, discount = 0) {
  // Implementation
}
```

For Python:

```python
def calculate_total(items: List[Item], discount: float = 0.0) -> float:
    """
    Calculate the total price for a list of items.

    This function sums up the prices of all items in the provided list,
    multiplying each item's price by its quantity. An optional discount
    can be applied to the final total.

    Args:
        items: List of items with price and quantity
        discount: Discount percentage (0-1), defaults to 0.0

    Returns:
        The calculated total price

    Raises:
        TypeError: If items is not a list
        ValueError: If discount is not between 0 and 1

    Examples:
        >>> items = [
        ...     Item(price=10, quantity=2),
        ...     Item(price=20, quantity=1)
        ... ]
        >>> calculate_total(items, 0.1)
        36.0
    """
    # Implementation
    pass
```

### Type 5: Changelog Generation

From git history:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- New feature X from commit abc123
- New feature Y from commit def456

### Changed
- Updated dependency Z to v2.0
- Improved performance of function A

### Fixed
- Fixed bug in login flow (#123)
- Fixed memory leak in cache (#124)

## [1.2.0] - 2024-01-15

### Added
- User authentication system (#45)
- Password reset functionality (#67)
- Email verification (#89)

### Changed
- **BREAKING**: Changed API endpoint from `/api/users` to `/api/v2/users`
- Upgraded database schema to v2
- Improved error messages

### Deprecated
- `/api/v1/users` endpoint (will be removed in 2.0.0)

### Removed
- Legacy authentication method

### Fixed
- Fixed race condition in session management (#102)
- Fixed validation error in user registration (#103)

### Security
- Fixed SQL injection vulnerability in search (#104)
- Updated dependencies with security patches

## [1.1.0] - 2024-01-01

### Added
- Search functionality (#23)
- User profiles (#34)

### Fixed
- Fixed broken pagination (#45)

## [1.0.0] - 2023-12-01

- Initial release
```

## Language-Specific Documentation

### JavaScript/TypeScript (JSDoc)

```javascript
/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 */

/**
 * @class UserService
 * @classdesc Service for managing user operations
 */
class UserService {
  /**
   * Create a new user service
   * @constructor
   * @param {Database} db - Database connection
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * Find a user by ID
   * @async
   * @param {string} id - User ID
   * @returns {Promise<User|null>} User object or null
   * @throws {DatabaseError} If database query fails
   */
  async findById(id) {
    // Implementation
  }
}
```

### Python (Docstrings)

```python
class UserService:
    """
    Service for managing user operations.

    This class provides methods for creating, reading, updating,
    and deleting users from the database.

    Attributes:
        db (Database): Database connection instance
        cache (dict): In-memory cache for frequently accessed users

    Example:
        >>> db = Database(config)
        >>> service = UserService(db)
        >>> user = service.find_by_id("user-123")
    """

    def __init__(self, db: Database):
        """
        Initialize the user service.

        Args:
            db: Database connection instance
        """
        self.db = db
        self.cache = {}

    async def find_by_id(self, user_id: str) -> Optional[User]:
        """
        Find a user by their unique identifier.

        Args:
            user_id: User's unique identifier

        Returns:
            User object if found, None otherwise

        Raises:
            DatabaseError: If database query fails
            ValidationError: If user_id is invalid

        Example:
            >>> user = await service.find_by_id("user-123")
            >>> if user:
            ...     print(user.name)
        """
        pass
```

### Go (GoDoc)

```go
// Package userservice provides user management functionality.
//
// This package contains the UserService for handling all user-related
// operations including authentication, profile management, and queries.
package userservice

import (
    "context"
    "database/sql"
)

// User represents a user in the system.
type User struct {
    ID    string // Unique identifier
    Name  string // User's full name
    Email string // User's email address
}

// UserService handles user operations.
//
// Example:
//
//  db, _ := sql.Open("postgres", connStr)
//  service := NewUserService(db)
//  user, err := service.FindByID(context.Background(), "user-123")
type UserService struct {
    db *sql.DB
}

// NewUserService creates a new user service instance.
func NewUserService(db *sql.DB) *UserService {
    return &UserService{db: db}
}

// FindByID finds a user by their unique identifier.
//
// Returns the user if found, nil if not found, and an error if
// the database query fails.
func (s *UserService) FindByID(ctx context.Context, id string) (*User, error) {
    // Implementation
    return nil, nil
}
```

### Rust (RustDoc)

```rust
//! User service module
//!
//! This module provides the `UserService` struct for managing
//! user operations including authentication and profile management.

/// Represents a user in the system
#[derive(Debug, Clone)]
pub struct User {
    /// Unique identifier
    pub id: String,
    /// User's full name
    pub name: String,
    /// User's email address
    pub email: String,
}

/// Service for managing user operations
///
/// # Examples
///
/// ```
/// use myapp::UserService;
///
/// let service = UserService::new(db);
/// let user = service.find_by_id("user-123").await?;
/// ```
pub struct UserService {
    db: Database,
}

impl UserService {
    /// Creates a new user service instance
    ///
    /// # Arguments
    ///
    /// * `db` - Database connection instance
    pub fn new(db: Database) -> Self {
        Self { db }
    }

    /// Finds a user by their unique identifier
    ///
    /// # Arguments
    ///
    /// * `id` - User's unique identifier
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
    /// let user = service.find_by_id("user-123").await?;
    /// if let Some(user) = user {
    ///     println!("Found: {}", user.name);
    /// }
    /// ```
    pub async fn find_by_id(&self, id: &str) -> Result<Option<User>, DatabaseError> {
        // Implementation
        Ok(None)
    }
}
```

## Documentation Best Practices

### 1. Be Clear and Concise
```
❌ Bad: "This does stuff"
✅ Good: "Calculates the total price of items with optional discount"
```

### 2. Include Examples
```
✅ Always include usage examples
✅ Show common use cases
✅ Show edge cases when relevant
```

### 3. Document Parameters Fully
```
✅ Name, type, and description
✅ Whether required or optional
✅ Default values
✅ Valid ranges/values
```

### 4. Document Exceptions/Errors
```
✅ What errors can be thrown
✅ Under what conditions
✅ How to handle them
```

### 5. Keep It Updated
```
✅ Update docs when code changes
✅ Remove docs for deleted code
✅ Version documentation
```

## Documentation Output Formats

### Markdown
- README.md
- API.md
- ARCHITECTURE.md
- CHANGELOG.md

### HTML (generated from markdown)
- API documentation site
- GitHub Pages
- Docusaurus

### JSON/YAML
- OpenAPI/Swagger specs
- Postman collections
- API schemas

### Code Comments
- JSDoc
- Docstrings
- Inline comments

## Integration with LSP

Using LSP for accuracy:

```
Using LSP to extract information...

✅ Function signatures: Exact parameters and return types
✅ Type definitions: Complete type information
✅ Public APIs: All exported functions/classes
✅ Dependencies: What each function uses
✅ Usage examples: Real code using the API

Documentation will be 100% accurate to actual code.
```

## Remember

Good documentation:
- **Is accurate** - Matches the code exactly
- **Is complete** - Covers all public APIs
- **Is clear** - Easy to understand
- **Includes examples** - Shows how to use
- **Is maintained** - Updated with code

Documentation is code for humans. Make it good!

---

**DOCUMENTATION GENERATOR MODE ACTIVATED. Creating comprehensive documentation from code.**
