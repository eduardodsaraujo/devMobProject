import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FirebaseProvider } from '../providers/firebase.provider';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TabsPage } from '../pages/tabs/tabs';

const config = {
  apiKey: "AIzaSyABYh1UjMH1tcXsbeyAvx3kp_Osj1zv5MY",
  authDomain: "test-d410e.firebaseapp.com",
  databaseURL: "https://test-d410e.firebaseio.com",
  projectId: "test-d410e",
  storageBucket: "test-d410e.appspot.com",
  messagingSenderId: "905064618049"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: false,
    }),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseProvider
  ]
})
export class AppModule { }
