#!/usr/bin/env node

/**
 * K6 Test Results Analyzer
 * 
 * Parses K6 JSON results and outputs formatted metrics.
 * Provides performance summary for CI/CD integration.
 * 
 * Usage:
 *   node scripts/analyze-results.js [results-file]
 * 
 * Examples:
 *   node scripts/analyze-results.js results.json
 *   node scripts/analyze-results.js results/history/results-smoke-2026-05-01.json
 */

const fs = require('fs');
const path = require('path');

/**
 * Parse K6 JSON results file
 */
function parseResults(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // K6 outputs newline-delimited JSON, parse each line
    const lines = content.trim().split('\n');
    const metrics = {};
    const dataPoints = [];

    lines.forEach(line => {
      try {
        const json = JSON.parse(line);
        if (json.type === 'Point') {
          dataPoints.push(json);
          // Accumulate metrics
          if (json.metric) {
            if (!metrics[json.metric]) {
              metrics[json.metric] = [];
            }
            metrics[json.metric].push(json.data.value);
          }
        }
      } catch (e) {
        // Skip invalid lines
      }
    });

    return { metrics, dataPoints };
  } catch (error) {
    console.error(`Error reading results file: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Calculate percentile
 */
function calculatePercentile(values, percentile) {
  if (!values || values.length === 0) return 0;
  const sorted = values.slice().sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

/**
 * Format results for display
 */
function formatResults(metrics) {
  console.log('\n📊 K6 Test Results Summary\n');
  console.log('─'.repeat(50));

  // Calculate statistics
  const durations = metrics['http_req_duration'] || [];
  const failures = metrics['http_req_failed'] || [];

  if (durations.length > 0) {
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    const p95 = calculatePercentile(durations, 95);
    const p99 = calculatePercentile(durations, 99);

    console.log('\n⏱️  Response Times (ms)');
    console.log(`   Min:    ${min.toFixed(2)}`);
    console.log(`   Avg:    ${avg.toFixed(2)}`);
    console.log(`   p(95):  ${p95.toFixed(2)}`);
    console.log(`   p(99):  ${p99.toFixed(2)}`);
    console.log(`   Max:    ${max.toFixed(2)}`);
  }

  if (failures.length > 0) {
    const failureRate = (failures.filter(v => v > 0).length / failures.length * 100).toFixed(2);
    console.log('\n❌ Error Rate');
    console.log(`   Failed: ${failureRate}%`);
  }

  console.log('\n📈 Total Requests');
  console.log(`   Count:  ${durations.length}`);

  console.log('\n' + '─'.repeat(50) + '\n');
}

/**
 * Main execution
 */
function main() {
  const resultsFile = process.argv[2] || 'results.json';

  if (!fs.existsSync(resultsFile)) {
    console.error(`❌ Results file not found: ${resultsFile}`);
    console.log(`\nUsage: node scripts/analyze-results.js [results-file]`);
    process.exit(1);
  }

  console.log(`\n📂 Analyzing: ${path.basename(resultsFile)}\n`);

  const { metrics, dataPoints } = parseResults(resultsFile);
  formatResults(metrics);
}

main();
