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
  searchFile: any;
  profile: any;
  public fileData: FilesUrl[] = [];
  result = [];
  file: string;
  linkedin: any;
  str: number;
  obj: { urls: string[]; };
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
    if (files && files.length > 0) {
      let file: File = files.item(0);
      // this.searchFile = file;
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        this.profile = reader.result;
        this.profile= this.profile.replace(/"/g, "");
        console.log("profile",this.profile);
        let csvToRowArray = this.profile.split("\n");
        console.log(csvToRowArray);
        for(var i=0;i<csvToRowArray.length;i++){
          if (csvToRowArray[i].startsWith("https://www.")) {
            csvToRowArray[i] = csvToRowArray[i].substring(12);
            this.str = csvToRowArray[i].length-1;
            if(csvToRowArray[i][this.str] === '/')
            csvToRowArray[i] = csvToRowArray[i].substring(0,this.str);
            console.log("substring", csvToRowArray[i]);
          }
          else if (csvToRowArray[i].startsWith("www.")) {
            csvToRowArray[i] = csvToRowArray[i].substring(4);
             this.str = csvToRowArray[i].length-1;
            if(csvToRowArray[i][this.str] === '/')
            csvToRowArray[i] = csvToRowArray[i].substring(0,this.str);
            console.log("substring", csvToRowArray[i]);
          }
        }
        csvToRowArray[0]="";
      this.obj = {
          urls: csvToRowArray
        }
        console.log("obj",this.obj);
          /* */
        /* for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");
          //  console.log("row",row);
          this.fileData.push(new FilesUrl(row[0]));
        }
        console.log(this.fileData); */
       /*  var headers = csvToRowArray[0].split(",");

        for (var i = 1; i < csvToRowArray.length; i++) {

          var obj = {};
          var currentline = csvToRowArray[i].split(",");

          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }

          this.result.push(obj);

        }

        //return result; //JavaScript object
        this.file = JSON.stringify(this.result);
        console.log('file json', this.result, this.file); */
      }
    }
    //this.searchFile = files;
  }
  fileSubmit() {
    console.log("submit clicked");
    //console.log("file submit", this.searchFile)
    this.service.post(`job/getLinkedinData`,this.obj).subscribe((res:any)=>{
      console.log("linked in post res",res);
      if (res.status === "7400") {
        this.message = 'success';
      }
      else {
        this.message = "warning";
      }
    })  
  }
  linkedinSubmit() {
    this.message = '';
    console.log("linked in", this.ngForm.value.linkedin);

    this.linkedin = this.ngForm.value.linkedin.toString();
    if (this.linkedin.startsWith("https://www.")) {
      this.linkedin = this.linkedin.substring(12);
      this.str = this.linkedin.length-1;
      if(this.linkedin[this.str] === '/')
       this.linkedin = this.linkedin.substring(0,this.str);
      console.log("substring", this.linkedin);
    }
    else if (this.linkedin.startsWith("www.")) {
      this.linkedin = this.linkedin.substring(4);
       this.str = this.linkedin.length-1;
      if(this.linkedin[this.str] === '/')
       this.linkedin = this.linkedin.substring(0,this.str);
      console.log("substring", this.linkedin);
    }
    var obj = {
      urls: [this.linkedin]
    }
      this.service.post(`job/getLinkedinData`,obj).subscribe((res:any)=>{
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
export class FilesUrl {
  fileUrl: String;
  constructor(fileUrl: String) {
    this.fileUrl = fileUrl;
  }
}