import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  public visitorid: any = '';
  public familyvisitorid:any='';
  public visitorname:any='';
  public hohmasterid:any='';
  public inviteevisitorid:any='';
  public familyid:any='';
  public familymemberid:any='';
  public score:any;
  
  constructor(private _http: HttpClient) { }

  ngOnInit() {

  }

  getResult(id: any) {

    return this._http.get(environment.apiUrl + "api/Visitorlog/getscorecard/" + id,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      });
  }

  getInviteeDetails(id:any){

    return this._http.get(environment.apiUrl + "api/Familymember/listoffamilymembersinfamily?id=" + id,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      });
  }

  getAttemptResult(id:any){

    return this._http.get(environment.apiUrl + "api/Familymember/GetMemberAttemptScore?id=" +id,
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
    
  }
  getFamilyResult(id:any){

    return this._http.get(environment.apiUrl + "api/Visitorlog/getFamilyScore/" +id,
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  createHOH(familyid:any,familymemberid:any){

    return this._http.get(environment.apiUrl + "api/Familymember/changehoh?memberid="+familymemberid+"&familyid="+familyid,
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

}