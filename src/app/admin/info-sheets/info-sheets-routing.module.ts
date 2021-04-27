import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from '@app/auth';
import { InfoSheetsComponent } from './info-sheets.component';
import { InfoSheetComponent } from './info-sheet/info-sheet.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'admin/info-sheets',
      component: InfoSheetsComponent,
      data: { title: extract('Dashboard') },
      canActivate: [AuthenticationGuard],
    },
    {
      path: 'admin/info-sheets/new',
      component: InfoSheetComponent,
      data: { title: extract('Dashboard') },
      canActivate: [AuthenticationGuard],
    },
    {
      path: 'admin/info-sheets/:nid',
      component: InfoSheetComponent,
      data: { title: extract('Dashboard') },
      canActivate: [AuthenticationGuard],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule],
  providers: [],
})
export class InfoSheetsRoutingModule {}
