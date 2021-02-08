import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ItemPageComponent } from './item-page.component';
import { ItemPageRoutingModule } from './item-page-routing.module';
import { SafeHtmlPipe } from '@app/safe-html.pipe';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, ItemPageRoutingModule, SlickCarouselModule],
  declarations: [ItemPageComponent, SafeHtmlPipe],
})
export class ItemPageModule {}
