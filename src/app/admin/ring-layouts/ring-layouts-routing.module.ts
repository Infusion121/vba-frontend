import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from '@app/auth';
import { RingLayoutsComponent } from './ring-layouts.component';
import { RingLayoutComponent } from './ring-layout/ring-layout.component';
import { ShellAdmin } from '../shell-admin/shell-admin.service';

const routes: Routes = [
  ShellAdmin.childRoutes([
    {
      path: 'admin/ring-layouts',
      component: RingLayoutsComponent,
      data: { title: extract('Dashboard') },
      canActivate: [AuthenticationGuard],
    },
    {
      path: 'admin/ring-layouts/new',
      component: RingLayoutComponent,
      data: { title: extract('Dashboard') },
      canActivate: [AuthenticationGuard],
    },
    {
      path: 'admin/ring-layouts/:rid',
      component: RingLayoutComponent,
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
export class RingLayoutsRoutingModule {}
