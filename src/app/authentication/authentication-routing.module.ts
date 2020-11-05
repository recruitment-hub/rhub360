import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailValidateComponent } from './email-validate/email-validate.component';
import { RegisterComponent } from './register/register.component';
import { UserloginComponent } from './userlogin/userlogin.component';

const routes: Routes = [
  {path:'',component:RegisterComponent},
  {path:'emailvalidate',component:EmailValidateComponent},
  {path:'userlogin',component:UserloginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
