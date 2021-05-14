import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from '@app/auth';
import { BookmakersComponent } from './bookmakers.component';
import { BookmakerComponent } from './bookmaker/bookmaker.component';
import { ShellAdmin } from '../shell-admin/shell-admin.service';

const routes: Routes = [
  ShellAdmin.childRoutes([
    {
      path: 'admin/bookmakers',
      component: BookmakersComponent,
      data: { title: extract('Bookmakers') },
      canActivate: [AuthenticationGuard],
    },
    {
      path: 'admin/bookmakers/add',
      component: BookmakerComponent,
      data: { title: extract('Bookmaker') },
      canActivate: [AuthenticationGuard],
    },
    {
      path: 'admin/bookmakers/:bid',
      component: BookmakerComponent,
      data: { title: extract('Bookmaker') },
      canActivate: [AuthenticationGuard],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule],
  providers: [],
})
export class BookmakersRoutingModule {}
