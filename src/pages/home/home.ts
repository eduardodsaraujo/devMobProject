import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase.provider';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  categories: Observable<any[]>;

  constructor(public navCtrl: NavController, private firebaseProvider: FirebaseProvider) {
    this.categories = (this.firebaseProvider.getAll('category/'));
  }

  getRandomColor() {
    var color = "#";
    for (var i = 0; i < 3; i++) {
      var part = Math.round(Math.random() * 255).toString(16);
      color += (part.length > 1) ? part : "0" + part;
    }
    return color;
  }

}
