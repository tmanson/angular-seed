import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PagesModule} from '@pages/pages.module';
import {CoreModule} from '@core/core.module';
import {APP_CONFIG, APP_CONSTANTS} from './app.config';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../projects/shared-lib/src/lib/components/material/material.module';
import {ClientsItems} from '@app/shell/config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: APP_CONSTANTS},
    ClientsItems
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
