import { Component } from '@angular/core';
import { NavController, UrlSerializer } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase.provider';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  categories: Observable<any[]>;
  contact = {} as User;
  colors = [];

  constructor(public navCtrl: NavController,
    private firebaseProvider: FirebaseProvider,
    private nativePageTransitions: NativePageTransitions) {
    this.categories = (this.firebaseProvider.getAll('categories/'));
    // this.contact.email = "casa";
    // this.contact.password = "casa";
    // let product1 = {
    //   title: 'Suco de Manga', img: "https://assets.xtechcommerce.com/uploads/images/medium/49595da362d88b11ad2f7302313633d2.jpg",
    //   description: 'Suco de manga de 300ml', price: "3,20"
    // }

    // this.firebaseProvider.save("/products/-LIcTxr9aQHStxtNHPSD", product1);
    // this.firebaseProvider.save("/products/-LIcTxr9aQHStxtNHPSD", product1);
    // this.firebaseProvider.save("/products/-LIcTxr9aQHStxtNHPSD", product1);
    // this.firebaseProvider.save("/products/-LIcTxr9aQHStxtNHPSD", product1);

  }

  getRandomColor() {
    var color = "#";
    for (var i = 0; i < 3; i++) {
      var part = Math.round(Math.random() * 255).toString(16);
      color += (part.length > 1) ? part : "0" + part;
    }
    return color;
  }

  seeProducts(category) {
    let options: NativeTransitionOptions = {
      duration: 300,
      androiddelay: 500,
    };

    this.nativePageTransitions.slide(options);

    console.log(category);
    this.navCtrl.push("ProductsPage", { category: category });
  }

}
