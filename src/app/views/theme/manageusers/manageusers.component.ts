import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../notify.service';
import { UserService } from '../user.service';
import { EdituserComponent } from '../edituser/edituser.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultService } from '../result.service';
import { EditconfirmationService } from '../editconfirmation.service';
import { DeleteconfirmationService } from '../deleteconfirmation.service';
import { Subject, timer } from 'rxjs';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatIconModule } from '@angular/material/icon';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewdetailComponent } from '../viewdetail/viewdetail.component';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { MatSelect } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { CheckboxConfirmationComponent } from '../checkbox-confirmation/checkbox-confirmation.component';
import { CountService } from '../../services/count.service';
import { AffiliateService } from '../affiliate.service';


@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageusersComponent implements OnInit, AfterViewInit {

  dtOptions: DataTables.Settings = {};
  showUserLoader: boolean = false;
  public buttonDisabled: boolean = false;
  allUser!: any;
  usereditObj = {
    firstname: '',
    lastname: '',
    email: '',
    familyrole: '',
    other: '',
  }
  deleteuser: any;
  showGrid: boolean = false;
  public visible = false;

  currentDate: string;
  startDate: string;

  familyResult: any;
  totalFamilyScore: any[] = Array();
  visitorid: any;
  imageUrl: any;
  familyCategoryScore: any;
  familyScore: any;
  familyType: any;
  total: any;
  familyName: any[] = Array();
  resultscoretotal: any;
  dateValidation: boolean = false;
  endDateValidation: boolean = false;
  allFamilyTypes: any;
  filterStatus: any;
  allAffiliateTypes: any;
  familyvisitorid: any;
  familymemberid: any;
  filteredData: any;
  // startDate: string;
  endDate: any;
  finalDateValue: any;
  searchQuery: any;
  searchText: any = '';
  familytypesearch: any = '';
  completedsearch: any = '';
  resultscore: any;
  familyname: any;
  newone: any;
  data: any;
  affiliatesearchText: any = '';
  receivedData: any;
  affiliateData: any;
  affiliateDate: any;
  dummyvalue: any;

  longText: any;
  imagepath: any;
  public isReadMore: boolean = true;
  public url: any = "../../../../assets/images/";

  readMore: boolean = true;
  hideToggle: boolean = true;
  @Input() text!: string;
  @Input() textIndividual!: string;
  @Input() maxLength: number = 1000;

  constructor(
    private datePipe: DatePipe,
    public activeModal: NgbActiveModal,
    private cdRef: ChangeDetectorRef,
    public userservice: UserService,
    private resultservice: ResultService,
    private notifyservice: NotifyService,
    private affiliateservice: AffiliateService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private countservice: CountService,
    private deleteconfirmationservice: DeleteconfirmationService,
    private editconfirmationservice: EditconfirmationService,
    private checkboxconfirmationservice: EditconfirmationService,
  ) {

    this.currentDate = this.getCurrentDate();
    this.startDate = this.getMinDate();
  }

  ngOnInit() {
    // this.receivedData = this.route.snapshot.paramMap.get('data');

    // console.log("receivedc data",this.receivedData);

    // this.route.queryParams.subscribe(params => {
    //   this.startDate = params['data'];
    // });

    this.getFamilyType();
    this.getAffliate();
   
    //this.getLatestUser();

    //get date and id from affiliate management
    this.dummyvalue = this.affiliateservice.dummyvalue;
    if(this.dummyvalue) {
      this.affiliateData = this.affiliateservice.getAffiliate();
      this.affiliateDate = this.affiliateservice.getAffiliateDate();
      if (this.affiliateDate && this.affiliateData) {
        this.affiliatesearchText = this.affiliateData
        this.onSearchOfStatus(this.affiliateDate, this.currentDate, this.familytypesearch, this.completedsearch, this.affiliatesearchText);
        const  dummyvalue=false
       this.affiliateservice.dummyvalue=dummyvalue;
      }
    }
    else{
      this.filterData();
    }
    
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

  // export button
  downloadCSV() {
    const data = this.allUser.map((data: any) => {
      data = [
        { FamilyName: data.Familyname, FamilyType: this.familyName, LastUpdatedat: data.Modifieddateutc },
      ];
      return data;
    })

    const selectedColumns = ['Familyname', 'Familytype', 'Modifieddateutc', 'Invitedmemberscount'];
    const csvData = this.allUser.map((row: any) =>

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
      title: 'Family Details',
      useBom: true,
      noDownload: false,
      allColumns: false,
      only: selectedColumns,
      headers: ["Family Name", "Family Type", "Last Updated", "Family Members"]
    };
    new ngxCsv(csvData, "Family Report", options);
  }

  //Get all user
  getLatestUser() {
    this.showUserLoader = true;
    this.userservice.getHOH().subscribe((response) => {
      this.allUser = response;
      this.allUser.forEach((element: any) => {
        element.Score.forEach((familytype: any) => {
          if (familytype.Firstname == null) {
            this.familyName.push(familytype.TypeDetails.FamilyTypeName);
          }
        })
      })

      this.showUserLoader = false;
      if (this.allUser.length > 0) {
        this.dtOptions = this.allUser;
        this.dtOptions = {
          lengthMenu: [
            [30, 60, 90, -1],
            [30, 60, 90, 'All'],
          ],
          order: [],
          searching: false
        };
      }
      else {
        this.showToasterError();
        return
      }
      this.showGrid = !this.showGrid;
      if (!this.showGrid) {
        this.showGrid = !this.showGrid;
      }
      this.cdRef.detectChanges();
    })
  }

  // edit family-now its off
  editUser(userindex: any) {

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
  }

  // delete family-now its off
  deleteUser(id: any) {
    this.deleteconfirmationservice.confirm('Are you sure?', 'Do you really want to delete these records? This process cannot be revoked.')
      .then((confirmed) => {
        this.userservice.deleteUser(id).subscribe((response) => {
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

  // toaster
  showToasterSuccess() {
    this.notifyservice.showSuccess("HOH Deleted Successfully !!", "")
  }

  showToasterError() {
    this.notifyservice.showError("Please wait!!", "There is an Error")
  }

  // view invitee details
  viewInvitors(familyid: any) {

    this.resultservice.familyid = familyid;
    const modalRef = this.modalService.open(ViewdetailComponent);
    modalRef.result.then((result) => {

    }).catch((error) => {
    });
  }

  ngAfterViewInit() {

    this.dtOptions = this.allUser;
  }

  //  family result button
  toggleLiveDemo(score: any, familyname: any, i: any) {



    this.familyname = familyname;
    this.visible = !this.visible;
    this.resultscoretotal = score;
    this.resultscoretotal.forEach((element: any) => {


      if (element.Firstname == null) {
        this.resultscore = element;
      }


    })
    // this.resultscore = score[i];

    this.familyType = this.resultscore.TypeDetails.FamilyTypeName;
    this.getFamilyResult(this.resultscore, this.resultscoretotal);

  }

  //get family result
  getFamilyResult(score: any, totalPersonScore: any) {

    this.familyResult = score;
    this.totalFamilyScore = totalPersonScore;

    if (this.totalFamilyScore && this.familyResult) {
      this.newone = this.totalFamilyScore[this.totalFamilyScore.length - 1];
      this.newone = this.newone.CategorywiseScores;
      this.familyCategoryScore = this.familyResult.CategorywiseScores;
      this.longText = this.familyResult.TypeDetails.LongDescription;
      this.text = this.longText.substring(0, this.maxLength) + "...";
      this.imageUrl = this.familyResult.TypeDetails.FamilyTypeName;
      console.log("this.familyResult",this.familyResult);
      this.imagepath = this.url + this.imageUrl + '.svg';
    }
    else {
      this.showToasterError()
    }
  }

  // hide and show the readmore section
  determineView() {
    if (!this.longText || this.longText.length <= this.maxLength) {
      this.text = this.longText;
      this.hideToggle = true;
    }
    this.hideToggle = false;

    if (this.readMore == true) {
      this.text = this.longText.substring(0, this.maxLength) + "...";

    } else if (this.readMore == false) {
      this.text = this.longText;
    }
    else {

    }
  }

  // readmore text in result section
  toggleView() {
    this.readMore = !this.readMore;
    this.determineView();

  }

  // date filter
  filterData() {
    this.receivedData = this.countservice.getData();
    this.dateValidation = false;
    this.endDateValidation = false;

    //Validation
    if (this.startDate == null || this.startDate == undefined || this.startDate == "") {
      this.dateValidation = !this.dateValidation;
      return
    }
    else if (this.currentDate == null || this.currentDate == undefined || this.currentDate == '') {
      this.endDateValidation = !this.endDateValidation;
      return
    }
    else {

    }

    this.showUserLoader = true;
    this.showGrid =false;
    if (this.receivedData) {
      this.startDate = this.receivedData;
     
    }
    // this.receivedData="";
    const dateValue = {
      "dateFrom": this.startDate,
      "dateTo": this.currentDate
    }
    this.userservice.dateFilter(dateValue).subscribe((response) => {

      this.allUser = response;
      if (this.allUser.length > 0) {
        this.dtOptions = this.allUser;
        this.dtOptions = {
          lengthMenu: [
            [30, 60, 90, -1],
            [30, 60, 90, 'All'],
          ],
          order: [],
          searching: false
        };
      }
      else {
        this.showToasterError();
        return
      }
      this.showGrid =true;
      // this.showGrid = !this.showGrid;
      // if (!this.showGrid) {
      //   this.showGrid = !this.showGrid;
      // }
    })

    this.receivedData = this.countservice.removeData();

  
  }

  // global search
  onSearch() {
    this.userservice.globalsearch(this.searchQuery).subscribe((response) => {

      this.allUser = response;
    })
  }

  // filter based search
  onSearchOfStatus(startDate: any, endDate: any, familyType: any, completedFamily: any, affiliateSearch: any) {

    const originalStartDate = new Date(startDate);
    const formattedStartDate = this.datePipe.transform(originalStartDate, 'yyyy-MM-dd');
    const originalEndDate = new Date(endDate);
    const formattedEndDate = this.datePipe.transform(originalEndDate, 'yyyy-MM-dd');


    this.showUserLoader = true;
    this.userservice.searchstatus(formattedStartDate, formattedEndDate, familyType, completedFamily, affiliateSearch).subscribe((response) => {
      this.allUser = [];
      this.showGrid = false;
      setTimeout(() => {
    
        this.allUser = response;
        this.dtOptions = this.allUser;
        this.dtOptions = {
          lengthMenu: [
            [30, 60, 90, -1],
            [30, 60, 90, 'All'],
          ],
          order: [],
          searching: false
        }
        this.showUserLoader = false;
        this.showGrid = true;
      }, 400);
    })
    // this.showGrid = !this.showGrid;
    // if (!this.showGrid) {
    //   this.showGrid = !this.showGrid;
    // }
  }

  // close result modal
  closeResult() {
    this.visible = !this.visible;
  }

  //get all family types
  getFamilyType() {

    this.userservice.getFamilyType().subscribe((response) => {

      this.allFamilyTypes = response;
    })
  }


  //get Affiliates
  getAffliate() {
    this.userservice.getAffiliateTypes().subscribe((response) => {
      this.allAffiliateTypes = response;
    })
  }



  // defaultOption:any='Assessment Status'
  // selectedValue = '';
  // closeDropdown() {
  //   const selectElement = document.getElementById("select1");
  //   console.log("...,",selectElement)
  //   if (selectElement) {
  //     this.selectedValue = 'Assessment Status';
  //     selectElement.blur();
  //   }
  // }






}
