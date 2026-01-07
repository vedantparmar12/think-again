#!/usr/bin/env node

/**
 * Plan Mode Helper Script
 *
 * Utilities for managing ExecPlan documents
 *
 * Usage:
 *   node plan-helper.js create <feature-name>
 *   node plan-helper.js list
 *   node plan-helper.js show <plan-id>
 *   node plan-helper.js status <plan-id>
 */

const fs = require('fs');
const path = require('path');

// Configuration
const PLANS_DIR = path.join(process.cwd(), '.codex', 'plans');
const TEMPLATE_PATH = path.join(__dirname, '..', 'assets', 'execplan-template.md');

// Ensure plans directory exists
function ensurePlansDir() {
  if (!fs.existsSync(PLANS_DIR)) {
    fs.mkdirSync(PLANS_DIR, { recursive: true });
    console.log(`Created plans directory: ${PLANS_DIR}`);
  }
}

// Create a new plan from template
function createPlan(featureName) {
  ensurePlansDir();

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const planId = `${today}-${featureName.toLowerCase().replace(/\s+/g, '-')}`;
  const planPath = path.join(PLANS_DIR, `${planId}.md`);

  if (fs.existsSync(planPath)) {
    console.error(`Error: Plan already exists: ${planPath}`);
    process.exit(1);
  }

  // Read template
  let template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // Replace placeholders
  const now = new Date().toISOString();
  template = template.replace(/YYYY-MM-DD-feature-name/g, planId);
  template = template.replace(/YYYY-MM-DDTHH:MM:SSZ/g, now);
  template = template.replace(/\[Feature Name\]/g, featureName);

  // Write plan
  fs.writeFileSync(planPath, template);

  console.log(`✅ Created new plan: ${planPath}`);
  console.log(`📝 Plan ID: ${planId}`);
  console.log(`\nNext steps:`);
  console.log(`1. Open the plan file and fill in details`);
  console.log(`2. Analyze the codebase`);
  console.log(`3. Document milestones`);
  console.log(`4. Present to user for approval`);

  return planPath;
}

// List all plans
function listPlans() {
  ensurePlansDir();

  const plans = fs.readdirSync(PLANS_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(PLANS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const metadata = extractMetadata(content);
      const stats = fs.statSync(filePath);

      return {
        file,
        id: metadata.plan_id || file.replace('.md', ''),
        status: metadata.status || 'unknown',
        created: metadata.created || stats.birthtime.toISOString(),
        milestones: metadata.milestone_count || '?',
        modified: stats.mtime
      };
    })
    .sort((a, b) => b.modified - a.modified); // Most recent first

  if (plans.length === 0) {
    console.log('No plans found.');
    console.log(`Plans directory: ${PLANS_DIR}`);
    return;
  }

  console.log(`\n📋 Plans (${plans.length} total)\n`);
  console.log('Status | Plan ID | Milestones | Last Modified');
  console.log('-------|---------|------------|---------------');

  plans.forEach(plan => {
    const statusIcon = {
      'draft': '📝',
      'approved': '✅',
      'in-progress': '🚧',
      'completed': '✔️',
      'rejected': '❌'
    }[plan.status] || '❓';

    const modified = plan.modified.toISOString().split('T')[0];

    console.log(
      `${statusIcon} ${plan.status.padEnd(12)} | ` +
      `${plan.id.substring(0, 40).padEnd(40)} | ` +
      `${String(plan.milestones).padEnd(10)} | ` +
      `${modified}`
    );
  });

  console.log(`\nPlans directory: ${PLANS_DIR}\n`);
}

// Show plan details
function showPlan(planId) {
  ensurePlansDir();

  const planPath = path.join(PLANS_DIR, `${planId}.md`);

  if (!fs.existsSync(planPath)) {
    console.error(`Error: Plan not found: ${planPath}`);
    console.log(`\nAvailable plans:`);
    listPlans();
    process.exit(1);
  }

  const content = fs.readFileSync(planPath, 'utf-8');
  console.log(content);
}

