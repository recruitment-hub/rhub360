import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans/plans.component';
import { AddjobComponent } from './addjob/addjob.component';
import { JoblistComponent } from './joblist/joblist.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewjobComponent } from './viewjob/viewjob.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { EmailValidateComponent } from './email-validate/email-validate.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { AddeditcompanyComponent } from './addeditcompany/addeditcompany.component';
import { ViewcompanyComponent } from './viewcompany/viewcompany.component';
//import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [PlansComponent, AddjobComponent, UserloginComponent, EmailValidateComponent, JoblistComponent, ProfileComponent, ViewjobComponent, EditprofileComponent, CompanylistComponent, AddeditcompanyComponent, ViewcompanyComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    PlansComponent, AddjobComponent, JoblistComponent, ProfileComponent, ViewjobComponent, EmailValidateComponent, UserloginComponent, CompanylistComponent, AddeditcompanyComponent, ViewcompanyComponent, ProfileComponent, ViewjobComponent
  ]
})
export class PagesModule { }
