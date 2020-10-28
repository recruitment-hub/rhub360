import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthAdminRoutingModule } from './auth-admin-routing.module';
import { LoginAdminComponent } from './login-admin/login-admin.component';


@NgModule({
  declarations: [LoginAdminComponent],
  imports: [
    CommonModule,
    AuthAdminRoutingModule
  ]
})
export class AuthAdminModule { }
