import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart.provider';
import { CartItem } from '../../model/cart-item';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[] = [];
  total: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cartProvider: CartProvider) {
  }

  ionViewDidLoad() {
    this.items = this.cartProvider.getItems();
    this.updateTotal();
  }
  decrementNumProducts(item: CartItem) {
    if (item.quantity > 1) {
      this.cartProvider.removeQuantityItem(item);
    } else {
      this.cartProvider.removeItem(item);
      this.items = this.cartProvider.getItems();
    }
    this.updateTotal();
  }

  incrementNumProducts(item: CartItem) {
    this.cartProvider.addQuantityItem(item);
    this.updateTotal();
  }

  updateTotal() {
    this.total = 0;
    this.items.forEach(item => this.total += item.quantity * item.productItem.price);
    console.log(this.items);
  }

}
