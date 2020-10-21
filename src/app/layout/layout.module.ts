import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgbModule
  ]
})
export class LayoutModule { }
