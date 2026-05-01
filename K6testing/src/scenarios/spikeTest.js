import { spikeTestOptions } from '../k6.options.js';
import { SiteApi } from '../pom/SiteApi.js';
import { smokeTestData } from '../data/testData.js';

export const options = spikeTestOptions;

/**
 * Spike Test - Sudden increase in load to test system resilience
 * Validates recovery from unexpected traffic spikes
 */
export default function () {
  const api = new SiteApi();

  // Simulate spike by repeatedly hitting key endpoints
  api.group('Spike traffic', () => {
    // Test homepage (most likely to be hit during spike)
    const endpoints = [
      smokeTestData.endpoints.homepage.path,
      smokeTestData.endpoints.products.path,
      '/?s=speaker',
    ];

    endpoints.forEach((endpoint) => {
      const response = api.get(endpoint);

      api.checkStatus(response, 200);
      api.checkResponseTime(response);
    });
  });
}
