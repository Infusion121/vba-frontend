import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CategoryComponent } from './category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, CategoryRoutingModule, SlickCarouselModule],
  declarations: [CategoryComponent, AddEditCategoryComponent],
})
export class CategoryModule {}
