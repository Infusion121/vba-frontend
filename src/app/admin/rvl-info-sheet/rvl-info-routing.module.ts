import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from '@app/auth';
import { RvlInfoSheetComponent } from './rvl-info-sheet.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'admin/rvl-info',
      component: RvlInfoSheetComponent,
      data: { title: extract('RVL Info') },
      canActivate: [AuthenticationGuard],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule],
  providers: [],
})
export class RVLInfoRoutingModule {}
