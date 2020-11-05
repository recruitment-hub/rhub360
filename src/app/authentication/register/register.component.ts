import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
//import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  ngForm:FormGroup;
  submitted:boolean=false;
  emailId: any;
  res: any;
  clicked = false;
  message: string;

  constructor(private fb: FormBuilder,
    public apiService: CommonService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.ngForm = this.fb.group({
      email: ['',Validators.compose([Validators.required,Validators.email])],
      agree: ['',Validators.required]
    }
    );
  }

  get r(){
    return this.ngForm.controls;
  }

  registerSubmit() {
    this.submitted=true;
   
    console.log("check", this.ngForm.value.agree);
    if(!this.ngForm.valid)
    return;
    this.emailId = this.ngForm.value.email;
    const obj = {
      email: this.ngForm.value.email,
      verifiedLink: `http://app.recruitment-hub.s3-website.us-east-2.amazonaws.com/#/emailvalidate?email=${this.emailId}`,
      //verifiedLink: `http://localhost:4200/#/emailvalidate?email=${this.emailId}`,
    };

    this.emailId = this.ngForm.value.email.toString();
    this.apiService.post(`recruiter/verifyEmail`, obj).subscribe((res: any) => {
      if (res.status === '7400') {
        this.emailId = res.email;
        sessionStorage.setItem('email', this.emailId);
        console.log("res", res);
        this.message='success';
        this.toastr.success("Successfully Registered", "Save");
        
      }
      else {
        this.message='warning';
        this.toastr.error("Email already Registered. You can Login directly", "Error")
      
      }

    })
  }



}
