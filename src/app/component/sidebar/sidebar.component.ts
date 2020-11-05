import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  isAdmin: number;
  isManager: number;
  isStaff: number;
}
const userId = sessionStorage.getItem('userId');
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard/plans', title: 'Dashboard', icon: 'design_app', class: '', isAdmin: 1, isManager: 0, isStaff: 0 },
  { path: '/dashboard/joblist', title: 'Jobs', icon: 'business_briefcase-24', class: '', isAdmin: 1, isManager: 1, isStaff: 0 },
  { path: '/dashboard/companylist', title: 'Company', icon: 'business_bank', class: '', isAdmin: 1, isManager: 1, isStaff: 0 }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userId: string;
  profileData: any;
  fileName: any;
  user = false;
  img='../../../assets/custom-img/sample.png';
  // @Input() planId: string;
  constructor(public router: Router, public service: CommonService) { }
  menuItems: any[];
  routePaths: any[];
  ngOnInit(): void {
    //console.log("planId", this.planId);
    this.userId = sessionStorage.getItem('userId');
    this.menuItems = ROUTES.filter(menuItem => menuItem.isAdmin == 1);
    this.service.get(`recruiter/viewRecruiterDetails/${this.userId}`).subscribe((res: any) => {
      console.log("profile res", res);
      this.profileData = res.value;
      this.user = true;
      this.fileName = this.profileData.profileImage;
    })



  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };


}
