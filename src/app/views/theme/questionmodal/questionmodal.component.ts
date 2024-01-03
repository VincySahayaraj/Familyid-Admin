import { AfterViewInit, Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuestionService } from '../question.service';
import { NotifyService } from '../notify.service';
//import { ManagequestionsComponent } from '../managequestions/managequestions.component';
import { ModalService } from '@coreui/angular';
import { CategoryService } from '../category.service'
import { ManagequestionsComponent } from '../managequestions/managequestions.component';

@Component({

  selector: 'app-questionmodal',
  templateUrl: './questionmodal.component.html',
  styleUrls: ['./questionmodal.component.scss'],

})
@Injectable()
export class QuestionmodalComponent implements OnInit {

  @Input()
  allCategory!: any;
  id!: number;
  agegroup: any;
  questionForm!: FormGroup;
  addQuestions: any;
  successMsg: any;
  elementRef: any;
  allCategories: any;
  submitted: any = false;
  allQuestion: any;
  index: any;
  priorityAlreadyAvailable: any = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private questionservice: QuestionService,
    private notifyservice: NotifyService,
    private categoryservice: CategoryService,
    private manageQuestion: ManagequestionsComponent,

  ) {

  }

  getCategories() {

    this.categoryservice.getAllCategory().subscribe((response) => {

      this.allCategories = response;

    })
  }

  ngOnInit() {

    this.getCategories();
    this.questionForm = this.formBuilder.group({

      name: ['', Validators.required],
      question: ['', Validators.required],
      agegroup: ['', Validators.required],
      description: ['',Validators.maxLength(60)],
      priority: [true],

    });

  }
  get f() {
    return this.questionForm.controls;
  }

  update() {
    this.ngOnInit();
  }

  public submitQuestionForm() {

    this.submitted = true;

    if (this.questionForm.value.agegroup == "TEENAGER") {
      this.agegroup = 0;
    }

    if (this.questionForm.value.agegroup == "ADULT") {
      this.agegroup = 1;
    }

    if (this.questionForm.value.agegroup == "ADULT") {

      this.questionForm.value.agegroup = 1;

    }
    if (this.questionForm.value.agegroup == "TEENAGER") {
      this.questionForm.value.agegroup = 0;
    }

    if (this.questionForm.invalid) {
     
      return;

    }

    this.questionservice.getAllQuestions().subscribe((response) => {

      this.allQuestion = response;

      this.index = 0;

      // this.priorityAlreadyAvailable = false;

      // this.allQuestion.forEach((element: string | number) => {

      //   if (this.allQuestion[this.index].question == this.questionForm.value.question && this.allQuestion[this.index].agegroup == this.questionForm.value.agegroup) {

      //     if (this.allQuestion[this.index].priority == true && this.questionForm.value.priority == true) {

      //       this.priorityAlreadyAvailable = true;
      //     }
      //   }
      //   this.index++;
      // })

      // if (this.priorityAlreadyAvailable == true) {
      //   alert("Given Question is Already exist, Please change the priority to false");
      //   return
      // }

      // else {

        this.questionForm.value.question = this.questionForm.value.question.trim();

        if (this.questionForm.value.question == "") {
          alert("Please add valid question");
          return;
        }
        this.addQuestions = {

          question: this.questionForm.value.question,
          categoryincluded: this.questionForm.value.name,
          agegroup: this.agegroup,
          description: this.questionForm.value.description,
          questionid: this.questionservice.userObj.questionid,
          priority: this.questionForm.value.priority,

        }
        this.addQuestions = JSON.stringify(this.addQuestions);
        if (!this.f['question'].errors && !this.f['name'].errors && !this.f['agegroup'].errors) {
          this.questionservice.createQuestion(this.addQuestions).subscribe((response) => {
            this.successMsg = response;
            if (this.successMsg.apiStatus == 0) {
              this.manageQuestion.getLatestQuestion();
              this.showToasterSuccess();
            }
            else if (this.successMsg.apiStatus == 4) {
              this.showToasterRepeatError();
            }
            else {
              this.showToasterError();
            }
          })
          this.activeModal.close(this.addQuestions);
        }
        else {
        }
      //}
    })
  }

  showToasterSuccess() {

    this.notifyservice.showSuccess("Question Added Successfully !!", "")
  }
  showToasterRepeatError() {
    this.notifyservice.showError("Don't repeat the question in same category", "")
  }
  showToasterError() {
    this.notifyservice.showError("There was an error adding the question", "")
  }
}

