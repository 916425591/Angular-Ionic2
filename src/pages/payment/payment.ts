import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  paymentData:string [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.paymentData =JSON.parse(localStorage.getItem("paymentData"));//当前产品
  }

  ionViewDidLoad() {

  }

}
