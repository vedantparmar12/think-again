# Jupyter Notebook Integration Guide - v2.0.0

**Complete guide to using Codex with Jupyter notebooks**

---

## Overview

v2.0.0 introduces full Language Server Protocol (LSP) support for Jupyter notebooks (.ipynb files). This guide walks you through:
1. Setting up Jupyter with Codex
2. Using code intelligence in notebooks
3. Applying software engineering practices to data science
4. Debugging notebooks
5. Best practices and workflows
6. Troubleshooting

---

## What is Jupyter Integration?

**Before v2.0.0:**
- Notebooks had basic syntax highlighting
- No code intelligence or refactoring
- Hard to maintain and review
- Difficult to apply best practices

**With v2.0.0:**
- ✅ Full LSP support in every cell
- ✅ Go to definition across cells
- ✅ Find all references in notebook
- ✅ Code review for notebooks
- ✅ Refactoring and optimization
- ✅ Execution order analysis
- ✅ Professional data science workflows

---

## Quick Start

### Step 1: Install Jupyter

```bash
# Install Jupyter
pip install jupyter notebook

# Or Jupyter Lab (recommended)
pip install jupyterlab

# Verify installation
jupyter --version
# Should show: jupyter core version, notebook version, etc.
```

### Step 2: Start Jupyter

```bash
# Start Jupyter Notebook
jupyter notebook

# Or Jupyter Lab
jupyter lab

# Server will start on http://localhost:8888
```

### Step 3: Test with Codex

```bash
# In another terminal, start Codex
codex

# Review a notebook
/code-review analysis.ipynb

# Should see:
📊 Notebook Code Review:
✅ Analyzing 12 cells...
⚠️ Found 3 issues
💡 3 recommendations
```

---

## Core Features

### 1. Code Intelligence in Cells

**Every cell gets full LSP support:**

```python
# Cell 1: Imports
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# Cell 2: Load data
df = pd.read_csv('data.csv')  # Hover shows DataFrame info
                               # Go to definition works
                               # Auto-completion available

# Cell 3: Analysis
def clean_data(dataframe):  # LSP knows this function exists
    """Clean the input dataframe."""
    return dataframe.dropna()

# Cell 4: Usage
cleaned = clean_data(df)  # ✅ LSP shows function signature
                          # ✅ Ctrl+click goes to Cell 3
                          # ✅ Shows docstring on hover
```

### 2. Cross-Cell Navigation

**Navigate between cells like regular code:**

```bash
# In Cell 10, you reference a function from Cell 3
result = calculate_metrics(data)
         ^^^^^^^^^^^^^^^^^
         # Ctrl+click goes to Cell 3 where it's defined

# Find all uses of a variable
cleaned_data  # Right-click → Find All References
              # Shows: Used in Cell 4, 7, 9, 12
```

### 3. Execution Order Analysis

**Detect out-of-order execution:**

```python
# Cell 1: [3] (executed 3rd)
threshold = 0.5

# Cell 2: [1] (executed 1st)
import pandas as pd

# Cell 3: [2] (executed 2nd)
result = apply_threshold(data, threshold)  # ❌ ERROR!
# threshold not defined yet (Cell 1 executed later)

# Codex detects this:
⚠️ Execution Order Issue:
Cell 3 uses 'threshold' from Cell 1
But Cell 1 was executed AFTER Cell 3
💡 Recommendation: Execute cells in order, or move definition earlier
```

### 4. Kernel State Tracking

**Know exactly what's in memory:**

```bash
/code-review notebook.ipynb

📊 Kernel State Analysis:
Defined Variables:
  - df: DataFrame (1000 rows × 5 cols)
  - cleaned_data: DataFrame (950 rows × 5 cols)
  - model: RandomForestClassifier
  - threshold: float = 0.5

Undefined References:
  - Cell 7: Uses 'test_data' (not defined)  ❌
  - Cell 9: Uses 'scaler' (defined in Cell 11)  ❌

💡 Issues found with execution order
```

---

## Using Codex Skills with Notebooks

### code-review Skill

