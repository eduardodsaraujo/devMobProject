import { Component, ViewChild } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart.provider';
import { CartItem } from '../../model/cart-item';
import { HomePage } from '../home/home';


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

  ) {
    this.category = this.navParams.get("category");
    this.product = (this.navParams.get("product"));
    this.total = this.total * this.product.price;
    console.log(this.product);
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
    this.navCtrl.parent.select(1);
    this.navCtrl.pop();
  }

}
