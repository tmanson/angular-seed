import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from './pipes/pipes.module';
import {ComponentsModule} from './components/components.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PipesModule,
    TranslateModule,
    ComponentsModule,
  ],
  exports: [
    PipesModule,
    TranslateModule,
  ],
  providers: []
})
export class SharedLibModule {
}
