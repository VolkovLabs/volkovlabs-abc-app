import './i18n';
import { AppPlugin } from '@grafana/data';
import { t } from 'i18next';
import { App, Config } from './components';
import { AppSettings } from './types';

/**
 * App Plugin
 */
export const plugin = new AppPlugin<AppSettings>().setRootPage(App).addConfigPage({
  title: t('configPages.config'),
  icon: 'cog',
  body: Config,
  id: 'config',
});
