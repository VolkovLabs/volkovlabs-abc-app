import React, { useCallback } from 'react';
import { AppPluginMeta, PluginConfigPageProps } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { FieldSet, Button } from '@grafana/ui';
import { AppInfo, TestIds } from '../../constants';
import { AppSettings } from '../../types';

/**
 * Page Properties
 */
interface Props extends PluginConfigPageProps<AppPluginMeta<AppSettings>> {}

/**
 * Config component
 */
export const Config: React.FC<Props> = ({ plugin }) => {
  /**
   * Service to communicate via http(s) to a remote backend such as the Grafana backend, a datasource etc.
   */
  const backendSrv = getBackendSrv();

  /**
   * Plugin Settings
   *
   * @param settings Plugin Settings
   */
  const updatePluginSettings = useCallback(
    (settings: { enabled: boolean; jsonData: unknown; pinned: boolean }): Promise<undefined> => {
      return backendSrv.post(`api/plugins/${plugin.meta.id}/settings`, settings);
    },
    [backendSrv, plugin.meta.id]
  );

  return (
    <FieldSet data-testid={TestIds.config.root}>
      <h2>{AppInfo.name}</h2>
      <p>The Abc App, is a plugin for Grafana that...</p>
      <Button
        onClick={() =>
          updatePluginSettings({
            enabled: true,
            jsonData: {},
            pinned: true,
          })
        }
        data-testid={TestIds.config.buttonUpdate}
      >
        Update Settings
      </Button>
    </FieldSet>
  );
};
