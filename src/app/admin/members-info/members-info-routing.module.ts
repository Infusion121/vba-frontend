import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from '@app/auth';
import { MembersInfoComponent } from './members-info.component';
import { MemberInfoComponent } from './member-info/member-info.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'admin/members-info',
      component: MembersInfoComponent,
      data: { title: extract('Dashboard') },
      canActivate: [AuthenticationGuard],
    },
    {
      path: 'admin/members-info/new',
      component: MemberInfoComponent,
      data: { title: extract('Dashboard') },
      canActivate: [AuthenticationGuard],
    },
    {
      path: 'admin/members-info/:mid',
      component: MemberInfoComponent,
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
export class MembersInfoRoutingModule {}
