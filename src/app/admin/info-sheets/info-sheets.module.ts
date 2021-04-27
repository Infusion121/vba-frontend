import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { InfoSheetsRoutingModule } from './info-sheets-routing.module';
import { InfoSheetsComponent } from './info-sheets.component';
import { InfoSheetComponent } from './info-sheet/info-sheet.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, InfoSheetsRoutingModule, SlickCarouselModule],
  declarations: [InfoSheetsComponent, InfoSheetComponent],
})
export class InfoSheetsModule {}
