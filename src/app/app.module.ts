import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PagesModule } from './pages/pages.module';
import { ComponentModule } from './component/component.module';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
//import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonService } from './services/common.service';
import {DpDatePickerModule} from 'ng2-date-picker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { LayoutAdminModule } from './layout-admin/layout-admin.module';
import { ComponentAdminModule } from './component-admin/component-admin.module';
import { DashboardAdminComponent } from './layout-admin/dashboard-admin/dashboard-admin.component';
import { AuthAdminModule } from './auth-admin/auth-admin.module';
//import { WavesModule, TableModule } from 'angular-bootstrap-md';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardAdminComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MaterialModule,
    AuthModule,
    LayoutModule,
    PagesModule,
    ComponentModule,
    HttpClientModule,
    AppRoutingModule,
    NgbPaginationModule,
    FlexLayoutModule,
    NgbAlertModule,
    DpDatePickerModule ,
    NgxPaginationModule,
    NgbModule,
    AuthAdminModule,
    LayoutAdminModule,
    ComponentAdminModule
  ],
  providers: [
    Location, { provide: LocationStrategy, useClass: HashLocationStrategy },CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
