import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { getStyle } from '@coreui/utils/src';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import {CountService} from '../../services/count.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {
 
  constructor(
    private datePipe: DatePipe,
    private router:Router,
    private changeDetectorRef: ChangeDetectorRef,private countservice:CountService
  ) {}

  totalvisitorCount:any;
  yearCount:any;
  countDetails:any;
  visitorsCount:any;
  quizCompletedUsers:any;
  totalVisitorByMonth:any;
  inviteesCount:any;
  assessmenttaken:any;
  registeredCount:any;
  totalCount:any;
  allCount:any;
  familyCount:any;
  inviteeCount:any;
  assessmentCount:any;
  memberCount:any;

  startdateoffamily:any;
  startdateofmember:any;


  data: any[] = [];
  options: any[] = [];
  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April'
  ];
  datasets = [
    [{
      // label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-primary'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [34, 59, 84, 84, 51, 55, 40]
     
    }], [{
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-info'),
      pointHoverBorderColor: getStyle('--cui-info'),
      data: [1, 18, 9, 17, 34, 22, 11]
    }], [{
      label: 'My Third dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-warning'),
      pointHoverBorderColor: getStyle('--cui-warning'),
      data: [78, 81, 80, 45, 34, 12, 40],
      fill: true
    }], [{
      label: 'My Fourth dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
      barPercentage: 0.7
    }]
  ];
  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  ngOnInit(): void {
    this.setData();
    // this. getVisitorsCount();
    // this.getInviteesCount();
    this.getAllCount();
   
  }

  goToFamilies(){
    const originalStartDate = new Date(this.startdateoffamily);
    const formattedStartDate = this.datePipe.transform(originalStartDate, 'yyyy-MM-dd');
    this.countservice.setData(formattedStartDate);
    this.router.navigate(['/manage/manageusers']);
  }

  goToMembers(){
    const originalMembersDate = new Date(this.startdateofmember);
    const formattedMembersDate = this.datePipe.transform(originalMembersDate, 'yyyy-MM-dd');
    this.countservice.setData(formattedMembersDate);
    this.router.navigate(['/manage/managehoh']);
  }


  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();

  }

  setData() {
    for (let idx = 0; idx < 4; idx++) {
      this.data[idx] = {
        labels: idx < 3 ? this.labels.slice(0, 7) : this.labels,
        datasets: this.datasets[idx]
      };
    }
    this.setOptions();
  }

  setOptions() {
    for (let idx = 0; idx < 4; idx++) {
      const options = JSON.parse(JSON.stringify(this.optionsDefault));
      switch (idx) {
        case 0: {
          this.options.push(options);
          break;
        }
        case 1: {
          options.scales.y.min = -9;
          options.scales.y.max = 39;
          this.options.push(options);
          break;
        }
        case 2: {
          options.scales.x = { display: false };
          options.scales.y = { display: false };
          options.elements.line.borderWidth = 2;
          options.elements.point.radius = 0;
          this.options.push(options);
          break;
        }
        case 3: {
          options.scales.x.grid = { display: false, drawTicks: false };
          options.scales.x.grid = { display: false, drawTicks: false, drawBorder: false };
          options.scales.y.min = undefined;
          options.scales.y.max = undefined;
          options.elements = {};
          this.options.push(options);
          break;
        }
      }
    }
  }
  getVisitorsCount(){

    // this.visitorsCount=70;
    this.countDetails={
      
        "visitedDateFrom": "2023-01-01T10:57:15.044Z",
        "visitedDateTo": "2023-12-31T09:57:15.044Z"
    }
    this.countservice.getVisitorsCount(this.countDetails).subscribe((response)=>{

      this.yearCount=response;
      if(this.yearCount.summaryByYear.length>0){
        this.totalvisitorCount=this.yearCount.summaryByYear[0].totalVisitors;
        this.quizCompletedUsers=this.yearCount.summaryByYear[0].visitorsCompletedQuiz;
      }
      if(this.yearCount.summaryByMonth.length>0){

        this.totalVisitorByMonth=this.yearCount.summaryByMonth[0].totalVisitors;
      }
    })
  }

  getInviteesCount(){
    this.countDetails={
      
      "visitedDateFrom": "2023-01-01T10:57:15.044Z",
      "visitedDateTo": "2023-12-31T09:57:15.044Z"
    
  }
  this.countservice.getInviteesCount(this.countDetails).subscribe((response)=>{

   this.totalCount=response;
   this.inviteesCount=this.totalCount.invitation;
   this.registeredCount=this.totalCount.registered;
   this.assessmenttaken=this.totalCount.assessmenttaken;

  })
  }
  getAllCount(){
    this.countservice.dashboardCounts().subscribe((response)=>{

      this.allCount=response;
      this.familyCount= this.allCount.familycount;
      this.memberCount=this.allCount.membercount;
      this.assessmentCount=this.allCount.assessmentcount;
      this.startdateoffamily=this.allCount.startdateoffamily;
      this.startdateofmember=this.allCount.startdateofmember;

      
    })
  }
}

