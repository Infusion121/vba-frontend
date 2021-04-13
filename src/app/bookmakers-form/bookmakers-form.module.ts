import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { BookmakersFormComponent } from './bookmakers-form.component';
import { BookmakersFormRoutingModule } from './bookmakers-form-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, BookmakersFormRoutingModule],
  declarations: [BookmakersFormComponent],
})
export class BookmakersFormModule {}
