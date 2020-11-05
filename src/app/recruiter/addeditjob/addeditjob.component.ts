import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-addeditjob',
  templateUrl: './addeditjob.component.html',
  styleUrls: ['./addeditjob.component.css']
})
export class AddeditjobComponent implements OnInit {
companyId:any;
  public ngForm = new FormGroup({
    companyId: new FormControl('', [Validators.required]),
    noOfVacancies: new FormControl('', [Validators.required]),
    jobTitle: new FormControl('', [Validators.required]),
    jobDescription: new FormControl('', [Validators.required]),
    yearsOfExp: new FormControl('', [Validators.required]),
    jobLocation: new FormControl('', [Validators.required]),
    minSalaryRange: new FormControl('', [Validators.required]),
    maxSalaryRange: new FormControl('', [Validators.required]),
    // industryVacancy: new FormControl('', [Validators.required]),
  })
  userId: any;
  jobId: any;
  companyData=[];
  message: string;
  jobData: any;
  constructor(public service: CommonService, public route: ActivatedRoute,public toastr:ToastrService) {
    this.jobId = this.route.snapshot.params['id'];
    console.log("job id", this.jobId);
  }

  ngOnInit(): void {
    //sessionStorage.get
    this.userId = sessionStorage.getItem('userId');
    console.log("userId", this.userId);
    debugger;
    this.service.get(`company/viewMyCompanies/${this.userId}`).subscribe((res: any) => {
      console.log("company list res", res);
      this.companyData = res.value;
      if (this.jobId !== undefined) {
        this.service.get(`job/viewJobDetails/${this.jobId}`).subscribe((resp: any) => {
          console.log("view job res", resp);
          this.jobData = resp.value;
          this.ngForm.value.noOfVacancies = this.jobData.noOfVacancies;
          this.ngForm.value.jobTitle = this.jobData.jobTitle;
          this.ngForm.value.jobDescription = this.jobData.jobDescription;
          this.ngForm.value.yearsOfExp = this.jobData.yearsOfExp;
          this.ngForm.value.jobLocation = this.jobData.jobLocation;
          this.ngForm.value.minSalaryRange = this.jobData.minSalaryRange;
          this.ngForm.value.maxSalaryRange = this.jobData.maxSalaryRange;

        })
      }
    })
  }
  jobSubmit() {
    // alert("submitted")
    //if (this.ngForm.value.companyId === '' || this.ngForm.value.jobDescription === '' || this.ngForm.value.jobLocation === '' || this.ngForm.value.jobTitle === '' || this.ngForm.value.noOfVacancies === '' || this.ngForm.value.yearsOfExp === '' || this.ngForm.value.minSalaryRange === '' || this.ngForm.value.maxSalaryRange === '' || this.ngForm.value.industryVacancy === '') {
    //this._success.next("Enter all Fields");
    //}
    if (this.jobId === undefined) {
      const obj = {
        recruiterId: this.userId,
        companyId: this.ngForm.value.companyId,
        noOfVacancies: this.ngForm.value.noOfVacancies,
        jobTitle: this.ngForm.value.jobTitle,
        jobDescription: this.ngForm.value.jobDescription,
        yearsOfExp: this.ngForm.value.yearsOfExp,
        jobLocation: this.ngForm.value.jobLocation,
        minSalaryRange: this.ngForm.value.minSalaryRange,
        maxSalaryRange: this.ngForm.value.maxSalaryRange,
        // industryVacancy: this.ngForm.value.industryVacancy
      }
      console.log("data", obj);
      this.service.post(`job/postNewJob`, obj).subscribe((res: any) => {
        console.log("post job res", res);
        if (res.status === '7400') {
          this.message = 'success';
          this.toastr.success("Sucessfully Submitted","Save");
        }
        else {
          this.message = 'warning';
          this.toastr.error("Data not Saved","Error");
        }
      })
    }
    else {
      const obj = {
        recruiterId: this.userId,
        companyId: this.ngForm.value.companyId,
        noOfVacancies: this.ngForm.value.noOfVacancies,
        jobTitle: this.ngForm.value.jobTitle,
        jobDescription: this.ngForm.value.jobDescription,
        yearsOfExp: this.ngForm.value.yearsOfExp,
        jobLocation: this.ngForm.value.jobLocation,
        minSalaryRange: this.ngForm.value.minSalaryRange,
        maxSalaryRange: this.ngForm.value.maxSalaryRange,
        // industryVacancy: this.ngForm.value.industryVacancy
      }
      console.log("data with job id", obj);
      this.service.put(`job/editJob/${this.jobId}`, obj).subscribe((res: any) => {
        console.log("edit job res", res);
        if (res.status === '7400') {
          this.message = 'success';
          this.toastr.success("Sucessfully Submitted","Save");
        }
        else {
          this.message = 'warning';
          this.toastr.error("Data not Saved","Error");
        }
      })
    }
  }
}

