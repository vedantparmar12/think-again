# Implementation Plan: Phase 3 - v2.0.0

**Target Release:** v2.0.0
**Focus:** AI-Powered Development, Full Debugging, Data Science Integration
**Estimated Timeline:** 31-45 days
**Status:** In Progress

---

## Overview

Phase 3 represents a **major version leap** to v2.0.0, introducing game-changing capabilities that transform Codex from a code intelligence system into a **complete AI-powered development environment** with full debugging support and data science workflow integration.

This release adds:
1. **AI-powered code completions** (GitHub Copilot-style)
2. **Full debugging support** with breakpoints, watches, and step execution
3. **Jupyter notebook integration** for data science workflows

---

## 🎯 Strategic Vision

### What Phase 3 Achieves

**Before v2.0.0:**
- Excellent code intelligence and analysis
- Great performance and debugging insights
- Static analysis only

**After v2.0.0:**
- **AI writes code for you** - Inline completions suggest entire functions
- **Debug live code** - Set breakpoints, inspect variables, step through execution
- **Data science ready** - Full Jupyter notebook support with LSP
- **Complete development environment** - From AI suggestions to live debugging

### Target Users

1. **Professional Developers** - AI assistance + debugging = 10x productivity
2. **Data Scientists** - Jupyter notebooks with full LSP intelligence
3. **Teams** - Standardized AI-powered workflow
4. **Learners** - AI suggestions teach best practices

---

## Features to Implement

### 1. Inline Completions (AI) ⭐⭐⭐ (LSP 3.18)

**Priority:** High
**Complexity:** Very High
**Estimated Effort:** 10-14 days

#### What It Does

Provides GitHub Copilot-style AI-powered code completions inline as you type. Uses large language models to suggest entire functions, complete lines, or multi-line code blocks.

#### LSP Protocol Methods

```typescript
// New methods to implement
textDocument/inlineCompletion - Request AI completions for cursor position
inlineCompletion/resolve - Resolve detailed completion information
```

#### Architecture Options

##### Option 1: OpenAI/Anthropic API Integration (Recommended)
```yaml
Pros:
  - Highest quality completions
  - Multi-language support
  - Context-aware suggestions
  - Easy to implement

Cons:
  - Requires API key
  - Cost per completion
  - Internet connection required
  - Privacy concerns (code sent to API)

Implementation:
  - Use OpenAI Codex API or Anthropic Claude Code API
  - Cache completions aggressively
  - Implement rate limiting
  - Allow local fallback
```

##### Option 2: Local AI Models (Advanced)
```yaml
Pros:
  - No API costs
  - Complete privacy
  - Works offline
  - No rate limits

Cons:
  - Requires powerful GPU (8GB+ VRAM)
  - Model download (2-6GB)
  - Slower completions (1-3s)
  - Lower quality than cloud APIs

Models to consider:
  - CodeLlama 7B/13B
  - StarCoder 15B
  - WizardCoder 15B
  - DeepSeek Coder 6.7B
```

##### Option 3: Hybrid Approach (Best of Both)
```yaml
Implementation:
  - Use cloud API by default (fast, high quality)
  - Allow local model as fallback (offline mode)
  - User configures preference
  - Automatic fallback if API fails

Configuration:
  ai_completions:
    mode: hybrid  # "cloud", "local", or "hybrid"
    cloud_provider: anthropic  # "openai" or "anthropic"
    local_model: codellama-7b
    cache_completions: true
    max_tokens: 100
```

#### Implementation Steps

##### Step 1: Core Infrastructure (Days 1-3)

1. **Add LSP protocol support** in code-intelligence SKILL.md
   ```typescript
   - textDocument/inlineCompletion capability
   - Support for completion triggers (typing, manual)
   - Support for completion caching
   ```

2. **Create AI completion service**
   ```typescript
   class AICompletionService {
     constructor(config: AIConfig) {
       this.provider = config.mode === 'cloud'
         ? new CloudProvider(config)
         : new LocalProvider(config);
       this.cache = new CompletionCache();
     }

     async getCompletion(context: CodeContext): Promise<Completion> {
       // Check cache first
       const cached = await this.cache.get(context);
       if (cached) return cached;

       // Get AI completion
       const completion = await this.provider.complete(context);

       // Cache result
       await this.cache.set(context, completion);

       return completion;
     }
   }
   ```

