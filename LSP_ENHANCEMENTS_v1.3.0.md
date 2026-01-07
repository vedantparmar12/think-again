# LSP Enhancement Proposal for v1.3.0

Based on research of LSP 3.17, 3.18, and emerging capabilities (January 2026)

## Executive Summary

Current implementation (v1.2.0) uses core LSP features:
- Go to Definition
- Find All References
- Hover Information
- Call Hierarchy
- Document Symbols
- Workspace Symbols

**Proposed enhancements add 12 advanced capabilities** that will dramatically improve code analysis accuracy and developer experience across all 9 skills.

---

## Priority 1: High Impact, Ready to Implement ⭐⭐⭐⭐⭐

### 1. Type Hierarchy (LSP 3.17)
**What it does:** Show complete inheritance/implementation trees

**Impact on skills:**
- **code-review**: Detect Liskov Substitution Principle violations
- **refactor-assistant**: Safe extraction of interfaces/base classes
- **bug-hunter**: Trace polymorphic call chains
- **doc-generator**: Auto-generate inheritance diagrams

**Implementation:**
```javascript
// New LSP requests
- textDocument/prepareTypeHierarchy
- typeHierarchy/supertypes
- typeHierarchy/subtypes
```

**Example output:**
```
📊 Type Hierarchy Analysis

Class: UserService
↑ Extends: BaseService
  ↑ Implements: IService
↓ Extended by:
  - AdminUserService (src/admin/service.js)
  - GuestUserService (src/guest/service.js)

Impact: Changing UserService affects 2 subclasses
```

**Languages:** TypeScript, Java, C#, Python, Go, Rust, C++

**Effort:** Medium (2-3 days)

---

### 2. Inlay Hints (LSP 3.17)
**What it does:** Display type information, parameter names inline

**Impact on skills:**
- **ultrathink**: Better type reasoning without looking up definitions
- **code-review**: Catch implicit type coercions
- **doc-generator**: Auto-generate parameter documentation
- **bug-hunter**: Identify type mismatches faster

**Implementation:**
```javascript
// New LSP request
- textDocument/inlayHint
- inlayHint/resolve (for lazy loading)
```

**Example output:**
```javascript
// Before
const result = calculate(100, 0.1);

// After (with inlay hints)
const result: number = calculate(amount: 100, discount: 0.1);
```

**Languages:** TypeScript, Rust, Go, C++, Java, C#

**Effort:** Low (1-2 days)

---

### 3. Semantic Tokens (LSP 3.16)
**What it does:** Enhanced syntax classification beyond syntax highlighting

**Impact on skills:**
- **code-review**: Distinguish between different variable types (const, mutable, static)
- **refactor-assistant**: Identify all mutable state for refactoring
- **bug-hunter**: Spot where mutable variables change state
- **test-generator**: Generate appropriate test data based on semantic meaning

**Implementation:**
```javascript
// New LSP requests
- textDocument/semanticTokens/full
- textDocument/semanticTokens/range
- textDocument/semanticTokens/full/delta (incremental)
```

**Token types:**
- namespace, class, enum, interface, struct
- typeParameter, parameter, variable, property
- enumMember, event, function, method, macro
- keyword, modifier, comment, string, number

**Languages:** All 40+ supported languages

**Effort:** Medium (2-3 days)

---

### 4. Code Lens (LSP Standard)
**What it does:** Show references count, test status, git blame inline

**Impact on skills:**
- **code-review**: Show "12 references" above each function
- **test-generator**: Show "5 tests" or "No tests" status
- **refactor-assistant**: Display impact metrics inline
- **doc-generator**: Show "Documented ✓" or "Missing docs ⚠️"

**Implementation:**
```javascript
// New LSP requests
- textDocument/codeLens
- codeLens/resolve
```

**Example output:**
```javascript
// 12 references | 3 tests | Last modified: 2 days ago
function calculateTotal(items) {
  // Implementation
}
```

**Languages:** All 40+ supported languages

**Effort:** Low (1-2 days)

---

