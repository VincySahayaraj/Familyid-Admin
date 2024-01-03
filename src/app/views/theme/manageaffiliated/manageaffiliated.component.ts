import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AffiliatedmodalComponent } from '../affiliatedmodal/affiliatedmodal.component';
import { AffiliateService } from '../affiliate.service';
import { ngxCsv } from 'ngx-csv';
import { NotifyService } from '../notify.service';

import { EditAffiliateComponent } from '../edit-affiliate/edit-affiliate.component';
import { DeleteconfirmationService } from '../deleteconfirmation.service';
import { timer } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common';
import { ClipboardService } from 'ngx-clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageaffiliated',
  templateUrl: './manageaffiliated.component.html',
  styleUrls: ['./manageaffiliated.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageaffiliatedComponent {

  filteredData: any;
  startDate: any;
  endDate: any;
  finalDateValue: any;
  searchText: any = '';
  allAffiliateData: any;
  searchQuery: any;
  public buttonDisabled: boolean = false;
  allAffiliates: any;
  hyphenshow='-';
  familyDetails:any;
  copyText:any=false;
  copied:any=false;
  // dtOptions: any = {
  //   searching: false
  // };
  dateValidation: boolean = false;
  endDateValidation: boolean = false;
  statusAffiliate: any = '';
  showAffiliateGrid: boolean = false;

  showAffiliateLoader: any = false;

  visible: boolean = false;
  // dtOptions: any = {


  // };
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  deleteResponse: any;

  constructor(
    private modalService: NgbModal,
    private notifyservice: NotifyService,
    private datePipe: DatePipe,
    private affiliateservice: AffiliateService,
    private clipboardService: ClipboardService,
    private deleteconfirmationservice: DeleteconfirmationService,
    private router: Router,
  ) {
    this.endDate = this.getCurrentDate();
    this.startDate = this.getMinDate();
  }
  getMinDate(): string {
    const today = new Date();
    const minDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const year = minDate.getFullYear();
    const month = (minDate.getMonth() + 1).toString().padStart(2, '0');
    const day = minDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit() {
    this.dtOptions = {

      searching: false,
      lengthMenu: [
        [30, 60, 90, -1],
        [30, 60, 90, 'All'],
      ],
      //destroy: true,
      order: [[4, 'desc']],

    };
    // this.dtOptions = this.allAffiliates;

    this.getAffiliates();
  }

  // modal for add affiliate
  openLinkModal() {
    const modalRef = this.modalService.open(AffiliatedmodalComponent);
    modalRef.result.then((result) => {
    }).catch((error) => {
    });
  }


  // date filter
  affliatefilterData() {

    this.dateValidation = false;
    this.endDateValidation = false;

    // validation
    if (this.startDate == null || this.startDate == undefined || this.startDate == "") {
      this.dateValidation = !this.dateValidation;
      return
    }

    else if (this.endDate == null || this.endDate == undefined || this.endDate == '') {
      this.endDateValidation = !this.endDateValidation;
      return
    }
    else {

    }

    this.showAffiliateLoader = true;
    // Convert start and end date strings to Date objects
    this.startDate = new Date(this.startDate);
    this.endDate = new Date(this.endDate);

    const dateValue = {
      "dateFrom": this.startDate,
      "dateTo": this.endDate
    }
    this.showAffiliateLoader = true;
    this.affiliateservice.affiliatedateFilter(dateValue).subscribe((response) => {

      // this.allAffiliates = [];
      // this.showAffiliateGrid = false;
      // setTimeout(() => {
      // this.allAffiliates = response;
      // this.showAffiliateLoader = false;
      //this.showAffiliateGrid = true;
      //console.log("date filter result", this.allAffiliates)
      // }, 400)

      this.showAffiliateGrid = !this.showAffiliateGrid;
      this.allAffiliates = response;
      // this.rerender()
      this.showAffiliateLoader = false;

      if (this.allAffiliates.length > 0) {
        this.dtOptions = this.allAffiliates;
      }
      else {
        return
      }
      this.dtOptions = this.allAffiliates;
      this.dtOptions = {

        lengthMenu: [
          [30, 60, 90, -1],
          [30, 60, 90, 'All'],
        ],
        searching: false,
        //destroy: true,
        order: [[4, 'desc']],
        // columnDefs: [
        //   { orderable: false, targets: '_all' }
        // ],
      };
    })
  }

  // global search
  onSearch() {
    this.affiliateservice.globalSearchonAffiliate(this.searchQuery).subscribe((response) => {
      this.allAffiliates = [];
      this.showAffiliateGrid = false;
      setTimeout(() => {
        this.allAffiliates = response;
        this.showAffiliateLoader = false;
        this.showAffiliateGrid = true;
      }, 400)
    })
  }
  // export button
  downloadCSV() {
    const selectedColumns = ['Firstname', 'Organizationorchurchname', 'Email','Contactno','Modifieddateutc','Affiliatelink'];
    const csvData = this.allAffiliates.map((row: any) =>
      selectedColumns.map((col: string) =>
        row[col]
      ),
    );
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Affiliate Details',
      useBom: true,
      noDownload: false,
      allColumns: false,
      only: selectedColumns,
      headers: ["Name", "Church Name", "Email","Contact Number","Last Updated","Affiliate Link"]
    };
    new ngxCsv(csvData, "Affiliate Report", options);
  }

  //search based on affiliate filter
  affliateSearchofStatus(startDate: any, endDate: any) {
    const originalStartDate = new Date(startDate);
    const formattedStartDate = this.datePipe.transform(originalStartDate, 'yyyy-MM-dd');
    const originalEndDate = new Date(endDate);
    const formattedEndDate = this.datePipe.transform(originalEndDate, 'yyyy-MM-dd');
    this.showAffiliateLoader = true;
    this.affiliateservice.statusFilter(formattedStartDate, formattedEndDate).subscribe((response) => {
      // console.log("affliate search", response)
      this.allAffiliates = [];
      this.showAffiliateGrid = false;
      setTimeout(() => {
        this.allAffiliates = response;
        this.showAffiliateLoader = false;
        this.showAffiliateGrid = true;
      }, 400)
    })
  }

  getAffiliates() {
    this.startDate = new Date(this.startDate);
    this.endDate = new Date(this.endDate);
    const dateValue = {
      "dateFrom": this.startDate,
      "dateTo": this.endDate
      //"dateTo":"2023-05-18T23:00:00.000Z"
    }
    this.showAffiliateLoader = true;
    // this.showAffiliateGrid =!this.showAffiliateGrid
    this.affiliateservice.getAffiliates(dateValue).subscribe((response) => {
      
      //this.showAffiliateGrid = !this.showAffiliateGrid;
      this.allAffiliates = response;
      // this.rerender()
      this.showAffiliateLoader = false;

      if (this.allAffiliates.length > 0) {
        this.dtOptions = this.allAffiliates;
        this.dtOptions = {

          lengthMenu: [
            [30, 60, 90, -1],
            [30, 60, 90, 'All'],
          ],
          searching: false,
          order: []
       
          //destroy: true,
          // order: [[-1, '']],
          // columnDefs: [
          //   { orderable: false, targets: '_all' }
          // ],
        };
      }
      else {
        return
      }
      this.showAffiliateGrid = !this.showAffiliateGrid;
      if (!this.showAffiliateGrid) {
        this.showAffiliateGrid = !this.showAffiliateGrid;
      }
    })
  }

  editAffiliate(affiliateindex: any, id: any) {
    // this.editconfirmationservice.confirm('Warning', 'Do you really want to edit these records? This process cannot be undone.')
    //   .then((confirmed) => {

    this.affiliateservice.affiliateObj.Affiliateid = id;
  
    const modalRef = this.modalService.open(EditAffiliateComponent);
    modalRef.result.then((result) => {
      let timer1 = timer(2000, 5000);
      let c = timer1.subscribe(() => this.getAffiliates());
      setTimeout(() => {
        c.unsubscribe();
      }, 2000)
    }).catch((error) => {

    });
    this.affiliateservice.affiliateObj = this.allAffiliates[affiliateindex];

    //this.getLatestCategory();
    //})
    // .catch(() => {
    //this.getLatestCategory();
    //console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
    //}
    // );
  }

  deleteAffiliate(id: any) {

    this.deleteconfirmationservice.confirm('Are you sure?', 'Do you really want to delete these records? This process cannot be revoked.')
      .then((confirmed) => {
        this.affiliateservice.deleteAffiliate(id).subscribe((response) => {

          this.deleteResponse = response;
          if (this.deleteResponse.apiStatus == 0) {
            this.getAffiliates();
            this.showToasterSuccess();
          }
          else {
            this.showToasterError();
          }
        })
        this.getAffiliates();
      })
      .catch(() => {
        this.getAffiliates();
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
      }
      );
  }

  showToasterSuccess() {
    this.notifyservice.showSuccess("Affiliate Deleted Successfully !!", "")
  }

  showToasterError() {
    this.notifyservice.showError("There was an error deleting the Affiliate", "")
  }

  viewFamilies(familyaffiliateid: any,createdDate:any) {

       const  dummyvalue=true

       this.affiliateservice.dummyvalue=dummyvalue;

    this.affiliateservice.setAffiliate(familyaffiliateid,createdDate,dummyvalue);
    this.router.navigate(['/manage/manageusers']);

     this.affiliateservice.getFamilyDetails(familyaffiliateid).subscribe((response) => {

      // console.log("family deatils", response)
      this.familyDetails=response;
      this.visible=!this.visible;

    })

    // this.resultservice.familyid = familyid;
    // const modalRef = this.modalService.open(ViewdetailComponent);
    // modalRef.result.then((result) => {

    // }).catch((error) => {
    // });
  }

  // close result modal
  closeResult() {
    this.visible = !this.visible;
  }

  copyAffiliate(link:any,i:any){

    var formElement = <HTMLFormElement>document.getElementById("copy_" + i);
    formElement.style.display = 'flex';
      setTimeout(()=>{
        formElement.style.display = 'none';
      },2000)
    this.clipboardService.copyFromContent(link);
  }

  gotoFamilies(){

    this.router.navigate(['/manage/manageusers']);
  }
}
