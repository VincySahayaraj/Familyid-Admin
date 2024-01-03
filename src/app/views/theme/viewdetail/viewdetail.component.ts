import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from '../notify.service';
import { ResultService } from '../result.service';
import { CheckboxconfirmationService } from '../checkboxconfirmation.service';
import { ViewresultComponent } from '../viewresult/viewresult.component';
import { CheckboxConfirmationComponent } from '../checkbox-confirmation/checkbox-confirmation.component';
import { ngxCsv } from 'ngx-csv';

@Component({
  selector: 'app-viewdetail',
  templateUrl: './viewdetail.component.html',
  styleUrls: ['./viewdetail.component.scss']
})
export class ViewdetailComponent {

  inviteeResult: any;
  familyCategoryScore: any;
  hohName: any;
  familyScore: any;
  familyType: any;
  total: any;
  familyResult: any;
  totalFamilyScore: any;
  visitorid: any;
  imageUrl: any;
  hohmasterid: any;
  viewResultEnable: boolean = false;
  id: any;
  showdetailGrid: boolean = false;
  dtOptions: DataTables.Settings = {};
  public visible = false;
  familyvisitorid: any;
  longText: any;
  imagepath: any;
  public isReadMore: boolean = true;
  public url: any = "../../../../assets/images/";
  readMore: boolean = true;
  hideToggle: boolean = true;
  isHOH: any=false;
  Hohmemberid:any;
  newHoh: any;
  @Input() text!: string;
  @Input() textIndividual!: string;
  @Input() maxLength: number = 1000;

