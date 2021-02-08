import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { CategoryComponent } from './category.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'admin/category', component: CategoryComponent, data: { title: extract('category') } },
    { path: 'admin/category/add', component: AddEditCategoryComponent, data: { title: extract('category-add') } },
    { path: 'admin/category/edit/:id', component: AddEditCategoryComponent, data: { title: extract('category-edit') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule],
  providers: [],
})
export class CategoryRoutingModule {}
