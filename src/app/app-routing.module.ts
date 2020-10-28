import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardAdminComponent } from './layout-admin/dashboard-admin/dashboard-admin.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
        {
      path: '',
      loadChildren: './layout/layout.module#LayoutModule'
    }],
  },
  {
    path: 'admin',
    component: DashboardAdminComponent,
    children: [
        {
      path: '',
      loadChildren: './layout-admin/layout-admin.module#LayoutAdminModule'
    }],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
