import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

interface Job {
  no?: number;
  companyName: string;
  companyLocation: string;
  recruiterId: number;
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
  collectionSize = this.jobData.length;
  jobs: Job[];
  constructor(public service: CommonService, public router: Router) {
    this.refreshCountries();
  }
  refreshCountries() {
    this.jobs = this.jobData
      .map((job, i) => ({ id: i + 1, ...job }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.service.get(`job/viewPostedJobs/${this.userId}`).subscribe((res: any) => {
      console.log("job list res", res);
      this.jobData = res.value;
    })
  }
  viewJob(id) {
    this.router.navigate(['viewjob/', id]);
  }
  editJob(id) {
    this.router.navigate(['addjob', id]);
  }
  deleteJob(id) {
    this.service.delete(`job/deleteJob/${id}`).subscribe((res: any) => {
      console.log("delete job res", res);
      this.service.get(`job/viewPostedJobs/${this.userId}`).subscribe((resp: any) => {
        console.log("job list res", resp);
        this.jobData = resp.value;
      })
    })
  }
}
