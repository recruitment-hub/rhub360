import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  { path: '/plans', title: 'Plans', icon: 'users_single-02', class: '', isAdmin: 1, isManager: 0, isStaff: 0 },
  { path: '/joblist', title: 'Jobs', icon: 'users_single-02', class: '', isAdmin: 1, isManager: 1, isStaff: 0 }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

 // @Input() planId: string;
  constructor(public router: Router) { }
  menuItems: any[];
  routePaths: any[];
  ngOnInit(): void {
    //console.log("planId", this.planId);

    this.menuItems = ROUTES.filter(menuItem => menuItem.isAdmin == 1);
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
