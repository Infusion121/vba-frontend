import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactModule } from './contactus/contactus.module';
import { DataService } from './services/data.service';
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { BookmakersModule } from './admin/bookmakers/bookmakers.module';
import { MembersInfoModule } from './admin/members-info/members-info.module';
import { RingLayoutModule } from './admin/ring-layout/ring-layout.module';
import { RVLInfoModule } from './admin/rvl-info-sheet/rvl-info.module';
import { VBANewsletterModule } from './admin/vba-newsletter/vba-newsletter.module';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { BookmakersEffects } from './store/effects/bookmakers.effects';
import { MemberInfosEffects } from './store/effects/memberInfos.effects';
import { NewslettersEffects } from './store/effects/newsletters.effects';
import { InfoSheetsEffects } from './store/effects/infoSheets.effects';
import { RingLayoutsEffects } from './store/effects/ringLayouts.effects';
import { BookmakerNewModule } from './bookmaker-new/bookmaker-new.module';

/* Use username: development@infusion121.com  password:test123456 */
var firebaseConfig = {
  apiKey: 'AIzaSyDeq0TD5Xgx23NI41qcUsYQxrlpDtuBMBA',
  authDomain: 'vba-website.firebaseapp.com',
  projectId: 'vba-website',
  storageBucket: 'vba-website.appspot.com',
  messagingSenderId: '497609096946',
  appId: '1:497609096946:web:6350d47ac4bc5d6421da6b',
};

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    ContactModule,
    DashboardModule,
    BookmakersModule,
    MembersInfoModule,
    RingLayoutModule,
    RVLInfoModule,
    VBANewsletterModule,
    AuthModule,
    BookmakerNewModule,
    //Store Modules Import
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 100,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      AuthEffects,
      BookmakersEffects,
      MemberInfosEffects,
      NewslettersEffects,
      InfoSheetsEffects,
      RingLayoutsEffects,
    ]),
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
