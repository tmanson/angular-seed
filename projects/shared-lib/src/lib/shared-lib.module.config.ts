import { InjectionToken } from '@angular/core';

export interface ModuleConfig {
  NAVIGATION?: any;
}

export interface SharedLibModuleConfig extends ModuleConfig {
  WEBSTORAGE_CONFIG: IWebstorageConfig;
  TRANSLATE_CONFIG: {
    I18N_PATH: string,
    SUFFIX_FILE: string
  };
}

export const SHARED_MODULE_CONSTANTS: SharedLibModuleConfig = {
  WEBSTORAGE_CONFIG: {
    prefix: 'angular-7-seed',
    separator: '.',
    caseSensitive: false
  },
  TRANSLATE_CONFIG: {
    I18N_PATH: 'assets/i18n/',
    SUFFIX_FILE: '-lang.json'
  }
};

interface IWebstorageConfig {
  prefix: string;
  separator: string;
  caseSensitive: boolean;
}

export let SHARED_MODULE_CONFIG = new InjectionToken<SharedLibModuleConfig>('core.module.config');