3. **Implement context extraction**
   ```typescript
   interface CodeContext {
     fileContent: string;
     cursorPosition: Position;
     language: string;
     recentEdits: Edit[];
     importedModules: string[];
     nearbyFunctions: Function[];
   }

   function extractContext(document: Document, position: Position): CodeContext {
     // Extract relevant code context for AI
     // Include:
     // - Current file content
     // - Cursor position
     // - Recent edits (last 5 minutes)
     // - Imported modules/packages
     // - Nearby function definitions
     return context;
   }
   ```

##### Step 2: Cloud Provider Integration (Days 4-6)

1. **OpenAI Codex API**
   ```typescript
   class OpenAIProvider implements CompletionProvider {
     private apiKey: string;
     private model = 'gpt-4-turbo';  // or 'gpt-3.5-turbo'

     async complete(context: CodeContext): Promise<Completion> {
       const prompt = this.buildPrompt(context);

       const response = await fetch('https://api.openai.com/v1/chat/completions', {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${this.apiKey}`,
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           model: this.model,
           messages: [{
             role: 'system',
             content: 'You are a code completion AI. Provide concise, accurate code completions.'
           }, {
             role: 'user',
             content: prompt
           }],
           max_tokens: 100,
           temperature: 0.2,
           stop: ['\n\n', '###']
         })
       });

       const data = await response.json();
       return this.parseCompletion(data);
     }

     private buildPrompt(context: CodeContext): string {
       return `
Language: ${context.language}

Code before cursor:
\`\`\`${context.language}
${context.fileContent.substring(0, context.cursorPosition.offset)}█
\`\`\`

Complete the code at the cursor (marked with █). Provide ONLY the completion, no explanations.
       `.trim();
     }
   }
   ```

2. **Anthropic Claude API**
   ```typescript
   class AnthropicProvider implements CompletionProvider {
     private apiKey: string;
     private model = 'claude-3-5-sonnet-20241022';

     async complete(context: CodeContext): Promise<Completion> {
       const prompt = this.buildPrompt(context);

       const response = await fetch('https://api.anthropic.com/v1/messages', {
         method: 'POST',
         headers: {
           'x-api-key': this.apiKey,
           'anthropic-version': '2023-06-01',
           'content-type': 'application/json'
         },
         body: JSON.stringify({
           model: this.model,
           max_tokens: 100,
           messages: [{
             role: 'user',
             content: prompt
           }]
         })
       });

       const data = await response.json();
       return this.parseCompletion(data);
     }
   }
   ```

3. **Implement caching**
   ```typescript
   class CompletionCache {
     private cache = new Map<string, CacheEntry>();
     private ttl = 5 * 60 * 1000;  // 5 minutes

     async get(context: CodeContext): Promise<Completion | null> {
       const key = this.hashContext(context);
       const entry = this.cache.get(key);

       if (!entry) return null;
       if (Date.now() - entry.timestamp > this.ttl) {
         this.cache.delete(key);
         return null;
       }

       return entry.completion;
     }

     async set(context: CodeContext, completion: Completion): Promise<void> {
       const key = this.hashContext(context);
       this.cache.set(key, {
         completion,
         timestamp: Date.now()
       });

       // Limit cache size
       if (this.cache.size > 1000) {
         const oldest = Array.from(this.cache.entries())
           .sort((a, b) => a[1].timestamp - b[1].timestamp)[0];
         this.cache.delete(oldest[0]);
       }
     }

     private hashContext(context: CodeContext): string {
       // Hash context to create cache key
       return crypto.createHash('sha256')
         .update(JSON.stringify({
           content: context.fileContent,
           position: context.cursorPosition,
           language: context.language
         }))
         .digest('hex');
     }
   }
   ```

##### Step 3: Local Model Support (Days 7-10)

1. **Model selection and setup**
   ```bash
   # Recommended models by size
   # Small (4-7GB RAM): CodeLlama-7B
   # Medium (12-16GB RAM): StarCoder-15B
   # Large (24GB+ RAM): WizardCoder-34B

   # Download model (example with CodeLlama)
   huggingface-cli download codellama/CodeLlama-7b-hf
   ```

2. **Local inference server**
   ```typescript
   class LocalProvider implements CompletionProvider {
     private modelPath: string;
     private inferenceServer: InferenceServer;

     async initialize(): Promise<void> {
       // Start local inference server (llama.cpp, GGML, etc.)
       this.inferenceServer = new InferenceServer({
         model: this.modelPath,
         contextSize: 4096,
         threads: 8,
         gpuLayers: 32  // Use GPU if available
       });

       await this.inferenceServer.start();
     }

     async complete(context: CodeContext): Promise<Completion> {
       const prompt = this.buildPrompt(context);

       const result = await this.inferenceServer.generate({
         prompt,
         maxTokens: 100,
         temperature: 0.2,
         stopSequences: ['\n\n', '###', 'def ', 'class ']
       });

       return this.parseCompletion(result);
     }
   }
   ```

3. **Fallback logic**
   ```typescript
   class HybridCompletionService {
     private cloudProvider: CloudProvider;
     private localProvider: LocalProvider;
     private config: AIConfig;

     async getCompletion(context: CodeContext): Promise<Completion> {
       if (this.config.mode === 'local') {
         return this.localProvider.complete(context);
       }

       if (this.config.mode === 'cloud') {
         return this.cloudProvider.complete(context);
       }

       // Hybrid mode: try cloud, fallback to local
       try {
         return await this.cloudProvider.complete(context);
       } catch (error) {
         console.warn('Cloud completion failed, falling back to local:', error);
         return await this.localProvider.complete(context);
       }
     }
   }
   ```

##### Step 4: Skill Integration (Days 11-12)

1. **test-generator**: AI suggests test cases
   ```bash
   /test-generator src/utils/calculator.js

   🧪 AI-Powered Test Generation:

   Analyzing calculator.js with AI completions...

   Generated 5 test cases:
   1. Basic addition: add(2, 3) === 5
   2. Edge case: add(0, 0) === 0
   3. Negative numbers: add(-5, 3) === -2
   4. Large numbers: add(1000000, 1000000) === 2000000
   5. Floating point: add(0.1, 0.2) ≈ 0.3
   ```

2. **doc-generator**: AI writes documentation
   ```bash
   /doc-generator --api src/services/UserService.js

   📚 AI-Generated Documentation:

   ## UserService

   A service for managing user data and authentication.

   ### Methods

   #### `createUser(data: UserData): Promise<User>`
   Creates a new user account.

   **Parameters:**
   - `data.email` (string) - User's email address
   - `data.password` (string) - Password (min 8 chars)
   - `data.name` (string) - Full name

   **Returns:** Promise resolving to created User object

   **Throws:** ValidationError if data is invalid
   ```

3. **refactor-assistant**: AI suggests refactorings
   ```bash
   /refactor-assistant analyze src/legacy/payment.js

   ♻️ AI-Powered Refactoring Suggestions:

   1. Extract method: validatePaymentData()
      Complexity: 15 → 4
      AI suggestion: Extract validation into separate function

   2. Replace conditional with polymorphism
      Payment type checking can use strategy pattern
      AI suggestion: Create PaymentStrategy interface

   3. Simplify boolean expression
      Current: if (status === 'paid' || status === 'pending' || status === 'processing')
      AI suggestion: if (['paid', 'pending', 'processing'].includes(status))
   ```

#### Configuration

```yaml
# In .codex/config/ai.yml
ai_completions:
  enabled: true
  mode: hybrid  # "cloud", "local", or "hybrid"

  cloud:
    provider: anthropic  # "openai" or "anthropic"
    api_key: ${ANTHROPIC_API_KEY}  # From environment variable
    model: claude-3-5-sonnet-20241022
    max_tokens: 100
    temperature: 0.2

  local:
    model: codellama-7b
    model_path: ~/.cache/huggingface/models/codellama-7b
    gpu_layers: 32
    threads: 8

  caching:
    enabled: true
    ttl: 300  # 5 minutes
    max_entries: 1000

  rate_limiting:
    enabled: true
    max_requests_per_minute: 60
