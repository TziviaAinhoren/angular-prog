import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { fileURLToPath } from 'url';
import { employee } from './employee';
import { FileToUpload } from './FileToUpload';
import { streets } from './streets';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  @ViewChild('LoadDocument') r: ElementRef;
  constructor(private httpClient: HttpClient) { }
  getEployeeList(): Observable<employee[]> {
    return this.httpClient.get<employee[]>('https://localhost:44352/api/Employee/GetEmployee');
  }
  getStreets(): Observable<streets[]> {
    return this.httpClient.get<streets[]>('https://localhost:44352/api/Employee/GetStreets');
  }

  getEmployeeById(id: string): Observable<employee> {
    return this.httpClient.get<employee>('https://localhost:44352/api/Employee/GetEmployeeId?id='+id);
  }
  GetPartofEmployee(currentCount: number,nextorprev:number): Observable<employee> {
    return this.httpClient.get<employee>('https://localhost:44352/api/Employee/GetPartofEmployee?currentCount='+currentCount+'&PrevOrNext='+nextorprev);
  }
  
  global_image:any;
  globalReader:any;
  url:any;
urlList:string[]=new Array();
file:FileToUpload={};
saveFile1(f:FileToUpload):Observable<any>
{
return   this.httpClient.post<any>("https://localhost:44352/api/Employee/AddImage",f);
}

  } 
  export class d{
    base64:string;
  }

