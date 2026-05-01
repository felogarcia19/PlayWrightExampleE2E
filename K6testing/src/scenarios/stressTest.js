import { stressTestOptions } from '../k6.options.js';
import { SiteApi } from '../pom/SiteApi.js';
import { stressTestData } from '../data/testData.js';

export const options = stressTestOptions;

/**
 * Stress Test - Gradually increases load to find breaking point
 * Identifies maximum capacity and failure modes
 */
export default function () {
  const api = new SiteApi();

  // Select endpoint weighted by traffic pattern
  const endpoints = stressTestData.heavyEndpoints;
  const totalWeight = endpoints.reduce((sum, e) => sum + e.weight, 0);
  let random = Math.random() * totalWeight;

  let selectedEndpoint = endpoints[0].path;
  for (const endpoint of endpoints) {
    random -= endpoint.weight;
    if (random <= 0) {
      selectedEndpoint = endpoint.path;
      break;
    }
  }

  // Make request
  api.group('Stress endpoint', () => {
    const response = api.get(selectedEndpoint);

    // Check status and performance
    api.checkStatus(response, 200);
    api.checkResponseTime(response);
  });
}
