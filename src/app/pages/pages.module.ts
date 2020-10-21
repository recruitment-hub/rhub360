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

@NgModule({
  declarations: [PlansComponent, AddjobComponent, JoblistComponent, ProfileComponent, ViewjobComponent, EditprofileComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports:[
    PlansComponent,AddjobComponent,JoblistComponent,ProfileComponent,ViewjobComponent
  ]
})
export class PagesModule { }
