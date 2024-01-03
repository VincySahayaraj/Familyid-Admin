import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {

  affiliateObj = {
    Affiliateid: '',
    Firstname: '',
    Lastname: '',
    Organizationorchurchname: '',
    Email: '',
    Contactno: ''
  };

  dummyvalue:any;

  private affiliateid: any;
  private createdDate: any;

  setAffiliate(affiliateid:any,createdDate: any,dummyvalue:any): void {
    this.createdDate = createdDate;
    this.affiliateid=affiliateid;

    this.dummyvalue=dummyvalue;
  }

  getAffiliate(): any {
    return this.affiliateid;
  }

  getAffiliateDate():any{
    return this.createdDate;
  }

  getDummyValue():any{

    return this.dummyvalue

  }

  // this.dummyValue

  constructor(private _http: HttpClient) { }

  createAffiliated(affiliate: any) {
    return this._http.post(environment.apiUrl + "api/Affiliate/add", affiliate)
  }

  globalSearchonAffiliate(searchQuery: any) {
    return this._http.get(environment.apiUrl + "api/Affiliate/globalsearch?SearchWords="+searchQuery)
  }

  affiliatedateFilter(date: any) {
    return this._http.post(environment.apiUrl + "api/Affiliate/add", date)
  }

  statusFilter(startDate: any,endDate:any) {
    return this._http.get(environment.apiUrl + "api/Affiliate/listbyfilters?FromDate="+startDate+"&ToDate="+endDate)
  }

  getAffiliates(date: any) {
    return this._http.post(environment.apiUrl + "api/Affiliate/affiliatedatesearch", date)
  }

  deleteAffiliate(id: any) {
    return this._http.delete(environment.apiUrl + "api/Affiliate/delete/" + id)
  }

  editAffiliate(id: any) {
    return this._http.put(environment.apiUrl + "api/Affiliate/update", id)
  }

  getFamilyDetails(id:any){
    return this._http.get(environment.apiUrl + "api/Affiliate/getfamiliesfromaffiliate?Affiliateid="+id)
  }
}
