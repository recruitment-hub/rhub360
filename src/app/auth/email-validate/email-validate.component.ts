import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-email-validate',
  templateUrl: './email-validate.component.html',
  styleUrls: ['./email-validate.component.css']
})
export class EmailValidateComponent implements OnInit {
  param: any;
  clicked = false;
  email:any;
  private _success = new Subject<string>();
  successMessage = '';
  staticAlertClosed = false;
  public ngForm = new FormGroup({
    //email:new FormControl(''),
    pwd: new FormControl('', [Validators.required]),
    cpwd: new FormControl('', [Validators.required])
  })
  userId: any;
  constructor(private route: ActivatedRoute, 
    public router: Router, 
    public httpService: CommonService) {
    this.email = sessionStorage.getItem('email')
    this.email = this.route.snapshot.queryParamMap.get('email');
   // this.ngForm.value.email = this.route.snapshot.queryParamMap.get('email');
    console.log("param",this.email);
  }

  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }
  
  passwordSubmit() {
    if(this.ngForm.value.pwd === this.ngForm.value.cpwd){

    const obj = {
      email: this.email,
      password: this.ngForm.value.pwd,
    };

    this.httpService.post(`recruiter/newRecruiter`, obj).subscribe((res:any) => {
      console.log("res new recruit", res);
      if(res.status === "7400"){
        this.userId = res.userId;
        sessionStorage.setItem('userId',this.userId);
        this.router.navigate(['plans']);
      }
      else{
        this._success.next("Email already Registered.")
      }
    })
  }
  else{
    this._success.next("Password and Confirm Password Must be Same");
  }
  }
}
