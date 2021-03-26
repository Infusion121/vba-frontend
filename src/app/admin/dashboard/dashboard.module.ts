import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, DashboardRoutingModule, SlickCarouselModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
