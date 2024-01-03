import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  usereditObj = {
    firstname: '',
    lastname: '',
    email: '',
    phonenumber:'',
    familyrole: '',
    hohmasterid:'',
    other:''
    
  }

  constructor(private _http: HttpClient) { }

  // getAllUsers() {
  //   return this._http.get(environment.apiUrl + "api/Visitorlog/list");
  // }

  getHOH(){
    return this._http.get(environment.apiUrl + "api/Visitorlog/getdashboardinfo",{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  getVisitorList(){
    return this._http.get(environment.apiUrl + "api/Familymember/list",{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
 
  deleteUser(id: any) {
    return this._http.delete(environment.apiUrl + "api/HOH/delete/"+id);
  }

  editUser(user:any) {

    return this._http.put(environment.apiUrl + "api/HOH/update",user, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });

  }

  deleteVisitor(id:any){
    return this._http.delete(environment.apiUrl + "api/Visitorlog/delete/"+id);
   
  }

  globalsearch(searchQuery:any){
    return this._http.get(environment.apiUrl + "api/HOH/globalsearch?SearchWords="+searchQuery);
  }
  globalsearchForMembers(searchQuery:any){

    return this._http.get(environment.apiUrl + "api/Familymember/globalsearch?SearchWords="+searchQuery);
  }
  searchstatus(startDate:any,endDate:any,FamilyType:any,completedFamily:any,affiliateSearch:any){
  
    return this._http.get(environment.apiUrl + "api/HOH/listbyfilters?FromDate="+startDate+"&ToDate="+endDate+"&FamilyType="+FamilyType+"&FamilyStatusforMembers="+completedFamily+"&AffiliateId="+affiliateSearch);

  }

  dateFilter(date:any){
    return this._http.post(environment.apiUrl + "api/HOH/familysearch",date);
  }

  dateFilterforuser(date:any){
    return this._http.post(environment.apiUrl + "api/Familymember/familymembersearch",date);
  }


  affiliateSearch(affliateChurch:any){
    return this._http.post(environment.apiUrl + "api/Familymember/familymembersearch",affliateChurch);
  }

  getFamilyType(){
    return this._http.get(environment.apiUrl + "api/HOH/familytype");
   
  }
  getAffiliateTypes(){
    return this._http.get(environment.apiUrl + "api/Affiliate/listaffiliatename");
  }
  listbyFilters(startDate:any,endDate:any,position:any,familyrole:any,affiliate:any){

    return this._http.get(environment.apiUrl + "api/Familymember/listbyfilters?FromDate="+startDate+"&ToDate="+endDate+"&Position="+position+"&Familyrole="+familyrole+"&AffiliateId="+affiliate,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }
}
