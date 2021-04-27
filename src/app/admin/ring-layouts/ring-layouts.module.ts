import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RingLayoutsRoutingModule } from './ring-layouts-routing.module';
import { RingLayoutsComponent } from './ring-layouts.component';
import { RingLayoutComponent } from './ring-layout/ring-layout.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, RingLayoutsRoutingModule, SlickCarouselModule],
  declarations: [RingLayoutsComponent, RingLayoutComponent],
})
export class RingLayoutsModule {}
