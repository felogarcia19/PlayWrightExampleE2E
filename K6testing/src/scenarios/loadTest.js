import { loadTestOptions } from '../k6.options.js';
import { SiteApi } from '../pom/SiteApi.js';
import { loadTestData } from '../data/testData.js';

export const options = loadTestOptions;

/**
 * Load Test - Simulates realistic user load
 * Tests how the system performs under normal to moderately high load
 */
export default function () {
  const api = new SiteApi();

  // Simulate realistic user journeys
  const journey = loadTestData.userJourneys[Math.floor(Math.random() * loadTestData.userJourneys.length)];

  api.group(journey.name, () => {
    journey.steps.forEach((step) => {
      const response = api.get(step.endpoint);

      api.checkStatus(response, 200);
      api.checkResponseTime(response);
    });
  });
}
