const fs = require('fs');
const path = require('path');

const reportHistory = path.resolve(__dirname, '..', 'allure-report', 'history');
const resultsHistory = path.resolve(__dirname, '..', 'allure-results', 'history');

if (!fs.existsSync(reportHistory)) {
  console.log('[allure-history] No previous report found - skipping history copy.');
  process.exit(0);
}

fs.mkdirSync(resultsHistory, { recursive: true });

for (const file of fs.readdirSync(reportHistory)) {
  fs.copyFileSync(path.join(reportHistory, file), path.join(resultsHistory, file));
}

console.log('[allure-history] Copied history into allure-results/history');