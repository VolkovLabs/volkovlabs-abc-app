import { shallow } from 'enzyme';
import React from 'react';
import { Config } from './Config';

/*
 Plugin
 */
const getPlugin = (overridePlugin: any = { meta: {} }) => ({
  ...overridePlugin,
  meta: {
    enabled: true,
    ...overridePlugin.meta,
  },
});

/*
 Config
 */
describe('Config', () => {
  /*
   Initialization
   */
  describe('Initialization', () => {
    it('If plugin is not enabled and meta is not set, state should have isEnabled = false', () => {
      const plugin = getPlugin({});
      const wrapper = shallow<Config>(<Config plugin={plugin} query={null as any} />);
      expect(wrapper.state().isEnabled).toBeTruthy();
    });

    it('If plugin is not enabled, state should have isEnabled = false', () => {
      const plugin = getPlugin({ meta: { enabled: false } });
      const wrapper = shallow<Config>(<Config plugin={plugin} query={null as any} />);
      expect(wrapper.state().isEnabled).toBeFalsy();
    });

    it('If plugin is enabled, state should have isEnabled = true', () => {
      const plugin = getPlugin({ meta: { enabled: true } });
      const wrapper = shallow<Config>(<Config plugin={plugin} query={null as any} />);
      expect(wrapper.state().isEnabled).toBeTruthy();
    });
  });

  /*
   Methods
   */
  describe('Methods', () => {
    it('updatePluginSettings should make post request', () => {
      const plugin = getPlugin({ meta: { enabled: true, id: 'app' } });
      const wrapper = shallow<Config>(<Config plugin={plugin} query={null as any} />);
      const postRequestMock = jest.fn();
      wrapper.instance()['backendSrv'] = {
        post: postRequestMock,
      } as any;
      const settings = { enabled: true, jsonData: {}, pinned: true };
      wrapper.instance().updatePluginSettings(settings);
      expect(postRequestMock).toHaveBeenCalledWith(`api/plugins/${plugin.meta.id}/settings`, settings);
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
