import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from '@app/auth';
import { VbaNewsletterComponent } from './vba-newsletter.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'admin/newsletters',
      component: VbaNewsletterComponent,
      data: { title: extract('VBA Newsletters') },
      canActivate: [AuthenticationGuard],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule],
  providers: [],
})
export class VBANewsletterRoutingModule {}
