import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';


import { User } from '../../model/user';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private angularAut: AngularFireAuth,
    private toastCtrl: ToastController) {
  }


  async login(user: User) {
    try {
      const result = await
        this.angularAut.auth.
          signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.toastCtrl.create({
          message: 'Indo para Home e Logando',
          duration: 3000,
          position: 'bottom'
        }).present();
        this.navCtrl.setRoot(HomePage);
      }
    } catch (resultado) {
      this.toastCtrl.create({
        message: 'Usuário ou senha inválidos',
        duration: 3000,
        position: 'bottom',
        cssClass: 'red'
      }).present();
    }
  }

}