```bash
/code-review analysis.ipynb

📊 Notebook Code Review:

Cell 1 (Imports): ✅ Clean
  import pandas as pd
  import numpy as np
  from sklearn.model_selection import train_test_split

Cell 2 (Data Loading): ⚠️ Missing error handling
  df = pd.read_csv('data.csv')

  💡 Recommendation:
  try:
      df = pd.read_csv('data.csv')
  except FileNotFoundError:
      print("Error: data.csv not found")
      df = pd.DataFrame()

Cell 3 (Cleaning): 🔴 Modifying DataFrame in-place
  df.dropna(inplace=True)  # Risky!
  df['new_col'] = df['a'] + df['b']

  💡 Recommendation:
  # Create copy to preserve original
  df_cleaned = df.copy()
  df_cleaned = df_cleaned.dropna()
  df_cleaned['new_col'] = df_cleaned['a'] + df_cleaned['b']

Cell 4 (Analysis): ⚠️ Variable dependency issue
  result = analyze(threshold)
  # 'threshold' defined in Cell 6 (executed later)

  💡 Recommendation:
  Move Cell 6 before Cell 4, or define threshold earlier

Cell 5 (Visualization): ✅ Good matplotlib usage
  plt.figure(figsize=(10, 6))
  plt.plot(df['x'], df['y'])
  plt.xlabel('X axis')
  plt.ylabel('Y axis')
  plt.title('Analysis Results')
  plt.show()

Summary:
  ✅ 2 cells clean
  ⚠️ 2 cells need improvement
  🔴 1 cell has issues

  Top Issues:
  1. Execution order problems (Cells 4, 6)
  2. In-place DataFrame modifications (Cell 3)
  3. Missing error handling (Cell 2)
```

### refactor-assistant Skill

```bash
/refactor-assistant analyze notebook.ipynb

♻️ Notebook Refactoring Analysis:

1. Extract Functions ⭐⭐⭐⭐⭐ (High Impact)
   Cells 3, 7, 11 have duplicate data cleaning logic

   Current (45 lines total):
   # Cell 3:
   df = df.dropna()
   df = df[df['age'] > 0]
   df['age_group'] = pd.cut(df['age'], bins=[0, 18, 65, 100])

   # Cell 7: (same logic)
   df2 = df2.dropna()
   df2 = df2[df2['age'] > 0]
   df2['age_group'] = pd.cut(df2['age'], bins=[0, 18, 65, 100])

   # Cell 11: (same logic again)
   ...

   💡 Recommendation:
   # Cell 2 (new): Define function
   def clean_dataframe(df, age_column='age'):
       """Clean and categorize DataFrame."""
       df_clean = df.copy()
       df_clean = df_clean.dropna()
       df_clean = df_clean[df_clean[age_column] > 0]
       df_clean['age_group'] = pd.cut(
           df_clean[age_column],
           bins=[0, 18, 65, 100],
           labels=['child', 'adult', 'senior']
       )
       return df_clean

   # Cell 3, 7, 11: Use function
   df_cleaned = clean_dataframe(df)

   Savings: 45 lines → 3 function calls + 1 definition

2. Optimize Performance ⭐⭐⭐⭐ (High Impact)
   Cell 9: Using loop instead of vectorized operation

   Current (slow):
   for i, row in df.iterrows():
       df.loc[i, 'total'] = row['price'] * row['quantity']
   # Time: 5.2 seconds for 10,000 rows

   💡 Recommendation:
   df['total'] = df['price'] * df['quantity']
   # Time: 0.05 seconds for 10,000 rows
   # 100x faster!

3. Improve Structure ⭐⭐⭐ (Medium Impact)
   Current structure is disorganized

   💡 Recommended cell organization:
   Section 1: Setup
     - Cell 1: Imports & Configuration
     - Cell 2: Function Definitions

   Section 2: Data Loading
     - Cell 3: Load raw data
     - Cell 4: Initial exploration (head, info, describe)

   Section 3: Data Cleaning
     - Cell 5: Handle missing values
     - Cell 6: Remove outliers
     - Cell 7: Feature engineering

   Section 4: Analysis
     - Cell 8-10: Statistical analysis
     - Cell 11-13: Machine learning

   Section 5: Visualization
     - Cell 14-16: Charts and plots

   Section 6: Export
     - Cell 17: Save results

4. Add Documentation ⭐⭐⭐ (Medium Impact)
   Only 2 of 15 cells have markdown explanations

   💡 Recommendation:
   Add markdown cells before each section:
   - Explain what the section does
   - Document key assumptions
   - Note any data quality issues
   - Provide interpretation of results

5. Memory Optimization ⭐⭐ (Low Impact)
   Cell 8: Creating unnecessary copies

   Current:
   df_copy1 = df.copy()
   df_copy2 = df.copy()
   df_copy3 = df.copy()
   # Memory: 3x DataFrame size

   💡 Recommendation:
   # Only copy when needed for comparison
   # Use views or references otherwise
   df_view = df  # No copy
   df_modified = df.copy()  # Only when modifying
```

