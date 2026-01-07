# Custom Agent Skills for Codex CLI

This directory contains custom Agent Skills for the Codex CLI. These skills extend Codex with specialized capabilities for Terraform development, code review, documentation fetching, and more.

## Available Skills

## General Purpose Skills

### context7-docs
**Purpose**: Fetch up-to-date library and framework documentation using Context7 API.

**Usage**:
```
$context7-docs
```

**What it does**:
- Fetches real-time documentation from 2000+ libraries
- Searches for libraries by name
- Gets version-specific documentation
- Retrieves topic-focused docs (e.g., "routing", "hooks")
- Works with Next.js, React, Vue, Tailwind, Prisma, AWS SDK, and more

**Example prompts**:
- "Show me Next.js 15 routing docs"
- "How do I use React Query mutations?"
- "Get Terraform AWS provider documentation"
- "What's new in Prisma v5?"

**Script usage**:
```bash
# Search for a library
python scripts/context7_fetch.py search "nextjs"

# Get documentation
python scripts/context7_fetch.py docs "/vercel/next.js"

# Topic-specific docs
python scripts/context7_fetch.py docs "/tanstack/query" --topic "mutations"

# More context
python scripts/context7_fetch.py docs "/prisma/prisma" --topic "relations" --tokens 10000
```

**Environment**:
```bash
export CONTEXT7_API_KEY="your-api-key"  # Optional, for higher rate limits
```

### code-reviewer
**Purpose**: Comprehensive code reviews for security, performance, quality, and best practices.

**Usage**:
```
$code-reviewer
```

**What it does**:
- Security vulnerability scanning (SQL injection, XSS, CSRF, etc.)
- Performance analysis (N+1 queries, inefficient algorithms)
- Code quality checks (naming, duplication, error handling)
- Best practices validation (design patterns, conventions)
- Language-specific reviews (Python, JavaScript/TypeScript)

**Example prompts**:
- "Review this authentication function"
- "Security audit this API endpoint"
- "Check for performance issues"
- "Review my code for best practices"

**Review categories**:
- Critical Issues (security vulnerabilities, breaking bugs)
- Major Issues (performance problems, maintainability)
- Minor Issues (style, optimizations, suggestions)
- Positive Highlights (well-written code)

## Terraform Skills

### 1. terraform-code-generator (NEW)
**Purpose**: Auto-generate Terraform resource blocks by fetching latest schemas from Terraform Registry in real-time.

**Usage**:
```
$terraform-code-generator
```

**What it does**:
- Fetches latest provider versions from Terraform Registry API
- Retrieves current resource schemas
- Auto-generates complete, production-ready Terraform blocks
- Includes security best practices by default
- Provides intelligent defaults based on resource type
- Generates corresponding variables if requested

**Example prompts**:
- "Generate an Azure storage account"
- "Create AWS S3 bucket with security settings"
- "I need a Google Cloud compute instance"
- "Generate complete code for azurerm_virtual_network"

**Script usage**:
```bash
# Basic generation
node .codex/skills/terraform-code-generator/scripts/code-generator.js \
  --provider azurerm \
  --resource storage_account \
  --mode recommended

# With variables
node .codex/skills/terraform-code-generator/scripts/code-generator.js \
  --provider aws \
  --resource s3_bucket \
  --use-variables

# Complete mode (all options)
node .codex/skills/terraform-code-generator/scripts/code-generator.js \
  --provider azurerm \
  --resource virtual_network \
  --mode complete \
  --output network.tf
```

**Modes**:
- `basic`: Minimal working config with only required arguments
- `recommended`: Includes security best practices (default)
- `complete`: Shows all available arguments and blocks

### 2. terraform-resource-fetch
**Purpose**: Fetch latest Terraform provider resources and documentation from the Terraform Registry.

**Usage**:
```
$terraform-resource-fetch
```

**What it does**:
- Fetches the latest provider versions
- Retrieves complete resource schemas
- Provides documentation and examples
- Shows required vs optional arguments

**Example prompts**:
- "Show me the azurerm_virtual_network resource"
- "What are the required arguments for aws_s3_bucket?"
- "Get the latest documentation for google_compute_network"

