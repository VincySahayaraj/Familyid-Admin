import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  callFunction:any=0
 //showQuestionGrid = false;

  userObj = {
    question: '',
    categoryincluded: '',
    agegroup: '',
    displayorder: '',
    description: '',
    priority: '',
    questionid: '',
  }

  // question: any='';
  // name: any='';
  // agegroup: any='';
  // displayorder:any= '';
  // description:any='';
  // id:any= '';

  constructor(private _http: HttpClient) { }

  createQuestion(question: any) {

    return this._http.post(environment.apiUrl + "api/Question/add", question, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
  }

  getAllQuestions() {
    return this._http.get(environment.apiUrl + "api/Question/list",{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  editQuestion(question: any) {



    return this._http.put(environment.apiUrl + "api/Question/update", question, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });

  }

  deleteQuestion(id: any) {

    return this._http.delete(environment.apiUrl + "api/Question/delete/" + id);

  }

  getCategoryBasedQuestion(age:any,category:any){

    return this._http.get(environment.apiUrl + "api/Question/listbyageandcategory?CategoryName="+category+"&AgeGroup="+age );
   

  }
}
