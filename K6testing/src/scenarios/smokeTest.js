import { smokeTestOptions } from '../k6.options.js';
import { SiteApi } from '../pom/SiteApi.js';
import { smokeTestData } from '../data/testData.js';

export const options = smokeTestOptions;

/**
 * Smoke Test - Quick validation that basic functionality works
 * Minimal load with key endpoints
 */
export default function () {
  const api = new SiteApi();

  // Test each key endpoint
  Object.values(smokeTestData.endpoints).forEach((endpoint) => {
    api.group(endpoint.description, () => {
      const response = api.get(endpoint.path);

      api.checkStatus(response, endpoint.expectedStatus);
      api.checkResponseTime(response);
      api.checkBodyContains(response, endpoint.expectedContent);
    });
  });

  // Test search functionality
  api.group('Search functionality', () => {
    smokeTestData.searchQueries.forEach((query) => {
      const response = api.get(`/?s=${encodeURIComponent(query)}`);
      api.checkStatus(response, 200);
      api.checkResponseTime(response);
    });
  });
}
