import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {
  private _success = new Subject<string>();
  successMessage = '';
  staticAlertClosed = false;
  public ngForm = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    companyUrl: new FormControl('', [Validators.required]),
    companyLinkedin: new FormControl('', [Validators.required]),
    companyDescription: new FormControl('', [Validators.required]),
    companyIndustry: new FormControl('', [Validators.required]),
    companyLocations: new FormControl('', [Validators.required]),
    noOfVacancies: new FormControl('', [Validators.required]),
    jobTitle: new FormControl('', [Validators.required]),
    jobDescription: new FormControl('', [Validators.required]),
    yearsOfExp: new FormControl('', [Validators.required]),
    jobLocation: new FormControl('', [Validators.required]),
    minSalaryRange: new FormControl('', [Validators.required]),
    maxSalaryRange: new FormControl('', [Validators.required]),
    industryVacancy: new FormControl('', [Validators.required]),
  })
  userId: any;
  jobId: any;

  constructor(public service: CommonService, public route: ActivatedRoute) {
    this.jobId = this.route.snapshot.params['id'];
    console.log("job id",this.jobId);
  }

  ngOnInit(): void {
    //sessionStorage.get

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
    this.userId = sessionStorage.getItem('userId');
    console.log("userId", this.userId);
  }
  jobSubmit() {
    // alert("submitted")
    if (this.ngForm.value.companyUrl === '' || this.ngForm.value.companyName === '' || this.ngForm.value.companyLocations === '' || this.ngForm.value.companyLinkedin === '' || this.ngForm.value.companyIndustry === '' || this.ngForm.value.companyDescription === '' || this.ngForm.value.jobDescription==='' || this.ngForm.value.jobLocation ===''|| this.ngForm.value.jobTitle ==='' || this.ngForm.value.noOfVacancies===''|| this.ngForm.value.yearsOfExp===''|| this.ngForm.value.minSalaryRange===''|| this.ngForm.value.maxSalaryRange===''|| this.ngForm.value.industryVacancy==='') {
     this._success.next("Enter all Fields");
    }
    if (this.jobId === undefined) {
      const obj = {
        recruiterId: this.userId,
        companyName: this.ngForm.value.companyName,
        companyUrl: this.ngForm.value.companyUrl,
        companyLinkedin: this.ngForm.value.companyLinkedin,
        companyDescription: this.ngForm.value.companyDescription,
        companyIndustry: this.ngForm.value.companyIndustry,
        companyLocations: this.ngForm.value.companyLocations,
        noOfVacancies: this.ngForm.value.noOfVacancies,
        jobTitle: this.ngForm.value.jobTitle,
        jobDescription: this.ngForm.value.jobDescription,
        yearsOfExp: this.ngForm.value.yearsOfExp,
        jobLocation: this.ngForm.value.jobLocation,
        minSalaryRange: this.ngForm.value.minSalaryRange,
        maxSalaryRange: this.ngForm.value.maxSalaryRange,
        industryVacancy: this.ngForm.value.industryVacancy
      }
      console.log("data", obj);
      this.service.post(`job/postNewJob`, obj).subscribe((res: any) => {
        console.log("post job res", res);
      })
    }
    else {
      const obj = {
        recruiterId: this.userId,
        companyName: this.ngForm.value.companyName,
        companyUrl: this.ngForm.value.companyUrl,
        companyLinkedin: this.ngForm.value.companyLinkedin,
        companyDescription: this.ngForm.value.companyDescription,
        companyIndustry: this.ngForm.value.companyIndustry,
        companyLocations: this.ngForm.value.companyLocations,
        noOfVacancies: this.ngForm.value.noOfVacancies,
        jobTitle: this.ngForm.value.jobTitle,
        jobDescription: this.ngForm.value.jobDescription,
        yearsOfExp: this.ngForm.value.yearsOfExp,
        jobLocation: this.ngForm.value.jobLocation,
        minSalaryRange: this.ngForm.value.minSalaryRange,
        maxSalaryRange: this.ngForm.value.maxSalaryRange,
        industryVacancy: this.ngForm.value.industryVacancy
      }
      console.log("data with job id", obj);
      this.service.put(`job/editJob/${this.jobId}`, obj).subscribe((res: any) => {
        console.log("edit job res", res);
        if (res.status === "7400") {
          this._success.next(res.message);
        }
      })
    }
  }
}
