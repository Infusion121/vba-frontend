import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from '@app/auth';
import { NewslettersComponent } from './newsletters.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'admin/newsletters',
      component: NewslettersComponent,
      data: { title: extract('Dashboard') },
      canActivate: [AuthenticationGuard],
    },
    {
      path: 'admin/newsletters/new',
      component: NewsletterComponent,
      data: { title: extract('Dashboard') },
      canActivate: [AuthenticationGuard],
    },
    {
      path: 'admin/newsletters/:nid',
      component: NewsletterComponent,
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
export class NewslettersRoutingModule {}
