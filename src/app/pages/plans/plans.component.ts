import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  planData=[];

  constructor(public service:CommonService) { }

  ngOnInit(): void {
    this.service.get(`recruiter/viewPaymentPlans`).subscribe((res:any)=>{
      this.planData = res.value
      console.log("res plan",res);
    })
  }

}
