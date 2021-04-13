import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BookmakersRoutingModule } from './bookmakers-routing.module';
import { BookmakersComponent } from './bookmakers.component';
import { BookmakerComponent } from './bookmaker/bookmaker.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, BookmakersRoutingModule, SlickCarouselModule],
  declarations: [BookmakersComponent, BookmakerComponent],
})
export class BookmakersModule {}
