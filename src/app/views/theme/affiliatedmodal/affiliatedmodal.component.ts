import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardService } from 'ngx-clipboard';
import { AffiliateService } from '../affiliate.service';
import { CopyconfirmationService } from '../copyconfirmation.service';
import { ManageaffiliatedComponent } from '../manageaffiliated/manageaffiliated.component';
import { NotifyService } from '../notify.service';

@Component({
  selector: 'app-affiliatedmodal',
  templateUrl: './affiliatedmodal.component.html',
  styleUrls: ['./affiliatedmodal.component.scss']
})
export class AffiliatedmodalComponent {
  copyText: any;
  affiliateForm!: FormGroup;
  submitted: any;
  affiliateResponse: any;
  affiliateLink: any;
  showAffiliateLoader: boolean = false;
  firstNameEmpty:boolean=false;
  lastNameEmpty:boolean=false;
  organizationEmpty:boolean=false;
  contactNoEmpty:boolean=false;
  emailEmpty:boolean=false;

  constructor(
    public activeModal: NgbActiveModal,
    private clipboardService: ClipboardService,
    private formBuilder: FormBuilder,
    public affiliateservice: AffiliateService,
    public copyconfirmation: CopyconfirmationService,
    private notifyservice: NotifyService,
    public manageaffiliate: ManageaffiliatedComponent

  ) {
    this.affiliateValidatorForm();
  }

  ngOnInit() {


  }
  private affiliateValidatorForm() {
    this.affiliateForm = this.formBuilder.group({

      firstname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60), Validators.pattern(/^[a-zA-Z ]*$/)]],
      lastname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60), Validators.pattern(/^[a-zA-Z ]*$/)]],
      organizationorchurchname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      contactno: ['', [Validators.required, Validators.pattern(/^(?!0+$)(?:\+1)?(?:\d{3}|\(\d{3}\))[- ]?\d{3}[- ]?\d{4}$/)]],
      email: ['', [Validators.required,
      Validators.pattern(/^\s*\S+@\S+\.\S+\s*$/)
      ]],
    });
  }

  get f() {
    return this.affiliateForm.controls;
  }

  public submitAffiliateForm() {

    this.submitted = true;
    // Do not accept empty space
    this.affiliateForm.value.firstname = this.affiliateForm.value.firstname.trim();
    if (this.affiliateForm.value.firstname.trim().length == 0) {
      this.firstNameEmpty=true;
      return;
    }
    else{
      this.firstNameEmpty=false;
    }
    this.affiliateForm.value.lastname = this.affiliateForm.value.lastname.trim();
    if (this.affiliateForm.value.lastname.trim().length == 0) {
     
      this.lastNameEmpty=true;
      return;
    }
    else{
      this.lastNameEmpty=false;
    }
    this.affiliateForm.value.organizationorchurchname = this.affiliateForm.value.organizationorchurchname.trim();
    if (this.affiliateForm.value.organizationorchurchname.trim().length == 0) {
    
      this.organizationEmpty=true;
      return;
    }
    else{
      this.organizationEmpty=false;
    }
    this.affiliateForm.value.contactno = this.affiliateForm.value.contactno.trim();
    if (this.affiliateForm.value.contactno.trim().length == 0) {
      this.contactNoEmpty=true;
      return;
    }
    else{
      this.contactNoEmpty=false;
    }
    this.affiliateForm.value.email = this.affiliateForm.value.email.trim();
    if (this.affiliateForm.value.email.trim().length == 0) {
      this.emailEmpty=true;
      return;
    }
    else{
      this.emailEmpty=false;
    }

    if (this.affiliateForm.invalid) {
      return;
    }
    this.showAffiliateLoader = true;
    if (!this.f['firstname'].errors && !this.f['lastname'].errors && !this.f['email'].errors && !this.f['organizationorchurchname'].errors && !this.f['contactno'].errors) {
      this.affiliateservice.createAffiliated(this.affiliateForm.value).subscribe((response) => {
        this.affiliateResponse = response;
        if (!this.affiliateResponse.apiStatus) {

          this.copyconfirmation.affiliateLink = this.affiliateResponse.Affiliatelink;
          this.affiliateLink = this.affiliateResponse.Affiliatelink;
          this.activeModal.close(this.affiliateForm.value);
          this.copyconfirmation.confirm(this.affiliateLink, 'Affiliated Invitation Link Created Successfully', 'Please copy this Link to share with members')
            .then((confirmed) => {
              this.manageaffiliate.getAffiliates();
            }).catch(() => {
              this.manageaffiliate.getAffiliates();
            })
        }
        else if (this.affiliateResponse.apiStatus == 4) {
          this.showDuplicateError();
        }
        else {
          this.showToasterError();
        }
        this.showAffiliateLoader = false;
      })
    }
  }

  // Toaster
  showDuplicateError() {
    this.notifyservice.showError("This mail id has exist in Affiliate,Please Check!!", "")
  }
  showToasterError() {
    this.notifyservice.showError("There was an error,Please wait!!", "")
  }

}
