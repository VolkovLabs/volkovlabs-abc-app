import { AppPlugin } from '@grafana/data';
import { Config, App } from './components';
import { AppSettings } from './types';

/**
 * App Plugin
 */
export const plugin = new AppPlugin<AppSettings>().setRootPage(App).addConfigPage({
  title: 'Config',
  icon: 'cog',
  body: Config,
  id: 'config',
});
