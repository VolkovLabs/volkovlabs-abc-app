import React from 'react';
import { PluginPage, PluginPageProps } from '@grafana/runtime';
import { useTranslation } from 'react-i18next';
import { TestIds } from '../../constants';

/**
 * Properties
 */
interface Props extends PluginPageProps {}

/**
 * Home
 */
export const Home: React.FC<Props> = () => {
  /**
   * Translation
   */
  const { t } = useTranslation();

  return (
    <PluginPage>
      <div data-testid={TestIds.home.root}>{t('home.greeting')}</div>
    </PluginPage>
  );
};
