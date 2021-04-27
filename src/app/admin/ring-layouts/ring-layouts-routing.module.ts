import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from '@app/auth';
import { RingLayoutsComponent } from './ring-layouts.component';
import { RingLayoutComponent } from './ring-layout/ring-layout.component';

const routes: Routes = [
  Shell.childRoutes([
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
      path: 'admin/ring-layouts/:lid',
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
