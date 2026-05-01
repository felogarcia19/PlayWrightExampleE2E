import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportHistory = path.resolve(__dirname, '..', 'allure-report', 'history');
const resultsHistory = path.resolve(__dirname, '..', 'allure-results', 'history');

if (!fs.existsSync(reportHistory)) {
  console.log('[allure-history] No previous report found, skipping history copy.');
  process.exit(0);
}

fs.mkdirSync(resultsHistory, { recursive: true });

const files = fs.readdirSync(reportHistory);
for (const file of files) {
  fs.copyFileSync(path.join(reportHistory, file), path.join(resultsHistory, file));
}

console.log(`[allure-history] Copied ${files.length} history file(s) into allure-results/history`);
