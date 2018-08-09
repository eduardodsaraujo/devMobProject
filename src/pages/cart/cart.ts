import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart.provider';
import { CartItem } from '../../model/cart-item';
import { FirebaseProvider } from '../../providers/firebase.provider';

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
  table: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private cartProvider: CartProvider,
    private firebaseProvider: FirebaseProvider,
    private toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
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

  addOrder() {
    let itemsToSave = [];
    this.items.forEach(item => {
      let itemToSave = item.productItem;
      itemToSave.quantity = item.quantity;
      console.log("itemToSave");
      console.log(itemToSave);
      itemsToSave.push(itemToSave);
    })
    this.firebaseProvider.save("orders/" + this.table.toString(), itemsToSave);
    this.cartProvider.removeAllItems();
    this.items = [];
    this.updateTotal();
    this.toastCtrl.create({
      message: 'Pedido Realizado com sucesso.',
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    }).present();

    this.table = 0;

  }

}
