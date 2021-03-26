import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RingLayoutRoutingModule } from './ring-layout-routing.module';
import { RingLayoutComponent } from './ring-layout.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, RingLayoutRoutingModule, SlickCarouselModule],
  declarations: [RingLayoutComponent],
})
export class RingLayoutModule {}
