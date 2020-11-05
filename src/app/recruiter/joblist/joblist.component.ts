import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

export interface Job {
  noOfVancies: string;
  jobTitle: string;
  jobLocation: string;
  minSalaryRange: string;
  maxSalaryRange: string;
  actions: string;
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
  total = 0;
  jobs: Job[];
  message: string;
  pageOfItems: Array<any>;
  adminId: string;

  constructor(public service: CommonService, public router: Router, public route: ActivatedRoute, public toastr: ToastrService) {
    this.refreshCountries();
    this.userId = this.route.snapshot.params['id'];

  }
  refreshCountries() {

    console.log("collection size page pagesize", this.collectionSize, this.page, this.pageSize)
    this.jobs = this.jobData
      .map((job, i) => ({ id: i + 1, ...job }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.adminId = sessionStorage.getItem('adminId');

    console.log("userid adminid", this.userId, this.adminId);
    if (this.userId !== null) {
      this.service.get(`job/viewJobsByRecruiter/${this.userId}`).subscribe((res: any) => {
        console.log("job list res recruiter", res);
        this.jobData = res.value;
        this.collectionSize = this.jobData.length;
        //this.total=this.jobData.length;
        //console.log("collection size page pagesize",this.collectionSize,this.page,this.pageSize)

      })
    }
    else {
      this.service.get(`job/getAvailableJobs`).subscribe((res: any) => {
        console.log("job list res", res);
        this.jobData = res.value;
        this.collectionSize = this.jobData.length;
      })
    }
  }
  viewJob(id) {
    if (this.userId !== null)
      this.router.navigate(['dashboard/viewjob', id]);
    else
      this.router.navigate(['admin/viewjob', id]);
  }
  assignJob(id) {
    this.router.navigate(['admin/jobassigned', id]);
  }
  editJob(id) {
    this.router.navigate(['dashboard/addeditjob', id]);
  }
  addJob() {
    this.router.navigate(['dashboard/addeditjob']);
  }
  deleteJob(id) {
    this.service.delete(`job/deleteJob/${id}`).subscribe((res: any) => {
      console.log("delete job res", res);
      if (res.status === '7400') {
        this.message = 'success';
        this.toastr.success("Job Deleted Successfully", "Save");
        this.service.get(`job/viewJobsByRecruiter/${this.userId}`).subscribe((resp: any) => {
          console.log("job list res", resp);
          this.jobData = resp.value;
  
        })
      }
      else {
        this.message = 'warning';
        this.toastr.error("Not Deleted","Error");
      }
      
    })
  }
}
