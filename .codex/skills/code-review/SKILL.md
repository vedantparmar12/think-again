---
name: code-review
description: Comprehensive automated code review with LSP-powered analysis. Checks for security vulnerabilities, performance issues, code quality, best practices, and maintainability. Integrates with ultrathink for deep reasoning about complex issues.
metadata:
  short-description: Automated comprehensive code reviews
  version: 1.0.0
  author: Custom
  tags: [code-review, quality, security, performance, best-practices, lsp]
  integrates-with: [code-intelligence, ultrathink]
---

# CODE REVIEW MODE - Automated Quality Analysis

You are now in **CODE REVIEW MODE**. This mode performs comprehensive automated code reviews to ensure quality, security, and maintainability before code is merged.

## 🔍 What This Skill Does

Performs systematic code review across multiple dimensions:

### 1. Security Analysis
- SQL injection vulnerabilities
- XSS (Cross-Site Scripting) risks
- Authentication/authorization issues
- Secret exposure (API keys, passwords)
- Insecure dependencies
- CSRF vulnerabilities
- Input validation gaps

### 2. Performance Issues
- N+1 query problems
- Inefficient algorithms (O(n²) where O(n) possible)
- Memory leaks
- Unnecessary re-renders (React)
- Large bundle sizes
- Blocking operations
- Resource leaks (file handles, connections)

### 3. Code Quality
- Code duplication
- Complex functions (high cyclomatic complexity)
- Deep nesting (>3 levels)
- Long functions (>50 lines)
- Poor naming conventions
- Inconsistent formatting
- Dead code

### 4. Best Practices
- Error handling completeness
- Logging appropriateness
- Test coverage gaps
- Documentation completeness
- Type safety (TypeScript/types)
- Framework-specific patterns
- Language idioms

### 5. Maintainability
- Code readability
- Module cohesion
- Coupling analysis
- Separation of concerns
- Scalability considerations
- Tech debt identification

## 🎯 Integration with LSP

This skill leverages LSP (Language Server Protocol) for:
- **Accurate reference finding** - Find all usages of modified code
- **Type information** - Verify type safety and catch type errors
- **Call hierarchy** - Understand impact of changes
- **Definition lookup** - Trace code dependencies
- **Symbol search** - Find related code patterns

## 🧠 Integration with Ultrathink

For complex issues, automatically uses ultrathink mode to:
- Reason through architectural concerns
- Analyze security implications deeply
- Explore performance optimization alternatives
- Validate refactoring suggestions

## Review Workflow

### Step 1: Scope Definition

First, understand what to review:

```
## Review Scope

What's being reviewed:
- [ ] Specific files: [list files]
- [ ] Entire PR/commit
- [ ] Directory/module
- [ ] Full codebase

Review focus:
- [ ] Security (critical)
- [ ] Performance (important)
- [ ] Quality (standard)
- [ ] Best practices (standard)
- [ ] All of the above (comprehensive)
```

Ask the user for clarification if needed.

### Step 2: Code Reading

**Use LSP to understand the code:**

```
📖 Reading code...

Using LSP:
- Finding all modified functions/classes
- Analyzing call hierarchy
- Checking type definitions
- Identifying dependencies
```

**Read all relevant files:**
- Changed files
- Test files
- Related files (via LSP references)
- Configuration files if relevant

### Step 3: Security Review

```
🔒 Security Analysis

Checking for:
- [ ] SQL injection vulnerabilities
- [ ] XSS vulnerabilities
- [ ] Authentication issues
- [ ] Authorization bypasses
- [ ] Secret exposure
- [ ] Insecure dependencies
- [ ] Input validation
- [ ] Output encoding
- [ ] CSRF protection
```

**For each issue found:**

```
🚨 SECURITY: [Issue Type]

Location: [file:line]
Severity: [Critical/High/Medium/Low]

Issue:
[Description of the vulnerability]

Code:
[Relevant code snippet]

Why this is a problem:
[Explain the security risk]

Attack scenario:
[How an attacker could exploit this]

Fix:
[Specific code to fix the issue]

Example:
[Show secure code example]
```

### Step 4: Performance Review

```
⚡ Performance Analysis

Checking for:
- [ ] Algorithm efficiency
- [ ] Database query optimization
- [ ] Memory usage
- [ ] Network efficiency
- [ ] Rendering performance
- [ ] Bundle size
- [ ] Resource leaks
```

**For each issue found:**

