
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuestionService } from '../question.service';
import { NotifyService } from '../notify.service';
import { UserService } from '../user.service';
import { ManageusersComponent } from '../manageusers/manageusers.component';
import { EditconfirmationService } from '../editconfirmation.service';

@Component({
  selector: 'app-edit-visitor',
  templateUrl: './edit-visitor.component.html',
  styleUrls: ['./edit-visitor.component.scss']
})

export class EditVisitorComponent implements OnInit {

  @Input()
  allUser!: any;
  id!: number;
  editUserForm!: FormGroup;
  successMsg: any;
  isEdit: any;
  editUser: any;
  othersValidation: any = false;
  othervisible: boolean = false;

  usereditObj = {
    firstname: '',
    lastname: '',
    email: '',
    familyrole: '',
    other: '',

  }

  formGroup: any;
  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public userservice: UserService,
    private notifyservice: NotifyService,
    private elementRef: ElementRef,
    private editconfirmationservice: EditconfirmationService,
    private manageusers: ManageusersComponent,

  ) {
    this.updateForm();
  }

  private updateForm() {
    this.editUserForm = this.formBuilder.group({

      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      familyrole: ['', Validators.required],
      other: [''],

    });
  }

  ngOnInit() {

    this.usereditObj = this.userservice.usereditObj;
    if (this.usereditObj.familyrole == 'Other') {
      this.othervisible = true;
    }

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editUserForm.controls;
  }

  public submitEditForm() {

    this.submitted = true;

    this.editUser = {

      firstname: this.editUserForm.value.firstname,
      lastname: this.editUserForm.value.lastname,
      email: this.editUserForm.value.email,
      familyrole: this.editUserForm.value.familyrole,
      other: this.editUserForm.value.other,
      hohmasterid: this.userservice.usereditObj.hohmasterid,

    }

    if (this.editUserForm.value.familyrole == "Other") {

      if (this.editUserForm.value.other != "") {

        this.editUser.familyrole = this.editUser.other;
      }
      else {

        this.othersValidation = true;
        return
      }
    }

    this.editUser = JSON.stringify(this.editUser);
    

    if (!this.f['firstname'].errors && !this.f['lastname'].errors && !this.f['email'].errors && !this.f['familyrole'].errors) {

      this.userservice.editUser(this.editUser).subscribe((response) => {
        this.allUser = response;


        if (this.allUser.apiStatus == 0) {
          this.manageusers.getLatestUser();
          this.showToasterSuccess();
        }
        else {
          this.showToasterError();
        }
      })
      this.activeModal.close(this.editUser);
    }

    else {
    }
  }

  Role: any = ['Father', 'Mother', 'Brother', 'Sister', 'Other'];

  CheckOthers(other: any, id: any) {

    if (other == 'Other') {
      this.othervisible = !this.othervisible;
      this.othersValidation = Validators.required;
    }

    else {
      this.othervisible = false;
    }
  }

  showToasterSuccess() {

    this.notifyservice.showSuccess("User Updated Successfully !!", "")
  }

  showToasterError() {
    this.notifyservice.showError("There was an error updating the user", "Sorry!!")
  }

}

