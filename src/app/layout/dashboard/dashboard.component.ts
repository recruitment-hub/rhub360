import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  planId: any;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userData'));
    if(this.user ==''){
      this.planId = '';
    }
    console.log("user",this.user,this.user.planId);
    this.planId = this.user.planId;
  }

}
