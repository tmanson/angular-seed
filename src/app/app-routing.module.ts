import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '@pages/home/home.component';
import {LoginComponent} from '@pages/login/login.component';
import {AuthGuard} from '@core/../../projects/shared-lib/src/lib/services/auth/auth.guard';
import {Error404Component} from '../../projects/shared-lib/src/lib/components/error404/error404.component';

const routes: Routes = [
  /*{path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
   {path: '**', component: Error404Component}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
