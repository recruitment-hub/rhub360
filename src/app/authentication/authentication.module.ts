import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './register/register.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { EmailValidateComponent } from './email-validate/email-validate.component';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from '../component/header/header.component';
//import { HeaderComponent } from '../common/header/header.component';


@NgModule({
  declarations: [HeaderComponent,RegisterComponent, UserloginComponent, EmailValidateComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialModule,
    
  ]
})
export class AuthenticationModule { }