### 2. terraform-project-generator
**Purpose**: Generate complete Terraform project structure with all standard files.

**Usage**:
```
$terraform-project-generator
```

**What it does**:
- Creates standard Terraform file structure
- Generates main.tf, variables.tf, outputs.tf, etc.
- Configures backend and provider
- Follows HashiCorp best practices
- Creates .gitignore and README

**Example prompts**:
- "Create a new Terraform project for Azure with blob storage"
- "Generate an AWS project with S3 backend"
- "Set up a GCP Terraform project for networking"

**Script usage**:
```bash
node .codex/skills/terraform-project-generator/scripts/generate-project.js \
  --name myproject \
  --provider azurerm \
  --backend azurerm \
  --output ./myproject
```

### 3. arm-to-terraform-migration
**Purpose**: Convert Azure ARM templates to Terraform HCL configuration.

**Usage**:
```
$arm-to-terraform-migration
```

**What it does**:
- Parses ARM template.json and parameters.json
- Maps ARM resources to Terraform equivalents
- Converts ARM expressions to HCL
- Preserves resource dependencies
- Generates complete Terraform project

**Example prompts**:
- "Convert this ARM template to Terraform"
- "Migrate my Azure Resource Manager template to HCL"
- "Transform ARM resources to azurerm provider resources"

**Script usage**:
```bash
node .codex/skills/arm-to-terraform-migration/scripts/migrate-arm.js \
  --template template.json \
  --parameters parameters.json \
  --output ./terraform \
  --preserve-names
```

### 4. arm-to-terraform-migration
**Purpose**: Convert Azure ARM templates to Terraform HCL configuration.

**Usage**:
```
$terraform-module-scaffold
```

**What it does**:
- Generates complete module structure
- Creates README with usage examples
- Adds working examples in examples/ directory
- Includes version constraints
- Follows module best practices

**Example prompts**:
- "Create a module for Azure Virtual Network"
- "Scaffold a reusable AWS VPC module"
- "Build a module for GCP compute instances"

**Script usage**:
```bash
node .codex/skills/terraform-module-scaffold/scripts/scaffold-module.js \
  --name virtual-network \
  --provider azurerm \
  --description "Azure Virtual Network module" \
  --output ./modules
```

### 5. terraform-validator
**Purpose**: Validate Terraform code for syntax, best practices, and security.

**Usage**:
```
$terraform-validator
```

**What it does**:
- Validates HCL syntax
- Checks formatting
- Ensures best practices
- Scans for security issues
- Checks compliance requirements

**Example prompts**:
- "Validate my Terraform code"
- "Check this configuration for security issues"
- "Review my Terraform files for best practices"
- "Scan for hardcoded credentials"

**Validation levels**:
- `syntax`: Basic syntax validation
- `format`: Format checking
- `best-practices`: Best practice validation
- `security`: Security scanning
- `compliance`: Compliance checking

**Script usage**:
```bash
node .codex/skills/terraform-validator/scripts/validate.js \
  --path ./terraform \
  --level security
```

### 6. terraform-state-manager
**Purpose**: Analyze, inspect, and safely manipulate Terraform state files.

**Usage**:
```
$terraform-state-manager
```

**What it does**:
- Lists and inspects state resources
- Detects configuration drift
- Analyzes resource dependencies
- Helps with state manipulation (move, remove, import)
- Generates state analysis reports

**Example prompts**:
- "Analyze my Terraform state file"
- "Show me all resources in the state"
- "Detect drift in my infrastructure"
- "Help me move a resource in state"

**Script usage**:
```bash
node .codex/skills/terraform-state-manager/scripts/state-analyzer.js \
  --state terraform.tfstate \
  --report full
```

### 7. terraform-plan-analyzer
**Purpose**: Parse and explain terraform plan output for impact assessment.

**Usage**:
```
$terraform-plan-analyzer
```

**What it does**:
- Parses terraform plan JSON output
- Identifies breaking changes
- Assesses risk and impact
- Estimates cost implications
- Provides approval recommendations

**Example prompts**:
- "Analyze this terraform plan"
- "What are the risks in this plan?"
- "Explain what will change"
- "Check for breaking changes"

