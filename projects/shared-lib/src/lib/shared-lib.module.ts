import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {PipesModule} from './pipes/pipes.module';
import {ComponentsModule} from './components/components.module';
import {MaterialModule} from './components/material/material.module';
import {LanguageService} from './services/language/services/language.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {StorageModule} from './services/storage/storage.module';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {SHARED_MODULE_CONFIG, SHARED_MODULE_CONSTANTS} from './shared-lib.module.config';
import {LanguageModule} from './services/language/language.module';
import {JwtInterceptor} from './services/http/jwt.interceptor';
import {ErrorHandlerService} from './services/error-handler/error-handler.service';
import {HttpService} from './services/http/http.service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ErrorInterceptor} from './services/http/error.interceptor';
import {SpinnerButtonDirective} from './directives/SpinnerButtonDirective';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, SHARED_MODULE_CONSTANTS.TRANSLATE_CONFIG.I18N_PATH,
    SHARED_MODULE_CONSTANTS.TRANSLATE_CONFIG.SUFFIX_FILE);
}

@NgModule({
  declarations: [
    SpinnerButtonDirective
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    StorageModule,
    NgxWebstorageModule.forRoot(SHARED_MODULE_CONSTANTS.WEBSTORAGE_CONFIG),
    LanguageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    PipesModule,
    TranslateModule,
    ComponentsModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    StorageModule,
    NgxWebstorageModule,
    LanguageModule,
    TranslateModule,
    PipesModule,
    TranslateModule,
    ComponentsModule,
    MaterialModule,
    SpinnerButtonDirective
  ],
  providers: [
    HttpService,
    LanguageService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: SHARED_MODULE_CONFIG, useValue: SHARED_MODULE_CONSTANTS},
    {provide: ErrorHandler, useClass: ErrorHandlerService},
  ]
})
export class SharedLibModule {
}
