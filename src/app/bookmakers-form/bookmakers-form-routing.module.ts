import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from '@app/auth';
import { BookmakersFormComponent } from './bookmakers-form.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'bookmakers',
      component: BookmakersFormComponent,
      data: { title: extract('Bookmakers') }
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule],
  providers: [],
})
export class BookmakersFormRoutingModule {}