  familyid: any;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private resultservice: ResultService,
    private modalService: NgbModal,
    private CheckboxConfirmationService: CheckboxconfirmationService,
    private notifyservice: NotifyService) {
  }

  ngOnInit() {
    this.visitorid = this.resultservice.visitorid;
    this.familyvisitorid = this.resultservice.familyvisitorid;
    this.familyid = this.resultservice.familyid;

    this.hohmasterid = this.resultservice.hohmasterid;
    if (this.familyid == '') {

      this.router.navigate(['/manage/manageusers'])
    }
    this.getInvitees(this.familyid);
    this.dtOptions = {
      ajax: this.inviteeResult,
      

    };
  }

  // get invitees
  getInvitees(familyid: any) {

    this.resultservice.getInviteeDetails(familyid).subscribe((response) => {

      this.inviteeResult = response;
      
      this.dtOptions = {
        lengthMenu: [
          [30, 60, 90, -1],
          [30, 60, 90, 'All'],
        ],
        searching: true,
        ordering:false
        // order: [3, 'desc']
      };

      if (this.inviteeResult.apiStatus == 1) {
        return
      }
      else {
        this.showdetailGrid = true
        this.inviteeResult.forEach((element: {
          Firstname: any; Lastname: String; IsHoh: any
        }) => {
          this.id = element.Lastname;
          // this.isHOH=element.IsHoh;
          if (element.IsHoh == true) {

            this.isHOH = element.Firstname;
    
          }
          if (element.Lastname != "") {
            this.viewResultEnable = !this.viewResultEnable;
          }
        })
      }
    })
  }
  viewResultInvitee(visitorid: any, visitorname: any, familymemberid: any, score: any) {

    this.resultservice.visitorid = visitorid;
    this.resultservice.visitorname = visitorname;
    this.resultservice.familymemberid = familymemberid;
    this.resultservice.score = score
    const modalRef = this.modalService.open(ViewresultComponent);
    modalRef.result.then((result) => {

    }).catch((error) => {

    });
  }
  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  //Open family result modal
  openFamilyResultModal(event: any) {
    this.visible = event;
    this.familyvisitorid = this.resultservice.familyvisitorid;
    this.getFamilyResult(this.familyvisitorid);
  }
  close() {
    this.activeModal.dismiss('Cross click');
  }

  getFamilyResult(visitorid: any) {

    if (visitorid) {
      this.resultservice.getFamilyResult(this.familyvisitorid).subscribe((response) => {
        this.familyResult = response;
        if (this.familyResult.apiStatus == 1) {
          return
        }

        if (this.familyResult) {
          this.familyCategoryScore = this.familyResult[0].CategorywiseScores;
          this.familyScore = this.familyResult[this.familyResult.length - 1];
          this.totalFamilyScore = this.familyScore.CategorywiseScores;
          this.familyType = this.familyScore.TypeDetails.FamilyTypeName;
          this.total = this.familyResult[this.familyResult.length - 1].TotalScore[0].Percentage;
          this.total = this.total;
          // hoh result-individual
          // this.individualResult = this.familyResult[0].CategorywiseScores;
          // this.individualTotal = this.familyResult[0].TotalScore[0].Percentage;
          this.hohName = this.familyResult[0].Firstname
          this.longText = this.familyResult[this.familyResult.length - 1].TypeDetails.LongDescription;
          this.text = this.longText.substring(0, this.maxLength) + "...";
          this.imageUrl = this.familyResult[this.familyResult.length - 1].TypeDetails.FamilyType;
          this.imagepath = this.url + this.imageUrl + '.svg';

        }
        else {

          this.showToasterError()

        }
      })
    }
    // else {

    //   this.showToasterError()
    // }
  }

  determineView() {
    if (!this.longText || this.longText.length <= this.maxLength) {
      this.text = this.longText;
      //this.readMore = false;
      this.hideToggle = true;
      //this.individualToggle=true;
      // return;
    }
    //this.individualToggle=false;
    this.hideToggle = false;

    if (this.readMore == true) {
      this.text = this.longText.substring(0, this.maxLength) + "...";

    } else if (this.readMore == false) {
      this.text = this.longText;
    }
    else {

    }
  }
  toggleView() {
    this.readMore = !this.readMore;
    //this.individualToggle=!this.individualToggle;
    this.determineView();

  }

  //success Toast
  showToasterSuccess() {

    this.notifyservice.showSuccess("Answer Submitted successfully !!", "")
  }

  //Error Toast
  showToasterError() {
    this.notifyservice.showError("No HOH Details Found!!", "")
  }


  downloadCSV() {
    const selectedColumns = ['Firstname', 'Email', 'Familyrole', 'Modifieddateutc', 'Status'];

    const options = {
      headers: ['Name', 'Email', 'Family Role', 'Last Updated', 'Status'],
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Invited Members Report',
      useTextFile: false,
      only: selectedColumns,
      useBom: true,
      filename: 'Invited Members'
    };

    // const csvData=this.inviteeResult.map((item:any)=>{
    //   const newItem = {};
    //   selectedColumns.forEach((column:any) => {
    //     // newItem[column] = item[column];
    //   });
    //   return newItem;
    // })

    const csvData = this.inviteeResult.map((row: any) =>

      selectedColumns.map((col: string) =>
        row[col],
        // row['Name']=`${row.Firstname} ${row.Lastname}`

      ))
    new ngxCsv(csvData, "Invitees Report", options);

  }

  // created HOH
  createdHOH(familyid: any, familymemberid: any, firstname: any) {

    this.newHoh = firstname;
    this.inviteeResult.forEach((element: any) => {
      if (element.IsHoh == true) {

        // this.isHOH=!this.isHOH;
        this.Hohmemberid = element.Familymemberid;
      }
    })
    if (familymemberid==this.Hohmemberid) {

      this.CheckboxConfirmationService.confirm('Please select another person', 'Already this person as HOH?')
      .then((confirmed: any) => {
        this.getInvitees(this.familyid);
      })
    }
    else{

      this.CheckboxConfirmationService.confirm('Warning', 'Do you really want to make ' + this.newHoh + ' as HOH?')
      .then((confirmed: any) => {
        // this.inviteeResult.forEach((element:any)=>{

        //   if(element.IsHoh=='true'){

        //   }

        // })

        this.resultservice.createHOH(familyid, familymemberid).subscribe((response) => {

          this.getInvitees(this.familyid);
          this.showToasterHOHSuccess();
          this.dtOptions = {
            lengthMenu: [
              [30, 60, 90, -1],
              [30, 60, 90, 'All'],
            ],
            searching: true,
            ordering:false,
          
            
            // order: [3, 'desc']
          };
        })
        // this.getInvitees(this.familyid);
      })
      .catch(() => {
        this.getInvitees(this.familyid);
        this.dtOptions = {
          lengthMenu: [
            [30, 60, 90, -1],
            [30, 60, 90, 'All'],
          ],
          searching: true,
          order: []
          // order: [3, 'desc']
        };
      })
    }
  }

  showToasterHOHSuccess() {
    this.notifyservice.showSuccess("HOH Changed Successfully !!", "")
  }

  showToasterHOHError() {
    this.notifyservice.showError("There was an error ", "Please wait")
  }
 
}