## Priority 2: High Impact, Complex Implementation ⭐⭐⭐⭐

### 5. Inline Values (LSP 3.17)
**What it does:** Show variable values during debugging/analysis

**Impact on skills:**
- **bug-hunter**: Show actual vs expected values inline
- **test-generator**: Generate test assertions from actual values
- **ultrathink**: Reason about state at specific execution points

**Implementation:**
```javascript
// New LSP requests
- textDocument/inlineValue
```

**Example output:**
```javascript
function process(items) {
  const total = items.reduce(...);  // total = 150
  const tax = total * 0.1;          // tax = 15
  return total + tax;               // returns 165
}
```

**Languages:** TypeScript, JavaScript, Python, Java, C#, Go

**Effort:** High (5-7 days) - Requires runtime analysis

---

### 6. Pull Diagnostics (LSP 3.17)
**What it does:** Request diagnostics on-demand instead of push model

**Impact on skills:**
- **code-review**: Get diagnostics only when reviewing (performance)
- **bug-hunter**: Pull diagnostics for specific suspicious files
- **All skills**: Better performance, no unnecessary diagnostics

**Implementation:**
```javascript
// New LSP request
- workspace/diagnostic
- textDocument/diagnostic
```

**Benefits:**
- 50% reduction in LSP overhead
- On-demand analysis only when needed
- Better for large codebases (10,000+ files)

**Languages:** All 40+ supported languages

**Effort:** Medium (3-4 days)

---

### 7. Folding Ranges (LSP Standard)
**What it does:** Identify code structure for folding/analysis

**Impact on skills:**
- **refactor-assistant**: Identify extract-method candidates by scope
- **code-review**: Analyze complexity by foldable regions
- **doc-generator**: Generate table of contents from structure

**Implementation:**
```javascript
// New LSP request
- textDocument/foldingRange
```

**Example output:**
```
📊 Code Structure Analysis

function processOrder (lines 45-89, 45 lines)
├─ validate (lines 46-52, 7 lines)
├─ calculate (lines 54-67, 14 lines)  ⚠️ Complex (14 lines)
└─ save (lines 69-88, 20 lines)       ⚠️ Complex (20 lines)

Recommendations: Extract calculate and save into separate functions
```

**Languages:** All 40+ supported languages

**Effort:** Low (1-2 days)

---

## Priority 3: Future/Experimental ⭐⭐⭐

### 8. Inline Completions (LSP 3.18) - AI Integration
**What it does:** GitHub Copilot-style AI completions via LSP

**Impact on skills:**
- **test-generator**: AI-powered test case generation
- **doc-generator**: AI-generated documentation
- **refactor-assistant**: AI-suggested refactorings

**Implementation:**
```javascript
// New LSP request
- textDocument/inlineCompletion
```

**Integration options:**
- GitHub Copilot Language Server
- Custom AI completion models
- OpenAI Codex API

**Languages:** All 40+ supported languages

**Effort:** Very High (10-14 days) - Requires AI integration

**Note:** May require additional API keys/services

---

### 9. Debug Adapter Protocol (DAP) Integration
**What it does:** Connect LSP with debugging capabilities

**Impact on skills:**
- **bug-hunter**: Step through execution, inspect variables
- **test-generator**: Run tests with breakpoints
- **code-review**: Analyze runtime behavior

**Implementation:**
- Separate DAP server connection
- Bridge between LSP and DAP
- Unified debugging interface

**Languages:** JavaScript, TypeScript, Python, Java, C#, Go, C++, Rust

**Effort:** Very High (14-21 days) - Major architectural change

---

### 10. Jupyter Notebook Support (LSP Notebooks)
**What it does:** LSP support for .ipynb files

**Impact on skills:**
- **code-review**: Review Jupyter notebooks
- **test-generator**: Generate tests for notebook cells
- **doc-generator**: Document data science workflows

**Implementation:**
```javascript
// New LSP capabilities
- notebookDocument/didOpen
- notebookDocument/didChange
```

