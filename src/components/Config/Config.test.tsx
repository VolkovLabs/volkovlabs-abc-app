import React from 'react';
import { getBackendSrv } from '@grafana/runtime';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { TestIds } from '../../constants';
import { Config } from './Config';

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  getBackendSrv: jest.fn(),
}));

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
   Methods
   */
  describe('Methods', () => {
    it('updatePluginSettings should make post request', async () => {
      const plugin = getPlugin({ meta: { enabled: true, id: 'app' } });
      const postRequestMock = jest.fn();

      jest.mocked(getBackendSrv).mockImplementationOnce(
        () =>
          ({
            post: postRequestMock,
          }) as any
      );

      render(<Config plugin={plugin} query={null as any} />);

      expect(screen.getByTestId(TestIds.config.root)).toBeInTheDocument();
      expect(screen.getByTestId(TestIds.config.buttonUpdate)).toBeInTheDocument();

      await act(() => fireEvent.click(screen.getByTestId(TestIds.config.buttonUpdate)));

      expect(postRequestMock).toHaveBeenCalledWith(`api/plugins/${plugin.meta.id}/settings`, {
        enabled: true,
        jsonData: {},
        pinned: true,
      });
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
