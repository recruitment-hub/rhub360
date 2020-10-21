import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { RegisterComponent } from './register/register.component';
import { EmailValidateComponent } from './email-validate/email-validate.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmailValidateComponent,
    UserloginComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    EmailValidateComponent,
    UserloginComponent
  ]
})
export class AuthModule { }
