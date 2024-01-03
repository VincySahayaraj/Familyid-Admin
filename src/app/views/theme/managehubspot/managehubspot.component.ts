import { Component, ViewEncapsulation } from '@angular/core';
import { HubspotService } from '../hubspot.service';
import { DataTablesModule } from 'angular-datatables';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-managehubspot',
  templateUrl: './managehubspot.component.html',
  styleUrls: ['./managehubspot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManagehubspotComponent {

  allHubspotData: any;
  showhubspotGrid: any;
  receivedData: any;
  givenData: any;
  resendClicked: boolean = false;
  inlineMessage: any;
  data: any;
  memberName: any;
  resendSuccess: any;
  showHubspotLoader: any;
  dtOptions: any = {};
  searchText: any = "";
  filteredData: any;
  startDate: any;
  endDate: any;
  finalDateValue: any;
  visible: any;
  hubspotData: any;
  viewData: any;
  searchQuery: any;
  resendValue:any;
  dateValidation:boolean=false;
  endDateValidation:boolean=false;

  constructor(private datePipe: DatePipe,private hubspotservice: HubspotService) {
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

    //this.getHubspotData();
    this.filterDateofHubspot();

   
  }

  getHubspotData() {
    this.showHubspotLoader = true;
    this.hubspotservice.getHubspotData().subscribe((response) => {
      this.showhubspotGrid = !this.showhubspotGrid;
      this.showHubspotLoader = false;
      this.allHubspotData = response;

     
      this.allHubspotData.forEach((element:any)=>{

        element.response=JSON.parse( element.response);
       
      })
      this.dtOptions = {
        order: [],
        searching: false
      }
      //this.inlineMessage = this.allHubspotData.response;
    })
  }

  // resending data
  resendData(id: any, data: any, i: any) {
    this.showHubspotLoader = true;
    const index = this.allHubspotData.findIndex((hubspotdata: { Id: any; }) => hubspotdata.Id === id);

    // console.log("indexxx",index);

    // Update the data associated with that row
    // data= JSON.parse(data);
    // console.log("data only", this.data);
    // for(let i=0;i< this.allHubspotData.length;i++){
    //   this.memberName=this.allHubspotData[i].data;
    //   this.allHubspotData[i].data=JSON.stringify(this.allHubspotData[i].data)
    // }

    // console.log("dataaaaaaaa", this.allHubspotData[i].Data)
    // data=this.allHubspotData[i].data;
    this.givenData = {
      id,
      data
    }
    // console.log("sending data", JSON.stringify(this.givenData))
    //this.givenData = JSON.stringify(this.givenData);
    //console.log("sending data", this.givenData);
    this.hubspotservice.resendData(this.givenData).subscribe((response: any) => {
      // console.log("resend data", response)
      // this.allHubspotData = [];
      this.resendClicked = !this.resendClicked; 
      this.receivedData = response;
  this.showHubspotLoader = false;

      this.receivedData = this.receivedData.result;
      this.allHubspotData[index].Response = this.receivedData;
      this.resendValue=this.allHubspotData[index].Response;

       this.showhubspotGrid=false;
       this.filterDateofHubspot();

      // setTimeout(()=>{
      // this.allHubspotData = response;
      // this.showHubspotLoader = false;
      // this.showhubspotGrid=true;
      
      // },400)

      //  window.location.reload();
      // console.log("received data", this.receivedData, this.allHubspotData[index])
      //this.statusMessage(this.receivedData, i);
      // if (this.receivedData == 'Success') {
      //   this.resendClicked = true
      // }
     
    })
  }

  statusMessage(receivedData: any, i: any) {

    if (receivedData == 'Success') {
      return true;
    }
    else {
      return false;
    }
  }

  viewHubspotData(data: any, i: any) {

    this.visible = !this.visible;
    this.hubspotData = data;

    //this.viewData=  this.allHubspotData.data;
    //this.allHubspotData=this.allHubspotData[i].data;
    this.allHubspotData[i].Data = JSON.parse(this.allHubspotData[i].Data);
    this.memberName = this.allHubspotData[i].Data
    this.memberName = this.memberName.fields;
    //this.allHubspotData[i].response=JSON.parse(this.allHubspotData[i].response);
    // console.log("response json", this.allHubspotData[i].Data)

  }

  openHubspotDataModal(event: any) {
    this.visible = event;
    this.hubspotData = this.hubspotData;

  }

  closeModal() {
    this.visible = !this.visible;
  }


  searchBasedonStatus(startDate: any,endDate:any,status:any) {
  const originalStartDate = new Date(startDate);
  const formattedStartDate = this.datePipe.transform(originalStartDate, 'yyyy-MM-dd');
  const originalEndDate = new Date(endDate);
  const formattedEndDate = this.datePipe.transform(originalEndDate, 'yyyy-MM-dd');
  this.showHubspotLoader = true;
    this.hubspotservice.searchBasedonStatus(formattedStartDate,formattedEndDate,status).subscribe((response) => {
      // console.log("search response", response)
      this.allHubspotData = [];
      this.showhubspotGrid=false;
      setTimeout(()=>{
      this.allHubspotData = response;
      this.allHubspotData.forEach((element:any)=>{

        element.Response=JSON.parse( element.Response);
       
      })
      this.showHubspotLoader = false;
      this.showhubspotGrid=true;
      // console.log("date filter result",this.allHubspotData)
      },400)
    })
  }


  // date filter
  filterDateofHubspot() {
   
    this.dateValidation = false;
    this.endDateValidation = false;
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
    this.showHubspotLoader = true;
    // Convert start and end date strings to Date objects
    this.startDate = new Date(this.startDate);
    this.endDate = new Date(this.endDate);

    const dateValue = {
      "dateFrom": this.startDate,
      "dateTo": this.endDate
    }
    this.hubspotservice.dateFilter(dateValue).subscribe((response) => {

      this.showhubspotGrid = !this.showhubspotGrid;
      this.showHubspotLoader = false;
      this.allHubspotData = response;

      
      this.allHubspotData.forEach((element:any)=>{

        element.Response=JSON.parse( element.Response);
       
      })
      this.dtOptions = {
        order: [],
        searching: false
      }
      // this.allHubspotData = [];
      // this.showhubspotGrid=false;

      // setTimeout(()=>{
      //   this.allHubspotData = response;
      // this.showHubspotLoader = false;
      // this.showhubspotGrid=true;
      // console.log("date filter result",this.allHubspotData)
      // },400)
    })
    // this.dtOptions = this.familyResult;
  }


  // global search
  onSearch() {
    this.showHubspotLoader = true;
    this.hubspotservice.globalSearch(this.searchQuery).subscribe((response) => {
      // console.log("search response", response)
       this.allHubspotData = [];
      this.showhubspotGrid=false;

      setTimeout(()=>{
        this.allHubspotData = response;
      this.showHubspotLoader = false;
      this.showhubspotGrid=true;
      // console.log("date filter result",this.allHubspotData)
      },400)
    })
  }
}
