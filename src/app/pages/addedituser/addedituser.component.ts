import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-addedituser',
  templateUrl: './addedituser.component.html',
  styleUrls: ['./addedituser.component.css']
})
export class AddedituserComponent implements OnInit {

  public ngForm = new FormGroup({

    profileTitle: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required])
  })
  userData: any;
  roleData: any;
  roleId: any;
  message: string;
  constructor(public service: CommonService, public route: ActivatedRoute) {
    this.roleId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.service.get(`admin/viewRoles`).subscribe((res: any) => {
      console.log("role id", res);
      this.roleData = res.response;
      if (this.roleId !== null || this.roleId !== '' || this.roleId !== undefined) {

      }
      else {
        // this.userData = JSON.parse(sessionStorage.getItem('adminData'));

        //console.log("userdata", this.userData);

        /*   this.ngForm.value.firstName = this.userData.firstName;
          this.ngForm.value.lastName = this.userData.lastName;
          this.ngForm.value.phoneNumber = this.userData.phoneNumber;
          this.ngForm.value.profileTitle = this.userData.roleId.role;
          this.ngForm.value.email = this.userData.email; */

      }
    })
  }
  userSubmit() {
    var obj = {
      firstName: this.ngForm.value.firstName,
      lastName: this.ngForm.value.lastName,
      phoneNumber: this.ngForm.value.phoneNumber,
      roleId: this.ngForm.value.profileTitle,
      email: this.ngForm.value.email
    }
    var objverify = {
      email: this.ngForm.value.email,
      roleId: this.ngForm.value.profileTitle,
      //verifiedLink: `http://localhost:4200/#/adminvalidate?email=${this.ngForm.value.email}`
      verifiedLink: `http://app.recruitment-hub.s3-website.us-east-2.amazonaws.com/#/adminvalidate?email=${this.ngForm.value.email}`,
    }
    console.log("obj", objverify);
    this.service.post(`admin/newAdmin`, objverify).subscribe((resp: any) => {
      console.log("verify res", resp);
      if (resp.status === "7400") {
        this.message = 'success';
      }
      else {
        this.message = "warning";
      }
    })
  }
}
