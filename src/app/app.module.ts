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
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    NgbModule
  ],
  providers: [
    Location, { provide: LocationStrategy, useClass: HashLocationStrategy },CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
