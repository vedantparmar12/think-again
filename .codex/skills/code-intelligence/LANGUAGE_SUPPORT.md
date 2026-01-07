# Language Support Matrix

Complete reference for LSP support across 40+ programming languages.

## Quick Reference

| Language | LSP Server | Installation | Industry Use |
|----------|-----------|--------------|--------------|
| **JavaScript/TypeScript** | typescript-language-server | `npm install -g typescript-language-server typescript` | Web, Node.js, React, Vue |
| **Python** | pyright / pylsp | `pip install pyright` | Data Science, Django, FastAPI |
| **Java** | jdtls | [Download](https://download.eclipse.org/jdtls/snapshots/) | Enterprise, Spring Boot, Android |
| **C#/.NET** | omnisharp / csharp-ls | `dotnet tool install -g csharp-ls` | Enterprise, ASP.NET, Unity |
| **Go** | gopls | `go install golang.org/x/tools/gopls@latest` | Cloud, Microservices, DevOps |
| **Rust** | rust-analyzer | `rustup component add rust-analyzer` | Systems, WebAssembly |
| **C/C++** | clangd | `brew install llvm` / `apt install clangd` | Systems, Embedded |
| **PHP** | intelephense | `npm install -g intelephense` | WordPress, Laravel |
| **Ruby** | solargraph | `gem install solargraph` | Rails, Sinatra |
| **Swift** | sourcekit-lsp | Comes with Xcode | iOS, macOS apps |
| **Kotlin** | kotlin-language-server | [Download](https://github.com/fwcd/kotlin-language-server/releases) | Android, Spring |
| **Scala** | metals | `cs install metals` | Spark, Akka |
| **R** | languageserver | `install.packages("languageserver")` | Statistics, Data |
| **Julia** | LanguageServer.jl | `Pkg.add("LanguageServer")` | Scientific Computing |
| **Elixir** | elixir-ls | [Download](https://github.com/elixir-lsp/elixir-ls/releases) | Phoenix, Distributed |
| **Dart** | dart analyze | Comes with Dart SDK | Flutter |
| **Terraform** | terraform-ls | `brew install terraform-ls` | Infrastructure as Code |
| **Bash/Shell** | bash-language-server | `npm install -g bash-language-server` | Scripting, DevOps |
| **Lua** | lua-language-server | [Download](https://github.com/LuaLS/lua-language-server/releases) | Game Dev, Scripting |
| **Haskell** | haskell-language-server | `ghcup install hls` | Functional Programming |

## By Industry / Use Case

### Web Development
- **Frontend**: JavaScript/TypeScript, HTML, CSS
- **Backend**: Node.js (TypeScript), PHP, Ruby, Python
- **Full Stack**: TypeScript + Python/Go/Rust
- **CMS**: PHP (WordPress, Drupal)

**Best Combo:**
```bash
npm install -g typescript-language-server typescript
npm install -g vscode-langservers-extracted  # HTML/CSS
npm install -g intelephense                  # PHP
```

### Mobile Development
- **iOS**: Swift
- **Android**: Kotlin, Java
- **Cross-platform**: Dart (Flutter)
- **React Native**: JavaScript/TypeScript

**Best Combo:**
```bash
# Flutter
dart pub global activate dart_language_server

# Kotlin
# Download kotlin-language-server

# Swift comes with Xcode
```

### Enterprise / Backend
- **Java Stack**: Java, Kotlin, Scala
- **.NET Stack**: C#, F#
- **Cloud Native**: Go, Rust
- **Microservices**: Go, Java, Kotlin

**Best Combo:**
```bash
# Java
# Download jdtls from Eclipse

# Go
go install golang.org/x/tools/gopls@latest

# .NET
dotnet tool install -g csharp-ls
```

### Data Science & ML
- **Analytics**: Python, R, Julia
- **Databases**: SQL
- **Notebooks**: Python (Jupyter)
- **Visualization**: R, Python

**Best Combo:**
```bash
# Python
pip install pyright

# R
# In R: install.packages("languageserver")

# Julia
# In Julia: Pkg.add("LanguageServer")

# SQL
go install github.com/lighttiger2505/sqls@latest
```

### DevOps & Infrastructure
- **IaC**: Terraform, YAML
- **Containers**: Docker, Kubernetes (YAML)
- **CI/CD**: YAML, Bash
- **Config**: JSON, YAML, TOML

**Best Combo:**
```bash
# Terraform
brew install terraform-ls

# Docker
npm install -g dockerfile-language-server-nodejs

# YAML
npm install -g yaml-language-server

# Bash
npm install -g bash-language-server
```

### Systems Programming
- **Low-level**: C, C++, Rust, Zig
- **Performance**: Rust, C++, Zig
- **Embedded**: C, C++, Rust
- **OS Development**: C, Rust

**Best Combo:**
```bash
# C/C++
brew install llvm  # or apt install clangd

# Rust
rustup component add rust-analyzer

# Zig
# Download zls from GitHub
```

### Game Development
- **Unity**: C#
- **Unreal**: C++
- **Godot**: GDScript (limited), C#
- **Scripting**: Lua

**Best Combo:**
```bash
# C#
dotnet tool install -g csharp-ls

# C++
brew install llvm

# Lua
# Download lua-language-server from GitHub
```

### Functional Programming
- **Industry**: Haskell, Scala, Clojure, Elixir
- **Academic**: OCaml, F#
- **Research**: Erlang, Elixir

**Best Combo:**
```bash
# Haskell
ghcup install hls

# Scala
cs install metals

# Clojure
# Download clojure-lsp from GitHub
```

## Feature Support by Language

### Full Feature Set ✅
These languages have complete LSP implementation:

- **JavaScript/TypeScript**: All features, excellent
- **Python**: All features, excellent
- **Java**: All features, excellent
- **C#**: All features, excellent
- **Go**: All features, excellent
- **Rust**: All features, excellent
- **C/C++**: All features, excellent

### Good Feature Set 🟢
Most features work well:

- **PHP**: Good, missing some advanced features
- **Ruby**: Good, slower on large codebases
- **Kotlin**: Good, improving
- **Scala**: Good with Metals
- **Swift**: Good, native support
- **Dart**: Good with Dart SDK

### Basic Feature Set 🟡
Core features work:

- **R**: Basic, improving
- **Julia**: Basic, improving
- **Elixir**: Basic, good for Phoenix
- **Lua**: Basic, good for game dev
- **Bash**: Basic, syntax checking mainly

### Limited Support ⚠️
Minimal LSP features:

- **SQL**: Basic syntax, depends on dialect
- **Terraform**: Basic, HCL syntax
- **YAML**: Schema validation mainly
- **LaTeX**: Syntax and build support

## Installation Quick Reference

### Via npm (Node.js Package Manager)
```bash
# JavaScript/TypeScript
npm install -g typescript-language-server typescript

# HTML/CSS/JSON
npm install -g vscode-langservers-extracted

# PHP
npm install -g intelephense

# Docker
npm install -g dockerfile-language-server-nodejs

# YAML
npm install -g yaml-language-server

# Bash
npm install -g bash-language-server
```

### Via Language Package Managers

**Python (pip)**
```bash
pip install pyright
pip install python-lsp-server
pip install jedi-language-server
```

**Ruby (gem)**
```bash
gem install solargraph
```

**Go (go install)**
```bash
go install golang.org/x/tools/gopls@latest
go install github.com/lighttiger2505/sqls@latest
```

**Rust (rustup/cargo)**
```bash
rustup component add rust-analyzer
cargo install --git https://github.com/latex-lsp/texlab
```

**.NET (dotnet)**
```bash
dotnet tool install -g csharp-ls
```

**Scala (coursier)**
```bash
cs install metals
```

**Haskell (ghcup)**
```bash
ghcup install hls
```

**R (R console)**
```R
install.packages("languageserver")
```

**Julia (Julia REPL)**
```julia
using Pkg
Pkg.add("LanguageServer")
```

**OCaml (opam)**
```bash
opam install ocaml-lsp-server
```

**Perl (cpan)**
```bash
cpan Perl::LanguageServer
```

### Via System Package Managers

**macOS (Homebrew)**
```bash
brew install llvm              # C/C++
brew install terraform-ls      # Terraform
```

**Linux (apt)**
```bash
sudo apt install clangd        # C/C++
```

**Windows (Chocolatey)**
```bash
choco install llvm             # C/C++
choco install terraform-ls     # Terraform
```

### Manual Downloads

Some LSP servers require manual download:

- **Java**: https://download.eclipse.org/jdtls/snapshots/
- **Kotlin**: https://github.com/fwcd/kotlin-language-server/releases
- **Elixir**: https://github.com/elixir-lsp/elixir-ls/releases
- **Clojure**: https://github.com/clojure-lsp/clojure-lsp/releases
- **Erlang**: https://github.com/erlang-ls/erlang_ls/releases
- **Lua**: https://github.com/LuaLS/lua-language-server/releases
- **Zig**: https://github.com/zigtools/zls/releases

## Troubleshooting by Language

### JavaScript/TypeScript
**Issue**: "Cannot find module"
**Fix**: Ensure `typescript` is installed: `npm install -g typescript`

### Python
**Issue**: "Pyright not found"
**Fix**: Add pip bin to PATH or use `python -m pyright`

### Java
**Issue**: "jdtls not starting"
**Fix**: Requires Java 17+ runtime. Set `JAVA_HOME` correctly.

### C/C++
**Issue**: "clangd not finding headers"
**Fix**: Generate `compile_commands.json` with cmake or bear

### Go
**Issue**: "gopls indexing slowly"
**Fix**: Exclude `vendor/` directories, use Go modules

### Rust
**Issue**: "rust-analyzer slow"
**Fix**: Wait for initial cargo check, exclude `target/` dir

## Platform-Specific Notes

### Windows
- Use PowerShell or WSL for installation
- Some servers need PATH configuration
- Visual Studio may conflict with C# servers

### macOS
- Xcode includes Swift LSP
- Use Homebrew for most installations
- Code signing may affect some servers

### Linux
- Most servers available via apt/dnf
- Some require building from source
- Check distribution-specific packages

## Performance Considerations

### Fast Indexing (<1 second)
- JavaScript/TypeScript (small projects)
- Python (small projects)
- Go (with modules)

### Medium Indexing (5-30 seconds)
- Java (enterprise projects)
- C# (large solutions)
- Rust (with dependencies)

### Slow Indexing (1-5 minutes)
- C++ (large codebases)
- Scala (with SBT)
- Large monorepos

### Optimization Tips
1. Exclude build directories (`node_modules/`, `target/`, `dist/`)
2. Use project-specific LSP config files
3. Limit workspace scope when possible
4. Close unused language servers
5. Use incremental compilation when available

## Language-Specific Features

### TypeScript/JavaScript
- Import auto-completion
- Refactoring support
- Type inference
- JSDoc parsing

### Python
- Type hints support (PEP 484)
- Import sorting
- Docstring generation
- Virtual environment detection

### Java
- Automatic imports
- Extract method/variable
- Generate constructors
- Maven/Gradle integration

### Go
- Import organization
- Gofmt integration
- Test generation
- Module support

### Rust
- Macro expansion
- Trait implementation
- Cargo integration
- Error suggestions

## Contributing

Missing a language or want to improve support?

1. Check if LSP server exists: https://langserver.org
2. Test the LSP server with Codex
3. Add installation instructions
4. Submit documentation updates

---

**Support for 40+ languages and growing!** 🌐
