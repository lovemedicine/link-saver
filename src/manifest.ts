import packageJson from '../package.json';
import { ManifestType } from '@src/manifest-type';

const manifest: ManifestType = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  permissions: ['sidePanel', 'activeTab', 'storage', 'favicon'],
  action: {
    default_title: 'click to open side panel',
  },
  side_panel: {
    default_path: 'src/sidepanel/index.html',
  },
  icons: {
    '24': 'icon-24.png',
    '96': 'icon-96.png',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/content/index.js'],
    },
  ],
  background: { service_worker: 'src/background/index.js' },
  web_accessible_resources: [
    {
      resources: ['_favicon/*'],
      matches: ['<all_urls>'],
      extension_ids: ['*'],
    },
  ],
};

export default manifest;
