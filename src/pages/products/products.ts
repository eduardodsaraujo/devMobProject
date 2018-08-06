import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase.provider';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseProvider: FirebaseProvider,
    private nativePageTransitions: NativePageTransitions,
    public modalCtrl: ModalController) {
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

  openDetailsProduct(product: any) {
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
    };

    let profileModal = this.modalCtrl.create("ProductDetailsPage", { product, 'category': this.category });
    //profileModal.present();

    this.navCtrl.push("ProductDetailsPage", { product, 'category': this.category });


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

    //  this.navCtrl.push("ProductsPage", { category: this.category });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }
  back() {
    this.navCtrl.pop();
  }
}
