import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddjobComponent } from '../pages/addjob/addjob.component';
import { EditprofileComponent } from '../pages/editprofile/editprofile.component';
import { JoblistComponent } from '../pages/joblist/joblist.component';
import { PlansComponent } from '../pages/plans/plans.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { ViewjobComponent } from '../pages/viewjob/viewjob.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path:'dashboard',component:DashboardComponent
  },
  {
    path:'profile',component:ProfileComponent
  },
  {
    path:'editprofile',component:EditprofileComponent
  },
  {
    path:'addjob',component:AddjobComponent
  },
  {
    path:'addjob/:id',component:AddjobComponent
  },
  {
    path:'joblist',component:JoblistComponent
  },
  {
    path:'plans',component:PlansComponent
  },
  {
    path:'viewjob/:id',component:ViewjobComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
