# AI Setup Guide - v2.0.0

**Complete guide to setting up AI-powered code completions**

---

## Overview

v2.0.0 introduces AI-powered code completions (similar to GitHub Copilot). This guide walks you through:
1. Choosing an AI provider
2. Getting API keys
3. Configuration options
4. Local model setup (optional)
5. Troubleshooting

---

## Quick Start

### Option 1: Cloud AI (Recommended - Fastest)

**Best for:**
- Fastest completions (< 1 second)
- Highest quality suggestions
- No GPU required
- Works on any machine

**Choose a provider:**

#### A. Anthropic Claude (Recommended)

1. **Get API Key**
   ```bash
   # Sign up at: https://console.anthropic.com/
   # Go to: Settings → API Keys
   # Create new key
   ```

2. **Set Environment Variable**
   ```bash
   # Windows (PowerShell)
   $env:ANTHROPIC_API_KEY = "sk-ant-api03-..."

   # macOS/Linux
   export ANTHROPIC_API_KEY="sk-ant-api03-..."

   # Add to profile for persistence:
   # ~/.bashrc or ~/.zshrc
   echo 'export ANTHROPIC_API_KEY="sk-ant-api03-..."' >> ~/.bashrc
   ```

3. **Configure Codex**
   ```yaml
   # Create: ~/.codex/config/ai.yml
   ai_completions:
     enabled: true
     mode: cloud

     cloud:
       provider: anthropic
       api_key: ${ANTHROPIC_API_KEY}
       model: claude-3-5-sonnet-20241022
       max_tokens: 100
       temperature: 0.2
   ```

4. **Verify**
   ```bash
   codex

   # Try it:
   /ultrathink Write a function to calculate fibonacci
   # You should see AI suggestions!
   ```

**Pricing:**
- Claude 3.5 Sonnet: ~$3 per 1M input tokens, ~$15 per 1M output tokens
- Typical usage: 10-50 completions/hour = $0.01-0.05/hour
- Monthly (heavy use): ~$10-30/month

---

#### B. OpenAI GPT-4

1. **Get API Key**
   ```bash
   # Sign up at: https://platform.openai.com/
   # Go to: API Keys
   # Create new secret key
   ```

2. **Set Environment Variable**
   ```bash
   # Windows (PowerShell)
   $env:OPENAI_API_KEY = "sk-proj-..."

   # macOS/Linux
   export OPENAI_API_KEY="sk-proj-..."

   # Add to profile:
   echo 'export OPENAI_API_KEY="sk-proj-..."' >> ~/.bashrc
   ```

3. **Configure Codex**
   ```yaml
   # ~/.codex/config/ai.yml
   ai_completions:
     enabled: true
     mode: cloud

     cloud:
       provider: openai
       api_key: ${OPENAI_API_KEY}
       model: gpt-4-turbo
       max_tokens: 100
       temperature: 0.2
   ```

**Pricing:**
- GPT-4 Turbo: ~$10 per 1M input tokens, ~$30 per 1M output tokens
- Typical usage: $0.02-0.10/hour
- Monthly (heavy use): ~$20-50/month

---

### Option 2: Local AI (Free, Private)

**Best for:**
- Complete privacy (code never leaves your machine)
- No API costs
- Works offline
- No rate limits

**Requirements:**
- GPU with 8GB+ VRAM (NVIDIA recommended)
- Or CPU with 16GB+ RAM (slower)
- 5-10GB disk space for model

#### Step 1: Install Dependencies

```bash
# Install Python and pip (if not already installed)
python --version  # Should be 3.8+

# Install llama-cpp-python (for local inference)
pip install llama-cpp-python

# OR for GPU support (NVIDIA):
CMAKE_ARGS="-DLLAMA_CUBLAS=on" pip install llama-cpp-python

# OR for Mac (Metal):
CMAKE_ARGS="-DLLAMA_METAL=on" pip install llama-cpp-python
```

#### Step 2: Download Model

```bash
# Install Hugging Face CLI
pip install huggingface-hub

# Download CodeLlama 7B (recommended for most users)
huggingface-cli download TheBloke/CodeLlama-7B-GGUF codellama-7b.Q4_K_M.gguf

# Model will be downloaded to:
# ~/.cache/huggingface/hub/models--TheBloke--CodeLlama-7B-GGUF/
```

**Model Options:**

| Model | Size | VRAM | Quality | Speed |
|-------|------|------|---------|-------|
| CodeLlama-7B | 4GB | 6GB | Good | Fast |
| StarCoder-15B | 8GB | 10GB | Better | Medium |
| WizardCoder-15B | 8GB | 10GB | Better | Medium |
| CodeLlama-13B | 7GB | 10GB | Best | Slow |

