import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { VBANewsletterRoutingModule } from './vba-newsletter-routing.module';
import { VbaNewsletterComponent } from './vba-newsletter.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, VBANewsletterRoutingModule, SlickCarouselModule],
  declarations: [VbaNewsletterComponent],
})
export class VBANewsletterModule {}
