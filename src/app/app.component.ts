import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from "@ionic-native/push";

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "LoginPage";
  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, public push: Push, splashScreen: SplashScreen,
    public alertCtrl: AlertController) {
    statusBar.hide();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      splashScreen.hide();
      // Here you can do any higher level native things you might need.
      //statusBar.backgroundColorByHexString("#fff"); // change color    

      setTimeout(() => this.showSplash = false, 4000);
    });
  }

  pushsetup() {
    const options: PushOptions = {};

    const pushObject: PushObject = this.push.init(options);

    pushObject.on("registration").subscribe((registration: any) => { });

    pushObject.on("notification").subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: notification.label,
          message: notification.message
        });
        youralert.present();
      }
    });
  }
}

