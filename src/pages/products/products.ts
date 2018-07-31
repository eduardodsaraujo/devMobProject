import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase.provider';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  category: any;
  categories: any;
  products: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseProvider: FirebaseProvider) {
    if (this.navParams.get("category") != null) {
      this.firebaseProvider.getAll('categories/').subscribe(categories => {
        this.categories = categories as any[]
      });
      this.category = this.navParams.get("category");
      console.log(this.category);
      this.products = this.firebaseProvider.getAll(`products/${this.category.key}`);
      console.log(this.products.forEach(p => console.log(p)));
    } else {
      this.navCtrl.setRoot(TabsPage);
    }
  }


  changeCategory(e) {
    console.log(e);
    console.log("mdou cateogria");
    let i = 0;
    let length = this.categories.length;
    console.log(this.categories);
    i = this.categories.map(function (e) { return e.key; }).indexOf(this.category.key);

    if (e.direction == 2) {
      console.log(i);
      i = i + 1;
    } else {
      i = i - 1;
    }

    if (i < 0) {
      i = length - 1;
      this.category = this.categories[i];
    }
    else if (i < length) {
      this.category = this.categories[i];
    } else {
      this.category = this.categories[0];
    }
    console.log(i);
    this.products = this.firebaseProvider.getAll(`products/${this.category.key}`);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }
  back() {
    this.navCtrl.pop();
  }
}
