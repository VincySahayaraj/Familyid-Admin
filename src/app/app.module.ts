import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ToasterContainerComponent } from '../app/toast-container/toast-container.component';
// import { ToasterComponent } from './toaster.component';
// import { ToasterService } from './toaster.service';
import { AuthInterceptor } from './views/services/authconfig.interceptor';
import { DataTablesModule } from "angular-datatables";
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule  } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { ManagequestionsComponent } from './views/theme/managequestions/managequestions.component';
import { ManageusersComponent } from './views/theme/manageusers/manageusers.component';
import { ManagecategoriesComponent } from './views/theme/managecategories/managecategories.component';
import { DatePipe } from '@angular/common';
import { ManageaffiliatedComponent } from './views/theme/manageaffiliated/manageaffiliated.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    NgbModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    FormsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    HttpClientModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    
  ],
  exports: [

    FormsModule,
    DatePipe,
    ReactiveFormsModule,
    MatSelectModule
   
  ],
  providers: [
    DatePipe,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    IconSetService,
    Title,
    NgbActiveModal,
    HttpClientModule,
    ManagequestionsComponent,
    ManageusersComponent,
    ManageaffiliatedComponent,
    ManagecategoriesComponent
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {
}