```

#### Expected Benefits

- **5x faster coding** - AI completes boilerplate
- **Better code quality** - AI suggests best practices
- **Learn while coding** - AI shows patterns
- **Language-agnostic** - Works with 40+ languages

---

### 2. Debug Adapter Protocol (DAP) Integration ⭐⭐⭐

**Priority:** High
**Complexity:** Very High
**Estimated Effort:** 14-21 days

#### What It Does

Integrates full debugging capabilities into Codex skills. Set breakpoints, step through code, inspect variables, evaluate expressions - all from within the Codex workflow.

#### DAP vs LSP

```yaml
LSP (Language Server Protocol):
  - Static analysis
  - Code navigation
  - No execution

DAP (Debug Adapter Protocol):
  - Runtime analysis
  - Step execution
  - Live variable inspection
  - Breakpoint management
```

#### Architecture

```
┌─────────────────┐
│  Codex Skills   │
│  (bug-hunter,   │
│   test-gen)     │
└────────┬────────┘
         │
         │ LSP + DAP Requests
         ▼
┌─────────────────┐     ┌──────────────────┐
│   DAP Client    │────▶│   DAP Server     │
│  (code-intel)   │     │  (debugpy, etc)  │
└─────────────────┘     └────────┬─────────┘
                                  │
                                  ▼
                          ┌──────────────┐
                          │   Running    │
                          │   Program    │
                          └──────────────┘
