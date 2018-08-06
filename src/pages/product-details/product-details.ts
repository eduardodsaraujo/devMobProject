import { Component } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { CartProvider } from '../../providers/cart.provider';
import { CartItem } from '../../model/cart-item';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  product: any;
  category: any;
  numProducts: number = 1;
  total: number = 1;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private cartProvider: CartProvider,
    private app: App
  ) {
    this.category = this.navParams.get("category");
    this.product = (this.navParams.get("product"));
    this.total = this.total * this.product.price;
    console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  decrementNumProducts() {
    if (this.numProducts > 1) {
      this.numProducts--;
      this.total = this.product.price * this.numProducts;
    }
  }

  incrementNumProducts() {
    this.numProducts++;
    this.total = this.product.price * this.numProducts;
  }

  back() {
    this.navCtrl.pop();
  }

  addItemCart() {
    let itemCart = new CartItem(this.product, this.numProducts);
    this.cartProvider.addItem(itemCart);
    console.log(this.cartProvider.getItems());
    this.navCtrl.pop();
    //this.navCtrl.setRoot("CartPage");
    //this.app.getRootNav().getActiveChildNav().select(2);

  }

}