### doc-generator Skill

```bash
/doc-generator notebook.ipynb

📝 Documentation Generator:

Generated Markdown Documentation:

# Data Analysis Pipeline - notebook.ipynb

## Overview
This notebook performs exploratory data analysis on customer data,
including data cleaning, feature engineering, and predictive modeling.

## Data Sources
- `data/customers.csv`: Customer demographic and transaction data
- `data/products.csv`: Product catalog

## Pipeline Steps

### 1. Data Loading (Cells 1-2)
- Load customer and product data
- Initial data quality checks
- Merge datasets on product_id

### 2. Data Cleaning (Cells 3-5)
- Remove rows with missing critical fields
- Handle outliers in price and quantity fields
- Standardize date formats

### 3. Feature Engineering (Cells 6-8)
- Create age_group categories
- Calculate customer lifetime value (CLV)
- Generate recency, frequency, monetary (RFM) scores

### 4. Exploratory Analysis (Cells 9-12)
- Distribution analysis of key metrics
- Correlation analysis
- Segment identification

### 5. Predictive Modeling (Cells 13-15)
- Train Random Forest classifier
- Evaluate model performance
- Feature importance analysis

## Key Findings
- Age group 25-45 represents 60% of high-value customers
- Product category "Electronics" has highest profit margin
- Customer churn rate: 15% annually

## Dependencies
```python
pandas >= 1.3.0
numpy >= 1.21.0
scikit-learn >= 1.0.0
matplotlib >= 3.4.0
seaborn >= 0.11.0
```

## Usage
```bash
jupyter notebook notebook.ipynb
# Run all cells: Cell → Run All
```
```

### test-generator Skill

```bash
/test-generator notebook.ipynb

🧪 Test Generator:

Generated Test Suite for Notebook Functions:

```python
# test_notebook_functions.py
import pytest
import pandas as pd
from notebook_functions import clean_dataframe, calculate_clv

class TestCleanDataFrame:
    def test_removes_null_values(self):
        """Test that null values are removed."""
        df = pd.DataFrame({
            'age': [25, None, 35],
            'income': [50000, 60000, None]
        })
        result = clean_dataframe(df)
        assert result.isnull().sum().sum() == 0

    def test_filters_invalid_ages(self):
        """Test that negative ages are removed."""
        df = pd.DataFrame({
            'age': [25, -5, 35],
            'income': [50000, 60000, 70000]
        })
        result = clean_dataframe(df)
        assert (result['age'] > 0).all()

    def test_creates_age_groups(self):
        """Test that age_group column is created."""
        df = pd.DataFrame({
            'age': [10, 30, 70],
            'income': [0, 50000, 60000]
        })
        result = clean_dataframe(df)
        assert 'age_group' in result.columns
        assert result['age_group'].nunique() == 3

class TestCalculateCLV:
    def test_basic_calculation(self):
        """Test CLV calculation with known values."""
        avg_purchase = 100
        frequency = 12
        lifespan = 5
        result = calculate_clv(avg_purchase, frequency, lifespan)
        assert result == 6000

    def test_handles_zero_values(self):
        """Test that zero values return zero CLV."""
        result = calculate_clv(0, 0, 0)
        assert result == 0

    def test_validates_negative_inputs(self):
        """Test that negative inputs raise ValueError."""
        with pytest.raises(ValueError):
            calculate_clv(-100, 12, 5)

# Run tests:
# pytest test_notebook_functions.py -v
```

💡 Recommendations:
1. Extract functions from cells into a .py module
2. Import module in Cell 1 of notebook
3. Run tests to validate notebook logic
4. Use tests in CI/CD pipeline
```

