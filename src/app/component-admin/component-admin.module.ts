import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentAdminRoutingModule } from './component-admin-routing.module';
import { SidebaradminComponent } from './sidebaradmin/sidebaradmin.component';
import { NavbaradminComponent } from './navbaradmin/navbaradmin.component';
import { FooteradminComponent } from './footeradmin/footeradmin.component';


@NgModule({
  declarations: [SidebaradminComponent, NavbaradminComponent, FooteradminComponent],
  imports: [
    CommonModule,
    ComponentAdminRoutingModule
  ],
  exports:[
    SidebaradminComponent,
    FooteradminComponent,
    NavbaradminComponent
  ]
})
export class ComponentAdminModule { }
