import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart.provider';
import { CartItem } from '../../model/cart-item';
import { FirebaseProvider } from '../../providers/firebase.provider';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[] = [];
  total: number = 0;
  table: number = 0;
  tables: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
    });
    let click = true;
    let uri = "orders/" + this.table.toString();
    var count = 0;
    let subscription = this.firebaseProvider.getAll(uri).subscribe(orders => {
      if (click) {
        count = (orders as any[]).length++;
        count += this.table * 100;
        this.firebaseProvider.save("orders/" + this.table.toString(), itemsToSave, count.toString());
        this.cartProvider.removeAllItems();
        this.items = [];
        this.updateTotal();
        this.toastCtrl.create({
          message: 'Pedido nº ' + count + ' realizado com sucesso. ',
          duration: 3000,
          position: 'bottom',
          cssClass: "toast-success"
        }).present();
        this.table = 0;

      }
      click = false;

    });
  }

}