**Script usage**:
```bash
# First generate plan
terraform plan -out=tfplan
terraform show -json tfplan > plan.json

# Then analyze
node .codex/skills/terraform-plan-analyzer/scripts/plan-analyzer.js \
  --plan plan.json \
  --report full
```

### 8. terraform-security-scanner
**Purpose**: Comprehensive security scanning for hardcoded secrets and vulnerabilities.

**Usage**:
```
$terraform-security-scanner
```

**What it does**:
- Detects hardcoded secrets (passwords, API keys, tokens)
- Finds security misconfigurations
- Checks compliance (CIS, PCI DSS, HIPAA)
- Identifies unencrypted storage
- Scans for public network access

**Example prompts**:
- "Scan for security issues"
- "Find hardcoded secrets in my code"
- "Check CIS compliance"
- "Security audit my Terraform files"

**Script usage**:
```bash
node .codex/skills/terraform-security-scanner/scripts/security-scanner.js \
  --path ./terraform \
  --severity critical,high
```

### 9. terraform-doc-generator
**Purpose**: Auto-generate comprehensive README.md for Terraform modules.

**Usage**:
```
$terraform-doc-generator
```

**What it does**:
- Parses variables, outputs, and resources
- Generates formatted markdown tables
- Creates usage examples
- Documents requirements and providers
- Produces professional README.md

**Example prompts**:
- "Generate documentation for this module"
- "Create a README for my Terraform code"
- "Document all inputs and outputs"
- "Update the module README"

**Script usage**:
```bash
node .codex/skills/terraform-doc-generator/scripts/doc-generator.js \
  --path ./modules/network \
  --include-examples
```

## Skill Directory Structure

Each skill follows the standard Agent Skills format:

```
skill-name/
├── SKILL.md           # Instructions and metadata
├── scripts/           # Executable scripts (optional)
│   └── *.js          # Node.js scripts
├── references/        # Documentation and references (optional)
│   └── *.md
└── assets/            # Templates and resources (optional)
```

## How to Use Skills in Codex

### Explicit Invocation

Use the skill selector or mention the skill directly:

```
/skills
```

Or type:
```
$terraform-validator validate my code
```

### Implicit Invocation

Codex can automatically use skills based on your task:

```
"I need to migrate an ARM template to Terraform"
```

Codex will recognize this matches the `arm-to-terraform-migration` skill and use it automatically.

## Skill Scopes

These skills are stored in `.codex/skills` (REPO scope), making them available to anyone using this repository. Skills in this location override USER and SYSTEM scoped skills.

## Running Scripts Directly

All skills include standalone Node.js scripts in their `scripts/` directories. You can run these directly:

### Fetch Terraform Resource
```bash
node .codex/skills/terraform-resource-fetch/scripts/fetch-resource.js \
  --provider azurerm \
  --resource virtual_network
```

### Generate Project
```bash
node .codex/skills/terraform-project-generator/scripts/generate-project.js \
  --name myapp \
  --provider aws \
  --backend s3
```

### Migrate ARM Template
```bash
node .codex/skills/arm-to-terraform-migration/scripts/migrate-arm.js \
  --template infrastructure/template.json \
  --parameters infrastructure/parameters.json \
  --output ./terraform
```

### Scaffold Module
```bash
node .codex/skills/terraform-module-scaffold/scripts/scaffold-module.js \
  --name storage-account \
  --provider azurerm \
  --description "Azure Storage Account module"
```

### Validate Code
```bash
node .codex/skills/terraform-validator/scripts/validate.js \
  --path ./infrastructure \
  --level best-practices
```

### Analyze State
```bash
node .codex/skills/terraform-state-manager/scripts/state-analyzer.js \
  --state terraform.tfstate \
  --report summary
```

### Analyze Plan
```bash
terraform plan -out=tfplan && terraform show -json tfplan > plan.json
node .codex/skills/terraform-plan-analyzer/scripts/plan-analyzer.js \
  --plan plan.json \
  --check-breaking
```

### Security Scan
```bash
node .codex/skills/terraform-security-scanner/scripts/security-scanner.js \
  --path . \
  --secrets-only
```

