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
    planName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    linkedin: new FormControl('', [Validators.required]),
    facebook: new FormControl('', [Validators.required]),
    twitter: new FormControl('', [Validators.required]),
  })
  public proForm = new FormGroup({
    old: new FormControl('', [Validators.required]),
    newpass: new FormControl('', [Validators.required]),
    cpass: new FormControl('', [Validators.required])
  })
  profileData: any;
  files: any;
  fileName: any;
  imgshow=false;
  planData: any;
  constructor(public service: CommonService, public route: ActivatedRoute, public router: Router) {
    //this.userId = this.route.snapshot.params['id'];
    this.userId = sessionStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.service.get(`recruiter/viewRecruiterDetails/${this.userId}`).subscribe((res: any) => {
      console.log("profile res", res);
      this.imgshow=true
      this.profileData = res.value;
      this.service.get(`recruiter/viewPaymentPlans`).subscribe((resp:any)=>{
        this.planData = resp.value;
        console.log("res plan",resp);
      })
      this.fileName=this.profileData.profileImage;
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
      this.ngForm.value.planName = this.profileData.planName;
      this.ngForm.value.description = this.profileData.description;
      this.ngForm.value.facebook = this.profileData.facebook;
      this.ngForm.value.twitter = this.profileData.twitter;
      this.ngForm.value.linkedin = this.profileData.linkedin;
      
    })
  }
  onChangeImage(event) {
    //alert("hbfaj")
    this.files = event.target.files[0];
    this.service.fileUpload(`common/uploadFile`, this.files).subscribe((res: any) => {
      console.log("upload profile res", res);
      this.ngForm.value.profileImage = res.fileName;
      this.fileName=res.fileName;
      this.service.put(`recruiter/changeAvatar/${this.userId}/${res.fileName}`,this.userId).subscribe((res:any)=>{
        console.log("avatar change res",res);
      })
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
      profileImage: this.fileName,
      dob: this.ngForm.value.dob,
      companyName: this.ngForm.value.companyName,
      stateName: this.ngForm.value.stateName,
      cityName: this.ngForm.value.cityName,
      zipcode: this.ngForm.value.zipcode,
      planId: this.ngForm.value.planName,
      description:this.ngForm.value.description,
      facebook:this.ngForm.value.facebook,
      twitter:this.ngForm.value.twitter,
      linkedin:this.ngForm.value.linkedin,
      recruiterId: this.userId
    }
    console.log("obj",obj);
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
