import { getEnvVariable } from './utils/config.js';

/**
 * Common K6 options and configurations
 * Used across all test scenarios
 */

export const commonOptions = {
  // Thresholds - define acceptable performance criteria
  thresholds: {
    // Response time thresholds
    http_req_duration: [
      `p(95)<${getEnvVariable('RESPONSE_TIME_THRESHOLD', 3000)}`, // 95th percentile under threshold
      `p(99)<${getEnvVariable('RESPONSE_TIME_THRESHOLD', 3000) * 1.5}`, // 99th percentile
      'p(100)<5000', // Max response time
    ],
    // Error rate thresholds
    http_req_failed: [`rate<${getEnvVariable('ERROR_RATE_THRESHOLD', 0.01)}`], // Less than 1% error rate
    // Status code checks
    'http_reqs{status:200}': ['rate>0.95'], // At least 95% success
  },
  // Stages for gradual ramp-up/down
  stages: [],
  // Setup and teardown
  setupTimeout: '10s',
  teardownTimeout: '10s',
};

/**
 * Smoke Test Options - minimal load, quick validation
 */
export const smokeTestOptions = {
  ...commonOptions,
  vus: parseInt(getEnvVariable('SMOKE_VUS', 2)),
  duration: getEnvVariable('SMOKE_DURATION', '30s'),
  stages: [
    { duration: '30s', target: parseInt(getEnvVariable('SMOKE_VUS', 2)) },
  ],
};

/**
 * Load Test Options - normal operational load
 */
export const loadTestOptions = {
  ...commonOptions,
  vus: parseInt(getEnvVariable('LOAD_VUS', 10)),
  duration: getEnvVariable('LOAD_DURATION', '5m'),
  stages: [
    { duration: '1m', target: parseInt(getEnvVariable('LOAD_VUS', 10)) / 2 }, // Ramp up
    { duration: '3m', target: parseInt(getEnvVariable('LOAD_VUS', 10)) }, // Sustain
    { duration: '1m', target: 0 }, // Ramp down
  ],
};

/**
 * Stress Test Options - find the breaking point
 */
export const stressTestOptions = {
  ...commonOptions,
  stages: [
    { duration: '2m', target: 10 },
    { duration: '5m', target: 20 },
    { duration: '5m', target: 50 },
    { duration: '5m', target: 100 },
    { duration: '5m', target: parseInt(getEnvVariable('STRESS_VUS', 50)) },
    { duration: '5m', target: 0 },
  ],
};

/**
 * Spike Test Options - sudden load increase
 */
export const spikeTestOptions = {
  ...commonOptions,
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: parseInt(getEnvVariable('SPIKE_VUS', 100)) }, // Spike
    { duration: '10s', target: parseInt(getEnvVariable('SPIKE_VUS', 100)) }, // Maintain spike
    { duration: '30s', target: 0 }, // Cool down
  ],
};
