import React, { useState, useCallback, useEffect } from 'react';
import { AppRootProps, NavModelItem } from '@grafana/data';
import { Alert } from '@grafana/ui';
import { Application, TestIds } from '../../constants';
import { GlobalSettings } from '../../types';

/**
 * Properties
 */
interface Props extends AppRootProps<GlobalSettings> {}

/**
 * Root Page
 */
export const RootPage: React.FC<Props> = ({ path, onNavChanged, meta }) => {
  /**
   * State
   */
  const [loading, setLoading] = useState(true);

  /**
   * Update Navigation
   */
  const updateNav = useCallback(() => {
    const tabs: NavModelItem[] = [];

    /**
     * Home
     */
    tabs.push({
      text: 'Home',
      url: path,
      id: 'home',
      icon: 'home',
      active: true,
    });

    /**
     * Header
     */
    const node = {
      text: Application.name,
      img: meta.info.logos.large,
      subTitle: Application.subTitle,
      url: path,
      children: tabs,
    };

    /**
     * Update the page header
     */
    onNavChanged({
      node: node,
      main: node,
    });
  }, [meta.info.logos.large, onNavChanged, path]);

  /**
   * Update nav on mount
   */
  useEffect(() => {
    updateNav();

    /**
     * Set loading
     */
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Alert title="Loading..." severity="info" data-testid={TestIds.rootPage.loadingIndicator}>
        <p>Loading...</p>
      </Alert>
    );
  }

  return <div data-testid={TestIds.rootPage.content}>Loaded and ready to go!</div>;
};
