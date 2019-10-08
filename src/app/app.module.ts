import { ModelPage } from './model/model.page';
import { AuthServiceService } from './common/auth-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import firebaseConfig from './firebase';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpModule } from '@angular/http';
import { UsersService } from './common/users.service';
import { SharePageModule } from './component/loading/Share.module';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { ThemeableBrowser } from '@ionic-native/themeable-browser/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [ModelPage],
  imports: [BrowserModule,
    IonicModule.forRoot(),
     AppRoutingModule,
     AngularFireModule.initializeApp(firebaseConfig),
     AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
     AngularFireStorageModule,
     AngularFirestoreModule,
     HttpModule,
     SharePageModule,
     UcWidgetModule
     
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UsersService,
    AuthServiceService,ThemeableBrowser
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
