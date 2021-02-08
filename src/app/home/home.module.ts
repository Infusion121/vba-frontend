import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, HomeRoutingModule, SlickCarouselModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
