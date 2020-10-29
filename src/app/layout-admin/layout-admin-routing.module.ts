import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddedituserComponent } from '../pages/addedituser/addedituser.component';
import { AddjobComponent } from '../pages/addjob/addjob.component';
import { AdminloginComponent } from '../pages/adminlogin/adminlogin.component';
import { AdminvalidateComponent } from '../pages/adminvalidate/adminvalidate.component';
import { EdituserComponent } from '../pages/edituser/edituser.component';
import { JobassignedListComponent } from '../pages/jobassigned-list/jobassigned-list.component';
import { JobassignedComponent } from '../pages/jobassigned/jobassigned.component';
import { JoblistComponent } from '../pages/joblist/joblist.component';
import { JobsearchComponent } from '../pages/jobsearch/jobsearch.component';
import { UserlistComponent } from '../pages/userlist/userlist.component';
import { ViewjobComponent } from '../pages/viewjob/viewjob.component';

const routes: Routes = [
  {
    path: 'adminuserlogin',
    component: AdminloginComponent
  },
  {
    path: 'adminvalidate',
    component: AdminvalidateComponent
  },
  {
    path: 'addedituser', component: AddedituserComponent
  },
  {
    path: 'addedituser/:id', component: AddedituserComponent
  },
  {
    path: 'userlist', component: UserlistComponent
  },
  {
    path: 'jobassigned/:id', component: JobassignedComponent
  },
  {
    path: 'joblist', component: JoblistComponent
  },
  {
    path: 'addjob/:id', component: AddjobComponent
  },
  {
    path: 'viewjob/:id', component: ViewjobComponent
  },
  {
    path: '', component: JoblistComponent
  },
  {
    path: 'edituser', component: EdituserComponent
  },
  {
    path:'assignedjoblist',component:JobassignedListComponent
  },
  {
    path:'jobsearch',component:JobsearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutAdminRoutingModule { }
