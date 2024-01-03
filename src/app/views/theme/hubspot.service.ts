import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HubspotService {

  constructor(private _http: HttpClient) { }

  getHubspotData() {
    return this._http.get(environment.apiUrl + "api/Hubspot/list", {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  resendData(data: any) {
    return this._http.put(environment.apiUrl + "api/Hubspot/resendHubspotData", data, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  searchBasedonStatus(startDate: any,endDate:any,status:any) {

    return this._http.get(environment.apiUrl + "api/Hubspot/listbyfilters?FromDate="+startDate+"&ToDate="+endDate+"&Status="+status, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }


  globalSearch(searchkeyword: any) {
    return this._http.get(environment.apiUrl + "api/Hubspot/globalsearch?SearchWords="+searchkeyword, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  dateFilter(searchkeyword: any) {
    return this._http.post(environment.apiUrl + "api/Hubspot/hubspotsearch", searchkeyword, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }
}
