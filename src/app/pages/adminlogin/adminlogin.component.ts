import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  message: string;
  roleId: any;
clicked=false;
  role: any;
  constructor(public service: CommonService, public router: Router) { }
  public ngForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    pwd: new FormControl('', [Validators.required])
  })
  ngOnInit(): void {
  }
  loginEnter() {
    this.router.navigate(['adminuserlogin']);
  }
  loginSubmit() {
    const obj = {
      email: this.ngForm.value.email,
      password: this.ngForm.value.pwd,
    };
    if(this.ngForm.value.email !== '' || this.ngForm.value.pwd !== ''){
    this.service.post(`admin/adminLogin`, obj).subscribe((res: any) => {
      console.log("res admin login", res);
      if (res.status === "7400") {

        this.message = 'success'
        var admin = res.response;
        this.roleId = admin.roleId._id;
        this.role = admin.role;
        console.log("roleid",this.roleId);
        sessionStorage.setItem('roleId', this.roleId);
        sessionStorage.setItem('role',this.role);
        sessionStorage.setItem('adminData', JSON.stringify(admin));
        this.router.navigate(['admin']);
      }
      else{
        this.message='warning';
      }
    })
  }
  else{
    this.message='warning';
  }

  }
}
