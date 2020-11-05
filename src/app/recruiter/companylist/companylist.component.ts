import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
export interface Company {
  companyName: string;
  companyLocations: string;
  companyLinkedin: string;
  companyIndustry: string;
}
@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css']
})
export class CompanylistComponent implements OnInit {
  userId: string;
  companyData: any;
  message: string;
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  companys: Company[];
  pageData=[];
  constructor(public service: CommonService, public router: Router,public toastr:ToastrService) {
    this.refreshCountries();

  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.service.get(`company/viewMyCompanies/${this.userId}`).subscribe((res: any) => {
      console.log("company list res", res);
      this.companyData = res.value;
      this.collectionSize = this.companyData.length;
      for (var i = 1; i <= this.collectionSize / 4; i++) {
        this.pageData.push(i);
      }
    })
  }
  refreshCountries() {

    console.log("collection size page pagesize", this.collectionSize, this.page, this.pageSize)
    if (this.companyData?.length > 0)
      this.companys = this.companyData
        .map((company, i) => ({ id: i + 1, ...company }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  addCompany() {
    this.router.navigate(['dashboard/addeditcompany']);
  }
  viewCompany(id) {
    this.router.navigate(['dashboard/viewcompany', id]);
  }
  editCompany(id) {
    this.router.navigate(['dashboard/addeditcompany', id]);
  }
  deleteCompany(id) {
    this.service.delete(`company/deleteCompany/${id}`).subscribe((res: any) => {
      console.log("delete company res", res);
      if (res.status === '7400') {
        this.message = 'success';
        this.toastr.success("Company Deleted Successfully","Save");
        this.service.get(`company/viewMyCompanies/${this.userId}`).subscribe((resp: any) => {
          console.log("company list res", resp);
          this.companyData = resp.value;
  
        })
      }
      else {
        this.message = 'warning';
        this.toastr.error("Not Deleted","Error");
      }
     
    })
  }
}