---

## Best Practices for Data Science Notebooks

### 1. Organize Cells Logically

```python
# ✅ Good Structure

# Cell 1: Imports & Config
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
%matplotlib inline

# Cell 2: Function Definitions
def load_data(filepath):
    """Load and validate data."""
    return pd.read_csv(filepath)

# Cell 3: Load Data
df = load_data('data.csv')

# Cell 4: Explore
df.head()
df.info()

# Cell 5: Clean
df_clean = clean_data(df)

# Cell 6: Analyze
results = analyze(df_clean)

# Cell 7: Visualize
plot_results(results)
```

```python
# ❌ Bad Structure

# Cell 1: Mixed imports and logic
import pandas as pd
df = pd.read_csv('data.csv')
import numpy as np
print(df.head())

# Cell 2: Random function in the middle
def some_function():
    pass

# Cell 3: More imports
import matplotlib.pyplot as plt

# Hard to follow, difficult to maintain
```

### 2. Use Functions, Not Scripts

```python
# ✅ Good: Reusable Functions

def clean_data(df):
    """Remove nulls and outliers."""
    df = df.dropna()
    df = df[df['age'] > 0]
    return df

def analyze_segments(df):
    """Perform customer segmentation."""
    # ... analysis logic
    return segments

# Easy to test, reuse, and understand
```

```python
# ❌ Bad: Script-style Code

# Cell 1
df = df.dropna()
df = df[df['age'] > 0]

# Cell 7 (same logic again)
df2 = df2.dropna()
df2 = df2[df2['age'] > 0]

# Cell 12 (same logic again)
df3 = df3.dropna()
df3 = df3[df3['age'] > 0]

# Duplicate code, hard to maintain
```

### 3. Avoid In-Place Modifications

```python
# ✅ Good: Create New Variables

df_original = pd.read_csv('data.csv')
df_cleaned = df_original.copy()
df_cleaned = df_cleaned.dropna()
df_cleaned['new_col'] = df_cleaned['a'] + df_cleaned['b']

# Original data preserved for comparison
```

```python
# ❌ Bad: Modify In-Place

df = pd.read_csv('data.csv')
df.dropna(inplace=True)
df['new_col'] = df['a'] + df['b']

# Can't go back to original data without re-running from start
```

### 4. Add Markdown Documentation

```markdown
# ✅ Good: Documented Notebook

## Data Cleaning
In this section, we remove invalid records and handle missing values.

**Criteria:**
- Remove rows where age < 0
- Remove rows where income is null
- Keep rows where data quality score > 0.8

**Expected result:** ~5% of rows removed
```

```python
# Cell: Cleaning code
df_cleaned = clean_data(df)
print(f"Removed {len(df) - len(df_cleaned)} rows")
```

### 5. Use Descriptive Variable Names

```python
# ✅ Good: Clear Names

customer_lifetime_value = calculate_clv(avg_purchase, frequency, lifespan)
high_value_customers = customers[customers['clv'] > 1000]
monthly_revenue_by_segment = df.groupby('segment')['revenue'].sum()
```

```python
# ❌ Bad: Unclear Names

clv = calc(ap, f, l)
hvc = c[c['clv'] > 1000]
mrbs = df.groupby('seg')['rev'].sum()
```

### 6. Validate Assumptions

```python
# ✅ Good: Check Assumptions

# Assumption: All ages should be between 0 and 120
assert df['age'].min() >= 0, "Found negative ages!"
assert df['age'].max() <= 120, "Found unrealistic ages!"

# Assumption: No duplicate customer IDs
assert df['customer_id'].is_unique, "Found duplicate customers!"

# Assumption: Dates are in correct range
assert df['purchase_date'].min() >= pd.Timestamp('2020-01-01'), "Found old dates!"
```

---

## Advanced Features

### 1. Execution Order Validation

