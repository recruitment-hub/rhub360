import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-adminvalidate',
  templateUrl: './adminvalidate.component.html',
  styleUrls: ['./adminvalidate.component.css']
})
export class AdminvalidateComponent implements OnInit {

  message: string;
  roleId: any;
  email: any;
  clicked = false;
  public ngForm = new FormGroup({
   // email: new FormControl(''),
    pwd: new FormControl('', [Validators.required]),
    cpwd: new FormControl('', [Validators.required])
  })
  constructor(public service: CommonService, public router: Router, public route: ActivatedRoute) {
    this.email = this.route.snapshot.queryParamMap.get('email');
  }
  
  ngOnInit(): void {

    console.log("email", this.email);
  }
  loginEnter() {
    this.router.navigate(['adminuserlogin']);
  }
  passwordSubmit() {
    if (this.ngForm.value.pwd === this.ngForm.value.cpwd) {

      const obj = {
        email: this.email,
        password: this.ngForm.value.pwd,
      };

      this.service.post(`admin/updatePassword`, obj).subscribe((res: any) => {
        console.log("res new admin", res);
        if (res.status === "7400") {
          this.roleId = res.response.roleId;
          console.log("roleid", this.roleId);
          sessionStorage.setItem('roleId', this.roleId);
          if (res.response.firstName === null) {
            this.router.navigate(['admin/edituser']);
          }
          else
            this.router.navigate(['admin/joblist'])
        }
        else {
          //this._success.next("Email already Registered.")
          this.message = 'success'
        }
      })
    }
    else {
      //this._success.next("Password and Confirm Password Must be Same");
      this.message = 'warning';
    }
  }
}
