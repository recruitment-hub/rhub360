import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommonService } from './services/common.service';
import { LocationStrategy } from '@angular/common';
import { HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DashboardComponent } from './recruiterhome/dashboard/dashboard.component';
import { ComponentModule } from './component/component.module';
import { RecruiterhomeModule } from './recruiterhome/recruiterhome.module';
import { RecruiterModule } from './recruiter/recruiter.module';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    AuthenticationModule,
    ComponentModule,
    RecruiterhomeModule,
    RecruiterModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut:10000,
      positionClass:'toast-top-center',
      preventDuplicates:true
    })
  ],
  providers: [
    Location, { provide: LocationStrategy, useClass: HashLocationStrategy },CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
