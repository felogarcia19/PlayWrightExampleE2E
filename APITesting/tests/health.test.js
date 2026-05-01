import { createApiContext } from './fixtures/apiContext.js';
import { healthData } from './data/health.data.js';

describe('Health API', () => {
  const { healthApi } = createApiContext();

  test('GET /health returns service metadata', async () => {
    const res = await healthApi.fetch();

    expect(res.status).toBe(healthData.statusCode);
    expect(res.body).toMatchObject({
      service: healthData.serviceName,
      status: healthData.serviceStatus,
    });
    expect(typeof res.body.timestamp).toBe('string');
  });
});
