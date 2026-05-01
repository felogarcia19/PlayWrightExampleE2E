import { createApiContext } from './fixtures/apiContext.js';
import { siteSummaryData } from './data/siteSummary.data.js';

describe('Site Summary API', () => {
  const { siteSummaryApi } = createApiContext();

  test('GET /api/site/summary returns modern smoke-check payload', async () => {
    const res = await siteSummaryApi.fetch();

    expect(siteSummaryData.acceptedStatuses).toContain(res.status);

    expect(res.body).toHaveProperty('url');
    expect(res.body).toHaveProperty('ok');

    if (res.status === 200) {
      expect(res.body.url).toContain(siteSummaryData.expectedDomain);
      expect(res.body.ok).toBe(true);
      expect(res.body.statusCode).toBeGreaterThanOrEqual(siteSummaryData.minSuccessStatusCode);
      expect(res.body.statusCode).toBeLessThan(siteSummaryData.maxSuccessStatusCodeExclusive);
      expect(typeof res.body.responseTimeMs).toBe('number');
      expect(res.body.responseTimeMs).toBeGreaterThan(0);
    } else {
      expect(res.body.ok).toBe(false);
      expect(typeof res.body.error).toBe('string');
    }
  });
});
