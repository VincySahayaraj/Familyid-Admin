
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotifyService } from '../notify.service';
import { CategoryService } from '../category.service';
import { ManagecategoriesComponent } from '../managecategories/managecategories.component';
import { EditconfirmationService } from '../editconfirmation.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})

export class EditcategoryComponent implements OnInit {

  @Input()
  allCategory!: any;
  id!: number;

  editCategoryForm!: FormGroup;

  successMsg: any;
  isEdit: any;
  editCategory: any;

  displayOrder:any;
  categoryName:any;

  categoryeditObj = {
    categoryname: '',
    displayorder:'',
    categoryid: ''
  };

  submitted: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private categoryservice: CategoryService,
    private notifyservice: NotifyService,
    private elementRef: ElementRef,
    private editconfirmationservice: EditconfirmationService,
    private managecategories: ManagecategoriesComponent

  ) {
    this.updateForm();
  }

  private updateForm() {
    this.editCategoryForm = this.formBuilder.group({

      categoryname: ['', Validators.required],
      displayorder: ['', Validators.required]

    });
  }

  ngOnInit() {
   
    this.categoryeditObj = this.categoryservice.categoryeditObj;
    this.categoryName=this.categoryeditObj.categoryname;
    this.displayOrder=this.categoryeditObj.displayorder;

  }
 
  get f() {

    return this.editCategoryForm.controls;
  }

close(){
  
  this.categoryservice.categoryeditObj.categoryname=this.categoryName;
  this.categoryservice.categoryeditObj.displayorder=this.displayOrder;
  this.activeModal.dismiss('Cross click');
}

  public submitEditCategoryForm() {
    this.submitted = true;
    this.editCategoryForm.value.categoryname = this.editCategoryForm.value.categoryname.trim();
    if (this.editCategoryForm.value.categoryname == "") {
      alert("Please add valid category name");
      return;
    }
    this.editCategory = {

      categoryname: this.editCategoryForm.value.categoryname,
      categoryid: this.categoryservice.categoryeditObj.categoryid,
      displayorder:this.editCategoryForm.value.displayorder,

    }
    this.editconfirmationservice.confirm('Warning', 'Do you really want to edit these records? This action cannot be revoked.')
      .then((confirmed) => {
    if (!this.f['categoryname'].errors && !this.f['displayorder'].errors) {
      this.activeModal.close(this.editCategory);
      this.categoryservice.editCategory(this.editCategory).subscribe((response) => {
        this.allCategory = response;

        //this.managecategories.getLatestCategory();
        if (this.allCategory.apiStatus == 0) {

          this.managecategories.getLatestCategory();
          this.showToasterSuccess();

        }
        else if(this.allCategory.apiStatus == 4){

          // if(this.allCategory.apiStatusMessage=="Display order is already added. Please change the order"){
            if(this.allCategory.apiStatusMessage=="Duplicate entry"){

            this.showToasterDisplayOrder();
            //this.managecategories.getLatestCategory();

          }
          else{
            this.showToasterCategoryError();
            //this.managecategories.getLatestCategory();
          }

        }
        else {
          this.showToasterError();
          //this.managecategories.getLatestCategory();
          
        }
      })
      this.activeModal.close(this.editCategoryForm.value);
    }
  })
    .catch(()=>{

    })
  }


  showToasterSuccess() {
    this.notifyservice.showSuccess("Category Updated Successfully !!", "")
  }
  showToasterCategoryError() {
    this.notifyservice.showError("Please Don't repeat the same category", "")
  }
  showToasterDisplayOrder() {
    this.notifyservice.showError("Please Don't repeat the same display order", "")
  }
  showToasterError(){
    this.notifyservice.showError("There is an error updating the category", "")
  }
}

