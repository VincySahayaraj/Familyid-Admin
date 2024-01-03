import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment" 

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryeditObj = {
    categoryname: '',
    displayorder:'',
    categoryid: ''
  };

   constructor(private _http:HttpClient) { }
   createCategory(category:any){

    return this._http.post(environment.apiUrl +"api/Category/add",category)

  }

  getAllCategory(){
    return this._http.get(environment.apiUrl +"api/Category/list")

  }

  editCategory(category:any){

    return this._http.put(environment.apiUrl +"api/Category/update",category, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  deleteCategory(id: any){

    return this._http.delete(environment.apiUrl +"api/Category/delete/"+id)

  }
}
