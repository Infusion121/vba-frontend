import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from '@app/auth';
import { RingLayoutComponent } from './ring-layout.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'admin/ring-layout',
      component: RingLayoutComponent,
      data: { title: extract('Ring Layout') },
      canActivate: [AuthenticationGuard],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule],
  providers: [],
})
export class RingLayoutRoutingModule {}
