import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemPageAdminComponent } from './item-page-admin.component';
import { AddEditItemPageAdminComponent } from './add-edit-item-page-admin/add-edit-item-page-admin.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'admin/itemPage', component: ItemPageAdminComponent, data: { title: extract('itempage') } },
    { path: 'admin/itemPage/add', component: AddEditItemPageAdminComponent, data: { title: extract('itempage-add') } },
    {
      path: 'admin/itemPage/edit/:id',
      component: AddEditItemPageAdminComponent,
      data: { title: extract('itempage-edit') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule],
  providers: [],
})
export class ItemPageAdminRoutingModule {}
