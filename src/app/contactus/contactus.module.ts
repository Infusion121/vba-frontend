import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ContactusComponent } from './contactus.component';
import { ContactUsRoutingModule } from './contactus-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, ContactUsRoutingModule],
  declarations: [ContactusComponent],
})
export class ContactModule {}
