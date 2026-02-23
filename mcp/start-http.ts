import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMcpServer, appName, appVersion } from './server';

const basePort = Number(process.env.MCP_HTTP_PORT ?? 3100);
const maxPortAttempts = 10;
const sessionTtlMs = 30 * 60 * 1000;

interface SessionEntry {
  transport: StreamableHTTPServerTransport;
  lastAccess: number;
}

const sessions = new Map<string, SessionEntry>();

setInterval(() => {
  const now = Date.now();
  for (const [id, entry] of sessions) {
    if (now - entry.lastAccess > sessionTtlMs) {
      sessions.delete(id);
    }
  }
}, 60_000).unref();

function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf-8');
      if (!raw) return resolve(undefined);
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(new SyntaxError(`Invalid JSON body: ${(e as Error).message}`));
      }
    });
    req.on('error', reject);
  });
}

async function handleMcpRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;

  let transport: StreamableHTTPServerTransport;

  if (sessionId && sessions.has(sessionId)) {
    const entry = sessions.get(sessionId)!;
    entry.lastAccess = Date.now();
    transport = entry.transport;
  } else {
    const mcpServer = createMcpServer();
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (id) => {
        sessions.set(id, { transport, lastAccess: Date.now() });
      },
      onsessionclosed: (id) => {
        sessions.delete(id);
      },
    });
    await mcpServer.connect(transport);
  }

  const parsedBody = req.method === 'POST' ? await readBody(req) : undefined;
  await transport.handleRequest(req, res, parsedBody);
}

function createHttpServer(port: number) {
  const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const url = new URL(req.url ?? '/', `http://localhost:${port}`);

      if (url.pathname === '/mcp' || url.pathname === '/mcp/') {
        await handleMcpRequest(req, res);
        return;
      }

      if (url.pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', server: appName, version: appVersion, sessions: sessions.size }));
        return;
      }

      if (url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            name: appName,
            version: appVersion,
            description: 'Design System MCP Server — documentacao viva do design system @tray-tecnologia',
            endpoints: {
              mcp: `http://localhost:${port}/mcp`,
              health: `http://localhost:${port}/health`,
            },
            capabilities: {
              tools: ['get_component_bundle', 'list_components', 'search_components', 'get_design_tokens'],
              resources: [
                'design-system://tokens/css',
                'design-system://catalog',
                'design-system://types',
                'design-system://tokens/{category}',
              ],
              prompts: ['use-component', 'create-component', 'apply-tokens'],
            },
          })
        );
        return;
      }

      res.writeHead(404);
      res.end('Not Found');
    } catch (err) {
      console.error('Unhandled error in request handler:', err);
      if (!res.headersSent) {
        const isBadJson = err instanceof SyntaxError;
        res.writeHead(isBadJson ? 400 : 500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: isBadJson ? 'Invalid JSON body' : 'Internal Server Error' }));
      }
    }
  });

  return httpServer;
}

function startWithFallback(port: number, attempt = 1): void {
  if (attempt > maxPortAttempts) {
    console.error(`Nenhuma porta disponível entre ${basePort} e ${basePort + maxPortAttempts - 1}. Abortando.`);
    process.exit(1);
  }

  const server = createHttpServer(port);

  server.once('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Porta ${port} em uso, tentando ${port + 1}...`);
      startWithFallback(port + 1, attempt + 1);
    } else {
      throw err;
    }
  });

  server.listen(port, () => {
    console.error(`${appName} v${appVersion} — MCP Server running (HTTP) on port ${port}`);
    console.error(`   MCP endpoint: http://localhost:${port}/mcp`);
    console.error(`   Health check: http://localhost:${port}/health`);
  });
}

startWithFallback(basePort);
