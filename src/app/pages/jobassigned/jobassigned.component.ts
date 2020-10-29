import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-jobassigned',
  templateUrl: './jobassigned.component.html',
  styleUrls: ['./jobassigned.component.css']
})
export class JobassignedComponent implements OnInit {
  jobId: any;
  adminData: any;
  userId: any;
  jobData: any;
  userData: any;
  clicked = false;
  public ngForm = new FormGroup({
    assignTo: new FormControl('', [Validators.required])
  })
  constructor(public service: CommonService, public router: Router, public route: ActivatedRoute) {
    this.jobId = this.route.snapshot.params['id'];
    this.adminData = JSON.parse(sessionStorage.getItem('adminData'));
    this.userId = this.adminData._id;
    if (this.adminData.roleId._id === "5f92b17cfb23ea3930bffceb") {
      this.clicked = false;
    }
    else {
      this.clicked = true;
    }
    console.log("user id", this.userId);
  }
  message: string;
  ngOnInit(): void {
    this.service.get(`job/viewJobDetails/${this.jobId}`).subscribe((res: any) => {
      console.log("view assigned job res", res);
      this.jobData = res.value;
      this.service.get(`admin/getAdminUsers`).subscribe((resp: any) => {
        console.log("user list res", resp);
        this.userData = resp.response;
      })
    })
  }
  assignSubmit() {
    this.message ='';
    if (this.ngForm.value.assignTo === '' || this.ngForm.value.assignTo === undefined || this.ngForm.value.assignTo === null){
      this.message = 'warning';
      this.clicked=false;
    }
    else {
      var obj = {
        jobId: this.jobId,
        assignedTo: this.ngForm.value.assignTo,
        assignedBy: this.userId
      }
      this.service.post(`job/assignJob`, obj).subscribe((res: any) => {
        console.log("assign job post res", res);
        if (res.status === '7400') {
          this.message = 'success';
        }
        else {
          this.message = "warning";
        }
      })
    }
  }
}
