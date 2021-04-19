import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BookmakerNewComponent } from './bookmaker-new.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'bookmakers/new',
      component: BookmakerNewComponent,
      data: { title: extract('New Bookmaker') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule],
  providers: [],
})
export class BookmakerNewRoutingModule {}
