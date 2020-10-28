import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminComponent } from './login-admin/login-admin.component';

const routes: Routes = [

  {
    path: 'adminlogin',
    component: LoginAdminComponent
  },
  {
    path: '',
    redirectTo: 'adminlogin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthAdminRoutingModule { }
