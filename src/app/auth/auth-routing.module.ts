import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailValidateComponent } from './email-validate/email-validate.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserloginComponent } from './userlogin/userlogin.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'emailvalidate',
    component: EmailValidateComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'userlogin',
    component: UserloginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
