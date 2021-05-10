import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from '@app/auth';
import { DashboardComponent } from './dashboard.component';
import { ShellAdmin } from '../shell-admin/shell-admin.service';

const routes: Routes = [
  ShellAdmin.childRoutes([
    {
      path: 'admin/dashboard',
      component: DashboardComponent,
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
export class DashboardRoutingModule {}