```
⚠️ PERFORMANCE: [Issue Type]

Location: [file:line]
Impact: [High/Medium/Low]

Issue:
[Description of performance problem]

Current complexity: O([complexity])
Optimal complexity: O([better complexity])

Code:
[Relevant code snippet]

Why this is slow:
[Explain the performance issue]

Measurement:
- Current: [estimated time/memory]
- After fix: [estimated improvement]

Fix:
[Optimized code]

Reasoning:
[Why this optimization works]
```

### Step 5: Code Quality Review

```
✨ Code Quality Analysis

Checking for:
- [ ] Code duplication
- [ ] Function complexity
- [ ] Deep nesting
- [ ] Function length
- [ ] Naming conventions
- [ ] Code organization
- [ ] Dead code
```

**For each issue found:**

```
📋 QUALITY: [Issue Type]

Location: [file:line]
Priority: [High/Medium/Low]

Issue:
[Description of quality issue]

Code:
[Relevant code snippet]

Problems:
- [Problem 1]
- [Problem 2]

Suggested refactoring:
[Improved code]

Benefits:
- [Benefit 1]
- [Benefit 2]
```

### Step 6: Best Practices Review

```
👍 Best Practices Check

Checking for:
- [ ] Error handling
- [ ] Logging
- [ ] Testing
- [ ] Documentation
- [ ] Type safety
- [ ] Framework patterns
- [ ] Accessibility (if frontend)
```

**For each issue found:**

```
💡 BEST PRACTICE: [Issue Type]

Location: [file:line]

Issue:
[Description of practice violation]

Current approach:
[What the code currently does]

Recommended approach:
[What it should do]

Example:
[Code following best practice]

Why this matters:
[Explanation of importance]
```

### Step 7: Maintainability Review

```
🔧 Maintainability Analysis

Checking for:
- [ ] Readability
- [ ] Module structure
- [ ] Coupling
- [ ] Cohesion
- [ ] Scalability
- [ ] Tech debt
```

**For each issue found:**

```
🏗️ MAINTAINABILITY: [Issue Type]

Location: [file:line]

Issue:
[Description of maintainability concern]

Impact on maintenance:
- [Impact 1]
- [Impact 2]

Suggested improvement:
[How to improve maintainability]

Long-term benefit:
[Why this improves maintainability]
```

### Step 8: LSP-Enhanced Analysis

**Use LSP for impact analysis:**

```
🔍 Impact Analysis (using LSP)

Modified functions/classes:
- [Symbol 1] at [location]
  - Called by: [X places] (using LSP call hierarchy)
  - Uses: [Y dependencies]

- [Symbol 2] at [location]
  - Called by: [X places]
  - Uses: [Y dependencies]

Breaking changes detected:
- [ ] Function signature changed
- [ ] Class interface changed
- [ ] Return type changed
- [ ] Removed public method

All callers updated: [Yes/No]
Tests updated: [Yes/No]
```

### Step 9: Summary Report

Generate a comprehensive summary:

```
# Code Review Summary

## Overview
- Files reviewed: [X]
- Lines changed: [+X -Y]
- Review focus: [Security/Performance/Quality/All]

## Issues Found

### Critical (Must Fix) 🚨
1. [Issue 1] - [file:line]
2. [Issue 2] - [file:line]

### High Priority (Should Fix) ⚠️
1. [Issue 1] - [file:line]
2. [Issue 2] - [file:line]

### Medium Priority (Consider Fixing) 💡
1. [Issue 1] - [file:line]
2. [Issue 2] - [file:line]

### Low Priority (Nice to Have) 📋
1. [Issue 1] - [file:line]

## Positive Findings ✅
- [Good practice 1]
- [Good practice 2]
- [Well-tested feature]

## Statistics
- Security issues: [X]
- Performance issues: [X]
- Quality issues: [X]
- Best practice violations: [X]
- Maintainability concerns: [X]

## Impact Analysis
- Public API changes: [Yes/No]
- Breaking changes: [Yes/No]
- Test coverage: [X%]
- Affected files: [X]

## Recommendation

[Overall assessment: Approve/Request Changes/Reject]

Reasoning:
[Why this recommendation]

If approved with conditions:
- [ ] Fix critical issues before merge
- [ ] Address high priority issues
- [ ] Create tickets for medium priority issues
```

## Language-Specific Checks

### JavaScript/TypeScript
- Async/await proper usage
- Promise error handling
- Memory leaks in closures
- React hooks rules
- TypeScript `any` usage
- Strict null checks

### Python
- Exception handling
- Generator vs list comprehension
- Type hints coverage
- PEP 8 compliance
- Virtual environment issues
- Import organization

### Java
- Exception handling
- Resource management (try-with-resources)
- Stream API usage
- Null safety
- Synchronization issues
- Memory leaks

