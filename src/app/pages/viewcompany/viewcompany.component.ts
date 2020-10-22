import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-viewcompany',
  templateUrl: './viewcompany.component.html',
  styleUrls: ['./viewcompany.component.css']
})
export class ViewcompanyComponent implements OnInit {
  companyId: any;
  companyData:any;

  constructor(public service:CommonService,public route:ActivatedRoute) { 
    this.companyId=this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.service.get(`company/viewCompanyDetails/${this.companyId}`).subscribe((res: any) => {
      console.log("view company res", res);
      this.companyData = res.value;
    })
  }

}
