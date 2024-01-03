import { AfterViewInit, Component, Input, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../category.service';
import { CategorymodalComponent } from '../categorymodal/categorymodal.component';
import { EditcategoryComponent } from '../editcategory/editcategory.component';
import { NotifyService } from '../notify.service';
import { DeleteconfirmationService } from '../deleteconfirmation.service';
import { EditconfirmationService } from '../editconfirmation.service'
import { Subject, filter, timer } from 'rxjs';
// import { DataTableDirective } from 'angular-datatables';
// import { ButtonSettings } from 'datatables.net-buttons';
// import { ButtonSettings } from '../../../../../node_modules/datatables.net-buttons-bs4/js/dataTables.bootstrap4.min.js';
import 'datatables.net-buttons-bs4';

// import 'datatables.net';
// import 'datatables.net-bs4';
// import 'datatables.net-buttons';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
// import 'datatables.net-buttons/js/buttons.colVis';
// import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.excelHtml5';
import 'datatables.net-buttons/js/buttons.colVis.min';
import 'datatables.net-buttons/js/dataTables.buttons.min';
import 'datatables.net-buttons/js/buttons.flash.min';
import 'datatables.net-buttons/js/buttons.html5.min';

import { DataTablesModule } from 'angular-datatables';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

import { cilList, cilShieldAlt, cilCommentBubble, cilDelete } from '@coreui/icons';

// interface MySettings extends DataTables.Settings {
//   buttons: (string | ButtonSettings)[];
// }



@Component({
  selector: 'app-managecategories',
  templateUrl: './managecategories.component.html',
  styleUrls: ['./managecategories.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManagecategoriesComponent implements OnInit {

  // @ViewChild(DataTableDirective, {static: false})
  // datatableElement!: DataTableDirective;
  // dtTrigger: Subject<any> = new Subject();
  searchText = "";
  showCategoryLoader: boolean = false;
  allCategory!: any;
  editCategories: any;
  category: any;
  deleteResponse: any;
  showCategoryGrid: boolean = false;
  dtOptions: any = {
    dom: 't',
    bFilter: false,
    searching: false,
    buttons: [
      {
        extend: 'csvHtml5',
        text: 'Export CSV',
        className: 'btn btn-primary'
      },
      {
        extend: 'excelHtml5',
        text: 'Export Excel',
        className: 'btn btn-primary'
      },
      'print'
    ]
  };
  // order: [[2, 'asc']],

  // "columnDefs": [{
  //    targets: '_all', visible: false ,
  //   orderable: false
  // }]

  // colReorder: [{
  //   order: [1, 0, 2],
  //   fixedColumnsRight: 2
  // }]

  filteredData:any;
  startDate:any;
  endDate:any;
  finalDateValue:any;

  // "columnDefs": [ {
  // "targets": [0,2],
  // "orderable": false
  // } ]

  icons = { cilList, cilShieldAlt, cilCommentBubble, cilDelete };

  constructor(
    // private dateAdapter: DateAdapter<Date>,
    private modalService: NgbModal, private categoryservice: CategoryService, private notifyservice: NotifyService, private deleteconfirmationservice: DeleteconfirmationService, private editconfirmationservice: EditconfirmationService,
  ) { }

  ngOnInit() {

    this.dtOptions = {
      columns: [
        {
          title: 'Category Name',
          data: 'categoryname'
        }, {
          title: 'Display Order',
          data: 'displayorder'
        }],
      processing: true,
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ],
      dom: 't',
      bFilter: false,
      searching: false,
      // Use this attribute to enable colreorder

    };
    // this.dateAdapter.setLocale('en-GB');
    this.getLatestCategory();
  }


  openFormModal() {

    const modalRef = this.modalService.open(CategorymodalComponent);
    modalRef.result.then((result) => {

      // let timer1 = timer(2000, 5000);
      // timer1.subscribe(() => this.getLatestCategory());
    }).catch((error) => {

    });
  }

  //Get all user
  getLatestCategory() {

    this.showCategoryLoader = true;
    
    this.categoryservice.getAllCategory().subscribe((response) => {
      this.allCategory = response;
      this.showCategoryLoader = false;

      if (this.allCategory.length > 0) {
        this.dtOptions = this.allCategory;
        this.showCategoryGrid=!this.showCategoryGrid;
        this.dtOptions = {
          order: [[2, 'desc']],
          processing: true,
          
        }
        // this.showCategoryGrid = false;
      }
      else {
        return
      }
      
      // this.showCategoryGrid = !this.showCategoryGrid;
    })
  }

  // downloadCSV() {
  //   const csvData = exportCSV( this.allCategory);
  //   const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  //   saveAs(blob, 'table.csv');
  // }

  editCategory(categoryindex: any) {

    // this.editconfirmationservice.confirm('Warning', 'Do you really want to edit these records? This process cannot be undone.')
    //   .then((confirmed) => {
    const modalRef = this.modalService.open(EditcategoryComponent);
    modalRef.result.then((result) => {

      let timer1 = timer(2000, 5000);
      let c = timer1.subscribe(() => this.getLatestCategory());
      setTimeout(() => {
        c.unsubscribe();
      }, 2000)
    }).catch((error) => {

    });
    this.categoryservice.categoryeditObj = this.allCategory[categoryindex];
    //this.getLatestCategory();
    //})
    // .catch(() => {
    //this.getLatestCategory();
    //console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
    //}
    // );
  }

  deleteCategory(id: any) {

    this.deleteconfirmationservice.confirm('Are you sure?', 'Do you really want to delete these records? This process cannot be revoked.')
      .then((confirmed) => {
        this.categoryservice.deleteCategory(id).subscribe((response) => {

          this.deleteResponse = response;
          if (this.deleteResponse.apiStatus == 0) {
            this.getLatestCategory();
            this.showToasterSuccess();
          }
          else {
            this.showToasterError();
          }

        })
        this.getLatestCategory();
      })
      .catch(() => {
        this.getLatestCategory();
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
      }
      );
  }


  showToasterSuccess() {
    this.notifyservice.showSuccess("Category Deleted Successfully !!", "")
  }

  showToasterError() {
    this.notifyservice.showError("There was an error deleting the Category", "")
  }

  // date filetering
  filterData(startDate:any,endDate:any) {
    //this.allCategory = [];
    // Convert start and end date strings to Date objects
   startDate = new Date(this.startDate);
   endDate = new Date(this.endDate);
  
  // Filter data array to include only data with a timestamp between start and end dates
 this.allCategory = this.allCategory.filter((item:any) => {
    const timestamp = new Date(item.modifieddateutc);
    return timestamp >= startDate && timestamp <= endDate;
  });
  this.allCategory=this.allCategory;
  this.dtOptions = this.allCategory;
  // Return filtered data
  return this.allCategory;
    // this.allCategory = this.allCategory.filter((row:any) => this.filterByDateRange(row, startDate, endDate));
  }

}






