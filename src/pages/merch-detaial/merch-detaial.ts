import { Component, NgZone, ViewChild } from '@angular/core'; //上下滑动组件
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { OrderPage } from '../order/order';
/**
 * Generated class for the MerchDetaialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-merch-detaial',
	templateUrl: 'merch-detaial.html',
})
export class MerchDetaialPage {
	//页面滑动
	@ViewChild(Content) content: Content;
	merchdata;
	eve;
	menu = [];
	merchHot = []; //热销
	merchTea = []; //茶饮
	merchFeaturn = []; //特色
	merchFood = []; //主食
	navsOpacity = 0;
	profileOpacity = 1;
	merchHide: boolean = false; //标题默认是没有的
	segemenCss: boolean = false; //动态css
	hint = "起送价25元"; //智能提示
	gatherMoney: number = 0;
	//计算当前类别获取的参数
	hotNumber:number = 0;
	teaNumber:number = 0;
	featureNumber:number = 0;
	foodNumber:number = 0;
	constructor(public navCtrl: NavController, public navParams: NavParams, public ngzone: NgZone) {
		this.loginInit();
	}
	loginInit() {
		//初始获取数据
		this.merchdata = JSON.parse(localStorage.getItem("merchdata"));
        if(this.merchdata != null){
        	(this.merchdata as any).gatherMoney = this.gatherMoney;
			for(var i = 0; i < (this.merchdata as any).menu.length; i++) {
				(this.merchdata as any).menu[i].number = 0;
				(this.merchdata as any).menu[i].total = 0;
				if((this.merchdata as any).menu[i].classfiy == 'hot') {
					this.merchHot.push((this.merchdata as any).menu[i]);
				} else if((this.merchdata as any).menu[i].classfiy == 'tea') {
					this.merchTea.push((this.merchdata as any).menu[i]);
				} else if((this.merchdata as any).menu[i].classfiy == 'feature') {
					this.merchFeaturn.push((this.merchdata as any).menu[i]);
				} else if((this.merchdata as any).menu[i].classfiy == 'food') {
					this.merchFood.push((this.merchdata as any).menu[i]);
				}
			}
        }
	}
	ionViewDidLoad() {

		//滚动效果
		this.content.ionScroll.subscribe(($event: any) => {
			this.ngzone.run(() => {
				let top = $event.scrollTop; //当前滑动的距离
				var profileHeight = document.getElementById("profile").offsetHeight;
				var headerHeight = document.getElementById("header").offsetHeight;
				var header = (profileHeight + headerHeight) / 3;
				var profileHeader = profileHeight + headerHeight;
				var segmentHome = document.getElementById("segmentHome").offsetTop;
				this.navsOpacity = top * 0.02; //导航透明度渐变
				if(top > header) {
					this.merchHide = true;
				} else {
					this.merchHide = false;
				}
				//				if(top >= segmentHome){
				//					document.getElementById("segmentHome").style.position='fixed';
				//					document.getElementById("segmentHome").style.top=''+headerHeight+'px';
				//				}else if(){
				//					document.getElementById("segmentHome").style.position="relative";
				//					document.getElementById("segmentHome").style.top='initial';
				//				}
				if(top > 0 && top < profileHeader) {
					this.profileOpacity = 0.9;
				} else {
					this.profileOpacity = 1
				}
			});
		})
	}
	//购物车加减
	ChangeMoney(host, minus) {
		//num 数组 // host 对象 minus添加减少
		let tSum = 0;

		for(var j = 0; j < (this.merchdata as any).menu.length; j++) {
			if((this.merchdata as any).menu[j].name == host.name) {
				if(minus == "add") { //添加商品
					(this.merchdata as any).menu[j].number += 1;
					(this.merchdata as any).menu[j].total = (this.merchdata as any).menu[j].number * host.money;
					if((this.merchdata as any).menu[j].number ==1){
						if((this.merchdata as any).menu[j].classfiy == 'hot') {
							this.hotNumber+=1;
						} else if((this.merchdata as any).menu[j].classfiy == 'tea') {
							this.teaNumber+=1;
						} else if((this.merchdata as any).menu[j].classfiy == 'feature') {
							this.featureNumber+=1;
						} else if((this.merchdata as any).menu[j].classfiy == 'food') {
							this.foodNumber+=1;
						}
					}		
				}else if(minus == "remove") { //减少商品
					(this.merchdata as any).menu[j].number -= 1;
					(this.merchdata as any).menu[j].total = (this.merchdata as any).menu[j].number * host.money;
					if((this.merchdata as any).menu[j].number ==0){
						if((this.merchdata as any).menu[j].classfiy == 'hot') {
							this.hotNumber-=1;
						} else if((this.merchdata as any).menu[j].classfiy == 'tea') {
							this.teaNumber-=1;
						} else if((this.merchdata as any).menu[j].classfiy == 'feature') {
							this.featureNumber-=1;
						} else if((this.merchdata as any).menu[j].classfiy == 'food') {
							this.foodNumber-=1;
						}
					}	
				}
					
			}
			tSum = tSum + (this.merchdata as any).menu[j].total;
		}

		this.gatherMoney = tSum;
		(this.merchdata as any).gatherMoney = this.gatherMoney;
		if(this.gatherMoney <= 0) {
			this.hint = "起送价25元"
		} else if(this.gatherMoney > 0 && this.gatherMoney < 25) {
			var getMoeny = 25 - this.gatherMoney;
			this.hint = "还差" + getMoeny + "配送";
		} else if(this.gatherMoney >= 25) {
			this.hint = "去结算";
		}
	}
	//结算
	windUp(data) {
		localStorage.setItem("orderData", JSON.stringify(data));
		this.navCtrl.push(OrderPage);
	}
	//数组进行重新排序
	getHot(item) {
		for(var i = 0; i < this.merchdata.menu.length; i++) {
			if(this.merchdata.menu[i].classfiy == item) {
				return this.merchdata.menu
			}

		}
	}
	//循环小星星
	getKeys(j) {
		var ay = [];
		for(var i = 0; i < j; i++) {
			ay.push(i);
		}
		return ay;
	}
	//左右滑动
	segmentsArray = ["hot", "beverages", "hamBurg", "food"];
	segmentModel: string = this.segmentsArray[0];
	swipeEvent(event) {
		//向左滑
		if(event.direction == 2) {
			if(this.segmentsArray.indexOf(this.segmentModel) < 3) {
				this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) + 1];
			}
		}
		//向右滑
		if(event.direction == 4) {
			if(this.segmentsArray.indexOf(this.segmentModel) > 0) {
				this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel) - 1];
			}
		}
	}

}