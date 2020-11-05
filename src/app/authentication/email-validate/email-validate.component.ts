import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, ValidationErrors, ValidatorFn, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-email-validate',
  templateUrl: './email-validate.component.html',
  styleUrls: ['./email-validate.component.css']
})
export class EmailValidateComponent implements OnInit {
  submitted: boolean = false;
  param: any;
  clicked = false;
  email: any;
  public userForm = new FormGroup({
    //email:new FormControl(''),
    pwd: new FormControl('', [Validators.required]),
    cpwd: new FormControl('', [Validators.required])
  })


  userId: any;
  profileData: any;
  message: string;
  constructor(private route: ActivatedRoute,public toastr:ToastrService,
    public router: Router,
    public httpService: CommonService, private formBuilder: FormBuilder,) {
    this.email = sessionStorage.getItem('email')
    this.email = this.route.snapshot.queryParamMap.get('email');
    // this.userForm.value.email = this.route.snapshot.queryParamMap.get('email');
    console.log("param", this.email);
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('pwd').value;
    const cPassword: string = control.get('cpwd').value;

    if (password !== cPassword) {
      control.get('cpwd').setErrors({ NoPassswordMatch: true });
    }
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      //email:['',Validators.compose([Validators.required,Validators.email])],
      pwd: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        this.patternValidator(/\d/, { hasNumber: true }),
        this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        this.patternValidator(/[a-z]/, { hasSmallCase: true }),
        this.patternValidator(/[^A-Za-z0-9]/, { hasSpecialCharacters: true })
      ])],
      cpwd: ['', Validators.required],
      isAgree: ['', Validators.required]
    },
      {
        validator: this.passwordMatchValidator
      });

  }
  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {

        return null;
      }
      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  get u() {
    return this.userForm.controls;
  }

  loginEnter() {
    // this.router.navigate(['userlogin']);
  }
  registerEnter() {
    //this.router.navigate(['register']);
  }
  passwordSubmit() {
    this.submitted = true;
    console.log("clicked");
    if (!this.userForm.valid)
      return;
    const obj = {
      email: this.email,
      password: this.userForm.value.pwd,
    };

    this.httpService.post(`recruiter/newRecruiter`, obj).subscribe((res: any) => {
      console.log("res new recruit", res);
      if (res.status === "7400") {
        this.userId = res.userId;
        this.message = 'success';
        this.toastr.success("Successfully Submitted", "Save");
        sessionStorage.setItem('userId', this.userId);
        this.httpService.get(`recruiter/viewRecruiterDetails/${this.userId}`).subscribe((resp: any) => {
          console.log("profile res", resp);
          this.profileData = resp.value;
          if (this.profileData.planId === '' || this.profileData.planId === undefined || this.profileData.planId === null) {
            this.router.navigate(['dashboard']);
          }
          else {
            this.router.navigate(['dashboard/joblist']);
          }
        })
      }
      else {
        //this._success.next("Email already Registered.")
        this.message = 'warning';
        this.toastr.error("Email already Registered. You can Login directly", "Error")
      }
    })
  }

}
