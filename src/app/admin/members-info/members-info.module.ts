import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MembersInfoRoutingModule } from './members-info-routing.module';
import { MembersInfoComponent } from './members-info.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, MembersInfoRoutingModule, SlickCarouselModule],
  declarations: [MembersInfoComponent],
})
export class MembersInfoModule {}
