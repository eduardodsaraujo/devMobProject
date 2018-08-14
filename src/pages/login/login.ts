import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';


import { User } from '../../model/user';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { FirebaseProvider } from '../../providers/firebase.provider';
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
    private toastCtrl: ToastController,
    private firebaseProvider: FirebaseProvider) {
  }


  async login(user: User) {
    try {
      const result = await
        this.angularAut.auth.
          signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.firebaseProvider.getAll("users").subscribe(users => {
          let allUsers = users as User[];
          this.user = allUsers.find(u => u.email.toLowerCase() == this.user.email);
          this.toastCtrl.create({
            message: 'Bem vindo ' + this.user.name,
            duration: 3000,
            position: 'bottom'
          }).present();
          if (this.user.kind.toLowerCase() == "cooker")
            this.navCtrl.setRoot("OrdersPage");
          else
            this.navCtrl.setRoot(TabsPage);
        })
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

  register() {
    this.navCtrl.push("RegisterPage");
  }

}

