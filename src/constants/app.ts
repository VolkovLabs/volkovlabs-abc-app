import { SupportedLanguage } from '../types';

/**
 * Languages
 */
export const enum Languages {
  DE = 'de',
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  ZH = 'zh',
}

/**
 * Default Language
 */
export const DefaultLanguage: SupportedLanguage = Languages.EN;

/**
 * App Information
 */
export const AppInfo = {
  name: 'Abc App',
  root: '/a/volkovlabs-abc-app',
};
