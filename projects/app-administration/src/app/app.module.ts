import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {createCustomElement} from '@angular/elements';
import {Page1Component} from './page1/page1.component';
import {Page2Component} from './page2/page2.component';

import {RouterModule} from '@angular/router';
import {AppAdministrationWidgetComponent} from './app-administration-widget/app-administration-widget.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Error404Component} from '../../../shared-lib/src/lib/components/error404/error404.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', redirectTo: 'administration'},
      {
        path: 'administration',
        component: Page1Component,
        children: [
          {path: '', pathMatch: 'full', redirectTo: 'page1'},
          {path: 'page1', component: Page1Component},
          {path: 'page2', component: Page2Component},
        ]
      },
      {path: '**', component: Error404Component}
    ], {useHash: true}),
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    AppAdministrationWidgetComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    AppAdministrationWidgetComponent
  ]
})
export class AppModule {

  constructor(private injector: Injector) {
    const widgetElement = createCustomElement(AppAdministrationWidgetComponent, {injector: this.injector});
    customElements.define('app-administration-widget', widgetElement);
  }

}
