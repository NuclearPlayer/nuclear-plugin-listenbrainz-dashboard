import type {
  NuclearPlugin,
  NuclearPluginAPI,
} from '@nuclearplayer/plugin-sdk';

import { ListenBrainzClient } from './client';
import { DASHBOARD_PROVIDER_ID } from './config';
import { createDashboardProvider } from './dashboard-provider';

const plugin: NuclearPlugin = {
  onEnable(api: NuclearPluginAPI) {
    const client = new ListenBrainzClient(api.Http.fetch);
    api.Providers.register(createDashboardProvider(client));
  },

  onDisable(api: NuclearPluginAPI) {
    api.Providers.unregister(DASHBOARD_PROVIDER_ID);
  },
};

export default plugin;
