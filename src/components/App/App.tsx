import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppRootProps } from '@grafana/data';
import { AppSettings } from '../../types';
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
