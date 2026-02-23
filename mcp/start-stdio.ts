import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMcpServer, appName, appVersion } from './server';

const server = createMcpServer();
const transport = new StdioServerTransport();

await server.connect(transport);

console.error(`🚀 ${appName} v${appVersion} — MCP Server running (stdio)`);
