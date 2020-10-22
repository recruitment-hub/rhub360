import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddjobComponent } from '../pages/addjob/addjob.component';
import { EditprofileComponent } from '../pages/editprofile/editprofile.component';
import { JoblistComponent } from '../pages/joblist/joblist.component';
import { PlansComponent } from '../pages/plans/plans.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { UserloginComponent } from '../pages/userlogin/userlogin.component';
import { ViewjobComponent } from '../pages/viewjob/viewjob.component';
import { EmailValidateComponent } from '../pages/email-validate/email-validate.component';
import { CompanylistComponent } from '../pages/companylist/companylist.component';
import { AddeditcompanyComponent } from '../pages/addeditcompany/addeditcompany.component';
import { ViewcompanyComponent } from '../pages/viewcompany/viewcompany.component';

const routes: Routes = [
  {
    path:'',component:PlansComponent
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
  },
  {
    path:'companylist',component:CompanylistComponent
  },
  {
    path:'addeditcompany',component:AddeditcompanyComponent
  },
  {
    path:'addeditcompany/:id',component:AddeditcompanyComponent
  },
  {
    path:'viewcompany/:id',component:ViewcompanyComponent
  },
  {
    path: 'userlogin',
    component: UserloginComponent
  },
  {
    path: 'emailvalidate',
    component: EmailValidateComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
