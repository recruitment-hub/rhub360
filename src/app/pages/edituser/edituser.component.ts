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
    //email: new FormControl('', [Validators.required])
  })
  userData: any;
  roleData: any;
  message:string;
  constructor(public service: CommonService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('adminData'));
    console.log("userdata", this.userData);
    this.service.get(`admin/viewRoles`).subscribe((res: any) => {
      console.log("role id", res);
      this.roleData = res.response;
      this.ngForm.value.firstName = this.userData?.firstName;
      this.ngForm.value.lastName = this.userData?.lastName;
      this.ngForm.value.phoneNumber = this.userData?.phoneNumber;
      this.ngForm.value.profileTitle = this.userData?._id;
      //this.ngForm.value.email = this.userData.email;
    })
  }
  
  profileSubmit() {
    var obj = {
      firstName: this.ngForm.value.firstName,
      lastName: this.ngForm.value.lastName,
      phoneNumber: this.ngForm.value.phoneNumber,
      adminId: this.ngForm.value.profileTitle,
      
    }
    console.log("obj",obj);
    this.service.post(`admin/updateAdminDetails`,obj).subscribe((res:any)=>{
      console.log("update user res",res);
    })
  }
}
