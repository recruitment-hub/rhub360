import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [SidebarComponent, NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    ComponentRoutingModule
  ],
  exports:
  [SidebarComponent,NavbarComponent,FooterComponent]
})
export class ComponentModule { }