```bash
/code-review notebook.ipynb

📊 Execution Order Analysis:

✅ Cells 1-5: Executed in order [1, 2, 3, 4, 5]
⚠️ Cells 6-10: Out of order execution detected

Details:
  Cell 6 [3]: Uses 'threshold' from Cell 9
  Cell 7 [1]: Imports (should be earlier)
  Cell 8 [2]: Defines 'threshold'
  Cell 9 [4]: Uses 'threshold' (OK)
  Cell 10 [5]: Uses result from Cell 6

Issues:
  1. Cell 6 executed before Cell 8 (threshold defined)
  2. Cell 7 (imports) executed after data loading

💡 Recommendations:
  1. Move Cell 7 to top (imports first)
  2. Move Cell 8 before Cell 6 (define before use)
  3. Re-run all cells in order: Cell → Run All
```

### 2. Variable Dependency Graph

```bash
/refactor-assistant analyze notebook.ipynb

♻️ Variable Dependencies:

df (Cell 2)
  ↓
df_cleaned (Cell 3)
  ↓
train_data (Cell 5) ────→ model (Cell 7)
  ↓                          ↓
test_data (Cell 5) ─────→ predictions (Cell 8)
  ↓
validation_data (Cell 6) → metrics (Cell 9)

Issues:
  - Cell 4 uses 'scaler' (defined in Cell 10) ❌
  - Cell 8 uses 'model' but Cell 7 not executed ⚠️

💡 Execute cells in dependency order
```

### 3. Performance Profiling

```bash
/refactor-assistant analyze notebook.ipynb

♻️ Performance Analysis:

Cell Execution Times:
  Cell 1: 0.05s (Imports)
  Cell 2: 0.12s (Load data)
  Cell 3: 0.08s (Clean data)
  Cell 4: 12.5s (Feature engineering) ⚠️ SLOW!
  Cell 5: 0.15s (Split data)
  Cell 6: 45.2s (Model training) ⚠️ VERY SLOW!
  Cell 7: 0.22s (Predictions)

Total: 58.4 seconds

Bottlenecks:
  1. Cell 4: Using iterrows() instead of vectorization
     💡 Replace with vectorized operations (100x faster)

  2. Cell 6: Training on full dataset
     💡 Use sample for experimentation, full data for final model
```

---

## Troubleshooting

### Issue: "Kernel not found"

**Solution:**
```bash
# Install ipykernel
pip install ipykernel

# Add kernel to Jupyter
python -m ipykernel install --user --name=myenv

# Select kernel in Jupyter:
# Kernel → Change Kernel → myenv
```

### Issue: "LSP not working in notebook"

**Solution:**
```bash
# Install Jupyter LSP extension
pip install jupyter-lsp

# Install language servers
pip install python-lsp-server  # For Python

# Restart Jupyter
jupyter lab  # LSP works better in JupyterLab
```

### Issue: "Can't find references across cells"

**Solution:**
```yaml
# Ensure Jupyter integration is enabled
# ~/.codex/config/jupyter.yml
jupyter:
  enabled: true
  track_execution_order: true
  cross_cell_navigation: true
```

### Issue: "Execution order warnings incorrect"

**Solution:**
```bash
# Restart kernel and run all cells in order
# Jupyter: Kernel → Restart & Run All

# This resets execution counter
# Cells will be [1, 2, 3, ...] in order
```

---

## Converting Notebooks to Production Code

### Step 1: Extract Functions

```bash
/refactor-assistant extract notebook.ipynb

♻️ Extracted Functions:

Created: notebook_functions.py

```python
# notebook_functions.py
import pandas as pd
import numpy as np

def load_data(filepath):
    """Load and validate customer data."""
    df = pd.read_csv(filepath)
    assert 'customer_id' in df.columns
    assert 'purchase_date' in df.columns
    return df

def clean_data(df):
    """Clean and prepare data for analysis."""
    df_clean = df.copy()
    df_clean = df_clean.dropna()
    df_clean = df_clean[df_clean['age'] > 0]
    return df_clean

def calculate_clv(avg_purchase, frequency, lifespan):
    """Calculate customer lifetime value."""
    if avg_purchase < 0 or frequency < 0 or lifespan < 0:
        raise ValueError("All inputs must be non-negative")
    return avg_purchase * frequency * lifespan
```

💡 Now update notebook:
```python
# Cell 1: Import functions
from notebook_functions import load_data, clean_data, calculate_clv

