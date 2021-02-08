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
import { ItemPageModule } from './item-page/item-page.module';
import { DataService } from './services/data.service';
import { CategoryModule } from './admin/category/category.module';
import { ItemPageAdminModule } from './admin/item-page-admin/item-page-admin.module';

/* Use username: development@infusion121.com  password:test123456 */
var firebaseConfig = {
  apiKey: 'AIzaSyCs9KTFWpCC5nnloYP12hYP1k0wtKfB46Q',
  authDomain: 'thoroughclean-firebase.firebaseapp.com',
  databaseURL: 'https://thoroughclean-firebase.firebaseio.com',
  projectId: 'thoroughclean-firebase',
  storageBucket: 'thoroughclean-firebase.appspot.com',
  messagingSenderId: '96007495732',
  appId: '1:96007495732:web:338133250eadad31a2aa61',
  measurementId: 'G-E8P9DFHTSF',
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
    ItemPageModule,
    CategoryModule,
    ItemPageAdminModule,
    AuthModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
