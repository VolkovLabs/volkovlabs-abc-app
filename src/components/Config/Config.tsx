import React, { PureComponent } from 'react';
import { AppPluginMeta, PluginConfigPageProps } from '@grafana/data';
import { BackendSrv, getBackendSrv } from '@grafana/runtime';
import { Button, InlineFieldRow } from '@grafana/ui';
import { ApplicationName, ApplicationRoot } from '../../constants';
import { GlobalSettings } from '../../types';

/**
 * Page Properties
 */
interface Props extends PluginConfigPageProps<AppPluginMeta<GlobalSettings>> {}

/**
 * State
 */
interface State {
  isEnabled: boolean;
}

/**
 * Config component
 */
export class Config extends PureComponent<Props, State> {
  /**
   * Service to communicate via http(s) to a remote backend such as the Grafana backend, a datasource etc.
   */
  private backendSrv: BackendSrv = getBackendSrv();

  /**
   * Constructor
   *
   * @param props {Props} Properties
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      isEnabled: false,
    };
  }

  /**
   * Mount
   */
  componentDidMount(): void {
    this.setState(() => ({
      isEnabled: this.props.plugin.meta?.enabled ? true : false,
    }));
  }

  /**
   * Plugin Settings
   *
   * @param settings Plugin Settings
   */
  updatePluginSettings = (settings: { enabled: boolean; jsonData: unknown; pinned: boolean }): Promise<undefined> => {
    return this.backendSrv.post(`api/plugins/${this.props.plugin.meta.id}/settings`, settings);
  };

  /**
   * Plugin disable
   */
  onDisable = () => {
    this.updatePluginSettings({ enabled: false, jsonData: {}, pinned: false }).then(() => {
      window.location.reload();
    });
  };

  /**
   * Plugin enable
   */
  onEnable = () => {
    this.updatePluginSettings({ enabled: true, jsonData: {}, pinned: true }).then(() => {
      window.location.assign(ApplicationRoot);
    });
  };

  /**
   * Page Render
   */
  render() {
    const { isEnabled } = this.state;

    return (
      <>
        <h2>{ApplicationName}</h2>
        <p>The Abc Application, is a plugin for Grafana that...</p>

        {!isEnabled && (
          <p>
            Click below to <b>Enable</b> the Application.
          </p>
        )}

        <InlineFieldRow>
          {isEnabled ? (
            <Button variant="destructive" onClick={this.onDisable}>
              Disable
            </Button>
          ) : (
            <Button onClick={this.onEnable}>Enable</Button>
          )}
        </InlineFieldRow>
      </>
    );
  }
}
