import { Component, OnInit } from '@angular/core';
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
export const ROUTES: RouteInfo[] = [
  { path: '/admin/joblist', title: 'Jobs', icon: 'fas fa-briefcase', class: '', isAdmin: 1, isManager: 1, isStaff: 0 },
  { path: '/admin/userlist', title: 'Users', icon: 'fas fa-users', class: '', isAdmin: 1, isManager: 0, isStaff: 0 },
  { path: '/admin/assignedjoblist', title: 'Job Assigned', icon: 'fas fa-tasks', class: '', isAdmin: 0, isManager: 1, isStaff: 1 },
  { path: '/admin/jobsearch', title: 'Jobs Search', icon: 'fas fa-search', class: '', isAdmin: 0, isManager: 1, isStaff: 1}
];

@Component({
  selector: 'app-sidebaradmin',
  templateUrl: './sidebaradmin.component.html',
  styleUrls: ['./sidebaradmin.component.css']
})
export class SidebaradminComponent implements OnInit {

  userId: string;
  profileData: any;
  fileName: any;
  user = false;
  roleId: string;
  role: string;
  adminId: string;
  // @Input() planId: string;
  constructor(public router: Router, public service: CommonService) { }
  menuItems: any[];
  routePaths: any[];
  ngOnInit(): void {
    //console.log("planId", this.planId);
    this.roleId = sessionStorage.getItem('roleId');
    this.role = sessionStorage.getItem('role');
    this.adminId = sessionStorage.getItem('adminId');
    // this.menuItems = ROUTES.filter(menuItem => menuItem.isAdmin == 1);
    if (this.roleId === '5f92b0f80d8849179c1f34ad') {
      this.menuItems = ROUTES.filter(menuItem => menuItem.isAdmin == 1);
    }
    else if (this.roleId === '5f92b17cfb23ea3930bffceb') {
      this.menuItems = ROUTES.filter(menuItem => menuItem.isManager == 1);
    }
    else if (this.roleId === '5f92b185fb23ea3930bffcec') {
      this.menuItems = ROUTES.filter(menuItem => menuItem.isStaff == 1);
    }
    this.service.get(`admin/viewAdminDetails/${this.adminId}`).subscribe((res:any)=>{
      console.log("admin get res",res);
      this.profileData = res.response;
      if(this.profileData?.profileImage!==null)
      this.user=true;
      this.fileName = this.profileData?.profileImage;
    })
    
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };


}
