import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutingModule} from '@app/app-routing.module';
import {HeaderComponent} from '@core/layouts/header/header.component';
import {LayoutComponent} from '@core/layouts/layout.component';
import {SidebarComponent} from '@core/layouts/sidebar/sidebar.component';
import {SpinnerComponent} from '../../../projects/shared-lib/src/lib/spinner.component';
import {SharedLibModule} from '../../../projects/shared-lib/src/lib/shared-lib.module';
import {PagesModule} from '@pages/pages.module';


@NgModule({
  imports: [
    CommonModule,
    SharedLibModule,
    FlexLayoutModule,
    AppRoutingModule,
    PagesModule,
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SpinnerComponent,
    SidebarComponent],
  exports: [
    SpinnerComponent,
    LayoutComponent
  ],
  providers: [
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