### Generate Docs
```bash
node .codex/skills/terraform-doc-generator/scripts/doc-generator.js \
  --path ./modules/compute
```

## Prerequisites

All scripts require Node.js (v14 or higher). No additional dependencies needed - they use only Node.js built-in modules.

## Integration with Your Workflow

### 1. Development Workflow

```bash
# 1. Create new project
$terraform-project-generator

# 2. Add resources using documentation
$terraform-resource-fetch

# 3. Scan for security issues
$terraform-security-scanner

# 4. Validate as you go
$terraform-validator

# 5. Create reusable modules
$terraform-module-scaffold

# 6. Generate documentation
$terraform-doc-generator
```

### 2. Migration Workflow

```bash
# 1. Migrate ARM to Terraform
$arm-to-terraform-migration

# 2. Validate migrated code
$terraform-validator

# 3. Review and adjust
# Manual review and adjustments

# 4. Test deployment
terraform plan
```

### 3. Module Development

```bash
# 1. Scaffold module structure
$terraform-module-scaffold

# 2. Implement resources
# Add your resource definitions

# 3. Validate module
$terraform-validator

# 4. Security scan
$terraform-security-scanner

# 5. Generate documentation
$terraform-doc-generator

# 6. Test with examples
cd examples/basic
terraform init && terraform plan
```

### 4. Deployment Workflow

```bash
# 1. Security scan before deploy
$terraform-security-scanner

# 2. Generate and analyze plan
terraform plan -out=tfplan
$terraform-plan-analyzer

# 3. Review breaking changes
# Check for risks and impacts

# 4. Apply if approved
terraform apply tfplan

# 5. Verify state
$terraform-state-manager
```

## Customization

You can customize these skills by:

1. **Editing SKILL.md**: Update instructions and behavior
2. **Modifying scripts**: Enhance functionality
3. **Adding references**: Include additional documentation
4. **Creating templates**: Add new file templates

## Best Practices

1. **Use explicit invocation** when you know exactly which skill you need
2. **Let Codex choose implicitly** for general requests
3. **Run scripts directly** for automation and CI/CD
4. **Validate regularly** as you develop
5. **Leverage examples** from scaffolded modules

## Architecture Notes

These skills were designed based on:
- Terraform Registry API integration
- HashiCorp best practices
- Azure ARM template structure
- Security scanning requirements
- Module development standards

## Support and Contributions

These skills are customized for your Terraform workflow. Feel free to:
- Modify skills for your specific needs
- Add new skills for additional capabilities
- Share improvements with your team
- Create organization-specific variations

## Additional Resources

- [Terraform Registry](https://registry.terraform.io/)
- [Terraform Documentation](https://www.terraform.io/docs)
- [Agent Skills Specification](https://agentskills.io/specification)
- [Codex CLI Documentation](https://docs.codex.ai)

## Quick Reference

| Task | Skill | Alternative |
|------|-------|-------------|
| **Auto-generate code** | `$terraform-code-generator` | Manual coding |
| Get resource docs | `$terraform-resource-fetch` | Registry website |
| Create new project | `$terraform-project-generator` | Manual setup |
| Migrate ARM | `$arm-to-terraform-migration` | Manual conversion |
| Build module | `$terraform-module-scaffold` | Manual creation |
| Validate code | `$terraform-validator` | terraform validate + tfsec |
| Analyze state | `$terraform-state-manager` | terraform state commands |
| Analyze plan | `$terraform-plan-analyzer` | Manual plan review |
| Security scan | `$terraform-security-scanner` | tfsec + checkov |
| Generate docs | `$terraform-doc-generator` | terraform-docs |

---

**Version**: 3.1.0
**Created**: 2025-12-27
**Last Updated**: 2025-12-27
**Skills Count**: 12 (10 Terraform + 2 General Purpose)
**Terraform Support**: >= 1.6
**Node.js Required**: >= 14
**Python Required**: >= 3.7 (for context7-docs)

## Key Feature: Auto-Code Generation

The `terraform-code-generator` skill fetches live data from Terraform Registry and generates production-ready code with:
- Latest provider versions (auto-detected)
- Current resource schemas
- Security best practices by default
- Intelligent defaults based on resource type
- No hardcoded secrets or insecure configurations
