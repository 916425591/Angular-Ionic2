import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PaymentPage} from "../payment/payment";

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  orderData:string [];
  orderList = [];
  remarkTrue: boolean = false;
  remark={
  	title:"",
  	bill:"",
  	cutleryNumber:1,
  	remarkList:[
  	  {id:1,name:"不辣"},{id:2,name:"微辣"},{id:3,name:"重辣"},
	  {id:4,name:"微麻"},{id:5,name:"不要葱"},{id:6,name:"不要蒜"},
	  {id:7,name:"不要醋"},{id:7,name:"少酱油"},{id:8,name:"餐具"}
  	]
  }
  //在线支付
  wiresub:number = 3;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.orderData =JSON.parse(localStorage.getItem("orderData"));//当前产品
  	(this.orderData as any).gatherMoney = (this.orderData as any).gatherMoney - this.wiresub +5-6;
  	for(var i = 0; i < (this.orderData as any).menu.length; i++) {
		if((this.orderData as any).menu[i].number >0 ) {
			this.orderList.push((this.orderData as any).menu[i]);
		}
	}
  	//减少数据处理
  	for(var j = 0; j < (this.remark as any).remarkList.length; j++) {
			(this.remark as any).remarkList[j].number = 0;
	}
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad OrderPage');
  }
  remarkAdd(data){
  	for(var j = 0; j < (this.remark as any).remarkList.length; j++) {
		if((this.remark as any).remarkList[j].name == data.name){
			(this.remark as any).remarkList[j].number += 1;
			if((this.remark as any).remarkList[j].number%2 !=0){ //基数字符串相加
				(this.remark as any).title+= (this.remark as any).remarkList[j].name+";";
			}else{
				//获取字符串的长度
				var remaLenth = (this.remark as any).remarkList[j].name.length+1;
				(this.remark as any).title= (this.remark as any).title.substring(0,(this.remark as any).title.length-remaLenth);
			}
		}
	}
  }
  cuteryAdd(){
  	(this.remark as any).cutleryNumber+=1;
  }
  windUp(merchdata){
    localStorage.setItem("paymentData", JSON.stringify(merchdata));
    this.navCtrl.push(PaymentPage);
  }
}
