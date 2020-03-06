import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from '../../storage/storage.service';

@Injectable()

export class LanguageService {
  DEFAULT_LANGUAGE: 'fr';

  constructor(private translateService: TranslateService,
              private storage: StorageService) {
    this.setDefault();
  }

  public change(lang: string) {
    this.translateService.use(lang);
    this.storage.localSettings.lang = lang;
  }

  public getCurrent(): string {
    return this.translateService.currentLang;
  }

  private setDefault() {
    if (!this.translateService.getDefaultLang()) {
      this.translateService.setDefaultLang(this.DEFAULT_LANGUAGE);
    }
    this.translateService.use(this.storage.localSettings.lang ||
      this.DEFAULT_LANGUAGE);
  }
}
