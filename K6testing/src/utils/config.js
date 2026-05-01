/**
 * Configuration utilities for K6 tests
 */

/**
 * Get environment variable with fallback
 * @param {string} key - Environment variable name
 * @param {string|number} defaultValue - Default value if not set
 * @returns {string|number} Environment variable value or default
 */
export function getEnvVariable(key, defaultValue = '') {
  const value = __ENV[key];
  if (value === undefined) {
    console.warn(`Environment variable ${key} not set, using default: ${defaultValue}`);
    return defaultValue;
  }
  return value;
}

/**
 * Get base URL for API requests
 * @returns {string} Base URL
 */
export function getBaseUrl() {
  return getEnvVariable('BASE_URL', 'https://preludeelectronics.com');
}

/**
 * Check if running in CI/CD environment
 * @returns {boolean} True if in CI/CD
 */
export function isRunningInCI() {
  return __ENV.CI === 'true' || __ENV.GITHUB_ACTIONS === 'true';
}

/**
 * Get test configuration object
 * @returns {object} Configuration object
 */
export function getTestConfig() {
  return {
    baseUrl: getBaseUrl(),
    timeout: parseInt(getEnvVariable('RESPONSE_TIME_THRESHOLD', 3000)),
    errorThreshold: parseFloat(getEnvVariable('ERROR_RATE_THRESHOLD', 0.01)),
    isCI: isRunningInCI(),
  };
}
