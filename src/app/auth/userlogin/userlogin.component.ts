import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  clicked = false;
  private _success = new Subject<string>();
  successMessage = '';
  staticAlertClosed = false;
  public ngForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    pwd: new FormControl('', [Validators.required])
  })
  userId: any;
  constructor(public router: Router, 
    public httpService: CommonService) { }

  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }
  craeteAccount(){
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
        var user = res.value;
        this.userId = user._id;
        sessionStorage.setItem('userId',this.userId);
        sessionStorage.setItem('userData', JSON.stringify(user));
        this.router.navigate(['dashboard']);
      }
      else{
        this._success.next("Email or Password Incorrect. Try again");
      }
    })
  }
}