@Component({
  selector: 'app-chart-sample',
  template: '<c-chart type="line" [data]="data" [options]="options" width="300" #chart></c-chart>'
})
export class ChartSample implements AfterViewInit,OnInit {

  totalvisitorCount:any;
  yearCount:any;
  countDetails:any;
  visitorsCount:any;
  quizCompletedUsers:any;
  constructor(private countservice:CountService) {}

  @ViewChild('chart') chartComponent!: ChartjsComponent;

  ngOnInit(){
    // this.getVisitorsCount();
   
  }
  getVisitorsCount(){

    // this.visitorsCount=70;
    this.countDetails={
      
        "visitedDateFrom": "2023-01-01T10:57:15.044Z",
        "visitedDateTo": "2023-02-12T09:57:15.044Z"
      
    }
    this.countservice.getVisitorsCount(this.countDetails).subscribe((response)=>{
      
      this.yearCount=response;
      this.totalvisitorCount=this.yearCount.summaryByYear[0].totalVisitors;
      this.quizCompletedUsers=this.yearCount.summaryByYear[0].totalVisitors;

    })
  }

  colors = {
    // label: 'My dataset',
    // backgroundColor: 'rgba(77,189,116,.2)',
    borderColor: '#4dbd74',
    pointHoverBackgroundColor: '#fff'
  };

  labels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  // labels=this.yearCount.summaryByMonth;

  data = {
    labels: this.labels,
    datasets: [{
      data: [65, 59, 84, 84, 51, 55, 40],
      ...this.colors,
      fill: { value: 65 }
    }]
  };

  options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

 





  ngAfterViewInit(): void {
    setTimeout(() => {
      const data = () => {
        return {
          ...this.data,
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [{
            ...this.data.datasets[0],
            data: [42, 88, 42, 66, 77],
            fill: { value: 55 }
          }, { ...this.data.datasets[0], borderColor: '#ffbd47', data: [88, 42, 66, 77, 42] }]
        };
      };
      const newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const newData = [42, 88, 42, 66, 77];
      let { datasets, labels } = { ...this.data };
      // @ts-ignore
      const before = this.chartComponent?.chart?.data.datasets.length;
     
      // console.log('datasets, labels', datasets, labels)
      // @ts-ignore
      // this.data = data()
      this.data = {
        ...this.data,
        datasets: [{ ...this.data.datasets[0], data: newData }, {
          ...this.data.datasets[0],
          borderColor: '#ffbd47',
          data: [88, 42, 66, 77, 42]
        }],
        labels: newLabels
      };
      // console.log('datasets, labels', { datasets, labels } = {...this.data})
      // @ts-ignore
      setTimeout(() => {
        const after = this.chartComponent?.chart?.data.datasets.length;
       
      });
    }, 5000);
  }
 




}