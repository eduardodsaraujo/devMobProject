import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase.provider';
import { CartItem } from '../../model/cart-item';
import { AngularFireAuth } from 'angularfire2/auth';

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

  tables: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  tableSelected: number = 1;
  items = [];
  itemsReady = [];
  canChangeOrder = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private firebaseProvider: FirebaseProvider) {
    console.log(navParams.data);
    if (navParams.data.kind != null) {
      if (this.navParams.data.kind == "cooker") {
        this.canChangeOrder = true;
      }
    }
    console.log("Can change Order " + this.canChangeOrder);

    this.firebaseProvider.getAll("orders/" + '1').subscribe(orders => {
      this.items = orders as any[];
      this.items = this.items.reverse().slice(0, 3);
    });
    this.firebaseProvider.getAll("ordersReady/" + '1').subscribe(orders => {
      this.itemsReady = orders as any[];
      this.items.forEach(item => {
        if (this.itemsReady.find(itemReady => item.key == itemReady.key) != null) {
          item.ready = 1;
        }
      })
    });

  }

  segmentChanged(e) {
    console.log('TableSelected');
    console.log(this.tableSelected);

    this.firebaseProvider.getAll("orders/" + this.tableSelected).subscribe(orders => {
      this.items = orders as any[];
      this.items = this.items.reverse().slice(0, 5);
    });
    this.firebaseProvider.getAll("ordersReady/" + this.tableSelected).subscribe(orders => {
      this.itemsReady = orders as any[];
      this.items.forEach(item => {
        if (this.itemsReady.find(itemReady => item.key == itemReady.key) != null) {
          item.ready = 1;
        }
      })
    });

  }

  getInfoItems(key) {
    console.log(this.items);
    return this.items[key];
  }

  ionViewWillEnter() {
    this.tableSelected = 1;
    this.firebaseProvider.getAll("orders/" + '1').subscribe(orders => {
      this.items = orders as any[];
      this.items = this.items.reverse().slice(0, 3);
    });
    this.firebaseProvider.getAll("ordersReady/" + '1').subscribe(orders => {
      this.itemsReady = orders as any[];
      this.items.forEach(item => {
        if (this.itemsReady.find(itemReady => item.key == itemReady.key) != null) {
          item.ready = 1;
        }
      })
    });
  }

  readyOrder(order: any) {
    console.log("Oferta Pronta");
    this.firebaseProvider.save("ordersReady/" + this.tableSelected, order, order.key);

  }

}
