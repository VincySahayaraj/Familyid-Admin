import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CountService {

  private passDate: any;

  setData(passDate: any): void {
    this.passDate = passDate;
  }

  getData(): any {
    return this.passDate;
  }

  removeData():any{
    this.passDate = "";
  }

  constructor(private _http: HttpClient) { }

  getVisitorsCount(countdetails:any){
    return this._http.post(environment.apiUrl + "api/Visitorlog/getvisitorlogcount",countdetails);
  }

  getInviteesCount(countdetails:any){
    return this._http.post(environment.apiUrl + "api/Visitorlog/getvisitorinfo",countdetails);
  }

  dashboardCounts(){
    return this._http.get(environment.apiUrl + "api/Visitorlog/getdashboardinfo",{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  } 
}
