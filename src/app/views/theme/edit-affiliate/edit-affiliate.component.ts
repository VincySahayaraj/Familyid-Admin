import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AffiliateService } from '../affiliate.service';
import { NotifyService } from '../notify.service';
// import { ManageAffiliateComponent } from '../manageaffiliated/manageaffiliated.component';
import { EditconfirmationService } from '../editconfirmation.service';
import { ManageaffiliatedComponent } from '../manageaffiliated/manageaffiliated.component';

@Component({
  selector: 'app-edit-affiliate',
  templateUrl: './edit-affiliate.component.html',
  styleUrls: ['./edit-affiliate.component.scss']
})
export class EditAffiliateComponent {

  firstname: any;
  lastname: any;
  organizationorchurchname: any;
  contactno: any;
  email: any;
  editAffiliate: any;

  affiliateEditForm!: FormGroup;
  showAffiliateLoader: any = false;

  submitted: any;
  allAffiliate: any;

  affiliateObj = {
    Firstname: '',
    Lastname: '',
    Organizationorchurchname: '',
    Contactno: '',
    Email: ''

  };

  firstNameEmpty:boolean=false;
  lastNameEmpty:boolean=false;
  organizationEmpty:boolean=false;
  contactNoEmpty:boolean=false;
  emailEmpty:boolean=false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private affiliateservice: AffiliateService,
    private notifyservice: NotifyService,
    private elementRef: ElementRef,
    private editconfirmationservice: EditconfirmationService,
    private manageaffiliate: ManageaffiliatedComponent

  ) {
    this.updateForm();
  }

  private updateForm() {
    this.affiliateEditForm = this.formBuilder.group({

      Firstname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60),Validators.pattern(/^[a-zA-Z ]*$/)]],
      Lastname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60),Validators.pattern(/^[a-zA-Z ]*$/)]],
      Organizationorchurchname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      Contactno: ['', [Validators.required, Validators.pattern(/^(?!0+$)(?:\+1)?(?:\d{3}|\(\d{3}\))[- ]?\d{3}[- ]?\d{4}$/)]],
      Email: ['', [Validators.required,
        Validators.pattern(/^\s*\S+@\S+\.\S+\s*$/),
      ]],

    });
  }

  ngOnInit() {

    this.affiliateObj = this.affiliateservice.affiliateObj;
    this.firstname = this.affiliateObj.Firstname;
    this.lastname = this.affiliateObj.Lastname;
    this.organizationorchurchname = this.affiliateObj.Organizationorchurchname;
    this.contactno = this.affiliateObj.Contactno;
    this.email = this.affiliateObj.Email;



  }

  get f() {

    return this.affiliateEditForm.controls;
  }

  submitAffiliateEditForm() {


    this.submitted = true;
    // if (this.affiliateEditForm.invalid) {
    //   return
    // }

    this.affiliateEditForm.value.Firstname = this.affiliateEditForm.value.Firstname.trim();
    if (this.affiliateEditForm.value.Firstname.trim().length == 0) {
      this.firstNameEmpty=true;
      return;
    }
    else{
      this.firstNameEmpty=false;
    }
    this.affiliateEditForm.value.Lastname = this.affiliateEditForm.value.Lastname.trim();
    if (this.affiliateEditForm.value.Lastname.trim().length == 0) {
     
      this.lastNameEmpty=true;
      return;
    }
    else{
      this.lastNameEmpty=false;
    }
    this.affiliateEditForm.value.Organizationorchurchname = this.affiliateEditForm.value.Organizationorchurchname.trim();
    if (this.affiliateEditForm.value.Organizationorchurchname.trim().length == 0) {
    
      this.organizationEmpty=true;
      return;
    }
    else{
      this.organizationEmpty=false;
    }
    this.affiliateEditForm.value.Contactno = this.affiliateEditForm.value.Contactno.trim();
    if (this.affiliateEditForm.value.Contactno.trim().length == 0) {
      this.contactNoEmpty=true;
      return;
    }
    else{
      this.contactNoEmpty=false;
    }
    this.affiliateEditForm.value.Email = this.affiliateEditForm.value.Email.trim();
    if (this.affiliateEditForm.value.Email.trim().length == 0) {
      this.emailEmpty=true;
      return;
    }
    else{
      this.emailEmpty=false;
    }

    if (this.affiliateEditForm.invalid) {
      return;
    }




    this.editAffiliate = {
      affiliateid: this.affiliateservice.affiliateObj.Affiliateid,
      firstname: this.affiliateEditForm.value.Firstname,
      lastname: this.affiliateEditForm.value.Lastname,
      organizationorchurchname: this.affiliateEditForm.value.Organizationorchurchname,
      contactno: this.affiliateEditForm.value.Contactno,
      email: this.affiliateEditForm.value.Email,
    }

    this.editconfirmationservice.confirm('Warning', 'Do you really want to edit these records? This action cannot be revoked.')
      .then((confirmed) => {
        if (!this.f['Firstname'].errors && !this.f['Lastname'].errors) {
          this.activeModal.close(this.editAffiliate);
          this.affiliateservice.editAffiliate(this.editAffiliate).subscribe((response) => {
            this.allAffiliate = response;
            //this.managecategories.getLatestCategory();
            if (this.allAffiliate.apiStatus == 0) {
              this.manageaffiliate.getAffiliates();
              this.showToasterSuccess();
            }
            else if (this.allAffiliate.apiStatus == 4) {
              // if(this.allCategory.apiStatusMessage=="Display order is already added. Please change the order"){
              this.showToasterDuplicate();
              //this.managecategories.getLatestCategory();
            }
            else {
              this.showToasterError();
              //this.managecategories.getLatestCategory();
            }
          })
          this.activeModal.close(this.affiliateEditForm.value);
        }
      })
      .catch(() => {
      })
  }
  showToasterDuplicate() {
    this.notifyservice.showError("Duplicate Affiliate!!", "Email id Already Exist")
  }
  showToasterSuccess() {
    this.notifyservice.showSuccess("Affiliate Updated Successfully !!", "")
  }
  showToasterError() {
    this.notifyservice.showError("There is an Error in updating Affiliate", "Sorry!!")
  }
}
