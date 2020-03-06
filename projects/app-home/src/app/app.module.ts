import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './pages/home/home.component';
import {Error404Component} from '../../../shared-lib/src/lib/components/error404/error404.component';
import {SharedLibModule} from '../../../shared-lib/src/lib/shared-lib.module';
import {AuthGuard} from '../../../shared-lib/src/lib/services/auth/auth.guard';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'home', children: [
          {path: '', component: HomeComponent},
        ]
      },
      {path: '**', component: Error404Component}
    ], {useHash: true}),
    ReactiveFormsModule,
    SharedLibModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: []
})
export class AppModule {

  constructor(private injector: Injector) {
  }

}
