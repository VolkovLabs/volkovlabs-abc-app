import React from 'react';
import { AppPluginMeta, PluginType } from '@grafana/data';
import { act, render, screen } from '@testing-library/react';
import { Application, TestIds } from '../../constants';
import { RootPage } from './RootPage';

/**
 * Meta
 */
const getMeta = (): AppPluginMeta => ({
  id: '',
  name: '',
  type: PluginType.app,
  module: '',
  baseUrl: '',
  info: {
    author: {} as any,
    description: '',
    logos: {
      large: '',
      small: '',
    },
    links: [],
    screenshots: [],
    updated: '',
    version: '',
  },
});

/**
 * RootPage
 */
describe('RootPage', () => {
  const meta = getMeta();
  const path = '/app';
  const onNavChangedMock = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: { reload: jest.fn() },
    });
  });

  beforeEach(() => {
    onNavChangedMock.mockClear();
  });

  /**
   * Mounting
   */
  describe('Mounting', () => {
    it('Should update navigation', async () => {
      await act(() =>
        render(<RootPage basename="" meta={meta} path={path} query={null as any} onNavChanged={onNavChangedMock} />)
      );

      const node = {
        text: Application.name,
        img: meta.info.logos.large,
        subTitle: Application.subTitle,
        url: path,
        children: [
          {
            text: 'Home',
            url: path,
            id: 'home',
            icon: 'home',
            active: true,
          },
        ],
      };
      expect(onNavChangedMock).toHaveBeenCalledWith({
        node: node,
        main: node,
      });
    });
  });

  /**
   * Rendering
   */
  describe('rendering', () => {
    it('Should render content only after nav changed', async () => {
      await act(() =>
        render(<RootPage basename="" meta={meta} path={path} query={null as any} onNavChanged={onNavChangedMock} />)
      );

      expect(screen.queryByTestId(TestIds.rootPage.loadingIndicator)).not.toBeInTheDocument();
      expect(screen.getByTestId(TestIds.rootPage.content)).toBeInTheDocument();
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
