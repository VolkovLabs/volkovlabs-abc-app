import React from 'react';
import { PluginPage, PluginPageProps } from '@grafana/runtime';
import { TestIds } from '../../constants';

/**
 * Properties
 */
interface Props extends PluginPageProps {}

/**
 * Home
 */
export const Home: React.FC<Props> = () => {
  return (
    <PluginPage>
      <div data-testid={TestIds.home.root}>Hello World!</div>
    </PluginPage>
  );
};
