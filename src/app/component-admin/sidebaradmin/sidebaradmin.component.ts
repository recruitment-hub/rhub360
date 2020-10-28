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
  { path: '/admin/joblist', title: 'Jobs', icon: 'fas fa-tachometer-alt', class: '', isAdmin: 1, isManager: 1, isStaff: 1 },
  { path: '/admin/userlist', title: 'Users', icon: 'fas fa-th', class: '', isAdmin: 1, isManager: 0, isStaff: 0 },
  { path: '/admin/jobassigned', title: 'Job Assigned', icon: 'fas fa-building', class: '', isAdmin: 0, isManager: 1, isStaff: 1 }
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
user=false;
  roleId: string;
  role: string;
  // @Input() planId: string;
  constructor(public router: Router, public service: CommonService) { }
  menuItems: any[];
  routePaths: any[];
  ngOnInit(): void {
    //console.log("planId", this.planId);
    this.roleId = sessionStorage.getItem('roleId');
    this.role = sessionStorage.getItem('role');
   // this.menuItems = ROUTES.filter(menuItem => menuItem.isAdmin == 1);
   if(this.roleId === '5f92b0f80d8849179c1f34ad'){
    this.menuItems = ROUTES.filter(menuItem => menuItem.isAdmin == 1);
  }
  else if(this.roleId==='5f92b17cfb23ea3930bffceb'){
    this.menuItems = ROUTES.filter(menuItem => menuItem.isManager == 1);
  }
  else if(this.roleId === '5f92b185fb23ea3930bffcec'){
    this.menuItems = ROUTES.filter(menuItem => menuItem.isStaff == 1);
  }
  /*   this.service.get(`recruiter/viewRecruiterDetails/${this.userId}`).subscribe((res: any) => {
      console.log("profile res", res);
      this.profileData = res.value;
      this.user=true;
      this.fileName = this.profileData.profileImage;
    }) */

    /*  if (this.planId === '') {
       this.router.navigate(['plans']);
     } */
    // debugger;
    /*  if(parseInt(sessionStorage.getItem("RoleId")) == 1){
        this.menuItems = ROUTES.filter(menuItem => menuItem.isAdmin == 1);
      }
      else if(parseInt(sessionStorage.getItem("RoleId")) == 2){
        this.menuItems = ROUTES.filter(menuItem => menuItem.isManager == 1);
      }
      else if(parseInt(sessionStorage.getItem("RoleId")) == 3){
        this.menuItems = ROUTES.filter(menuItem => menuItem.isStaff == 1);
      }*/

  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };


}
