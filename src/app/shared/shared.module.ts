import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PipesModule} from '@shared/pipes/pipes.module';
import {TranslateModule} from '@ngx-translate/core';
import {LanguageModule} from '@app/core/language/language.module';
import {Error404Component} from './components/error404/error404.component';
import {MenuItems} from './menu-items/menu-items';

@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    CommonModule,
    PipesModule,
    TranslateModule,
    LanguageModule,
  ],
  exports: [
    PipesModule,
    TranslateModule,
    LanguageModule,
    Error404Component
  ],
  providers: [MenuItems]
})

export class SharedModule {
}
