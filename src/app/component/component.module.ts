import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    NgbModule
  ],
  exports:[
    FooterComponent,
    SidebarComponent,
    NavbarComponent
  ]
})
export class ComponentModule { }
