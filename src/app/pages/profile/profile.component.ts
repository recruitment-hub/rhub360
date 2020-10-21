import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: any;
  profileData: any;

  constructor(public service:CommonService,public router:Router) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.service.get(`recruiter/viewRecruiterDetails/${this.userId}`).subscribe((res:any)=>{
      console.log("profile res",res);
      this.profileData = res.value;
    })
  }
editProfile(id){
  this.router.navigate(['editprofile',id]);
}
}
