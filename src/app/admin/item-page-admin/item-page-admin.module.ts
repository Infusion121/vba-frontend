import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AddEditItemPageAdminComponent } from './add-edit-item-page-admin/add-edit-item-page-admin.component';
import { ItemPageAdminComponent } from './item-page-admin.component';
import { ItemPageAdminRoutingModule } from './item-page-admin-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, ItemPageAdminRoutingModule, SlickCarouselModule],
  declarations: [ItemPageAdminComponent, AddEditItemPageAdminComponent],
})
export class ItemPageAdminModule {}
