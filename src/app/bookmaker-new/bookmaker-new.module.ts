import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { BookmakerNewRoutingModule } from './bookmaker-new-routing.module';
import { BookmakerNewComponent } from './bookmaker-new.component';
import { BlockUIModule } from 'ng-block-ui';
import { PhoneMaskDirectiveModule } from '@app/phone-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    BookmakerNewRoutingModule,
    PhoneMaskDirectiveModule,
    BlockUIModule.forRoot(),
  ],
  declarations: [BookmakerNewComponent],
})
export class BookmakerNewModule {}
