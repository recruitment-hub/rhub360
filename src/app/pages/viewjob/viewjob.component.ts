import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-viewjob',
  templateUrl: './viewjob.component.html',
  styleUrls: ['./viewjob.component.css']
})
export class ViewjobComponent implements OnInit {
  jobId: any;
  jobData: any;

  constructor(public route: ActivatedRoute, public service: CommonService,public router:Router) {
    //this.jobId = this.route.snapshot.queryParamMap.get('id');
    this.jobId = this.route.snapshot.params['id'];
    console.log("job id", this.jobId);
  }

  ngOnInit(): void {
    this.service.get(`job/viewJobDetails/${this.jobId}`).subscribe((res: any) => {
      console.log("view job res", res);
      this.jobData = res.value;
    })
  }
  
Back(){
this.router.navigate(['joblist']);
}
}