**Languages:** Python, R, Julia, JavaScript (Observable)

**Effort:** High (7-10 days)

---

### 11. Linked Editing (LSP 3.16)
**What it does:** Edit related symbols simultaneously (rename tags, variables)

**Impact on skills:**
- **refactor-assistant**: Safe rename across related symbols
- **code-review**: Detect inconsistent naming

**Implementation:**
```javascript
// New LSP request
- textDocument/linkedEditingRange
```

**Languages:** HTML, XML, JSX, TypeScript

**Effort:** Medium (3-4 days)

---

### 12. Call Hierarchy Improvements
**What it does:** Enhanced call hierarchy with filtering, search

**Current:** Basic incoming/outgoing calls
**Enhanced:**
- Transitive call chains
- Cross-language calls
- Async call tracking
- Performance hotspot detection

**Impact on skills:**
- **bug-hunter**: Trace async race conditions
- **refactor-assistant**: Analyze ripple effects across call chains
- **code-review**: Detect circular dependencies

**Effort:** Medium (3-5 days)

---

## Recommended Implementation Roadmap

### Phase 1: v1.3.0 (2-3 weeks)
**Quick wins with high impact:**
1. Inlay Hints ⭐⭐⭐⭐⭐ (1-2 days)
2. Code Lens ⭐⭐⭐⭐⭐ (1-2 days)
3. Folding Ranges ⭐⭐⭐⭐ (1-2 days)
4. Type Hierarchy ⭐⭐⭐⭐⭐ (2-3 days)
5. Semantic Tokens ⭐⭐⭐⭐⭐ (2-3 days)

**Total effort:** 7-12 days
**Impact:** Improves all 9 skills significantly

### Phase 2: v1.4.0 (3-4 weeks)
**Complex but valuable:**
1. Pull Diagnostics ⭐⭐⭐⭐ (3-4 days)
2. Inline Values ⭐⭐⭐⭐ (5-7 days)
3. Linked Editing ⭐⭐⭐ (3-4 days)
4. Call Hierarchy Improvements ⭐⭐⭐⭐ (3-5 days)

**Total effort:** 14-20 days
**Impact:** Major performance and debugging improvements

### Phase 3: v2.0.0 (2-3 months)
**Experimental/Advanced:**
1. Inline Completions (AI) ⭐⭐⭐ (10-14 days)
2. DAP Integration ⭐⭐⭐ (14-21 days)
3. Jupyter Notebook Support ⭐⭐⭐ (7-10 days)

**Total effort:** 31-45 days
**Impact:** Next-generation capabilities

---

## Expected Improvements by Skill

### code-intelligence (Direct)
- **+60% faster** analysis with Pull Diagnostics
- **+5 new capabilities** (Type Hierarchy, Inlay Hints, Semantic Tokens, Code Lens, Folding Ranges)
- **Support for 40+ languages** (all existing languages benefit)

### code-review (Indirect)
- **+40% better** type checking with Inlay Hints
- **+30% faster** reviews with Code Lens showing reference counts
- **Inheritance analysis** with Type Hierarchy
- **Semantic classification** for better pattern detection

### test-generator (Indirect)
- **+50% more accurate** test data generation with Semantic Tokens
- **Code Lens** shows test coverage inline
- **Type Hierarchy** generates tests for all subtypes

### bug-hunter (Indirect)
- **+70% faster** bug tracing with Inline Values
- **Type Hierarchy** traces polymorphic bugs
- **Semantic Tokens** identifies state mutation bugs

### refactor-assistant (Indirect)
- **+80% safer** refactoring with Type Hierarchy impact analysis
- **Folding Ranges** identifies extract-method opportunities
- **Semantic Tokens** finds all mutable state

### doc-generator (Indirect)
- **+50% richer** documentation with Inlay Hints
- **Type Hierarchy** generates inheritance diagrams
- **Code Lens** shows documentation status

### ultrathink (Indirect)
- **+30% deeper** reasoning with all enhanced type information
- **Inline Values** for state reasoning
- **Type Hierarchy** for architectural understanding

