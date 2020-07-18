import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {createCustomElement} from '@angular/elements';
import {Page2Component} from './page2/page2.component';

import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorComponent} from './error/error.component';
import {Error404Component} from '../../../shared-lib/src/lib/components/error404/error404.component';
import {AppCatalogWidgetComponent} from './app-catalog-widget/app-catalog-widget.component';
import {ListComponent} from './list/list.component';
import {SharedLibModule} from '../../../shared-lib/src/lib/shared-lib.module';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', redirectTo: 'catalog'},
      {
        path: 'catalog',
        children: [
          {path: '', pathMatch: 'full', redirectTo: 'list'},
          {path: 'list', component: ListComponent},
          {path: 'page2', component: Page2Component},
        ]
      },
      {path: '**', component: Error404Component}
    ], {useHash: true}),
    ReactiveFormsModule,
    SharedLibModule
  ],
  declarations: [
    AppComponent,
    ListComponent,
    Page2Component,
    ErrorComponent,
    AppCatalogWidgetComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    AppCatalogWidgetComponent
  ]
})
export class AppModule {

  constructor(private injector: Injector) {
    const widgetElement = createCustomElement(AppCatalogWidgetComponent, {injector: this.injector});
    customElements.define('app-catalog-widget', widgetElement);
  }

}