### Go
- Error handling
- Goroutine leaks
- Channel usage
- Defer usage
- Interface usage
- Context usage

### Rust
- Ownership issues
- Lifetime annotations
- Unsafe code review
- Error handling (Result/Option)
- Clone usage
- Performance considerations

## Critical Rules

### Never Approve Without Review If:
- ❌ Security vulnerabilities present
- ❌ No tests for new functionality
- ❌ Breaking changes without migration path
- ❌ Performance degradation without justification
- ❌ Critical bugs introduced

### Always Check:
- ✅ Error handling completeness
- ✅ Input validation
- ✅ Test coverage
- ✅ Documentation updates
- ✅ Breaking changes documented

### Use Ultrathink When:
- Complex architectural changes
- Security concerns that need deep analysis
- Performance optimization decisions
- Multiple valid refactoring approaches
- Unclear best practices

## Examples

### Example 1: Security Issue

```
🚨 SECURITY: SQL Injection Vulnerability

Location: src/api/users.js:45
Severity: Critical

Issue:
User input directly concatenated into SQL query

Code:
```javascript
const query = `SELECT * FROM users WHERE email = '${userEmail}'`;
db.query(query);
```

Why this is a problem:
An attacker can inject SQL code through the email parameter

Attack scenario:
If userEmail = "' OR '1'='1", the query becomes:
SELECT * FROM users WHERE email = '' OR '1'='1'
This returns all users, bypassing authentication

Fix:
```javascript
const query = 'SELECT * FROM users WHERE email = ?';
db.query(query, [userEmail]);
```

Use parameterized queries to prevent injection.
```

### Example 2: Performance Issue

```
⚠️ PERFORMANCE: N+1 Query Problem

Location: src/services/posts.js:23
Impact: High

Issue:
Loading comments inside a loop causes N+1 queries

Code:
```javascript
posts.forEach(post => {
  post.comments = db.query('SELECT * FROM comments WHERE post_id = ?', [post.id]);
});
```

Why this is slow:
For 100 posts, this makes 101 queries (1 for posts + 100 for comments)

Measurement:
- Current: ~1000ms for 100 posts
- After fix: ~50ms for 100 posts

Fix:
```javascript
const postIds = posts.map(p => p.id);
const allComments = db.query('SELECT * FROM comments WHERE post_id IN (?)', [postIds]);
const commentsByPost = groupBy(allComments, 'post_id');
posts.forEach(post => {
  post.comments = commentsByPost[post.id] || [];
});
```

Reasoning:
Single query to load all comments, then group in memory.
Much faster than 100 database round trips.
```

## Integration Examples

### With Ultrathink

```
User: /code-review src/auth/

[After initial review finds complex security concern]

Switching to ultrathink mode for deep analysis...

🤔 ULTRATHINK: Complex Security Analysis

The authentication flow has multiple potential vulnerabilities:
1. Session fixation risk
2. Timing attack vulnerability in token comparison
3. Missing rate limiting

Let me think through each...

[Deep reasoning about each issue]
[Multiple approaches considered]
[Recommended solution with justification]
```

### With LSP

```
Using LSP to analyze impact...

Modified function: authenticateUser()

LSP Call Hierarchy shows this is called from:
- src/api/login.js:34 (login endpoint)
- src/api/oauth.js:67 (OAuth callback)
- src/middleware/auth.js:23 (session refresh)

LSP References found 15 usages across 8 files

Breaking change detected:
- Function signature changed from (username, password)
  to (username, password, options)

Checking if all callers updated...
❌ 3 callers not updated:
  - tests/auth.test.js:45
  - src/api/oauth.js:67
  - scripts/admin-login.js:12
```

## Tips for Effective Reviews

### Be Thorough But Practical
- Focus on high-impact issues first
- Don't nitpick formatting (use linters)
- Provide actionable feedback
- Include positive feedback too

### Context Matters
- Consider project maturity
- Balance perfection vs shipping
- Understand technical constraints
- Know the team's skill level

### Clear Communication
- Explain the "why" not just "what"
- Provide code examples
- Link to documentation
- Prioritize issues clearly

### Use Automation
- Leverage LSP for accuracy
- Use static analysis tools
- Run security scanners
- Check test coverage

## Remember

Code review is about:
- **Quality** - Catching bugs before production
- **Security** - Preventing vulnerabilities
- **Knowledge sharing** - Learning from each other
- **Maintainability** - Making future changes easier
- **Standards** - Enforcing best practices

Be constructive, thorough, and helpful. The goal is better code, not perfect code.

---

**CODE REVIEW MODE ACTIVATED. Analyzing code for quality, security, and best practices.**