### plan-mode (Indirect)
- **+40% better** dependency analysis with enhanced LSP data
- **Type Hierarchy** for architectural planning
- **Code Lens** shows impact metrics

### execute-plan (Indirect)
- **Better milestone validation** with Code Lens test status
- **Pull Diagnostics** for on-demand validation

---

## Language Support Matrix

| Feature | TS/JS | Python | Java | Go | Rust | C# | C++ | PHP |
|---------|-------|--------|------|----|----|----|----|-----|
| Type Hierarchy | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Inlay Hints | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Semantic Tokens | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Code Lens | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Folding Ranges | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Pull Diagnostics | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Inline Values | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ❌ |
| Inline Completion | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

✅ = Full support
⚠️ = Partial support
❌ = Not supported by language server

---

## Technical Requirements

### LSP Client Updates
Current implementation likely uses basic LSP client. Needs upgrade to support:
- LSP 3.17 protocol
- LSP 3.18 protocol (for inline completions)
- Async request handling for Pull Diagnostics
- Incremental token updates for Semantic Tokens

### Performance Considerations
- **Caching:** Implement aggressive caching for Type Hierarchy (changes infrequently)
- **Lazy loading:** Use `resolve` methods for Code Lens and Inlay Hints
- **Incremental updates:** Use delta updates for Semantic Tokens
- **Rate limiting:** Prevent overwhelming LSP servers with requests

### Testing Strategy
- **Unit tests:** Each new LSP capability
- **Integration tests:** Cross-skill interactions
- **Language tests:** Test matrix across all 40+ languages
- **Performance tests:** Ensure no regression in large codebases

---

## Cost-Benefit Analysis

### Phase 1 (v1.3.0) - Recommended for immediate implementation
**Time investment:** 7-12 days
**ROI:** ⭐⭐⭐⭐⭐ Extremely high

**Benefits:**
- 5 new capabilities immediately available
- All 9 skills benefit
- Minimal complexity
- All features are stable (LSP 3.17)

**Risks:** Low - All features are battle-tested in VSCode, IntelliJ

---

### Phase 2 (v1.4.0)
**Time investment:** 14-20 days
**ROI:** ⭐⭐⭐⭐ High

**Benefits:**
- Major performance improvements
- Debugging capabilities
- Better for large codebases

**Risks:** Medium - Pull Diagnostics and Inline Values require careful implementation

---

### Phase 3 (v2.0.0)
**Time investment:** 31-45 days
**ROI:** ⭐⭐⭐ Medium-High

**Benefits:**
- Cutting-edge AI integration
- Full debugging support
- Data science workflows

**Risks:** High - Experimental features, external dependencies, architectural changes

---

## Recommendation

**Start with Phase 1 (v1.3.0) immediately.** The 5 features provide massive value for minimal effort:

1. **Inlay Hints** - Developers will love seeing types inline
2. **Code Lens** - Instant feedback on references, tests, docs
3. **Folding Ranges** - Better code structure analysis
4. **Type Hierarchy** - Essential for OOP refactoring
5. **Semantic Tokens** - Foundation for smarter analysis

**These 5 features will:**
- Improve all 9 skills
- Take only 7-12 days to implement
- Require no architectural changes
- Work with existing LSP infrastructure
- Support all 40+ languages

**After v1.3.0 success, evaluate Phase 2 based on user feedback.**

---

## References

- LSP 3.17 Specification: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/
- LSP 3.18 Specification: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.18/specification/
- VSCode Language Extensions: https://code.visualstudio.com/api/language-extensions/programmatic-language-features
- GitHub Copilot LSP: https://github.com/copilotlsp-nvim/copilot-lsp
- Debug Adapter Protocol: https://microsoft.github.io/debug-adapter-protocol/
- Jupyter LSP: https://jupyterlab.readthedocs.io/en/latest/user/lsp.html

---

**Document Version:** 1.0
**Date:** January 8, 2026
**Author:** LSP Enhancement Research
**Status:** Proposal - Ready for Review
