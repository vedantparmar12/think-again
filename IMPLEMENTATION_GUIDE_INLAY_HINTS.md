# Implementation Guide: Inlay Hints (Phase 1, Feature 1)

**Feature:** Inlay Hints (LSP 3.17)
**Difficulty:** ⭐⭐ Easy
**Time Estimate:** 1-2 days
**Status:** Ready to implement

---

## Why Start with Inlay Hints?

✅ **Easiest to implement** - Simple request/response
✅ **Immediate visual impact** - Users see types inline
✅ **High user satisfaction** - Developers love this feature
✅ **Low risk** - Doesn't modify code, just displays info
✅ **Great learning experience** - Template for other features

---

## What Are Inlay Hints?

Inlay hints display type information, parameter names, and other annotations inline in the code without modifying the actual source.

### Example:

**Before:**
```javascript
function calculate(amount, rate) {
  const result = amount * rate;
  return result;
}
```

**After (with Inlay Hints):**
```javascript
function calculate(amount: number, rate: number): number {
  const result: number = amount * rate;
  return result;
}
```

The `: number` parts are NOT in the file - they're displayed by the editor/tool using LSP inlay hints.

---

## LSP Protocol Overview

### Request
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "textDocument/inlayHint",
  "params": {
    "textDocument": {
      "uri": "file:///path/to/file.ts"
    },
    "range": {
      "start": { "line": 0, "character": 0 },
      "end": { "line": 100, "character": 0 }
    }
  }
}
```

### Response
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "position": { "line": 0, "character": 20 },
      "label": ": number",
      "kind": 1,
      "paddingLeft": false,
      "paddingRight": false
    },
    {
      "position": { "line": 0, "character": 28 },
      "label": ": number",
      "kind": 1,
      "paddingLeft": false,
      "paddingRight": false
    }
  ]
}
```

### Inlay Hint Kinds
- `1` = Type hint
- `2` = Parameter hint

---

## Step-by-Step Implementation

### Step 1: Update LSP Client (if needed)

Check if your LSP client supports LSP 3.17:

```javascript
// Check server capabilities
const capabilities = {
  textDocument: {
    inlayHint: {
      dynamicRegistration: true,
      resolveSupport: {
        properties: ['tooltip', 'textEdits', 'label.tooltip']
      }
    }
  }
};
```

Most modern LSP clients (like `vscode-languageclient`, `lsp-mode`, etc.) already support this.

### Step 2: Add Inlay Hint Request Function

```javascript
// File: src/lsp/inlayHints.js

async function getInlayHints(filePath, startLine = 0, endLine = null) {
  const uri = pathToUri(filePath);
  const document = await readFile(filePath);

  // If no endLine specified, use last line of file
  if (endLine === null) {
    endLine = document.split('\n').length;
  }

  const params = {
    textDocument: { uri },
    range: {
      start: { line: startLine, character: 0 },
      end: { line: endLine, character: 0 }
    }
  };

  try {
    const hints = await lspClient.sendRequest(
      'textDocument/inlayHint',
      params
    );

    return hints || [];
  } catch (error) {
    // Server doesn't support inlay hints
    console.warn('Inlay hints not supported for this file');
    return [];
  }
}

module.exports = { getInlayHints };
```

### Step 3: Format Hints for Display

