import http from 'k6/http';
import { check, group } from 'k6';
import { getTestConfig } from '../utils/config.js';

/**
 * Base API class for K6 performance tests
 * Provides common HTTP request functionality with built-in validation
 */
export class BaseApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || getTestConfig().baseUrl;
    this.responseTime = null;
    this.lastResponse = null;
  }

  /**
   * Make GET request
   * @param {string} endpoint - API endpoint (relative to baseUrl)
   * @param {object} params - Request parameters (headers, query params, etc.)
   * @param {string} name - Name for performance metrics
   * @returns {object} HTTP response object
   */
  get(endpoint, params = {}, name = 'GET') {
    const url = `${this.baseUrl}${endpoint}`;
    const response = http.get(url, params);
    this.lastResponse = response;
    this.responseTime = response.timings.duration;
    return response;
  }

  /**
   * Make POST request
   * @param {string} endpoint - API endpoint
   * @param {string|object} body - Request body
   * @param {object} params - Request parameters
   * @param {string} name - Name for performance metrics
   * @returns {object} HTTP response object
   */
  post(endpoint, body = null, params = {}, name = 'POST') {
    const url = `${this.baseUrl}${endpoint}`;
    const response = http.post(url, body, params);
    this.lastResponse = response;
    this.responseTime = response.timings.duration;
    return response;
  }

  /**
   * Check response status
   * @param {object} response - HTTP response
   * @param {number} expectedStatus - Expected HTTP status code
   * @param {string} checkName - Name for the check
   * @returns {boolean} Check result
   */
  checkStatus(response, expectedStatus = 200, checkName = 'Status is 200') {
    return check(response, {
      [checkName]: (r) => r.status === expectedStatus,
    });
  }

  /**
   * Check response time is within threshold
   * @param {object} response - HTTP response
   * @param {number} threshold - Threshold in ms
   * @param {string} checkName - Name for the check
   * @returns {boolean} Check result
   */
  checkResponseTime(response, threshold = null, checkName = null) {
    threshold = threshold || getTestConfig().timeout;
    checkName = checkName || `Response time < ${threshold}ms`;
    return check(response, {
      [checkName]: (r) => r.timings.duration < threshold,
    });
  }

  /**
   * Check response body contains expected content
   * @param {object} response - HTTP response
   * @param {string} expectedText - Text to find in response body
   * @param {string} checkName - Name for the check
   * @returns {boolean} Check result
   */
  checkBodyContains(response, expectedText, checkName = null) {
    checkName = checkName || `Body contains "${expectedText}"`;
    return check(response, {
      [checkName]: (r) => r.body.includes(expectedText),
    });
  }

  /**
   * Parse JSON response
   * @param {object} response - HTTP response
   * @returns {object} Parsed JSON
   */
  parseJson(response) {
    try {
      return JSON.parse(response.body);
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      return null;
    }
  }

  /**
   * Group related requests
   * @param {string} name - Group name
   * @param {function} fn - Function containing requests
   */
  group(name, fn) {
    return group(name, fn);
  }
}
