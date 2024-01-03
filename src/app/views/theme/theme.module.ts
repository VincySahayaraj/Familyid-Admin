import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule, GridModule, NavModule, UtilitiesModule, TabsModule, FormModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ColorsComponent, ThemeColorComponent } from './colors.component';
import { TypographyComponent } from './typography.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { ManagecategoriesComponent } from './managecategories/managecategories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorymodalComponent } from './categorymodal/categorymodal.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ManagequestionsComponent } from './managequestions/managequestions.component';
import { QuestionmodalComponent } from './questionmodal/questionmodal.component';
import { ToastrModule } from 'ngx-toastr';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { ViewresultComponent } from './viewresult/viewresult.component';
import { EdituserComponent } from './edituser/edituser.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ProgressbarModule, ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
// CoreUI Modules
import { AccordionModule, SharedModule } from '@coreui/angular';
import { ViewdetailComponent } from './viewdetail/viewdetail.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { EditConfirmationComponent } from './edit-confirmation/edit-confirmation.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataTablesModule } from "angular-datatables";
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource  } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ModalModule } from '@coreui/angular';
import { ManagehohComponent } from './managevisitors/managevisitor.component';
import { EditVisitorComponent } from './edit-visitor/edit-visitor.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { TesttableComponent } from './testtable/testtable.component';
import { FamilyresultmodalComponent } from './familyresultmodal/familyresultmodal.component';
import { ManageaffiliatedComponent } from './manageaffiliated/manageaffiliated.component';
import { AffiliatedmodalComponent } from './affiliatedmodal/affiliatedmodal.component';

// import * as $ from 'jquery';
// import 'datatables.net';
import 'datatables.net/js/jquery.dataTables.js';
import 'datatables.net-buttons/js/buttons.print.js';
 import "jszip/dist/jszip.js";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import { ManagehubspotComponent } from './managehubspot/managehubspot.component';
import { EditAffiliateComponent } from './edit-affiliate/edit-affiliate.component';
import { CheckboxConfirmationComponent } from './checkbox-confirmation/checkbox-confirmation.component';
import { CopyconfirmationComponent } from './copyconfirmation/copyconfirmation.component';
// import 'datatables.net-buttons';



@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    CardModule,
    FormModule,
    GridModule,
    UtilitiesModule,
    ReactiveFormsModule,
    IconModule,
    NavModule,
    TabsModule,
    HttpClientModule,
    Ng5SliderModule,
    ProgressbarModule,
    MatProgressBarModule,
    DocsComponentsModule,
    AccordionModule,
    SharedModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    DataTablesModule,

    MatDatepickerModule,
    MatNativeDateModule,
    ModalModule,
    ToastrModule.forRoot()],

  providers: [
    NgbActiveModal,
    HttpClientModule,
    ManagequestionsComponent

  ],
  declarations: [
    ColorsComponent,
    ThemeColorComponent,
    TypographyComponent,
    ManageusersComponent,
    ManagecategoriesComponent,
    CategorymodalComponent,
    ManagequestionsComponent,
    QuestionmodalComponent,
    EditModalComponent,
    ViewresultComponent,
    EdituserComponent,
    ViewdetailComponent,
    EditcategoryComponent,
    DeleteConfirmationComponent,
    EditConfirmationComponent,
    ManagehohComponent,
    EditVisitorComponent,
    SearchFilterPipe,
    TesttableComponent,
  
    FamilyresultmodalComponent,
    ManageaffiliatedComponent,
    AffiliatedmodalComponent,
    ManagehubspotComponent,
    EditAffiliateComponent,
    CheckboxConfirmationComponent,
    CopyconfirmationComponent,
  ]
})
export class ThemeModule {
}
