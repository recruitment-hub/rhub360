import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  planData=[];
  userId: any;
  message:string;
  constructor(public service:CommonService) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.service.get(`recruiter/viewPaymentPlans`).subscribe((res:any)=>{
      this.planData = res.value;
      console.log("res plan",res);
    })
  }
planOne(id){
  this.message='';
console.log("Silver Plan");
this.service.put(`recruiter/updatePaymentPlan/${this.userId}/${id}`,id).subscribe((res:any)=>{
  console.log("plan post res",res);
if(res.status==='7400'){
  this.message='success';
}
else{
  this.message='warning';
}
})
}
planTwo(id){
  this.message='';
  console.log("Gold Plan");
  this.service.put(`recruiter/updatePaymentPlan/${this.userId}/${id}`,id).subscribe((res:any)=>{
    console.log("plan post res",res);
    if(res.status==='7400'){
      this.message='success';
    }
    else{
      this.message='warning';
    }
  })
}
planThree(id){
  this.message='';
  console.log("Diamond Plan");
  this.service.put(`recruiter/updatePaymentPlan/${this.userId}/${id}`,id).subscribe((res:any)=>{
    console.log("plan post res",res);
    if(res.status==='7400'){
      this.message='success';
    }
    else{
      this.message='warning';
    }
  })
}
}
