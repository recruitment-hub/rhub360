import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  userId: any;
  message: string;
  change = false;
  public ngForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    profileTitle: new FormControl('', [Validators.required]),
    profileImage: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    stateName: new FormControl('', [Validators.required]),
    cityName: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    planId: new FormControl('', [Validators.required]),
  })
  public proForm = new FormGroup({
    old: new FormControl('', [Validators.required]),
    newpass: new FormControl('', [Validators.required]),
    cpass: new FormControl('', [Validators.required])
  })
  profileData: any;
  files: any;
  constructor(public service: CommonService, public route: ActivatedRoute, public router: Router) {
    //this.userId = this.route.snapshot.params['id'];
    this.userId = sessionStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.service.get(`recruiter/viewRecruiterDetails/${this.userId}`).subscribe((res: any) => {
      console.log("profile res", res);
      this.profileData = res.value;
      this.ngForm.value.firstName = this.profileData.firstName;
      this.ngForm.value.lastName = this.profileData.lastName;
      this.ngForm.value.phoneNumber = this.profileData.phoneNumber;
      this.ngForm.value.profileTitle = this.profileData.profileTitle;
      this.ngForm.value.profileImage = this.profileData.profileImage;
      this.ngForm.value.dob = this.profileData.dob;
      this.ngForm.value.companyName = this.profileData.companyName;
      this.ngForm.value.stateName = this.profileData.stateName;
      this.ngForm.value.cityName = this.profileData.cityName;
      this.ngForm.value.zipcode = this.profileData.zipcode;
      this.ngForm.value.planId = this.profileData.planId;
    })
  }
  onChangeImage(event) {
    //alert("hbfaj")
    this.files = event.target.files[0];
    this.service.fileUpload(`common/uploadFile`, this.files).subscribe((res: any) => {
      console.log("upload profile res", res);
      this.ngForm.value.profileImage = res.fileName;
    })
  }
  changePass() {
    this.change = true;
    this.message = '';
  }
  changePassword() {
    console.log("password", this.proForm.value);
    var obj = {
      "recruiterId": this.userId,
      "oldPassword": this.proForm.value.old,
      "newPassword": this.proForm.value.newpass
    }
    this.service.post(`recruiter/changePassword`, obj).subscribe((res: any) => {
      console.log("change password res", res);
      if (res.status === '7400') {
        this.message = 'success';
      }
      else {
        this.message = 'warning';
      }
    })
  }
  changePlan() {
    this.router.navigate(['dashboard/plans']);
  }
  profileSubmit() {

    const obj = {
      firstName: this.ngForm.value.firstName,
      lastName: this.ngForm.value.lastName,
      phoneNumber: this.ngForm.value.phoneNumber,
      profileTitle: this.ngForm.value.profileTitle,
      profileImage: this.ngForm.value.profileImage,
      dob: this.ngForm.value.dob,
      companyName: this.ngForm.value.companyName,
      stateName: this.ngForm.value.stateName,
      cityName: this.ngForm.value.cityName,
      zipcode: this.ngForm.value.zipcode,
      planId: this.ngForm.value.planId,
      recruiterId: this.userId
    }
    this.service.put(`recruiter/updateRecruiter`, obj).subscribe((res: any) => {
      console.log("update profile res", res);
      if (res.status === '7400') {
        this.message = 'success';
      }
      else {
        this.message = 'warning';
      }
    })
  }
}