#### Step 3: Configure Codex

```yaml
# ~/.codex/config/ai.yml
ai_completions:
  enabled: true
  mode: local

  local:
    model: codellama-7b
    model_path: ~/.cache/huggingface/hub/models--TheBloke--CodeLlama-7B-GGUF/codellama-7b.Q4_K_M.gguf
    gpu_layers: 32  # Use GPU (set to 0 for CPU only)
    threads: 8      # CPU threads
    context_size: 4096
```

#### Step 4: Start Local Server (First Time)

```bash
# Test the model works
python -m llama_cpp.server \
  --model ~/.cache/huggingface/hub/models--TheBloke--CodeLlama-7B-GGUF/codellama-7b.Q4_K_M.gguf \
  --n_gpu_layers 32

# Should see: "Uvicorn running on http://127.0.0.1:8000"
# Press Ctrl+C to stop

# Codex will auto-start this when needed
```

#### Step 5: Verify

```bash
codex

# Try it:
/ultrathink Write a function to reverse a string
# First completion may be slow (loading model)
# Subsequent completions should be faster
```

---

### Option 3: Hybrid Mode (Best of Both)

**Best for:**
- Primary: Fast cloud completions
- Fallback: Local when offline or API fails
- Flexibility

```yaml
# ~/.codex/config/ai.yml
ai_completions:
  enabled: true
  mode: hybrid  # Try cloud first, fallback to local

  cloud:
    provider: anthropic
    api_key: ${ANTHROPIC_API_KEY}
    model: claude-3-5-sonnet-20241022

  local:
    model: codellama-7b
    model_path: ~/.cache/huggingface/hub/models--TheBloke--CodeLlama-7B-GGUF/codellama-7b.Q4_K_M.gguf
    gpu_layers: 32
```

---

## Advanced Configuration

### Complete Configuration File

```yaml
# ~/.codex/config/ai.yml

ai_completions:
  enabled: true
  mode: hybrid  # cloud, local, or hybrid

  # Cloud provider settings
  cloud:
    provider: anthropic  # anthropic or openai
    api_key: ${ANTHROPIC_API_KEY}
    model: claude-3-5-sonnet-20241022
    max_tokens: 100
    temperature: 0.2
    timeout: 10  # seconds

  # Local model settings
  local:
    model: codellama-7b
    model_path: ~/.cache/huggingface/hub/models--TheBloke--CodeLlama-7B-GGUF/codellama-7b.Q4_K_M.gguf
    gpu_layers: 32
    threads: 8
    context_size: 4096
    batch_size: 512

  # Caching settings
  caching:
    enabled: true
    ttl: 300  # 5 minutes
    max_entries: 1000

  # Rate limiting
  rate_limiting:
    enabled: true
    max_requests_per_minute: 60
    max_requests_per_hour: 1000

  # Context settings
  context:
    max_context_lines: 100
    include_imports: true
    include_nearby_functions: true
```

### Environment Variables

```bash
# All supported environment variables:

# Anthropic
ANTHROPIC_API_KEY=sk-ant-api03-...

# OpenAI
OPENAI_API_KEY=sk-proj-...

# Override config file location
CODEX_AI_CONFIG=~/custom/path/ai.yml

# Enable debug logging
CODEX_AI_DEBUG=true
```

---

## Troubleshooting

### Issue: "API key not found"

**Solution:**
```bash
# Check environment variable is set
echo $ANTHROPIC_API_KEY  # Should show your key

# If empty, set it:
export ANTHROPIC_API_KEY="sk-ant-api03-..."

# Add to profile for persistence
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-..."' >> ~/.bashrc
source ~/.bashrc
```

### Issue: "Connection timeout"

**Cloud mode:**
```bash
# Check internet connection
ping api.anthropic.com

# Increase timeout in config:
# ai.yml
cloud:
  timeout: 30  # Increase to 30 seconds
```

**Local mode:**
```bash
# Check local server is running
curl http://127.0.0.1:8000/health

# If not running, start it:
python -m llama_cpp.server --model <path>
```

### Issue: "Model loading failed" (Local)

**Check GPU availability:**
```bash
# NVIDIA GPU
nvidia-smi

# If no GPU, use CPU mode:
# ai.yml
local:
  gpu_layers: 0  # Use CPU only
  threads: 8     # Use all CPU cores
```

**Check model file exists:**
```bash
ls -lh ~/.cache/huggingface/hub/models--TheBloke--CodeLlama-7B-GGUF/

# If missing, re-download:
huggingface-cli download TheBloke/CodeLlama-7B-GGUF codellama-7b.Q4_K_M.gguf
```

### Issue: "Completions are slow" (Local)