# Cell 2: Use functions
df = load_data('data.csv')
df_clean = clean_data(df)
```
```

### Step 2: Add Tests

```bash
/test-generator notebook_functions.py

# Creates comprehensive test suite
# See test_notebook_functions.py
```

### Step 3: Create Package

```bash
# Project structure:
my_analysis/
  ├── notebooks/
  │   └── analysis.ipynb
  ├── src/
  │   ├── __init__.py
  │   ├── data.py        # Data loading functions
  │   ├── cleaning.py    # Cleaning functions
  │   └── analysis.py    # Analysis functions
  ├── tests/
  │   ├── test_data.py
  │   ├── test_cleaning.py
  │   └── test_analysis.py
  ├── requirements.txt
  └── README.md
```

---

## Integration with Version Control

### .gitignore for Notebooks

```bash
# .gitignore

# Jupyter
.ipynb_checkpoints/
*/.ipynb_checkpoints/*

# Jupyter outputs (optional - remove if you want to commit outputs)
*.ipynb_checkpoints

# Remove cell outputs before commit (recommended)
# Use: jupyter nbconvert --clear-output --inplace notebook.ipynb
```

### Pre-commit Hook

```bash
# .git/hooks/pre-commit

#!/bin/bash
# Clear notebook outputs before commit

for notebook in $(git diff --cached --name-only --diff-filter=ACM | grep '\.ipynb$'); do
    jupyter nbconvert --clear-output --inplace "$notebook"
    git add "$notebook"
done
```

---

## Performance Tips

### 1. Use Vectorized Operations

```python
# ❌ Slow (5.2 seconds)
for i, row in df.iterrows():
    df.loc[i, 'total'] = row['price'] * row['quantity']

# ✅ Fast (0.05 seconds) - 100x faster!
df['total'] = df['price'] * df['quantity']
```

### 2. Avoid Repeated Computations

```python
# ❌ Slow
for i in range(len(df)):
    expensive_result = expensive_computation(df.iloc[i])
    df.loc[i, 'result'] = expensive_result

# ✅ Fast - compute once
expensive_result = expensive_computation(df)
df['result'] = expensive_result
```

### 3. Use Sampling for Exploration

```python
# ❌ Slow for large datasets
df.groupby('category').apply(complex_analysis)  # 10M rows

# ✅ Fast - use sample first
df_sample = df.sample(n=100000)  # 100k rows
df_sample.groupby('category').apply(complex_analysis)

# Once validated, run on full dataset
```

---

## Verification

### Test Jupyter Integration

```bash
# Create test notebook
cat > test_notebook.ipynb << 'EOF'
{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "import pandas as pd\n",
    "df = pd.DataFrame({'a': [1, 2, 3], 'b': [4, 5, 6]})"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [],
   "source": [
    "def process(dataframe):\n",
    "    return dataframe.sum()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [],
   "source": [
    "result = process(df)"
   ]
  }
 ],
 "metadata": {},
 "nbformat": 4,
 "nbformat_minor": 2
}
EOF

# Review with Codex
codex
/code-review test_notebook.ipynb

# Should see:
📊 Notebook Code Review:
✅ Cell 1: Clean imports and data loading
✅ Cell 2: Function definition
✅ Cell 3: Function usage
💡 All cells executed in order
```

---

## Next Steps

Once Jupyter integration is working:

1. **Apply to existing notebooks:**
   ```bash
   /code-review my_analysis.ipynb
   /refactor-assistant analyze my_analysis.ipynb
   ```

2. **Improve notebook quality:**
   - Add markdown documentation
   - Extract functions
   - Fix execution order issues
   - Add error handling

3. **Convert to production code:**
   - Extract functions to .py modules
   - Add comprehensive tests
   - Create proper package structure

4. **Learn more:**
   - [Jupyter best practices](https://jupyter-notebook.readthedocs.io/)
   - [JupyterLab documentation](https://jupyterlab.readthedocs.io/)

---

## Support

**Issues:**
- Setup problems: Check this guide
- LSP not working: See troubleshooting section
- GitHub issues: https://github.com/vedantparmar12/think-again/issues

**Community:**
- GitHub Discussions: https://github.com/vedantparmar12/think-again/discussions

---

**Ready for professional data science workflows! 📊**
