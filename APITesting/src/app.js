import express from 'express';
import { config } from './config.js';
import { probeSite } from './siteProbe.js';

export function createApp(appConfig = config) {
  const app = express();

  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.status(200).json({
      service: 'prelude-api-testing',
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/site/summary', async (_req, res) => {
    try {
      const summary = await probeSite(appConfig.targetUrl, appConfig.timeoutMs);
      res.status(summary.ok ? 200 : 502).json(summary);
    } catch (error) {
      res.status(502).json({
        url: appConfig.targetUrl,
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  return app;
}
