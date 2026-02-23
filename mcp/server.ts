import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerGetComponentBundle } from './tools/get-component-bundle';
import { registerListComponents } from './tools/list-components';
import { registerSearchComponents } from './tools/search-components';
import { registerGetDesignTokens } from './tools/get-design-tokens';
import { registerTokensResources } from './resources/tokens-resource';
import { registerCatalogResource } from './resources/catalog-resource';
import { registerTypesResource } from './resources/types-resource';
import { registerUseComponentPrompt } from './prompts/use-component';
import { registerCreateComponentPrompt } from './prompts/create-component';
import { registerApplyTokensPrompt } from './prompts/apply-tokens';

export const appName = 'design-system-mcp';
export const appVersion = '2.0.0';

export function createMcpServer(): McpServer {
  const server = new McpServer(
    { name: appName, version: appVersion },
    { capabilities: { tools: {}, resources: {}, prompts: {} } }
  );

  registerGetComponentBundle(server);
  registerListComponents(server);
  registerSearchComponents(server);
  registerGetDesignTokens(server);

  registerTokensResources(server);
  registerCatalogResource(server);
  registerTypesResource(server);

  registerUseComponentPrompt(server);
  registerCreateComponentPrompt(server);
  registerApplyTokensPrompt(server);

  return server;
}
