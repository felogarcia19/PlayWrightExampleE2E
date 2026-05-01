/**
 * preserve-allure-history.js
 *
 * Run this BEFORE `allure generate` to carry history from the previous
 * report into the new allure-results folder. This enables Allure's
 * trend charts and history diff features.
 *
 * Usage:  node scripts/preserve-allure-history.js
 */

const fs   = require('fs');
const path = require('path');

const REPORT_HISTORY = path.resolve(__dirname, '..', 'allure-report', 'history');
const RESULTS_HISTORY = path.resolve(__dirname, '..', 'allure-results', 'history');

if (!fs.existsSync(REPORT_HISTORY)) {
  console.log('[allure-history] No previous report found — skipping history copy.');
  process.exit(0);
}

fs.mkdirSync(RESULTS_HISTORY, { recursive: true });

const files = fs.readdirSync(REPORT_HISTORY);
for (const file of files) {
  fs.copyFileSync(
    path.join(REPORT_HISTORY, file),
    path.join(RESULTS_HISTORY, file),
  );
}

console.log(`[allure-history] Copied ${files.length} history file(s) into allure-results/history`);
