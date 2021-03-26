import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RVLInfoRoutingModule } from './rvl-info-routing.module';
import { RvlInfoSheetComponent } from './rvl-info-sheet.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, RVLInfoRoutingModule, SlickCarouselModule],
  declarations: [RvlInfoSheetComponent],
})
export class RVLInfoModule {}
