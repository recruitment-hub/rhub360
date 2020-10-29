import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
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
    description: new FormControl('', [Validators.required]),
    linkedin: new FormControl('', [Validators.required]),
    facebook: new FormControl('', [Validators.required]),
    twitter: new FormControl('', [Validators.required]),
    countryName:new FormControl('', [Validators.required])
  })
  public proForm = new FormGroup({
    old: new FormControl('', [Validators.required]),
    newpass: new FormControl('', [Validators.required]),
    cpass: new FormControl('', [Validators.required])
  })
  userData: any;
  roleData: any;
  message:string;
  change: boolean =false;
  adminId: string;
  files: any;
  fileName: any;
  imgshow=false;
  constructor(public service: CommonService) {
    this.adminId = sessionStorage.getItem('adminId');
   }

  ngOnInit(): void {
   // this.userData = JSON.parse(sessionStorage.getItem('adminData'));
   this.service.get(`admin/viewAdminDetails/${this.adminId}`).subscribe((resp:any)=>{
     this.userData = resp.response;
    console.log("userdata", this.userData);
   
    this.service.get(`admin/viewRoles`).subscribe((res: any) => {
      console.log("role id", res);
      this.roleData = res.response;
      this.ngForm.value.firstName = this.userData?.firstName;
      this.ngForm.value.lastName = this.userData?.lastName;
      this.ngForm.value.phoneNumber= this.formatPhoneNumber(this.userData?.phoneNumber);
      //this.ngForm.value.phoneNumber = this.userData?.phoneNumber;
      //this.ngForm.value.profileTitle = this.userData?._id;
      //this.ngForm.value.email = this.userData.email;
      this.ngForm.value.profileTitle = this.userData?.profileTitle;
      this.ngForm.value.profileImage = this.userData?.profileImage;
      this.fileName = this.userData?.profileImage;
      this.imgshow =true;
      this.ngForm.value.dob = this.userData?.dob;
      this.ngForm.value.companyName = this.userData?.companyName;
      this.ngForm.value.stateName = this.userData?.stateName;
      this.ngForm.value.cityName = this.userData?.cityName;
      this.ngForm.value.zipcode = this.userData?.zipcode;
     this.ngForm.value.countryName = this.userData?.countryName;
      this.ngForm.value.description = this.userData?.description;
      this.ngForm.value.facebook = this.userData?.facebook;
      this.ngForm.value.twitter = this.userData?.twitter;
      this.ngForm.value.linkedin = this.userData?.linkedin;
    })
  })
  }
  formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
  }
  onChangeImage(event) {
    //alert("hbfaj")
    this.files = event.target.files[0];
    this.service.fileUpload(`common/uploadFile`, this.files).subscribe((res: any) => {
      console.log("upload profile res", res);
      this.ngForm.value.profileImage = res.fileName;
      this.fileName=res.fileName;
      this.service.put(`admin/changeAvatar/${this.adminId}/${res.fileName}`,this.adminId).subscribe((resp:any)=>{
        console.log("avatar change res",resp);
      })
    })
  }
  changePass() {
    this.change = true;
    this.message = '';
  }
  changePassword(){
    console.log("password", this.proForm.value);
    var obj = {
      "adminId": this.adminId,
      "oldPassword": this.proForm.value.old,
      "newPassword": this.proForm.value.newpass
    }
    this.service.post(`admin/changeNewPassword`, obj).subscribe((res: any) => {
      console.log("change password res", res);
      if (res.status === '7400') {
        this.message = 'success';
      }
      else {
        this.message = 'warning';
      }
    })
  }
  profileSubmit() {
    this.message='';
    var obj = {
      firstName: this.ngForm.value.firstName,
      lastName: this.ngForm.value.lastName,
      phoneNumber: this.ngForm.value.phoneNumber,
      adminId: this.adminId,
      profileTitle: this.ngForm.value.profileTitle,
      profileImage: this.fileName,
      dob: this.ngForm.value.dob,
      companyName: this.ngForm.value.companyName,
      stateName: this.ngForm.value.stateName,
      cityName: this.ngForm.value.cityName,
      zipcode: this.ngForm.value.zipcode,
      description:this.ngForm.value.description,
      facebook:this.ngForm.value.facebook,
      twitter:this.ngForm.value.twitter,
      linkedin:this.ngForm.value.linkedin,
      countryName:this.ngForm.value.countryName
    }
    console.log("obj",obj);
    this.service.post(`admin/updateAdminDetails`,obj).subscribe((res:any)=>{
      console.log("update user res",res);
      if (res.status === "7400") {
        this.message = 'success';
      }
      else {
        this.message = "warning";
      }
    })
  }
}
