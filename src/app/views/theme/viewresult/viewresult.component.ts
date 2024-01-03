
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Options } from "ng5-slider";
import { Router } from '@angular/router';
import { NotifyService } from '../notify.service';
import { ResultService } from '../result.service'
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewresult',
  templateUrl: './viewresult.component.html',
  styleUrls: ['./viewresult.component.scss']
})

export class ViewresultComponent implements AfterViewInit {

  showResultGrid: any = false;
  currentIndex: any = 0;
  visitorid: any;
  visitorname: any;
  hohid: any;
  hohResponse: any;
  id: any;
  resultResponse: any;
  thisAttemptPercentage: any[] = Array();
  totalScore: any;
  result: any;
  categoryResponse: any;
  i: any = 0;
  individualResult: any;
  attemptResult: any;
  attemptCount: any;
  public isExpanded: boolean = false;
  public url: any = "../../assets/images/";
  public imageFormat: any = '.svg'
  familyType: any[] = Array();
  imageUrl: any[] = Array();
  longText: any[] = Array();
  textIndividual: any[] = Array();
  imagepath: any[] = Array();
  attemptDate: any[] = Array();

  readMore: boolean = true;
  highValue: number = 100;
  accOpen:boolean=false;
  // options: Options = {
  //   floor: 0,
  //   ceil: 100,
  //   step: 1,
  //   showTicksValues: true,
  //   disabled: true,

  //   translate: (value: number): string => {
  //     return '' + value;
  //   },
  // };

  public isReadMore: boolean = true;

  hideToggle: boolean = true;

  Individualscore: any;
  familymemberid: any;

  @Input() text: string;
  @Input() maxLength: number = 1000;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private resultservice: ResultService,
    private notifyservice: NotifyService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {

    this.visitorid = this.resultservice.visitorid;
    this.visitorname = this.resultservice.visitorname;
    this.familymemberid = this.resultservice.familymemberid;
    this.Individualscore = this.resultservice.score;

    if (this.familymemberid == '') {

      this.router.navigate(['/manage/manageusers'])
    }
    this.getAttemptResult(this.familymemberid);
  }

  ngAfterViewInit(): void {

    this.visitorid = this.resultservice.visitorid;

  }

  value: any = '';

  getAttemptResult(familymemberid: any) {

    if (this.familymemberid != '') {
      this.resultservice.getAttemptResult(familymemberid).subscribe((response) => {

        this.attemptResult = response;
        this.showResultGrid = true;
        this.attemptResult.forEach((element: any) => {
          this.thisAttemptPercentage.push(element.TotalScore[0].Percentage);
          this.familyType.push(element.TypeDetails.FamilyTypeName);
          this.imageUrl.push(element.TypeDetails.FamilyTypeName);
          this.longText.push(element.TypeDetails.LongDescription);
          this.attemptDate.push(element.AttemptTime);
        })

        this.longText.forEach((element: any) => {

          this.text = element.substring(0, this.maxLength) + "...";
          this.textIndividual.push(this.text);

        })
        this.attemptCount = this.attemptResult.length;
      },
        (error: HttpErrorResponse) => {
          if (error.status === 500) {
            this.showToasterError();
            //this.router.navigate(['500']);      

          }
          else {
            this.showToasterError();
            //this.router.navigate(['404']); 
          }
        })
    }
  }
  hideAccordion() {
    this.isExpanded = !this.isExpanded;
  }

  expand(index: any) {

   
    if (this.currentIndex === index) {
      this.accOpen=!this.accOpen;
      this.currentIndex = null;
      return;
    }
    this.currentIndex = index;
    this.readMore = true;
    //this.checkClicked(index,false);

    if (this.readMore == true) {
      this.text = this.longText[index].substring(0, this.maxLength) + "...";
      this.textIndividual[index] = this.text;
    }
  }

  determineView(i: any) {
    this.hideToggle = false;
    if (this.readMore == true) {
      this.text = this.longText[i].substring(0, this.maxLength) + "...";
      this.textIndividual[i] = this.text;
    }
    else if (this.readMore == false) {

      this.textIndividual[i] = this.longText[i];
    }
    else {

    }

  }
  toggleView(i: any) {

    this.readMore = !this.readMore;
    if (!this.readMore) {
      this.a.push(i);
    }
    else {
      this.a.map(element => {
        if (element == i) {
          const index = this.a.indexOf(element);
          if (index > -1) { // only splice array when item is found
            this.a.splice(index, 1); // 2nd parameter means remove one item only
          }
        }
      });
    }
    this.determineView(i);
  }

  a: any[] = Array();
  checkClicked(i: any) {

    var isPresent = 0;
    this.a.forEach(element => {
      if (element == i) {
        isPresent = 1;
      }
    });
    if (isPresent == 1) {
      return true;
    }
    else {
      return false;
    }
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }
  showToasterError() {
    this.notifyservice.showError("There was an error,Please wait!!", "")
  }
}
