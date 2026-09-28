/**
 * serve.mjs — a static file server for local checking.
 *
 * Node standard library only. The site needs a server rather than file:// because
 * every asset and internal link is root-relative — which is the correct form for
 * a deployed site and the reason CLAUDE.md § 6 step 6 says "serve the site".
 *
 * Run:  node tools/serve.mjs [port]
 */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.argv[2]) || 4321;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

createServer(async (request, response) => {
  const url = new URL(request.url, `http://localhost:${PORT}`);
  let path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');

  try {
    const target = join(ROOT, path);
    const info = await stat(target).catch(() => null);
    const file = info?.isDirectory() ? join(target, 'index.html') : target;
    const body = await readFile(file);
    response.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain' });
    response.end(`404 ${path}`);
  }
}).listen(PORT, () => console.log(`serving ${ROOT} on http://localhost:${PORT}`));
