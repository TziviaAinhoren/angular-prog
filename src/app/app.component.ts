import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ElementRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { employee } from './employee';
import { FileToUpload } from './FileToUpload';
import { d, GetDataService } from './get-data.service';
import { streets } from './streets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("LoadDocument") r: ElementRef;
  title = 'Employees';
  searchByName: string = null;
  employeesList: employee[];
  streetslist: streets[];
  employeeListHelp: employee[] = [];
  employeeListFull: employee[] = [];
  employeeListPart: employee[] = [];
  ById: string;
  employeeById: employee;
  help: string;
  ByData1: Date;
  ByData2: Date;
  lazi:string;

  selectedCity2: string;
  citylists: string[] = [];
  cities1: SelectItem[] = [];
  selectedCity1: employee;
  CitySelected: boolean = false;
  aaa: streets[] = [];
  selectedStreet1: streets;
  currentCount:number=1;
  totaldigit:number=1;
  constructor(public getData: GetDataService) {
  }
  ngOnInit() {


     this.getData.getEployeeList().subscribe(
       data => {
         this.employeesList = data;
         this.employeeListFull = data;

     
      },
      error => console.log("error: " + error),
    )


    this.getData.getStreets().subscribe(
      data => { this.streetslist = data; },
      error => console.log("error: " + error),
    )

  }
  refresh() {
    this.employeesList = this.employeeListFull;
  }
  selectStreet() {
    this.employeeListHelp = [];
    this.employeesList = this.employeeListFull;
    this.employeesList.forEach(element => {
      if (element.city == this.selectedCity1.city && element.street == this.selectedStreet1.street) {
        this.employeeListHelp.push(element);
      }
    });
    this.employeesList = this.employeeListHelp;
  }
  choseFile: boolean = false;
  global_image: any;
  globalReader: any;
  url: any;
  urlList: string[] = new Array();
  file: FileToUpload = {};
  upload(input, r: ElementRef) {
    debugger
    this.choseFile = true

    this.global_image = input;

    let mybase64File = (input.target as any).result
    let fileNeme = input.target.files[0].name;
    sessionStorage.setItem("fileNeme", fileNeme)
    if (input.target.files && input.target.files[0]) {

      var reader = new FileReader();

      let mybase64File = r.nativeElement.result;
      reader.onload = (event: ProgressEvent) => {


        mybase64File = (event.target as any).result
        this.url = (event.target as any).result
        this.urlList.push(this.url)

        sessionStorage.setItem("mybase64File", mybase64File)
      }
      reader.readAsDataURL(input.target.files[0]);
      this.saveFile();
    }
  }
  saveFile(){
    debugger;
  let y:string=sessionStorage.getItem("mybase64File")
  
  let j=  sessionStorage.getItem("fileNeme") 
  let d1:d=new d();0
  d1.base64=y;
  this.file.FileAsBase64=y;
  this.file.FileName = j;
  this.getData.saveFile1(this.file).subscribe();
}
  selectCity() {
    this.CitySelected = false;

    this.aaa = [];
    this.getData.getStreets().subscribe(
      data => {
        this.streetslist = data;
        this.streetslist.forEach(element => {
          if (element.cityName == this.selectedCity1.city) {
            this.aaa.push({ cityName: element.cityName, street: element.street })
          }
        });
        this.CitySelected = true;

      },
      error => console.log("error: " + error),
    )
  }
  SearchByName() {
    this.employeesList = this.employeeListFull;
    this.employeeListHelp = [];
    this.employeesList.forEach(element => {
      if (element.firstName.includes(this.searchByName)) {
        this.employeeListHelp.push(element);
      }
    });
    this.employeesList = this.employeeListHelp;
  }




  SearchById() {
    this.getData.getEmployeeById(this.ById).subscribe(

      data => {
        this.employeeById = data,
        this.help = JSON.stringify(this.employeeById);
      })
    error => console.log("error")


  }
  SearchByDate() {
    this.employeesList = this.employeeListFull;
    this.employeeListHelp = [];
    this.employeesList.forEach(element => {
      if ((Date.parse(element.startDate) > Date.parse(this.ByData1.toString())) && (Date.parse(element.startDate) < Date.parse(this.ByData2.toString()))) {
        this.employeeListHelp.push(element);
      }

    });

    this.employeesList = this.employeeListHelp;

  }
Prev()
{
  if(this.currentCount>=this.totaldigit*2)
  {
  this.getData.GetPartofEmployee(this.currentCount,0).subscribe
  
  data => {
    this.employeeListPart = data,
   this.currentCount=this.currentCount-this.totaldigit;
  }
error => console.log("error")
  }
}
Next()
{
 
  this.getData.GetPartofEmployee(this.currentCount,1).subscribe
  
  data => {
    this.employeeListPart = data,
   this.currentCount=this.currentCount+this.totaldigit;
  }
error => console.log("error")
  }
}


