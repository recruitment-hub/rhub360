import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

export interface User {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
}

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  userId: string;
  companyData: any;
  message:string;
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  users: User[];
  userData: any;
  adminId: string;
  constructor(public service: CommonService, public router: Router) {
    this.refreshCountries();

  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.adminId = sessionStorage.getItem('adminId');
   //this.userData = JSON.parse(sessionStorage.getItem('userData'));
   this.service.get(`admin/getAdminUsers`).subscribe((res:any)=>{
     console.log("user list res",res);
     this.userData = res.response;
     this.userData.forEach(user=>{
     if(user.roleId === '5f92b185fb23ea3930bffcec')
     user.roleId = 'Staff';
     else if(user.roleId === '5f92b17cfb23ea3930bffceb')
     user.roleId = 'Manager'
     })
   })
  }
  refreshCountries() {

    console.log("collection size page pagesize", this.collectionSize, this.page, this.pageSize)
     if(this.userData?.length>0)
    this.users = this.userData
      .map((user, i) => ({ id: i + 1, ...user }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); 
  }
  addUser() {
    this.router.navigate(['admin/addedituser']);
  }
  /* viewCompany(id) {
    this.router.navigate(['dashboard/viewcompany', id]);
  } */
  editUser(id) {
    this.router.navigate(['admin/addedituser', id]);
  }
  deleteUser(id) {
    console.log("id",id);
    this.service.delete(`admin/deleteAdmin/${id}`).subscribe((res:any)=>{
      console.log('delete user res',res);
      if (res.status === "7400") {
        this.message = 'success';
      }
      else {
        this.message = "warning";
      }
      this.service.get(`admin/getAdminUsers`).subscribe((resp:any)=>{
        console.log("user list res",resp);
        this.userData = resp.response;

      })
    })
  }
}

