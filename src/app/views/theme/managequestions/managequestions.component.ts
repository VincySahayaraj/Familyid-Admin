import { AfterViewInit, ChangeDetectorRef, Component, Injectable, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from '../question.service';
import { QuestionmodalComponent } from '../questionmodal/questionmodal.component';
import { NotifyService } from '../notify.service'
import { Validators } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EditModalComponent } from '../edit-modal/edit-modal.component'
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { DeleteconfirmationService } from '../deleteconfirmation.service';
import { EditconfirmationService } from '../editconfirmation.service';
import { createInjectableType } from '@angular/compiler';
import { Observable } from 'rxjs/internal/Observable';
import { Subject, timer } from 'rxjs';
import { CategoryService } from '../category.service';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-managequestions',
  templateUrl: './managequestions.component.html',
  styleUrls: ['./managequestions.component.scss']
})

@Injectable()
export class ManagequestionsComponent implements OnInit {

  @ViewChild('questionmodal') questionmodal: QuestionmodalComponent | undefined

  dtOptions: any = {


  };
  //dtOptions = DTOptionsBuilder.newOptions().withDisplayLength(10) 
  searchText = "";
  searchAge = "";
  allQuestion: any;
  allCategory: any;
  agegroup: any;
  index: number = 0;
  deleteResponse: any;
  showLoader: boolean = false;
  userObj = {
    question: '',
    agegroup: '',
    displayorder: '',
    description: '',
    priority: '',
    questionid: '',
    categoryincluded: '',
  }
  showQuestionGrid :boolean= false;
  questionName: any = '';
  searchResult: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private zone: NgZone,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public questionservice: QuestionService,
    private deleteconfirmationservice: DeleteconfirmationService,
    private notifyService: NotifyService,
    private editconfirmationservice: EditconfirmationService,
    private categoryservice: CategoryService,

  ) {

  }

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;


  dtTrigger: Subject<any> = new Subject<any>();
  subscription: any


  openQuestionModal() {
    const modalRef = this.modalService.open(QuestionmodalComponent);
    modalRef.result.then((result) => {

      let timer1 = timer(1000, 1000);
      let c = timer1.subscribe(() => this.getLatestQuestion());
      setTimeout(() => {
        c.unsubscribe();
      }, 2000)
    }).catch((error) => {

    });
  }
  ngOnInit() {
   
    this.getLatestCategory();
    this.getLatestQuestion();

    //this.getCategoryBasedQuestion(this.searchAge,this.searchText)
  }
  //Get all user
  getLatestCategory() {

    this.categoryservice.getAllCategory().subscribe((response) => {
      this.allCategory = response;
    })
  }

  //Get all user
  getLatestQuestion() {
    this.showLoader = true;
    this.questionservice.getAllQuestions().subscribe((response) => {
      this.showQuestionGrid = !this.showQuestionGrid;
      this.allQuestion = response;
      // this.rerender()
      this.showLoader = false;

      if (this.allQuestion.length > 0) {
        this.dtOptions = this.allQuestion;
      }
      else {
        return
      }
      this.dtOptions = this.allQuestion;
      this.dtOptions = {

        lengthMenu: [
          [30, 60, 90, -1],
          [30, 60, 90, 'All'],
        ],
        //destroy: true,
        order: [[4, 'desc']],
        // columnDefs: [
        //   { orderable: false, targets: '_all' }
        // ],
      };

      //this.dtTrigger.next(true);

      // setTimeout(() => {
      //   this.dtTrigger.next(null);
      //   //this.dtTrigger.unsubscribe();
      //   //this.rerender();
      // });
     
      this.index = 0;
      this.allQuestion.forEach((element: string | number) => {

        if (this.allQuestion[this.index].agegroup == 0) {
          this.allQuestion[this.index].agegroup = 'TEENAGER';

        }
        else if (this.allQuestion[this.index].agegroup == 1) {
          this.allQuestion[this.index].agegroup = 'ADULT';
        }
        else {
          // alert("Wrong Age");
        }
        this.index++;
      });

      this.cdRef.detectChanges();

    })
  }

  // ngAfterViewInit(): void {
  //   // this.dtTrigger.next(null);
  //   this.getLatestQuestion();
  //   this.getLatestCategory();
  // }

  // ngOnDestroy(): void {
  //   // Do not forget to unsubscribe the event
  //   this.dtTrigger.unsubscribe();
  // }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again

  //   });
  // }

  editQuestion(questionindex: any) {

    // this.editconfirmationservice.confirm('Warning', 'Do you really want to edit these records? This process cannot be undone.')
    //   .then((confirmed) => {
        const modalRef = this.modalService.open(EditModalComponent);
        modalRef.result.then((result) => {

          let timer1 = timer(1000, 1000);
          let c = timer1.subscribe(() => this.getLatestQuestion());
          setTimeout(() => {
            c.unsubscribe();
          }, 2000)
        }).catch((error) => {

        });
        this.questionservice.userObj = this.allQuestion[questionindex];
     // })
      //.catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteQuestion(id: any) {

    this.deleteconfirmationservice.confirm('Are you sure?', 'Do you really want to delete these records? This process cannot be undone.')
      .then((confirmed) => {
        this.questionservice.deleteQuestion(id).subscribe((response) => {

          this.deleteResponse = response;

          //this.dtFunction();
          //this.ngOnDestroy();
          if (this.deleteResponse.apiStatus == 0) {

            this.showToasterSuccess();
            this.getLatestQuestion();

          }
          else {

            this.showToasterError();

          }
        })
        this.getLatestQuestion();
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  getCategoryBasedQuestion(age: any, category: any) {
    this.showLoader = true;
    this.questionservice.getCategoryBasedQuestion(age, category).subscribe((response) => {

      // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //dtInstance.destroy();
      //this.dtTrigger.next(null);
      //dtInstance.clear().draw();
      this.allQuestion = [];
      

      this.showQuestionGrid=false;

      setTimeout(()=>{

        this.allQuestion = response;
        this.showLoader = false;
        this.showQuestionGrid=true;
        this.index = 0;
        this.allQuestion.forEach((element: string | number) => {

          if (this.allQuestion[this.index].agegroup == 0) {
            this.allQuestion[this.index].agegroup = 'TEENAGER';

          }
          else if (this.allQuestion[this.index].agegroup == 1) {
            this.allQuestion[this.index].agegroup = 'ADULT';
          }
          else {
            // alert("Wrong Age");
          }
          this.index++;
        });

      },400);

      //this.dtOptions = this.allQuestion;

    })
  }

  dtFunction() {

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    })
  }
  showToasterSuccess() {

    this.notifyService.showSuccess("Question Deleted Successfully !!", "")
  }

  showToasterError() {
    this.notifyService.showError("There was an error deleting the question", "")
  }

  showToasterInfo() {
    this.notifyService.showInfo("This is info", "tutsmake.com")
  }

  showToasterWarning() {
    this.notifyService.showWarning("This is warning", "tutsmake.com")
  }
}
