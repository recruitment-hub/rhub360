import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
