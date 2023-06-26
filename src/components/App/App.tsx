import React from 'react';
import { AppRootProps } from '@grafana/data';
import { AppSettings } from '../../types';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../Home';

/**
 * Properties
 */
interface Props extends AppRootProps<AppSettings> {}

/**
 * App
 */
export const App: React.FC<Props> = () => {
  return (
    <Switch>
      <Route component={Home} />
    </Switch>
  );
};
