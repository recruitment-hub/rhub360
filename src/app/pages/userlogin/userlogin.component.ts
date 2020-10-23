import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  clicked = false;
  
  public ngForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    pwd: new FormControl('', [Validators.required])
  })
  userId: any;
  profileData: any;
  message: string;
  constructor(public router: Router, 
    public httpService: CommonService,public spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    
  }
  craeteAccount(){
    this.router.navigate(['register']);
  }
  loginEnter() {
    this.router.navigate(['userlogin']);
  }
  registerEnter() {
    this.router.navigate(['register']);
  }
  loginSubmit() {
    const obj = {
      email: this.ngForm.value.email,
      password: this.ngForm.value.pwd,
    };
    this.httpService.post('recruiter/recruiterLogin', obj).subscribe((res: any) => {
      console.log("res login", res);
      if(res.status==="7400"){
        this.spinner.show();
 
        setTimeout(() => {
          
          this.spinner.hide();
        }, 5000);
        this.message='success'
        var user = res.value;
        this.userId = user._id;
        sessionStorage.setItem('userId',this.userId);
        sessionStorage.setItem('userData', JSON.stringify(user));
        this.httpService.get(`recruiter/viewRecruiterDetails/${this.userId}`).subscribe((resp:any)=>{
          console.log("profile res",resp);
          this.profileData = resp.value;
          console.log("planId",this.profileData.planId);
          //this.spinner.hide();
        if(this.profileData.planId === '' || this.profileData.planId === undefined || this.profileData.planId === null){
          this.router.navigate(['dashboard']);
        }
        else{
          this.router.navigate(['dashboard/joblist']);
        }
        })
      }
      else{
        this.message='warning';
      }
    })
  }
}
