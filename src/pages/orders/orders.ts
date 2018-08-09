import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase.provider';
import { CartItem } from '../../model/cart-item';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  tables: number[] = [1, 2, 3, 4, 5];
  tabled: number = 1;
  items: CartItem[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private firebaseProvider: FirebaseProvider) {
  }

  ionViewWillEnter() {
    (this.firebaseProvider.getAll("orders").forEach(o => console.log(o)));
  }
  segmentChanged(e) {
    this.firebaseProvider.getAll("orders/" + this.tabled).subscribe(orders => {
      this.items = orders as any[];
    });

  }

  getInfoItems(key) {
    console.log(this.items);
    return this.items[key];
  }
}
