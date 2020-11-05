import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId: string;
  profileData: any;
  user: boolean=false;
  fileName: any;

  constructor(public service:CommonService) { 
    this.userId = sessionStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.service.get(`recruiter/viewRecruiterDetails/${this.userId}`).subscribe((res: any) => {
      console.log("profile res", res);
      this.profileData = res.value;
      this.user=true;
      this.fileName = this.profileData.profileImage;
    })
  }

}
