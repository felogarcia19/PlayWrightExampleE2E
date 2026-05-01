import { request } from 'undici';

function extractTitle(html) {
  const match = html.match(/<title>(.*?)<\/title>/i);
  return match ? match[1].trim() : null;
}

export async function probeSite(url, timeoutMs = 12000) {
  const start = Date.now();

  const { statusCode, headers, body } = await request(url, {
    method: 'GET',
    headersTimeout: timeoutMs,
    bodyTimeout: timeoutMs,
    maxRedirections: 5,
  });

  const html = await body.text();
  const responseTimeMs = Date.now() - start;

  return {
    url,
    statusCode,
    ok: statusCode >= 200 && statusCode < 400,
    contentType: headers['content-type'] ?? null,
    title: extractTitle(html),
    responseTimeMs,
  };
}