// Show plan status and progress
function showStatus(planId) {
  ensurePlansDir();

  const planPath = path.join(PLANS_DIR, `${planId}.md`);

  if (!fs.existsSync(planPath)) {
    console.error(`Error: Plan not found: ${planPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(planPath, 'utf-8');
  const metadata = extractMetadata(content);
  const progress = extractProgress(content);

  console.log(`\n📊 Plan Status: ${planId}\n`);
  console.log(`Status: ${metadata.status || 'unknown'}`);
  console.log(`Created: ${metadata.created || 'unknown'}`);
  console.log(`Model: ${metadata.model || 'unknown'}`);
  console.log(`Total Milestones: ${metadata.milestone_count || 'unknown'}`);

  if (progress.length > 0) {
    console.log(`\n📈 Progress (${progress.completed}/${progress.total} completed)\n`);

    progress.milestones.forEach((milestone, index) => {
      const icon = milestone.completed ? '✅' : '⬜';
      console.log(`${icon} ${index + 1}. ${milestone.title}`);
    });

    const percentage = Math.round((progress.completed / progress.total) * 100);
    console.log(`\n${'█'.repeat(Math.floor(percentage / 5))}${'░'.repeat(20 - Math.floor(percentage / 5))} ${percentage}%\n`);
  }

  console.log(`File: ${planPath}\n`);
}

// Extract YAML frontmatter metadata
function extractMetadata(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const yaml = match[1];
  const metadata = {};

  yaml.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      metadata[key.trim()] = valueParts.join(':').trim();
    }
  });

  return metadata;
}

// Extract progress checklist
function extractProgress(content) {
  const progressMatch = content.match(/## Progress\n([\s\S]*?)(?=\n##|$)/);
  if (!progressMatch) return { milestones: [], total: 0, completed: 0 };

  const progressText = progressMatch[1];
  const milestones = [];

  progressText.split('\n').forEach(line => {
    const checkboxMatch = line.match(/^- \[([ x])\] (.+)$/);
    if (checkboxMatch) {
      milestones.push({
        completed: checkboxMatch[1] === 'x',
        title: checkboxMatch[2]
      });
    }
  });

  const completed = milestones.filter(m => m.completed).length;

  return {
    milestones,
    total: milestones.length,
    completed
  };
}

// Main CLI handler
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log('Plan Mode Helper\n');
    console.log('Usage:');
    console.log('  plan-helper create <feature-name>   Create a new plan');
    console.log('  plan-helper list                    List all plans');
    console.log('  plan-helper show <plan-id>          Show plan content');
    console.log('  plan-helper status <plan-id>        Show plan progress');
    console.log('\nExamples:');
    console.log('  plan-helper create user-authentication');
    console.log('  plan-helper list');
    console.log('  plan-helper show 2025-01-07-user-authentication');
    console.log('  plan-helper status 2025-01-07-user-authentication');
    process.exit(0);
  }

  switch (command) {
    case 'create':
      if (!args[1]) {
        console.error('Error: Feature name required');
        console.log('Usage: plan-helper create <feature-name>');
        process.exit(1);
      }
      createPlan(args.slice(1).join(' '));
      break;

    case 'list':
      listPlans();
      break;

    case 'show':
      if (!args[1]) {
        console.error('Error: Plan ID required');
        console.log('Usage: plan-helper show <plan-id>');
        process.exit(1);
      }
      showPlan(args[1]);
      break;

    case 'status':
      if (!args[1]) {
        console.error('Error: Plan ID required');
        console.log('Usage: plan-helper status <plan-id>');
        process.exit(1);
      }
      showStatus(args[1]);
      break;

    default:
      console.error(`Error: Unknown command: ${command}`);
      console.log('Run "plan-helper" without arguments for usage information');
      process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  createPlan,
  listPlans,
  showPlan,
  showStatus
};
