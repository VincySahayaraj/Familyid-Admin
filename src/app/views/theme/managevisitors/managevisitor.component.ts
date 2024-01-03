
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from '../notify.service';
import { UserService } from '../user.service';
import { EdituserComponent } from '../edituser/edituser.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultService } from '../result.service';
import { EditconfirmationService } from '../editconfirmation.service';
import { DeleteconfirmationService } from '../deleteconfirmation.service';
import { timer } from 'rxjs';
import { ViewresultComponent } from '../viewresult/viewresult.component';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { DatePipe } from '@angular/common';
import { CountService } from '../../services/count.service';

@Component({
  selector: 'app-managevisitor',
  templateUrl: './managevisitor.component.html',
  styleUrls: ['./managevisitor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManagehohComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  showVisitorLoader: boolean = false;
  allUser!: any;
  usereditObj = {
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    familyrole: '',
    other: '',
  }
  deleteuser: any;
  searchQueryVisitor: any;
  showVisitorGrid: boolean = false;
  isHOH: boolean = false;
  familyrole: any = '';
  allAffiliateTypes: any;

  dateValidation: boolean = false;
  endDateValidation: boolean = false;
  currentDate: string;
  startDate: string;
  affiliateChurch: any = '';
  olddate: any;
  newdate: any;
  receivedData: any;
  attemptCount:any;

  allFamilyRoles = ['Father', 'Mother', 'Brother', 'Sister', 'Other']

  constructor(
    private cdRef: ChangeDetectorRef,
    public userservice: UserService,
    private countservice: CountService,
    private resultservice: ResultService,
    private notifyservice: NotifyService,
    private modalService: NgbModal,
    private router: Router,
    private deleteconfirmationservice: DeleteconfirmationService,
    private editconfirmationservice: EditconfirmationService,
    private datePipe: DatePipe,

  ) {
    this.currentDate = this.getCurrentDate();
    this.startDate = this.getMinDate();

  }

  ngOnInit() {

    this.getAffliate();
    this.filterData();
  }

  //csv export
  downloadCSV() {
    const selectedColumns = ['Name', 'Email', 'Contactno', 'Familyrole', 'Modifieddateutc','AttemptCount'];
    const csvData = this.allUser.map((row: any) =>
      selectedColumns.map((col: string) =>
        row[col],
        //row['visitedtimeutc']=`${row.visitedtimeutc.split('T')[0]}`,
        row['Name'] = `${row.Firstname} ${row.Lastname}`
      )
    );
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Family Members Details',
      useBom: true,
      noDownload: false,
      allColumns: false,
      only: selectedColumns,
      headers: ["Name", "Email", "Contact Number", "Family Role", "Last Updated","Assessment Count"]
    };
    new ngxCsv(csvData, "Family Members Report", options);
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

  //Get all user
  getLatestUser() {

    this.showVisitorLoader = true;
    this.userservice.getVisitorList().subscribe((response) => {
      this.allUser = response;

      console.log("this.allUser",this.allUser)
      this.showVisitorLoader = false;
      if (this.allUser.length > 0) {
        this.dtOptions = this.allUser;
        this.dtOptions = {
          lengthMenu: [
            [30, 60, 90, -1],
            [30, 60, 90, 'All'],

          ],
          order: [[4, 'desc']],
          searching: false
        };
      }
      else {
        this.showToasterError();
        return
      }
      this.showVisitorGrid = !this.showVisitorGrid;
      this.cdRef.detectChanges();

    })
  }

  // Edit functionality-now its turn off
  editUser(userindex: any) {
    this.editconfirmationservice.confirm('Warning', 'Do you really want to edit these records? This process cannot be undone.')
      .then((confirmed) => {
        const modalRef = this.modalService.open(EdituserComponent);
        modalRef.result.then((result) => {
          let timer1 = timer(2000, 5000);
          let c = timer1.subscribe(() => this.getLatestUser());
          setTimeout(() => {
            c.unsubscribe();
          }, 2000)
        }).catch((error) => {
        });
        this.userservice.usereditObj = this.allUser[userindex];
        //this.getLatestUser();
      })
      .catch((exception) => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog,)', exception));
  }

  // Delete functionality-now its turn off
  deleteUser(id: any) {
    this.deleteconfirmationservice.confirm('Are you sure?', 'Do you really want to delete these records? This process cannot be undone.')
      .then((confirmed) => {
        this.userservice.deleteVisitor(id).subscribe((response) => {
          this.deleteuser = response;
          if (this.deleteuser.apiStatus == 0) {
            this.getLatestUser();
            this.showToasterSuccess();
          }
          else {
            this.showToasterError();
          }
        })
        this.getLatestUser();
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  // Toaster
  showToasterSuccess() {
    this.notifyservice.showSuccess("HOH Deleted Successfully !!", "");
  }

  showToasterError() {
    this.notifyservice.showError("Please wait", "There is an Error");
  }

  // result section
  viewResult(familymemberid: any, visitorname: any) {
    this.resultservice.familymemberid = familymemberid;
    this.resultservice.visitorname = visitorname;
    const modalRef = this.modalService.open(ViewresultComponent);
    modalRef.result.then((result) => {
    }).catch((error) => {
    });
    //this.router.navigate(['/manage/viewresult']);
  }

  // global search
  onSearchVisitor() {
    this.userservice.globalsearchForMembers(this.searchQueryVisitor).subscribe((response) => {
      this.allUser = [];
      this.showVisitorGrid = false;
      setTimeout(() => {
        this.allUser = response;
        if (this.allUser.length > 0) {
          this.dtOptions = this.allUser;
          this.dtOptions = {
            lengthMenu: [
              [30, 60, 90, -1],
              [30, 60, 90, 'All'],
            ],
            order: [[4, 'desc']],
            searching: false
          };
        }
        else {
          // this.showToasterError();
          return
        }
        this.showVisitorLoader = false;
        this.showVisitorGrid = true;
      }, 400)
    })
  }


  // date filter
  filterData() {
    this.receivedData = this.countservice.getData();
 

    this.dateValidation = false;
    this.endDateValidation = false;

    // date validation
    // if (this.startDate == null || this.startDate == undefined || this.startDate == "") {
    //   this.dateValidation = !this.dateValidation;
    //   return;
    // }
    // if (this.currentDate == null || this.currentDate == undefined || this.currentDate == '') {
    //   this.endDateValidation = !this.endDateValidation;
    //   return;
    // }
    if (this.receivedData) {
      this.startDate = this.receivedData;
    }
    this.showVisitorLoader = true;
    // Convert start and end date strings to Date objects
    // this.startDate = new Date(this.startDate);
    // this.currentDate = new Date(this.currentDate);

    const dateValue = {
      "dateFrom": this.startDate,
      "dateTo": this.currentDate
    }

    this.userservice.dateFilterforuser(dateValue).subscribe((response) => {

      this.allUser = [];
      this.showVisitorGrid = false;
      setTimeout(() => {
        this.allUser = response;
      
        if (this.allUser.length > 0) {
          this.dtOptions = this.allUser;
          this.dtOptions = {
            lengthMenu: [
              [30, 60, 90, -1],
              [30, 60, 90, 'All'],
            ],
            order: [[4, 'desc']],
            searching: false
          };
        }
        else {
          // this.showToasterError();
          return
        }
        this.showVisitorLoader = false;
        this.showVisitorGrid = true;
      }, 400)
    })
    this.receivedData = this.countservice.removeData();
  }

  //search based on affiliate filter
  affliateSearchofMembers() {

    this.userservice.affiliateSearch(this.affiliateChurch).subscribe((response) => {
      this.allUser = [];
      this.showVisitorGrid = false;
      setTimeout(() => {
        this.allUser = response;
        this.showVisitorLoader = false;
        this.showVisitorGrid = true;
      }, 400)
    })
  }

  onSearchOfFilters(startDate: any, endDate: any, position: any, familyrole: any, affiliateFilter: any) {

    const originalStartDate = new Date(startDate);
    const formattedStartDate = this.datePipe.transform(originalStartDate, 'yyyy-MM-dd');
    const originalEndDate = new Date(endDate);
    const formattedEndDate = this.datePipe.transform(originalEndDate, 'yyyy-MM-dd');
    this.userservice.listbyFilters(formattedStartDate, formattedEndDate, position, familyrole, affiliateFilter).subscribe((response) => {
      this.allUser = [];
      this.showVisitorGrid = false;
      setTimeout(() => {
        this.allUser = response;
        this.showVisitorLoader = false;
        this.showVisitorGrid = true;
      }, 400)
    })
  }

  //get Affiliates
  getAffliate() {
    this.userservice.getAffiliateTypes().subscribe((response) => {
      this.allAffiliateTypes = response;
    })
  }
}