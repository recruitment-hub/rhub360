import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-jobsearch',
  templateUrl: './jobsearch.component.html',
  styleUrls: ['./jobsearch.component.css']
})
export class JobsearchComponent implements OnInit {
  message: string;
  searchFile: FileList;
  //jobId: string;
  //jobData: any;
  constructor(public service: CommonService, public router: Router, public route: ActivatedRoute) {
    // this.jobId = this.route.snapshot.params['id'];
  }
  public ngForm = new FormGroup({
    linkedin: new FormControl('', [Validators.required])
  })
  public fileForm = new FormGroup({
    file: new FormControl('', [Validators.required])
  })
  ngOnInit(): void {

  }
  onChangeFile(files: FileList) {
    console.log("file", files);
    this.searchFile = files;
  }
  fileSubmit() {
    console.log("file submit", this.searchFile)
  }
  linkedinSubmit() {
    this.message='';
    console.log("linked in", this.ngForm.value.linkedin);
    this.service.get(`job/getLinkedinData/${this.ngForm.value.linkedin}`).subscribe((res:any)=>{
      console.log("linked in post res",res);
      if (res.status === "7400") {
        this.message = 'success';
      }
      else {
        this.message = "warning";
      }
    })
  }
}
