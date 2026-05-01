#!/usr/bin/env node

/**
 * Preserve K6 Test Results History
 * 
 * This script preserves K6 JSON results across test runs by moving previous
 * results to a timestamped backup before running new tests.
 * 
 * Usage:
 *   node scripts/preserve-results-history.js [test-scenario]
 * 
 * Examples:
 *   node scripts/preserve-results-history.js smoke
 *   node scripts/preserve-results-history.js load
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TEST_SCENARIO = process.argv[2] || 'smoke';
const RESULTS_DIR = path.join(__dirname, '..', 'results');
const RESULTS_FILE = path.join(__dirname, '..', 'results.json');
const HISTORY_DIR = path.join(RESULTS_DIR, 'history');

/**
 * Create directories if they don't exist
 */
function ensureDirectories() {
  if (!fs.existsSync(RESULTS_DIR)) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
    console.log('✓ Created results directory');
  }
  if (!fs.existsSync(HISTORY_DIR)) {
    fs.mkdirSync(HISTORY_DIR, { recursive: true });
    console.log('✓ Created history directory');
  }
}

/**
 * Archive previous results
 */
function archivePreviousResults() {
  if (fs.existsSync(RESULTS_FILE)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archiveFile = path.join(HISTORY_DIR, `results-${TEST_SCENARIO}-${timestamp}.json`);
    
    fs.copyFileSync(RESULTS_FILE, archiveFile);
    console.log(`✓ Archived previous results to: ${path.basename(archiveFile)}`);
    
    // Keep only last 10 results
    const files = fs.readdirSync(HISTORY_DIR)
      .filter(f => f.startsWith(`results-${TEST_SCENARIO}-`))
      .sort()
      .reverse();
    
    if (files.length > 10) {
      files.slice(10).forEach(f => {
        fs.unlinkSync(path.join(HISTORY_DIR, f));
      });
      console.log(`✓ Cleaned up old results (kept last 10)`);
    }
  }
}

/**
 * Main execution
 */
function main() {
  console.log(`\n📊 K6 Results History Preservation\n`);
  console.log(`Test Scenario: ${TEST_SCENARIO}`);
  
  ensureDirectories();
  archivePreviousResults();
  
  console.log(`\n✅ Ready to run test. Results will be saved to: results.json\n`);
}

main();
