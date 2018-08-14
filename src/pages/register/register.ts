import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../model/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import { FirebaseProvider } from '../../providers/firebase.provider';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  kind: any;
  user: User = new User();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private angularAut: AngularFireAuth,
    private toastCtrl: ToastController,
    private firebaseProvider: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  async register() {
    try {
      const result = await
        this.angularAut.auth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        this.firebaseProvider.save("users", { name: this.user.name, email: this.user.email.toLowerCase(), kind: this.user.kind });
        this.toastCtrl.create({
          message: 'Bem vindo ' + this.user.name,
          duration: 3000,
          position: 'bottom'
        }).present();
        this.navCtrl.setRoot(TabsPage);
      }
    } catch (resultado) {
      this.toastCtrl.create({
        message: 'Não foi posivel registrar.',
        duration: 3000,
        position: 'bottom',
        cssClass: 'red'
      }).present();
    }
  }

  back() {
    this.navCtrl.setRoot("LoginPage");
  }

}
