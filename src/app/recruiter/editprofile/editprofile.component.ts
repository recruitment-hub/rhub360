import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  userId: any;
  message: string;
  change = false;

  public ngForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10),
    this.patternValidator(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, { hasNumber: true })])),
    profileTitle: new FormControl('', [Validators.required]),
    profileImage: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    stateName: new FormControl('', [Validators.required]),
    cityName: new FormControl('', [Validators.required]),
    countryName: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10),
    this.patternValidator(/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] *\d[A-Z]\d)$/, { hasNumber: true })])),
    planName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    linkedin: new FormControl('', Validators.compose([Validators.required, this.patternValidator(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, { hasUrl: true })])),
    facebook: new FormControl('', Validators.compose([Validators.required, this.patternValidator(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, { hasUrl: true })])),
    twitter: new FormControl('', Validators.compose([Validators.required, this.patternValidator(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, { hasUrl: true })])),
  })
  public proForm = new FormGroup({
    old: new FormControl('', [Validators.required]),
    newpass: new FormControl('', [Validators.required]),
    cpass: new FormControl('', [Validators.required])
  })
  profileData: any;
  submitted: boolean = false;
  files: any;
  fileName: any;
  imgshow = false;
  planData: any;
  constructor(public service: CommonService, private formBuilder: FormBuilder, public route: ActivatedRoute, public router: Router, public toastr: ToastrService) {
    //this.userId = this.route.snapshot.params['id'];
    this.userId = sessionStorage.getItem('userId');
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
    return this.ngForm.controls;
  }
  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('newpass').value;
    const cPassword: string = control.get('cpass').value;

    if (password !== cPassword) {
      control.get('cpass').setErrors({ NoPassswordMatch: true });
    }
  }
  ngOnInit(): void {
    this.proForm = this.formBuilder.group({
      //email:['',Validators.compose([Validators.required,Validators.email])],
      old: ['', Validators.required],
      newpass: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        this.patternValidator(/\d/, { hasNumber: true }),
        this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        this.patternValidator(/[a-z]/, { hasSmallCase: true }),
        this.patternValidator(/[^A-Za-z0-9]/, { hasSpecialCharacters: true })
      ])],
      cpass: ['', Validators.required],
      isAgree: ['', Validators.required]
    },
      {
        validator: this.passwordMatchValidator
      });


    this.service.get(`recruiter/viewRecruiterDetails/${this.userId}`).subscribe((res: any) => {
      console.log("profile res", res);
      this.imgshow = true
      this.profileData = res.value;
      this.service.get(`recruiter/viewPaymentPlans`).subscribe((resp: any) => {
        this.planData = resp.value;
        console.log("res plan", resp);
      })
      this.fileName = this.profileData.profileImage;
      this.ngForm.value.firstName = this.profileData.firstName;
      this.ngForm.value.lastName = this.profileData.lastName;
      this.ngForm.value.phoneNumber = this.formatPhoneNumber(this.profileData.phoneNumber);
      // this.ngForm.value.phoneNumber = this.profileData.phoneNumber;
      this.ngForm.value.profileTitle = this.profileData.profileTitle;
      this.ngForm.value.profileImage = this.profileData.profileImage;
      //this.ngForm.value.dob = this.profileData.dob;
       var date = new Date(this.profileData.dob).getDate();
      var month = new Date(this.profileData.dob).getMonth() + 1;
      var toyear = new Date(this.profileData.dob).getFullYear();
      var original_date = month + '/' + date + '/' + toyear;
      this.ngForm.value.dob = original_date; 
      console.log("dob", this.ngForm.value.dob);
      this.ngForm.value.companyName = this.profileData.companyName;
      this.ngForm.value.stateName = this.profileData.stateName;
      this.ngForm.value.cityName = this.profileData.cityName;
      this.ngForm.value.zipcode = this.profileData.zipcode;
      this.ngForm.value.planName = this.profileData.planName;
      this.ngForm.value.description = this.profileData.description;
      this.ngForm.value.facebook = this.profileData.facebook;
      this.ngForm.value.twitter = this.profileData.twitter;
      this.ngForm.value.linkedin = this.profileData.linkedin;
      this.ngForm.value.countryName = this.profileData.countryName;
    })
  }

  formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
  }
  phonenumber(inputtxt) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if ((inputtxt.value.match(phoneno))) {
      return true;
    }
    else {
      alert("message");
      return false;
    }
  }

  onChangeImage(event) {
    //alert("hbfaj")
    this.files = event.target.files[0];
    this.service.fileUpload(`common/uploadFile`, this.files).subscribe((res: any) => {
      console.log("upload profile res", res);
      if (res.status = "7400") {
        this.toastr.success("Photo Uploaded Successfully", "Save");
        this.ngForm.value.profileImage = res.fileName;
        this.fileName = res.fileName;
        this.service.put(`recruiter/changeAvatar/${this.userId}/${res.fileName}`, this.userId).subscribe((resp: any) => {
          console.log("avatar change res", resp);
        })
      }
      else {
        this.toastr.error("Upload Failed", "Error");
      }
    })
  }
  changePass() {
    this.change = true;
    this.message = '';
  }
  changePassword() {
    this.submitted = true;
    console.log("clicked");
    if (this.proForm.value.newpass === this.proForm.value.cpass) {
      console.log("password", this.proForm.value);
      var obj = {
        "recruiterId": this.userId,
        "oldPassword": this.proForm.value.old,
        "newPassword": this.proForm.value.newpass
      }
      this.service.post(`recruiter/changePassword`, obj).subscribe((res: any) => {
        console.log("change password res", res);
        if (res.status === '7400') {
          this.message = 'success';
          this.toastr.success("Password Changed Successfully", "Save");
        }
        else {
          this.message = 'warning';
          this.toastr.error("Old Password Incorrect", "Error");
        }
      })
    }
    else {
      this.toastr.error("Password and Confirm Password Should be Same", "Error");
    }
  }
  changePlan() {
    this.router.navigate(['dashboard/plans']);
  }

  profileSubmit() {
    this.planData.forEach(plan => {
      if (this.ngForm.value.planName === plan.planName) {
        this.ngForm.value.planName = plan._id;
      }
    })

    const obj = {
      firstName: this.ngForm.value.firstName,
      lastName: this.ngForm.value.lastName,
      phoneNumber: this.ngForm.value.phoneNumber,
      profileTitle: this.ngForm.value.profileTitle,
      profileImage: this.fileName,
      dob: this.ngForm.value.dob,
      companyName: this.ngForm.value.companyName,
      stateName: this.ngForm.value.stateName,
      cityName: this.ngForm.value.cityName,
      countryName: this.ngForm.value.countryName,
      zipcode: this.ngForm.value.zipcode,
      planId: this.ngForm.value.planName,
      description: this.ngForm.value.description,
      facebook: this.ngForm.value.facebook,
      twitter: this.ngForm.value.twitter,
      linkedin: this.ngForm.value.linkedin,
      recruiterId: this.userId
    }
    console.log("obj", obj);
    this.service.put(`recruiter/updateRecruiter`, obj).subscribe((res: any) => {
      console.log("update profile res", res);
      if (res.status === '7400') {
        this.message = 'success';
        this.toastr.success("Data Submitted Successfully", "Save");
      }
      else {
        this.message = 'warning';
        this.toastr.error("Not Submitted", "Error");
      }
    })
  }
}
