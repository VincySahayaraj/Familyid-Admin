import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { ManagecategoriesComponent } from './managecategories/managecategories.component';
import { ManagequestionsComponent } from './managequestions/managequestions.component';
import { ViewresultComponent } from './viewresult/viewresult.component';
import { ViewdetailComponent } from './viewdetail/viewdetail.component';
import { ManagehohComponent } from './managevisitors/managevisitor.component';
import { TesttableComponent } from './testtable/testtable.component';
import { ManageaffiliatedComponent } from './manageaffiliated/manageaffiliated.component';
import { ManagehubspotComponent } from './managehubspot/managehubspot.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Manage',
    },
    children: [
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: 'colors',
      // },
      // {
      //   path: 'colors',
      //   component: ColorsComponent,
      //   data: {
      //     title: 'Colors',
      //   },
      // },
      // {
      //   path: 'typography',
      //   component: TypographyComponent,
      //   data: {
      //     title: 'Typography',
      //   },
      // },

      {
        path: 'manageusers',
        component: ManageusersComponent,
        data: {
          title: 'Manage Users',
        },
      },

      
      {
        path: 'managecategories',
        component: ManagecategoriesComponent,
        data: {
          title: 'Manage Categories',
        },
      },

      {
        path: 'managequestions',
        component: ManagequestionsComponent,
        data: {
          title: 'Manage Questions',
        },
      },
      {
        path: 'managehoh',
        component: ManagehohComponent,
        data: {
          title: 'Manage HOH',
        },
      },

      {
        path: 'viewresult',
        component: ViewresultComponent,
        data: {
          title: 'View Result',
        },
      },
      {
        path: 'viewdetail',
        component: ViewdetailComponent,
        data: {
          title: 'View Detail',
        },
      },
      {
        path: 'manageaffiliate',
        component: ManageaffiliatedComponent,
        data: {
          title: 'Manage Affiliate',
        },
      },
      {
        path: 'managehubspot',
        component: ManagehubspotComponent,
        data: {
          title: 'Manage Hubspot',
        },
      },
      {
        path: 'test',
        component: TesttableComponent,
        data: {
          title: 'test',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}