**Optimize GPU usage:**
```yaml
# ai.yml
local:
  gpu_layers: 32  # Use more GPU layers (up to 43 for 7B models)
  batch_size: 512  # Increase batch size
```

**Or use smaller model:**
```bash
# Download smaller quantized model
huggingface-cli download TheBloke/CodeLlama-7B-GGUF codellama-7b.Q2_K.gguf

# Update config:
local:
  model_path: ~/.cache/.../codellama-7b.Q2_K.gguf
```

### Issue: "Rate limit exceeded"

**Cloud mode:**
```yaml
# Reduce request rate:
rate_limiting:
  max_requests_per_minute: 30  # Lower limit

# Or increase cache TTL:
caching:
  ttl: 600  # 10 minutes (cache longer)
```

### Issue: "Poor completion quality"

**Adjust temperature:**
```yaml
cloud:
  temperature: 0.1  # Lower = more deterministic
  # or
  temperature: 0.3  # Higher = more creative
```

**Increase context:**
```yaml
context:
  max_context_lines: 200  # Include more surrounding code
  include_imports: true
  include_nearby_functions: true
```

---

## Cost Optimization

### For Cloud Mode

1. **Enable Aggressive Caching**
   ```yaml
   caching:
     enabled: true
     ttl: 600  # 10 minutes
     max_entries: 5000
   ```

2. **Reduce Max Tokens**
   ```yaml
   cloud:
     max_tokens: 50  # Shorter completions = lower cost
   ```

3. **Use Rate Limiting**
   ```yaml
   rate_limiting:
     max_requests_per_minute: 30
     max_requests_per_hour: 500
   ```

4. **Monitor Usage**
   ```bash
   # Check API usage at:
   # Anthropic: https://console.anthropic.com/settings/usage
   # OpenAI: https://platform.openai.com/usage
   ```

### Expected Costs

**Light usage** (10 completions/hour, 40 hours/month):
- Claude: ~$5-10/month
- GPT-4: ~$10-20/month

**Medium usage** (30 completions/hour, 40 hours/month):
- Claude: ~$15-25/month
- GPT-4: ~$30-50/month

**Heavy usage** (60 completions/hour, 40 hours/month):
- Claude: ~$30-50/month
- GPT-4: ~$60-100/month

**Local mode**: $0 (free after initial setup)

---

## Privacy & Security

### Cloud Mode

**What gets sent to API:**
- Current file content (context)
- Cursor position
- Language/framework
- Imported modules

**What does NOT get sent:**
- Other files in project
- Git history
- Credentials or secrets
- Personal information

**Best practices:**
```yaml
# Limit context sent to API:
context:
  max_context_lines: 50  # Send less context
  include_imports: false
  include_nearby_functions: false
```

### Local Mode

**Privacy:**
- ✅ 100% private - code never leaves your machine
- ✅ No internet connection required
- ✅ No API calls or data transmission

**Best for:**
- Proprietary/confidential code
- Security-sensitive projects
- Compliance requirements (GDPR, HIPAA, etc.)

---

## Verification

### Test AI Completions

```bash
# Start Codex
codex

# Test with simple task
/ultrathink Write a function to check if string is palindrome

# Should see AI suggestion like:
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}
```

### Check Configuration

```bash
# Verify config file exists
cat ~/.codex/config/ai.yml

# Check environment variables
env | grep -E "(ANTHROPIC|OPENAI)_API_KEY"

# Test API connection (cloud mode)
curl -H "x-api-key: $ANTHROPIC_API_KEY" \
  https://api.anthropic.com/v1/messages
```

---

## Next Steps

Once AI is working:

1. **Try different skills with AI:**
   ```bash
   /test-generator src/utils.js  # AI suggests test cases
   /doc-generator src/api.js     # AI writes documentation
   /refactor-assistant analyze    # AI suggests improvements
   ```

2. **Customize for your workflow:**
   - Adjust temperature for your preference
   - Configure caching for your usage pattern
   - Set rate limits based on your budget

3. **Learn more:**
   - [PHASE_3_SUMMARY_v2.0.0.md](PHASE_3_SUMMARY_v2.0.0.md) - Full feature overview
   - [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md) - Setup debugging
   - [JUPYTER_GUIDE.md](JUPYTER_GUIDE.md) - Notebook integration

---

## Support

**Issues:**
- Configuration problems: Check this guide
- API errors: Check provider status pages
  - Anthropic: https://status.anthropic.com/
  - OpenAI: https://status.openai.com/
- GitHub issues: https://github.com/vedantparmar12/think-again/issues

**Community:**
- GitHub Discussions: https://github.com/vedantparmar12/think-again/discussions

---

**Ready to code 5x faster with AI! 🚀**
