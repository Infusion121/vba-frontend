import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { ItemPageComponent } from './item-page.component';

const routes: Routes = [
  Shell.childRoutes([{ path: ':url', component: ItemPageComponent, data: { title: extract('ItemPage') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ItemPageRoutingModule {}
