import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { PlansComponent } from './plans/plans.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { JoblistComponent } from './joblist/joblist.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { AddeditjobComponent } from './addeditjob/addeditjob.component';
import { AddeditcompanyComponent } from './addeditcompany/addeditcompany.component';
import { ViewjobComponent } from './viewjob/viewjob.component';
import { ViewcompanyComponent } from './viewcompany/viewcompany.component';
import { MaterialModule } from '../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PlansComponent, EditprofileComponent, JoblistComponent, CompanylistComponent, AddeditjobComponent, AddeditcompanyComponent, ViewjobComponent, ViewcompanyComponent],
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    MaterialModule,
    NgbModule
  ]
})
export class RecruiterModule { }
