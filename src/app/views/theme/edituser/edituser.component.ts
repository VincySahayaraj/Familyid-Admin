
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuestionService } from '../question.service';
import { NotifyService } from '../notify.service';
import { UserService } from '../user.service';
import { ManageusersComponent } from '../manageusers/manageusers.component';
import { EditconfirmationService } from '../editconfirmation.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})

export class EdituserComponent implements OnInit {

  @Input()
  allUser!: any;
  id!: number;
  editUserForm!: FormGroup;
  successMsg: any;
  isEdit: any;
  editUser: any;
  othersValidation: any = false;
  othervisible: boolean = false;

  firstname: any;
  lastname: any;
  email: any;
  familyrole: any;
  other: any;
  phonenumber:any;

  usereditObj = {
    firstname: '',
    lastname: '',
    email: '',
    phonenumber:'',
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

      firstname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60), Validators.pattern(/^[a-zA-Z ]*$/)]],
      lastname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60), Validators.pattern(/^[a-zA-Z ]*$/)]],
      email: ['', [Validators.required, 
        Validators.pattern(/^\s*\S+@\S+\.\S+\s*$/),
        // Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
      ]],
      phonenumber:['',[Validators.pattern(/^[a-zA-Z]*$/)]],
      familyrole: ['', [Validators.required]],
      other: ['', Validators.pattern(/^[a-zA-Z]*$/)],

    });
  }

  ngOnInit() {

    this.usereditObj = this.userservice.usereditObj;

    this.firstname=this.usereditObj.firstname;
    this.lastname=this.usereditObj.lastname;
    this.email=this.usereditObj.email;
    this.phonenumber=this.usereditObj.phonenumber;
    this.familyrole=this.usereditObj.familyrole;
    this.other=this.usereditObj.other;
    
    if (this.usereditObj.familyrole == 'Other') {
      this.othervisible = true;
    }

  }
  update() {
    this.ngOnInit();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editUserForm.controls;
  }


  close(){
  
    this.userservice.usereditObj.firstname=this.firstname;
    this.userservice.usereditObj.lastname=this.lastname;
    this.userservice.usereditObj.email=this.email;
    this.userservice.usereditObj.familyrole=this.familyrole;
    this.userservice.usereditObj.other=this.other;
    this.activeModal.dismiss('Cross click');
  
  }

  public submitEditForm() {

    this.submitted = true;

    this.editUserForm.value.firstname = this.editUserForm.value.firstname.trim();
    if (this.editUserForm.value.firstname == "") {
      alert("Please add valid first name");
      return;
    }
    this.editUserForm.value.lastname = this.editUserForm.value.lastname.trim();
    if (this.editUserForm.value.lastname == "") {
      alert("Please add valid lastname");
      return;
    }
    this.editUserForm.value.email = this.editUserForm.value.email.trim();
    if (this.editUserForm.value.email == "") {
      alert("Please add valid email");
      return;
    }

    if (this.editUserForm.value.familyrole == 'Other') {
      this.editUserForm.value.other = this.editUserForm.value.other.trim();
      if (this.editUserForm.value.other == "") {
        alert("Please add valid other familyrole");
        return;
      }

    }

    this.editUser = {

      firstname: this.editUserForm.value.firstname,
      lastname: this.editUserForm.value.lastname,
      email: this.editUserForm.value.email,
      familyrole: this.editUserForm.value.familyrole,
      other: this.editUserForm.value.other,
      hohmasterid: this.userservice.usereditObj.hohmasterid,

    }

    if (this.editUserForm.value.familyrole == "Other") {



      if (this.editUserForm.value.other != "" && this.editUserForm.value.other != null) {

        this.editUser.familyrole = this.editUser.other;

      }
      else {

        this.othersValidation = true;
        return
      }
    }
    else{
      this.editUserForm.get('other')?.reset();
  
    }
    // stop here if form is invalid
    if (this.editUserForm.invalid) {

      return;

    }
    this.editUser = JSON.stringify(this.editUser);
    this.editconfirmationservice.confirm('Warning', 'Do you really want to edit these records? This action cannot be revoked.')
    .then((confirmed) => {

    if (!this.f['firstname'].errors && !this.f['lastname'].errors && !this.f['email'].errors && !this.f['familyrole'].errors) {

      this.userservice.editUser(this.editUser).subscribe((response) => {
        this.allUser = response;
        if (this.allUser.apiStatus == 0) {

          this.manageusers.getLatestUser();
          this.showToasterSuccess();
        }
        else if (this.allUser.apiStatus == 4) {
          this.showToasterEmailError();
        }
        else {
          this.showToasterError();
        }
      })
      this.activeModal.close(this.editUser);
    }

    else {
    }

  })
  .catch(()=>{

  })
  }

  Role: any = ['Father', 'Mother', 'Brother', 'Sister', 'Other'];

  CheckOthers(other: any, id: any) {

    if (other == 'Other') {
      this.othervisible = !this.othervisible;
      //this.othersValidation = Validators.required;
    }

    else {
      this.othervisible = false;
    }
  }
  
  showToasterSuccess() {

    this.notifyservice.showSuccess("Family Updated Successfully !!", "")
  }
  showToasterEmailError() {
    this.notifyservice.showError("Mail ID already exist", "")
  }
  showToasterError() {
    this.notifyservice.showError("There was an error updating the Family", "")
  }
}

