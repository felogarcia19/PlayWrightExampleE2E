const DEFAULT_URL = 'https://preludeelectronics.com/';

export const config = {
  port: Number(process.env.PORT ?? 4000),
  targetUrl: process.env.TARGET_URL ?? DEFAULT_URL,
  timeoutMs: Number(process.env.REQUEST_TIMEOUT_MS ?? 12000),
};
