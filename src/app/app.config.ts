// APP_CONFIG: Injection token to hold application-wide configuration properties that can be injected into other
// application elements such as components or services.

import { InjectionToken } from '@angular/core';
import {ModuleConfig} from '../../projects/shared-lib/src/lib/shared-lib.module.config';



export interface AppConfig extends ModuleConfig {
  TITLE: string;
  DEFAULT_LANGUAGE: string;
}

export const APP_CONSTANTS: AppConfig = {
  TITLE: 'Angular 9 Seed',
  DEFAULT_LANGUAGE: 'en',
  NAVIGATION: {
    EMPTY: '',
    ROOT: '',
    HOME: 'Home'
  }
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