```javascript
// File: src/lsp/formatHints.js

function formatInlayHints(hints, sourceCode) {
  const lines = sourceCode.split('\n');
  const formattedLines = [...lines];

  // Sort hints by position (reverse order to insert from end)
  const sortedHints = hints.sort((a, b) => {
    if (a.position.line !== b.position.line) {
      return b.position.line - a.position.line;
    }
    return b.position.character - a.position.character;
  });

  // Insert hints into lines
  for (const hint of sortedHints) {
    const line = hint.position.line;
    const char = hint.position.character;
    const currentLine = formattedLines[line];

    // Format hint label
    const label = formatHintLabel(hint);

    // Insert hint at position
    formattedLines[line] =
      currentLine.slice(0, char) +
      label +
      currentLine.slice(char);
  }

  return formattedLines.join('\n');
}

function formatHintLabel(hint) {
  let label = hint.label;

  // Add padding if needed
  if (hint.paddingLeft && !label.startsWith(' ')) {
    label = ' ' + label;
  }
  if (hint.paddingRight && !label.endsWith(' ')) {
    label = label + ' ';
  }

  // Add ANSI color codes for terminal display
  // Gray color for hints (less prominent than actual code)
  return `\x1b[90m${label}\x1b[0m`;
}

module.exports = { formatInlayHints };
```

### Step 4: Integrate with code-intelligence Skill

```javascript
// File: .codex/skills/code-intelligence/handlers/inlayHints.js

const { getInlayHints } = require('../../../src/lsp/inlayHints');
const { formatInlayHints } = require('../../../src/lsp/formatHints');
const { readFile } = require('fs').promises;

async function showInlayHints(filePath, options = {}) {
  // Read original source code
  const sourceCode = await readFile(filePath, 'utf-8');

  // Get inlay hints from LSP
  const hints = await getInlayHints(
    filePath,
    options.startLine,
    options.endLine
  );

  if (hints.length === 0) {
    return {
      success: false,
      message: 'No inlay hints available for this file'
    };
  }

  // Format source with hints
  const formattedCode = formatInlayHints(hints, sourceCode);

  return {
    success: true,
    hints,
    formattedCode,
    hintCount: hints.length
  };
}

module.exports = { showInlayHints };
```

### Step 5: Update code-intelligence SKILL.md

Add new capability to SKILL.md:

```yaml
---
name: code-intelligence
description: Enhanced code analysis using LSP (Language Server Protocol). Provides go-to-definition, find-references, hover info, symbol search, AND inlay hints for inline type information. Automatically integrates with all skills.
metadata:
  short-description: LSP-powered code analysis with inlay hints
  version: 1.3.0
  tags: [lsp, analysis, code-intelligence, navigation, inlay-hints]
---

# Code Intelligence Skill

## New in v1.3.0: Inlay Hints 🎉

Display type information and parameter names inline without modifying code!

### Usage

```bash
# Show inlay hints for entire file
/code-intelligence hints src/services/UserService.js

# Show hints for specific range
/code-intelligence hints src/api/auth.js --lines 10-50
```

### Example Output

**Original Code:**
```javascript
function calculateTotal(items) {
  const subtotal = items.reduce((sum, item) =>
    sum + item.price * item.quantity, 0
  );
  return subtotal;
}
```

**With Inlay Hints:**
```javascript
function calculateTotal(items: Item[]): number {
  const subtotal: number = items.reduce((sum: number, item: Item): number =>
    sum + item.price * item.quantity, 0
  );
  return subtotal;
}
```

All type information displayed inline! 🎯
```

### Step 6: Integrate with Other Skills

#### For ultrathink:
```javascript
// Automatically use inlay hints when reasoning about types
if (needsTypeInfo && lspAvailable) {
  const hints = await getInlayHints(filePath);
  // Include hint information in reasoning context
}
```

#### For code-review:
```javascript
// Show hints when reviewing type safety
async function reviewTypeSafety(filePath) {
  const hints = await getInlayHints(filePath);

  // Analyze if actual types match expected types
  for (const hint of hints) {
    if (hint.kind === 1) { // Type hint
      // Check if type is appropriate
    }
  }
}
```

#### For bug-hunter:
```javascript
// Use hints to detect type mismatches
async function analyzeBug(filePath, bugDescription) {
  const hints = await getInlayHints(filePath);

  // Show types at bug location
  console.log('Type information at bug location:');
  hints.forEach(hint => {
    if (hint.position.line === bugLine) {
      console.log(`  ${hint.label}`);
    }
  });
}
```

---

## Testing Strategy

### Test 1: Basic Functionality
```javascript
// test/inlayHints.test.js

describe('Inlay Hints', () => {
  it('should get hints for TypeScript file', async () => {
    const hints = await getInlayHints('test/fixtures/sample.ts');

    expect(hints).toBeDefined();
    expect(hints.length).toBeGreaterThan(0);
  });

  it('should format hints correctly', () => {
    const hints = [
      {
        position: { line: 0, character: 10 },
        label: ': number',
        kind: 1
      }
    ];

    const source = 'const x = 5;';
    const formatted = formatInlayHints(hints, source);

    expect(formatted).toContain(': number');
  });
});
```

### Test 2: Language Support
```javascript
// Test with multiple languages
const testCases = [
  { file: 'test.ts', language: 'TypeScript', expectHints: true },
  { file: 'test.js', language: 'JavaScript', expectHints: false }, // May not support
  { file: 'test.py', language: 'Python', expectHints: true },
  { file: 'test.go', language: 'Go', expectHints: true },
  { file: 'test.rs', language: 'Rust', expectHints: true }
];

for (const test of testCases) {
  it(`should handle ${test.language} files`, async () => {
    const hints = await getInlayHints(test.file);

    if (test.expectHints) {
      expect(hints.length).toBeGreaterThan(0);
    } else {
      // May return empty array if not supported
      expect(Array.isArray(hints)).toBe(true);
    }
  });
}
```

### Test 3: Error Handling
```javascript
it('should handle missing files gracefully', async () => {
  const hints = await getInlayHints('nonexistent.ts');
  expect(hints).toEqual([]);
});

it('should handle unsupported language servers', async () => {
  const hints = await getInlayHints('test.txt');
  expect(hints).toEqual([]);
});
```

---

## Language Server Requirements

### Languages with Inlay Hint Support:

✅ **TypeScript/JavaScript** (typescript-language-server)
- Full support
- Shows parameter names, return types, variable types

✅ **Rust** (rust-analyzer)
- Excellent support
- Shows types, lifetime parameters, closure return types

✅ **Go** (gopls)
- Good support
- Shows parameter names, variable types

✅ **Python** (Pylance/Pyright)
- Partial support (Pylance only)
- Shows inferred types

✅ **Java** (eclipse.jdt.ls)
- Good support
- Shows parameter names

✅ **C#** (csharp-ls / OmniSharp)
- Good support
- Shows implicit types

✅ **C++** (clangd)
- Good support
- Shows auto types, template parameters

⚠️ **Limited or No Support:**
- PHP (limited support)
- Ruby (no support)
- Plain JavaScript with basic LSP server (no support)

---

## Performance Considerations

### Caching Strategy
```javascript
// Cache hints for frequently accessed files
const hintCache = new Map();

async function getInlayHintsWithCache(filePath, ttl = 60000) {
  const cached = hintCache.get(filePath);

  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.hints;
  }

  const hints = await getInlayHints(filePath);

  hintCache.set(filePath, {
    hints,
    timestamp: Date.now()
  });

  return hints;
}
```

### Lazy Resolution
```javascript
// Some LSP servers support lazy resolution for hints
// Request basic hints first, resolve details only when needed

async function resolveInlayHint(hint) {
  if (hint.tooltip || hint.textEdits) {
    // Already resolved
    return hint;
  }

  try {
    const resolved = await lspClient.sendRequest(
      'inlayHint/resolve',
      hint
    );
    return resolved;
  } catch (error) {
    // Server doesn't support resolution
    return hint;
  }
}
```

---

## Rollout Plan

### Phase 1: Basic Implementation (Day 1)
- [ ] Implement `getInlayHints()` function
- [ ] Implement `formatInlayHints()` function
- [ ] Add to code-intelligence skill
- [ ] Test with TypeScript files

### Phase 2: Language Support (Day 1-2)
- [ ] Test with Rust
- [ ] Test with Go
- [ ] Test with Python
- [ ] Test with Java
- [ ] Document which languages work

### Phase 3: Integration (Day 2)
- [ ] Integrate with ultrathink
- [ ] Integrate with code-review
- [ ] Integrate with bug-hunter
- [ ] Update all skill documentation

### Phase 4: Polish (Day 2)
- [ ] Add caching
- [ ] Improve formatting
- [ ] Add configuration options
- [ ] Write comprehensive tests

---

## Configuration Options

Allow users to customize inlay hints:

```yaml
# .codex/config.yml

lsp:
  inlayHints:
    enabled: true

    # Show parameter names
    parameterNames: true

    # Show inferred types
    variableTypes: true

    # Show function return types
    functionReturnTypes: true

    # Maximum hints per file (performance)
    maxHints: 500

    # Languages to enable hints for
    enabledLanguages:
      - typescript
      - javascript
      - rust
      - go
      - python
      - java
```

---

## User Documentation

### Update README.md

```markdown
## What's New in v1.3.0: Inlay Hints! 🎉

Code Intelligence now shows type information inline:

**Before:**
```javascript
function calculate(amount, rate) {
  return amount * rate;
}
```

**After:**
```javascript
function calculate(amount: number, rate: number): number {
  return amount * rate;
}
```

### Try it:
```bash
/code-intelligence hints src/yourfile.ts
```

### Supported Languages:
- TypeScript ✅ (Full support)
- Rust ✅ (Excellent support)
- Go ✅ (Good support)
- Python ⚠️ (Requires Pylance)
- Java ✅ (Good support)
- C++ ✅ (Good support)
- C# ✅ (Good support)
```

---

## Success Metrics

Track these to measure feature success:

1. **Usage:** How many times per day is `inlayHints` called?
2. **Languages:** Which languages are most used?
3. **Performance:** Average response time
4. **Errors:** How often does it fail?
5. **User Satisfaction:** Do users find it helpful?

```javascript
// Simple metrics tracking
const metrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  averageResponseTime: 0,
  languageUsage: {}
};

async function getInlayHintsWithMetrics(filePath) {
  const start = Date.now();
  metrics.totalRequests++;

  try {
    const hints = await getInlayHints(filePath);
    const duration = Date.now() - start;

    metrics.successfulRequests++;
    metrics.averageResponseTime =
      (metrics.averageResponseTime * (metrics.totalRequests - 1) + duration) /
      metrics.totalRequests;

    // Track language
    const lang = getLanguageFromPath(filePath);
    metrics.languageUsage[lang] = (metrics.languageUsage[lang] || 0) + 1;

    return hints;
  } catch (error) {
    metrics.failedRequests++;
    throw error;
  }
}
```

---

## Troubleshooting

### Issue 1: No hints returned
**Cause:** Language server doesn't support inlay hints
**Solution:** Check if LSP server supports LSP 3.17

```bash
# Check server version
typescript-language-server --version
# Should be 3.x.x or higher
```

### Issue 2: Hints in wrong positions
**Cause:** Line/character encoding mismatch
**Solution:** Ensure UTF-8 encoding, handle multi-byte characters

```javascript
// Convert character position to byte position if needed
function charToByteOffset(text, charOffset) {
  return Buffer.byteLength(text.slice(0, charOffset));
}
```

### Issue 3: Performance issues
**Cause:** Too many hints requested at once
**Solution:** Implement caching and request hints for visible range only

```javascript
// Request hints for current viewport only
const visibleRange = {
  start: { line: currentLine - 50, character: 0 },
  end: { line: currentLine + 50, character: 0 }
};
```

---

## Next Steps After Inlay Hints

Once inlay hints are working:

1. **Code Lens** (similarly easy, 1-2 days)
2. **Folding Ranges** (structural analysis, 1-2 days)
3. **Type Hierarchy** (more complex, 2-3 days)
4. **Semantic Tokens** (most complex, 2-3 days)

Each feature builds on the LSP integration patterns learned from inlay hints!

---

## Summary

**Inlay Hints Checklist:**

Core Implementation:
- [ ] Add `textDocument/inlayHint` request
- [ ] Parse and format hints
- [ ] Display formatted code
- [ ] Handle errors gracefully

Integration:
- [ ] Add to code-intelligence skill
- [ ] Integrate with 3+ other skills
- [ ] Update documentation

Testing:
- [ ] Unit tests for hint retrieval
- [ ] Integration tests for formatting
- [ ] Multi-language tests
- [ ] Error handling tests

Polish:
- [ ] Add caching
- [ ] Add configuration
- [ ] Track metrics
- [ ] User documentation

**Estimated Time: 1-2 days**
**Difficulty: ⭐⭐ Easy**
**Impact: ⭐⭐⭐⭐⭐ Very High**

---

**Ready to start? This guide has everything you need to implement the first Phase 1 feature! 🚀**

---

*Document Version: 1.0*
*Date: January 8, 2026*
*Status: Ready for Implementation*
