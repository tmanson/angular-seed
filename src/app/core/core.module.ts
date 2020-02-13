import {ErrorHandler, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpService} from '@core/services/http/http.service';
import {ErrorHandlerService} from '@core/error-handler/error-handler.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LanguageModule} from './language/language.module';
import {CORE_MODULE_CONFIG, CORE_MODULE_CONSTANTS} from './core.module.config';
import {LanguageService} from './language/services/language.service';
import {JwtInterceptor} from './services/http/jwt.interceptor';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {StorageModule} from './services/storage/storage.module';
import {MaterialModule} from '@core/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutingModule} from '@app/app-routing.module';
import {AppHeaderComponent} from '@core/layouts/header/header.component';
import {LayoutComponent} from '@core/layouts/layout.component';
import {AppSidebarComponent} from '@core/layouts/sidebar/sidebar.component';
import {SpinnerComponent} from '@shared/spinner.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, CORE_MODULE_CONSTANTS.TRANSLATE_CONFIG.I18N_PATH,
    CORE_MODULE_CONSTANTS.TRANSLATE_CONFIG.SUFFIX_FILE);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StorageModule,
    NgxWebstorageModule.forRoot(CORE_MODULE_CONSTANTS.WEBSTORAGE_CONFIG),
    LanguageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
  ],
  declarations: [
    LayoutComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent],
  exports: [
    SpinnerComponent,
    LayoutComponent
  ],
  providers: [
    HttpService,
    LanguageService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: CORE_MODULE_CONFIG, useValue: CORE_MODULE_CONSTANTS},
    {provide: ErrorHandler, useClass: ErrorHandlerService}
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
