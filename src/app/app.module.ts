import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push } from "@ionic-native/push";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { StatusBar } from '@ionic-native/status-bar';
import { LOCALE_ID } from '@angular/core';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FirebaseProvider } from '../providers/firebase.provider';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TabsPage } from '../pages/tabs/tabs';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CartProvider } from '../providers/cart.provider';
import { PipesModule } from '../pipes/pipes.module';




const config = {
  apiKey: "AIzaSyABYh1UjMH1tcXsbeyAvx3kp_Osj1zv5MY",
  authDomain: "test-d410e.firebaseapp.com",
  databaseURL: "https://test-d410e.firebaseio.com",
  projectId: "test-d410e",
  storageBucket: "test-d410e.appspot.com",
  messagingSenderId: "905064618049"
};

registerLocaleData(localePt, 'pt-BR');

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
    FirebaseProvider,
    CartProvider,
    Push,
    NativePageTransitions,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class AppModule { }