```

#### Supported Debug Adapters

| Language | DAP Server | Quality |
|----------|------------|---------|
| Python | debugpy | ✅ Excellent |
| JavaScript/TypeScript | js-debug (VS Code) | ✅ Excellent |
| Go | delve | ✅ Excellent |
| Rust | lldb-mi | ✅ Good |
| Java | java-debug | ✅ Good |
| C++ | lldb/gdb | ⚠️ Fair |
| C# | netcoredbg | ✅ Good |

#### Implementation Steps

##### Step 1: DAP Protocol Support (Days 1-4)

1. **Add DAP client to code-intelligence**
   ```typescript
   class DAPClient {
     private adapter: DebugAdapter;
     private session: DebugSession | null = null;

     async initialize(config: DAPConfig): Promise<void> {
       this.adapter = this.createAdapter(config.language);
       await this.adapter.start();
     }

     async launch(program: string, args?: string[]): Promise<void> {
       this.session = await this.adapter.launch({
         program,
         args,
         stopOnEntry: false
       });
     }

     async setBreakpoint(file: string, line: number): Promise<Breakpoint> {
       return await this.session.setBreakpoint(file, line);
     }

     async continue(): Promise<void> {
       await this.session.continue();
     }

     async stepOver(): Promise<void> {
       await this.session.next();
     }

     async stepInto(): Promise<void> {
       await this.session.stepIn();
     }

     async stepOut(): Promise<void> {
       await this.session.stepOut();
     }

     async getVariables(frameId: number): Promise<Variable[]> {
       return await this.session.getVariables(frameId);
     }

     async evaluate(expression: string, frameId: number): Promise<any> {
       return await this.session.evaluate(expression, frameId);
     }
   }
   ```

2. **Implement debug session management**
   ```typescript
   class DebugSessionManager {
     private activeSessions = new Map<string, DebugSession>();

     async createSession(config: DebugConfig): Promise<DebugSession> {
       const client = new DAPClient();
       await client.initialize(config);

       const session = {
         id: crypto.randomUUID(),
         client,
         config,
         breakpoints: [],
         state: 'initialized'
       };

       this.activeSessions.set(session.id, session);
       return session;
     }

     async terminateSession(sessionId: string): Promise<void> {
       const session = this.activeSessions.get(sessionId);
       if (session) {
         await session.client.disconnect();
         this.activeSessions.delete(sessionId);
       }
     }
   }
   ```

##### Step 2: Language-Specific Adapters (Days 5-10)

1. **Python (debugpy)**
   ```typescript
   class PythonDebugAdapter implements DebugAdapter {
     private process: ChildProcess;

     async start(): Promise<void> {
       // Start debugpy server
       this.process = spawn('python', [
         '-m', 'debugpy',
         '--listen', '5678',
         '--wait-for-client'
       ]);
     }

     async launch(config: LaunchConfig): Promise<void> {
       // Connect to debugpy and launch program
       await this.connect('localhost', 5678);
       await this.sendRequest('launch', {
         program: config.program,
         args: config.args,
         console: 'integratedTerminal'
       });
     }
   }
   ```

2. **JavaScript/TypeScript (js-debug)**
   ```typescript
   class JSDebugAdapter implements DebugAdapter {
     async start(): Promise<void> {
       // Use VS Code's js-debug adapter
       this.process = spawn('node', [
         require.resolve('js-debug/src/dapDebugServer.js'),
         '--port=9229'
       ]);
     }

     async launch(config: LaunchConfig): Promise<void> {
       await this.connect('localhost', 9229);
       await this.sendRequest('launch', {
         type: 'node',
         request: 'launch',
         program: config.program,
         runtimeArgs: config.args
       });
     }
   }
   ```

3. **Go (delve)**
   ```typescript
   class GoDebugAdapter implements DebugAdapter {
     async start(): Promise<void> {
       this.process = spawn('dlv', [
         'dap',
         '--listen=127.0.0.1:2345'
       ]);
     }

     async launch(config: LaunchConfig): Promise<void> {
       await this.connect('localhost', 2345);
       await this.sendRequest('launch', {
         mode: 'exec',
         program: config.program,
         args: config.args
       });
     }
   }
   ```

##### Step 3: Skill Integration (Days 11-16)

1. **bug-hunter with debugging**
   ```bash
   /bug-hunter "API returns 500 error"

   🐛 Bug Hunter with Live Debugging:

   Step 1: Setting breakpoint at suspected location
   ✅ Breakpoint set: src/api/handler.js:45

   Step 2: Running program with test request
   ⏸ Breakpoint hit!

   Step 3: Inspecting variables
   📊 Variables at breakpoint:
     request.body = { userId: "123" }
     user = null  ❌ PROBLEM!
     config = { timeout: 5000 }

   Step 4: Evaluating expressions
   > user === null
   true  ← Confirmed!

   🎯 Root Cause:
   User lookup failed because userId "123" doesn't exist
   No null check before accessing user.email (line 47)

   💡 Fix:
   if (!user) {
     throw new NotFoundError('User not found');
   }

   Step 5: Testing fix
   ✅ Fixed! API now returns 404 instead of 500
   ```

2. **test-generator with debugging**
   ```bash
   /test-generator --debug src/utils/parser.js

   🧪 Test Generation with Debugging:

   Analyzing parser.js...

   Running function with debugger to understand behavior:
   ⏸ Breakpoint: parseJSON(input)
     input = '{"name":"test","value":42}'

   Step through execution:
   Line 12: const trimmed = input.trim()  → '{"name":"test","value":42}'
   Line 13: const parsed = JSON.parse(trimmed)  → { name: 'test', value: 42 }
   Line 14: return parsed  → { name: 'test', value: 42 }

   Generated test from execution trace:
   ```javascript
   test('parseJSON handles valid JSON', () => {
     const input = '{"name":"test","value":42}';
     const result = parseJSON(input);
     expect(result).toEqual({ name: 'test', value: 42 });
   });
   ```
   ```

3. **ultrathink with debugging**
   ```bash
   /ultrathink Why does this function sometimes return undefined?

   🧠 Deep Analysis with Debugging:

   Step 1: Set conditional breakpoint
   ✅ Breakpoint: processData() when result === undefined

   Step 2: Run with various inputs
   ⏸ Breakpoint hit after 47 iterations!

   Step 3: Inspect state when undefined occurs
   📊 Variables:
     input = { items: [] }  ← Empty array!
     result = undefined

   Step 4: Step through execution
   Line 15: if (input.items.length > 0) {
     → false (empty array)
   Line 16-20: (skipped)
   Line 21: return result
     → undefined (never initialized!)

   🎯 Root Cause:
   Function returns undefined when input.items is empty
   Missing default return value

   💡 Fix:
   return result || { default: 'empty' };
   ```

##### Step 4: Advanced Features (Days 17-21)

1. **Conditional breakpoints**
   ```typescript
   await debugClient.setBreakpoint('app.js', 45, {
     condition: 'user.age > 18',
     hitCondition: '5',  // Break on 5th hit
     logMessage: 'Processing user: {user.name}'
   });
   ```

2. **Watch expressions**
   ```typescript
   await debugClient.addWatchExpression('user.balance');
   // Gets evaluated on every step/breakpoint
   ```

3. **Debug console**
   ```typescript
   // Evaluate arbitrary code in debug context
   const balance = await debugClient.evaluate('user.balance * 1.1', frameId);
   ```

#### Expected Benefits

- **10x faster debugging** - See exact state, no guessing
- **Better bug reports** - Include exact execution traces
- **Learn internals** - Step through library code
- **Validate fixes** - Test immediately with debugger

---

### 3. Jupyter Notebook Support ⭐⭐⭐

**Priority:** Medium
**Complexity:** High
**Estimated Effort:** 7-10 days

#### What It Does

Provides full LSP support for Jupyter notebooks (.ipynb files), enabling code intelligence, refactoring, and analysis within data science workflows.

#### LSP Notebook Protocol

```typescript
// New methods to implement (LSP 3.17)
notebookDocument/didOpen - Opened notebook
notebookDocument/didChange - Cell edited
notebookDocument/didSave - Notebook saved
notebookDocument/didClose - Notebook closed

// Cell-specific requests
textDocument/definition (for cell content)
textDocument/completion (for cell content)
textDocument/hover (for cell content)
```

#### Implementation Steps

##### Step 1: Notebook Document Model (Days 1-2)

```typescript
interface NotebookDocument {
  uri: string;  // file:///path/to/notebook.ipynb
  notebookType: 'jupyter';
  version: number;
  cells: NotebookCell[];
  metadata: NotebookMetadata;
}

interface NotebookCell {
  kind: 'code' | 'markdown';
  document: TextDocument;  // Cell content as virtual text document
  outputs?: CellOutput[];
  executionSummary?: ExecutionSummary;
}

class NotebookManager {
  private notebooks = new Map<string, NotebookDocument>();

  async openNotebook(uri: string): Promise<NotebookDocument> {
    const content = await fs.readFile(uri, 'utf-8');
    const parsed = JSON.parse(content);

    const notebook: NotebookDocument = {
      uri,
      notebookType: 'jupyter',
      version: 1,
      cells: parsed.cells.map((cell, index) => ({
        kind: cell.cell_type === 'code' ? 'code' : 'markdown',
        document: this.createVirtualDocument(uri, index, cell.source.join('')),
        outputs: cell.outputs,
        executionSummary: cell.execution_count
      })),
      metadata: parsed.metadata
    };

    this.notebooks.set(uri, notebook);
    return notebook;
  }

  private createVirtualDocument(notebookUri: string, cellIndex: number, content: string): TextDocument {
    // Create virtual document URI for cell
    const cellUri = `${notebookUri}#cell${cellIndex}`;

    return {
      uri: cellUri,
      languageId: 'python',  // or detect from metadata
      version: 1,
      text: content
    };
  }
}
```

##### Step 2: LSP Integration (Days 3-5)

```typescript
class NotebookLSPHandler {
  async provideCompletions(notebookUri: string, cellIndex: number, position: Position): Promise<CompletionItem[]> {
    const notebook = await notebookManager.getNotebook(notebookUri);
    const cell = notebook.cells[cellIndex];

    // Get completions for cell content
    return await lspClient.sendRequest('textDocument/completion', {
      textDocument: { uri: cell.document.uri },
      position
    });
  }

  async goToDefinition(notebookUri: string, cellIndex: number, position: Position): Promise<Location[]> {
    const notebook = await notebookManager.getNotebook(notebookUri);
    const cell = notebook.cells[cellIndex];

    const locations = await lspClient.sendRequest('textDocument/definition', {
      textDocument: { uri: cell.document.uri },
      position
    });

    // Map locations back to notebook cells if within same notebook
    return locations.map(loc => this.mapToNotebookLocation(loc, notebook));
  }

  private mapToNotebookLocation(location: Location, notebook: NotebookDocument): Location {
    // If location is in a cell of this notebook, return cell reference
    for (let i = 0; i < notebook.cells.length; i++) {
      if (location.uri === notebook.cells[i].document.uri) {
        return {
          uri: notebook.uri,
          range: location.range,
          cellIndex: i
        };
      }
    }

    // Otherwise, return as-is (external file)
    return location;
  }
}
```

##### Step 3: Skill Integration (Days 6-8)

```bash
/code-review data-analysis.ipynb

📊 Notebook Code Review:

Cell 1 (Imports):
✅ Clean imports, properly organized

Cell 2 (Data Loading):
⚠️ Issue: Missing error handling for file read
💡 Suggestion: Add try/except around pd.read_csv()

Cell 3 (Data Cleaning):
🔴 Issue: Modifying DataFrame in-place without copy
⚠️ Risk: Original data lost if error occurs later
💡 Fix: df_cleaned = df.copy()

Cell 4 (Analysis):
⚠️ Issue: Variable 'threshold' not defined
📊 Found in Cell 6 (out of order execution!)
💡 Recommendation: Move Cell 6 before Cell 4

Cell 5 (Visualization):
✅ Good use of matplotlib, clear labels

Overall:
- 3 issues found
- Recommend reordering cells 4 and 6
- Add error handling in cell 2
```

```bash
/refactor-assistant analyze notebook.ipynb

♻️ Notebook Refactoring Suggestions:

1. Extract reusable functions
   Cells 3, 7, 11 have similar data cleaning logic
   💡 Extract: clean_dataframe(df, columns)

2. Create analysis pipeline
   Current: Multiple cells with scattered logic
   💡 Suggested structure:
     - Cell 1: Imports and config
     - Cell 2: Load data
     - Cell 3: Define functions
     - Cell 4-10: Analysis using functions

3. Add documentation cells
   Complex calculations lack explanations
   💡 Add markdown cells before cells 8, 12, 15

4. Optimize DataFrame operations
   Cell 9: Using loop instead of vectorized operation
   💡 Replace:
     for i, row in df.iterrows():
       df.at[i, 'new'] = row['a'] + row['b']
   With:
     df['new'] = df['a'] + df['b']
   Expected speedup: 100x
```

##### Step 4: Advanced Features (Days 9-10)

1. **Cell execution order analysis**
   ```typescript
   async analyzeExecutionOrder(notebook: NotebookDocument): Promise<OrderIssue[]> {
     const issues: OrderIssue[] = [];

     // Find variables defined and used
     for (let i = 0; i < notebook.cells.length; i++) {
       const cell = notebook.cells[i];
       const used = this.findUsedVariables(cell);
       const defined = this.findDefinedVariables(cell);

       // Check if variables used before defined
       for (const variable of used) {
         const defIndex = this.findDefinitionCell(notebook, variable);
         if (defIndex > i) {
           issues.push({
             type: 'out-of-order',
             variable,
             usedInCell: i,
             definedInCell: defIndex,
             message: `Variable '${variable}' used in cell ${i} but defined in cell ${defIndex}`
           });
         }
       }
     }

     return issues;
   }
   ```

2. **Kernel state tracking**
   ```typescript
   interface KernelState {
     variables: Map<string, any>;
     lastExecution: Date;
     executionCount: number;
   }

   async syncKernelState(notebook: NotebookDocument): Promise<KernelState> {
     // Connect to Jupyter kernel
     const kernel = await this.connectToKernel(notebook);

     // Get current kernel state
     const variables = await kernel.execute('%whos');

     return {
       variables: this.parseVariables(variables),
       lastExecution: new Date(),
       executionCount: kernel.executionCount
     };
   }
   ```

#### Expected Benefits

- **Data science ready** - Full LSP for notebooks
- **Better notebooks** - Code review and refactoring
- **Faster iteration** - Intelligent completions
- **Learn best practices** - AI suggests improvements

---

## Performance Targets

### v2.0.0 Goals

| Task | v1.4.0 | v2.0.0 (Target) | Improvement |
|------|--------|-----------------|-------------|
| Coding (with AI) | Manual typing | **AI-assisted** | **5x faster** |
| Debugging | console.log | **Live debugger** | **10x faster** |
| Data science | Basic LSP | **Full notebook support** | **3x faster** |
| Bug investigation | 3-15 min | **1-5 min** | **66% faster** |
| Code quality | Manual review | **AI-powered review** | **50% better** |

### Overall Improvement

- **v1.2.0 → v1.4.0**: 78% faster workflows
- **v1.4.0 → v2.0.0**: Additional 60% improvement
- **v1.2.0 → v2.0.0**: **Combined 90% faster workflows**

---

## Technical Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Codex CLI                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ultrathink│  │bug-hunter│  │test-gen  │  ...        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘             │
│       └─────────────┼─────────────┘                    │
│                     ▼                                    │
│       ┌─────────────────────────────────┐              │
│       │  code-intelligence (v2.0.0)     │              │
│       │  ┌───────┐  ┌───────┐  ┌──────┐│              │
│       │  │ LSP   │  │  DAP  │  │  AI  ││              │
│       │  │Client │  │Client │  │Client││              │
│       │  └───┬───┘  └───┬───┘  └──┬───┘│              │
│       └──────┼──────────┼─────────┼────┘              │
└──────────────┼──────────┼─────────┼───────────────────┘
               │          │         │
        ┌──────▼─────┐ ┌─▼──────┐ ┌▼─────────┐
        │LSP Servers │ │Debug   │ │AI APIs   │
        │(pyright,   │ │Adapters│ │(OpenAI,  │
        │ts-server)  │ │(debugpy│ │Anthropic)│
        └────────────┘ │,delve) │ └──────────┘
                       └────────┘
```

### Data Flow

```
User Request → Skill → code-intelligence → [LSP + DAP + AI] → Analysis → Response
                  ↓
            Real-time debugging
            AI completions
            Notebook support
```

---

## Documentation Updates Required

1. **code-intelligence/SKILL.md**
   - Update version to 2.0.0
   - Add 3 new capability sections
   - Update integration examples
   - Add AI/DAP configuration

2. **code-intelligence/README.md**
   - Add Phase 3 features section
   - AI completion examples
   - Debugging workflow examples
   - Jupyter notebook examples

3. **RELEASE_NOTES_v2.0.0.md**
   - Complete release notes
   - Breaking changes (API keys required for AI)
   - Migration guide from v1.4.0
   - Performance benchmarks

4. **Main README.md**
   - Update to v2.0.0
   - Add AI completion highlights
   - Add debugging examples
   - Update performance metrics

5. **AI_SETUP_GUIDE.md** (new)
   - How to get API keys
   - Local model setup
   - Configuration options

6. **DEBUGGING_GUIDE.md** (new)
   - How to use DAP integration
   - Language-specific setup
   - Common debugging workflows

7. **JUPYTER_GUIDE.md** (new)
   - Notebook integration setup
   - Best practices
   - Example workflows

---

## Success Criteria

### Must Have
- ✅ AI completions working with at least cloud provider
- ✅ DAP working with Python + JavaScript
- ✅ Jupyter notebook basic LSP support
- ✅ All existing features still working
- ✅ Complete documentation

### Should Have
- ✅ Local AI model support
- ✅ DAP working with Go + Rust
- ✅ Jupyter advanced features (execution order)
- ✅ Performance improvement ≥ 50%

### Nice to Have
- ✅ AI suggestions learn from codebase
- ✅ DAP working with all languages
- ✅ Jupyter kernel state sync
- ✅ Performance improvement ≥ 60%

---

## Timeline

### Week 1-2: AI Completions
- Days 1-3: Core infrastructure
- Days 4-6: Cloud provider integration
- Days 7-10: Local model support
- Days 11-14: Skill integration + testing

### Week 3-5: DAP Integration
- Days 15-18: Protocol support
- Days 19-28: Language adapters
- Days 29-35: Skill integration + testing

### Week 5-6: Jupyter Support
- Days 36-37: Notebook model
- Days 38-40: LSP integration
- Days 41-43: Skill integration
- Days 44-45: Advanced features

### Week 7: Documentation + Release
- Days 46-48: Documentation updates
- Days 49-50: Release notes and packaging
- Day 51: Final testing and release

---

## Next Steps

1. ✅ Create implementation plan (this document)
2. ⏳ Implement Inline Completions (AI)
3. ⏳ Implement DAP Integration
4. ⏳ Implement Jupyter Notebook Support
5. ⏳ Update all documentation
6. ⏳ Package and release v2.0.0

---

**Status:** Ready to begin Phase 3 implementation
**First Task:** Implement Inline Completions (AI)
**Target Completion:** 7-8 weeks from start date
