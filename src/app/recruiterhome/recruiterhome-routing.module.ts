import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddeditcompanyComponent } from '../recruiter/addeditcompany/addeditcompany.component';
import { AddeditjobComponent } from '../recruiter/addeditjob/addeditjob.component';
import { CompanylistComponent } from '../recruiter/companylist/companylist.component';
import { EditprofileComponent } from '../recruiter/editprofile/editprofile.component';
import { JoblistComponent } from '../recruiter/joblist/joblist.component';
import { PlansComponent } from '../recruiter/plans/plans.component';
import { ViewcompanyComponent } from '../recruiter/viewcompany/viewcompany.component';
import { ViewjobComponent } from '../recruiter/viewjob/viewjob.component';

const routes: Routes = [
  {
    path: '', component: PlansComponent
  },
  {
    path: 'plans', component: PlansComponent
  },
  {
    path: 'editprofile', component: EditprofileComponent
  },
  {
    path: 'joblist', component: JoblistComponent
  },
  {
    path: 'companylist', component: CompanylistComponent
  },
  {
    path: 'addeditjob/:id', component: AddeditjobComponent
  },
  {
    path: 'addeditjob', component: AddeditjobComponent
  },
  {
    path: 'addeditcompany', component: AddeditcompanyComponent
  },
  {
    path: 'addeditcompany/:id', component: AddeditcompanyComponent
  },
  {
    path: 'viewjob/:id', component: ViewjobComponent
  },
  {
    path: 'viewcompany/:id', component: ViewcompanyComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterhomeRoutingModule { }
