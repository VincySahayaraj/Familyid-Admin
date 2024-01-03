
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuestionService } from '../question.service';
import { NotifyService } from '../notify.service';
import { CategoryService } from '../category.service';
import { ManagequestionsComponent } from '../managequestions/managequestions.component';
import { EditconfirmationService } from '../editconfirmation.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  @Input()
  allQuestion!: any;
  id!: number;
  agegroup: any;
  editForm!: FormGroup;
  addQuestions: any;
  successMsg: any;
  isEdit: any;
  editQuestion: any;
  submitted: any;
  allCategories: any;
  index: any;
  priorityAlreadyAvailable: any;
  question:any;
  categoryIncluded:any;
  ageGroup:any;
  description:any;
  displayOrder:any;

  userObj = {
    question: '',
    categoryincluded: '',
    agegroup: '',
    displayorder: '',
    description: '',
    //priority: '',
    questionid: ''
  };
  formGroup: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public questionservice: QuestionService,
    private notifyservice: NotifyService,
    private categoryservice: CategoryService,
    private elementRef: ElementRef,
    private editconfirmationservice: EditconfirmationService,
    private manageQuestion: ManagequestionsComponent,

  ) {
    this.updateForm();
  }

  private updateForm() {
    this.editForm = this.formBuilder.group({

      categoryincluded: ['', Validators.required],
      question: ['', Validators.required],
      agegroup: ['', Validators.required],
       //priority: [true],
      description: [''],

    });
  }

  get f() {

    return this.editForm.controls;
  }

  ngOnInit() {

    this.userObj = this.questionservice.userObj;
    this.question=this.userObj.question;
    this.displayOrder=this.userObj.displayorder;
    this.categoryIncluded=this.userObj.categoryincluded;
    this.description=this.userObj.description;
    this.ageGroup=this.userObj.agegroup;
    this.getCategories();
  }
  update() {

    this.ngOnInit();

  }

  getCategories() {

    this.categoryservice.getAllCategory().subscribe((response) => {

      this.allCategories = response;

    })
  }

  close(){
  
    this.questionservice.userObj.question=this.question;
    this.questionservice.userObj.displayorder=this.displayOrder;
    this.questionservice.userObj.categoryincluded=this.categoryIncluded;
    this.questionservice.userObj.description=this.description;
    this.questionservice.userObj.agegroup=this.ageGroup;
    this.activeModal.dismiss('Cross click');
  
  }

  public submitEditForm() {

    this.submitted = true;

    if (this.editForm.value.agegroup == 'ADULT') {
      this.editForm.value.agegroup = 1;

    }
    else {

      this.editForm.value.agegroup = 0;

    }

    this.questionservice.getAllQuestions().subscribe((response) => {

      this.allQuestion = response;


      this.index = 0;

      // this.priorityAlreadyAvailable = false;

      // this.allQuestion.forEach((element: string | number) => {

      //   if (this.allQuestion[this.index].question == this.editForm.value.question && this.allQuestion[this.index].agegroup == this.editForm.value.agegroup) {

      //     if (this.allQuestion[this.index].priority == true && this.editForm.value.priority == true) {

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

        this.editForm.value.question = this.editForm.value.question.trim();
        if (this.editForm.value.question == "") {
          alert("Please add valid question");
          return;
        }
        this.editQuestion = {

          question: this.editForm.value.question,
          categoryincluded: this.editForm.value.categoryincluded,
          agegroup: this.editForm.value.agegroup,
          description: this.editForm.value.description,
          questionid: this.questionservice.userObj.questionid,
          //priority: this.editForm.value.priority,

        }

        this.editQuestion = JSON.stringify(this.editQuestion);
        this.editconfirmationservice.confirm('Warning', 'Do you really want to edit these records? This process cannot be revoked.')
        .then((confirmed) => {
  
        if (!this.f['question'].errors && !this.f['categoryincluded'].errors && !this.f['agegroup'].errors) {

          this.activeModal.close(this.editQuestion);
          this.questionservice.editQuestion(this.editQuestion).subscribe((response) => {
            this.allQuestion = response;

            if (this.allQuestion.apiStatus == 0) {

              this.manageQuestion.getLatestQuestion();
              this.showToasterSuccess();

            }
            else if (this.allQuestion.apiStatus == 4) {
              this.manageQuestion.getLatestQuestion();
              this.showToasterRepeatError();

            }
            else {
              this.manageQuestion.getLatestQuestion();
              this.showToasterError();
            }
          })
        }
      })
        .catch(()=>{

        })
      //}
    })
  }

  showToasterSuccess() {

    this.notifyservice.showSuccess("Question Updated Successfully !!", "")
  }
  showToasterRepeatError() {
    this.notifyservice.showError("Don't repeat the question in same category", "")
  }
  showToasterError() {
    this.notifyservice.showError("There was an error adding the question", "Sorry!!")
  }
}

