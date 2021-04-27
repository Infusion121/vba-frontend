import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NewslettersRoutingModule } from './newsletters-routing.module';
import { NewslettersComponent } from './newsletters.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, NewslettersRoutingModule, SlickCarouselModule],
  declarations: [NewslettersComponent, NewsletterComponent],
})
export class NewslettersModule {}
