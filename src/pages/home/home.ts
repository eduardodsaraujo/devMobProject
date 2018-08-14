import { Component } from '@angular/core';
import { NavController, UrlSerializer } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase.provider';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/user';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  categories: Observable<any[]>;
  contact = {} as User;
  colors = [];

  constructor(public navCtrl: NavController,
    private firebaseProvider: FirebaseProvider,
    private nativePageTransitions: NativePageTransitions) {
    this.categories = (this.firebaseProvider.getAll('categories/'));
    // this.contact.email = "casa";
    // this.contact.password = "casa";
    // let product1 = {
    //   title: 'Sundae Ovomaltine', img: "http://bk-latam-prod.s3.amazonaws.com/sites/burgerking.com.br/files/BK_Web_SUNDAE_500x540.png",
    //   description: 'Uma deliciosa sobremesa nos sabores creme, chocolate ou misto, servida com uma calda supercremosa e crocante de Ovomaltine.',
    //   price: "7.0"
    // }

    // let product4 = {
    //   title: 'Shake Oreo Morango', img: "http://bk-latam-prod.s3.amazonaws.com/sites/burgerking.com.br/files/Desktop-500x540px-05.png",
    //   description: 'Já pensou em combinar o famoso biscoito Oreo, com o sorvete de creme e a calda de morango? Não precisa imaginar, pode provar! ',
    //   price: "10.0"
    // }

    // let product3 = {
    //   title: 'Casquinhas Recheadas', img: "http://bk-latam-prod.s3.amazonaws.com/sites/burgerking.com.br/files/Casquinha-Choconut-500x540px_0.png",
    //   description: 'Uma sobremesa cremosa, em uma casquinha crocante, com saborosos recheios: chocolate, doce de leite, Chocrocante Ovomaltine, ou Choconut. Para você se deliciar do começo ao fim. ',
    //   price: "6.0"
    // }

    // let product2 = {
    //   title: 'Shake Doce de Leite', img: "http://bk-latam-prod.s3.amazonaws.com/sites/burgerking.com.br/files/BK_Web_SHAKEDOCEDELEITE_500x540px.png",
    //   description: 'O Shake de Doce de Leite traz um sabor único, bem cremoso e do jeitinho que você adora.',
    //   price: "9.0"
    // }


    // this.firebaseProvider.save("/products/-LIcTxr9aQHStxtNHPSD", product1);
    // this.firebaseProvider.save("/products/-LIcTxr9aQHStxtNHPSD", product2);
    // this.firebaseProvider.save("/products/-LIcTxr9aQHStxtNHPSD", product3);
    // this.firebaseProvider.save("/products/-LIcTxr9aQHStxtNHPSD", product4);
  }

  getRandomColor() {
    var color = "#";
    for (var i = 0; i < 3; i++) {
      var part = Math.round(Math.random() * 255).toString(16);
      color += (part.length > 1) ? part : "0" + part;
    }
    return color;
  }

  seeProducts(category) {

    console.log(category);
    this.navCtrl.push("ProductsPage", { category: category });
  }

}
