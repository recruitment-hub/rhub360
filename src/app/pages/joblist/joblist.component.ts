import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

export interface Job {
 noOfVancies:string;
 jobTitle:string;
 jobLocation:string;
 minSalaryRange:string;
 maxSalaryRange:string;
 actions:string;
}
@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {

  userId: any;
  jobData = [];
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  jobs: Job[];
  message: string;
  constructor(public service: CommonService, public router: Router) {
    this.refreshCountries();
    
  }
  refreshCountries() {
    
    console.log("collection size page pagesize",this.collectionSize,this.page,this.pageSize)
    this.jobs = this.jobData
      .map((job, i) => ({ id: i + 1, ...job }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.service.get(`job/viewJobsByRecruiter/${this.userId}`).subscribe((res: any) => {
      console.log("job list res", res);
      this.jobData = res.value;
      this.collectionSize=this.jobData.length;
      console.log("collection size page pagesize",this.collectionSize,this.page,this.pageSize)
    })
  }
  viewJob(id) {
    this.router.navigate(['dashboard/viewjob', id]);
  }
  editJob(id) {
    this.router.navigate(['dashboard/addjob', id]);
  }
  addJob(){
    this.router.navigate(['dashboard/addjob']);
  }
  deleteJob(id) {
    this.service.delete(`job/deleteJob/${id}`).subscribe((res: any) => {
      console.log("delete job res", res);
      if(res.status==='7400'){
        this.message='success';
      }
      else{
        this.message='warning';
      }
      this.service.get(`job/viewPostedJobs/${this.userId}`).subscribe((resp: any) => {
        console.log("job list res", resp);
        this.jobData = resp.value;
        
      })
    })
  }
}
