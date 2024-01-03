import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from '../category.service';
import { NotifyService } from '../notify.service';
import { ManagecategoriesComponent } from '../managecategories/managecategories.component';

@Component({
  selector: 'app-categorymodal',
  templateUrl: './categorymodal.component.html',
  styleUrls: ['./categorymodal.component.scss']
})
export class CategorymodalComponent implements OnInit {

  @Input()
  allCategory!: any;
  id!: number;
  categoryForm!: FormGroup;
  categoryResponse: any;
  submitted: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public categoryservice: CategoryService,
    private managecategories: ManagecategoriesComponent,
    private notifyservice: NotifyService
  ) {
    this.createForm();
  }
  private createForm() {
    this.categoryForm = this.formBuilder.group({

      categoryname: ['', Validators.required],
      displayorder: ['', Validators.required],
    });
  }
  get f() {

    return this.categoryForm.controls;
  }

  ngOnInit() {

  }

  public submitCategoryForm() {

    this.submitted = true;
    
    this.categoryForm.value.categoryname = this.categoryForm.value.categoryname.trim();
   
    if (this.categoryForm.value.categoryname == "") {
      alert("Please add valid categoryname");
      return;
    }

    if (!this.f['categoryname'].errors && !this.f['displayorder'].errors) {

      this.categoryservice.createCategory(this.categoryForm.value).subscribe((response) => {
        this.categoryResponse = response;
       
        if (this.categoryResponse.apiStatus == 0) {
          this.managecategories.getLatestCategory();
          window.location.reload();
          this.showToasterSuccess();
        }
        else if(this.categoryResponse.apiStatus == 4){

          if(this.categoryResponse.apiStatusMessage=="Duplicate entry"){

            this.showToasterCategoryError();
             this.managecategories.getLatestCategory();

          }
          else{
            
            this.showToasterDisplayOrder();
            this.managecategories.getLatestCategory();
          }
        }
        else {
          this.showToasterError();
           this.managecategories.getLatestCategory();
          
        }
      })
      this.activeModal.close(this.categoryForm.value);
    }
  }

  showToasterSuccess() {
    this.notifyservice.showSuccess("Category Added Successfully !!", "")
  }
  showToasterCategoryError() {
    this.notifyservice.showError("Please Don't repeat the same category", "")
  }

  showToasterDisplayOrder() {
    this.notifyservice.showError("Please Don't repeat the same display order", "")
  }
  showToasterError(){
    this.notifyservice.showError("There was an error adding the category", "")
  }
}
