import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  ngForm:FormGroup;
  submitted:boolean=false;
  userId: any;
  profileData: any;
  message: string;
  constructor(private fb: FormBuilder,
    public apiService: CommonService, private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.ngForm = this.fb.group({
      email: ['',Validators.compose([Validators.required,Validators.email])],
      pwd: ['',Validators.required]
    }
    );
  }

  get l(){
    return this.ngForm.controls;
  }
  loginSubmit(){
    this.submitted=true;
   
    if(!this.ngForm.valid)
    return;
    const obj = {
      email: this.ngForm.value.email,
      password: this.ngForm.value.pwd,
    };
    this.apiService.post('recruiter/recruiterLogin', obj).subscribe((res: any) => {
      console.log("res login", res);
      if(res.status==="7400"){
        this.toastr.success("Logged in Successfully", "Save");
        //this.message='success'
        var user = res.value;
        this.userId = user._id;
        sessionStorage.setItem('userId',this.userId);
        sessionStorage.setItem('userData', JSON.stringify(user));
        this.apiService.get(`recruiter/viewRecruiterDetails/${this.userId}`).subscribe((resp:any)=>{
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
        this.toastr.error("Invalid Email and Password", "Error");
      }
    })
  }

}
