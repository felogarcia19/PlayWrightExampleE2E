import request from 'supertest';
import { createApp } from '../../src/app.js';
import { HealthApi } from '../pom/HealthApi.js';
import { SiteSummaryApi } from '../pom/SiteSummaryApi.js';

export function createApiContext() {
  const app = createApp({
    targetUrl: 'https://preludeelectronics.com/',
    timeoutMs: 15000,
    port: 0,
  });

  const agent = request(app);

  return {
    app,
    healthApi: new HealthApi(agent),
    siteSummaryApi: new SiteSummaryApi(agent),
  };
}
