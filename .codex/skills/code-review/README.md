# Code Review Skill

Comprehensive automated code reviews with LSP-powered analysis.

## Quick Start

```bash
# Review specific files
/code-review src/auth/login.js

# Review entire directory
/code-review src/services/

# Full codebase review
/code-review --full

# Security-focused review
/code-review --security src/
```

## What It Does

Performs comprehensive code reviews across multiple dimensions:

### 🔒 Security Analysis
- SQL injection vulnerabilities
- XSS (Cross-Site Scripting) risks
- Authentication/authorization issues
- Secret exposure (API keys, passwords)
- Insecure dependencies

### ⚡ Performance Issues
- N+1 query problems
- Inefficient algorithms
- Memory leaks
- Blocking operations
- Resource leaks

### ✨ Code Quality
- Code duplication
- Complex functions
- Poor naming conventions
- Dead code
- Deep nesting

### 👍 Best Practices
- Error handling completeness
- Logging appropriateness
- Test coverage gaps
- Documentation completeness
- Type safety

### 🔧 Maintainability
- Code readability
- Module cohesion
- Coupling analysis
- Scalability considerations

## Integration

### With Ultrathink
For complex security or architectural issues:
```bash
/code-review src/auth/
# If complex issues found, automatically uses ultrathink
```

### With LSP
Uses LSP to:
- Find all affected code
- Analyze call hierarchy
- Check type safety
- Understand impact

### In Workflow
```bash
# After implementation
/execute-plan my-feature

# Review before merge
/code-review src/new-feature/
```

## Examples

### Example 1: Security Issue Found

```
🚨 SECURITY: SQL Injection Vulnerability

Location: src/api/users.js:45
Severity: Critical

Issue:
User input directly concatenated into SQL query

Code:
const query = `SELECT * FROM users WHERE email = '${userEmail}'`;

Attack scenario:
If userEmail = "' OR '1'='1", returns all users

Fix:
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [userEmail]);
```

### Example 2: Performance Issue

```
⚠️ PERFORMANCE: N+1 Query Problem

Location: src/services/posts.js:23
Impact: High

Issue:
Loading comments inside a loop causes N+1 queries

Measurement:
- Current: ~1000ms for 100 posts
- After fix: ~50ms for 100 posts

Fix:
Load all comments in single query, then group in memory
```

### Example 3: Code Quality

```
📋 QUALITY: Function Too Complex

Location: src/utils/validation.js:67
Priority: High

Issue:
Function has cyclomatic complexity of 23 (max recommended: 10)

Suggested refactoring:
Break into smaller validation functions
```

## Review Report Format

```markdown
# Code Review Summary

## Overview
- Files reviewed: 15
- Lines changed: +234 -56
- Review focus: Full

## Issues Found

### Critical (Must Fix) 🚨
1. SQL Injection in user query - src/api/users.js:45
2. Exposed API key in config - src/config/api.js:12

### High Priority (Should Fix) ⚠️
1. N+1 query problem - src/services/posts.js:23
2. Memory leak in cache - src/utils/cache.js:89

### Medium Priority (Consider Fixing) 💡
1. Duplicate code - src/helpers/format.js:34, :67
2. Complex function - src/utils/validation.js:67

### Low Priority (Nice to Have) 📋
1. Improve naming - src/utils/helpers.js:12
2. Add JSDoc comments - src/services/user.js:45

## Positive Findings ✅
- Good error handling in auth module
- Well-tested API endpoints
- Clean separation of concerns

## Recommendation
Request Changes - Fix 2 critical issues before merge
```

## Language Support

Works with all LSP-supported languages:
- JavaScript/TypeScript
- Python
- Java
- Go
- Rust
- C/C++
- C#/.NET
- PHP
- Ruby
- And 30+ more

## Tips

### Run Regularly
```bash
# Before committing
git add .
/code-review --staged

# Before merging PR
/code-review --full
```

### Focus on High-Impact Issues
- Fix Critical and High priority first
- Create tickets for Medium priority
- Consider Low priority for refactor sessions

### Combine with Other Tools
```bash
# Review + Test + Document
/code-review src/
/test-generator src/
/doc-generator src/
```

## Configuration

Can focus on specific areas:

```bash
# Security only
/code-review --security

# Performance only
/code-review --performance

# Quick quality check
/code-review --quality --quick
```

## Remember

Code review is about:
- **Preventing bugs** before they reach production
- **Sharing knowledge** across the team
- **Maintaining quality** over time
- **Improving continuously**

Not about finding fault, but about making better software!

---

**Part of Think Again Skills v1.2.0**
