import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { ContactusComponent } from './contactus.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'contactus', component: ContactusComponent, data: { title: extract('ContactUs') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ContactUsRoutingModule {}
