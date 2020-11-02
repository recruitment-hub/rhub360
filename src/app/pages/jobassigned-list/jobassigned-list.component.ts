import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
export interface Job {
  jobId: string;
  assignedTo: string;
  assignedBy: string;
  actions: string;
}
@Component({
  selector: 'app-jobassigned-list',
  templateUrl: './jobassigned-list.component.html',
  styleUrls: ['./jobassigned-list.component.css']
})
export class JobassignedListComponent implements OnInit {
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  total = 0;
  message: string;
  jobs: Job[];
  adminId: string;
  constructor(public service: CommonService, public router: Router) {
    this.adminId = sessionStorage.getItem('adminId');
    this.refreshCountries();
  }
  jobData: any;
  refreshCountries() {

    console.log("collection size page pagesize", this.collectionSize, this.page, this.pageSize)
    if(this.jobData?.length>0)
     this.jobs = this.jobData
      .map((job, i) => ({ id: i + 1, ...job }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); 
  }
  ngOnInit(): void {
    this.service.get(`job/jobAssignedToMe/${this.adminId}`).subscribe((res: any) => {
      console.log('job assign list res', res);
      this.jobData = res.value;
    })
  }
  viewAssignedJob(id) {
    //this.router.navigate([''])
  }
}
