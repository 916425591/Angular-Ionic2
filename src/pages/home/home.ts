import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { MerchDetaialPage } from '../merch-detaial/merch-detaial';
import { Http } from '@angular/http';
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

	}
	getKeys(j) {
		var ay = [];
		for(var i = 0; i < j; i++) {
			ay.push(i);
		}
		return ay;
	}
	onInputClick() {
		this.navCtrl.push(SearchPage);
	}
	items: string[];
	brands: string[];
	itemData: string[];
	ionViewDidLoad() {
		this.http.get('http://localhost:8100/assets/data/searchListOne.json')
			.subscribe(search => {
				if(search) {
					var brands = [];
					if(search.json().search && search.json().search != '') {
						this.itemData = search.json().search;
						for(var i = 0; i < search.json().search.length; i++) {
							if(search.json().search[i].labelling.brands == 1) {
								brands.push(search.json().search[i])
							}
						}
					}
					this.brands = brands;
				}
			}, error => {
				console.log(error)
			});
	}
	//循环懒加载
	doInfinite(infiniteScroll) {
		setTimeout(() => {
			for(let i = 0; i < 5; i++) {
				this.itemData.push(this.itemData[i]);
			}
			infiniteScroll.complete();
		}, 500);
	}
	//跳转详情传递参数
	merchDetaial(data){
		this.navCtrl.push(MerchDetaialPage);
		localStorage.setItem("merchdata",JSON.stringify(data));
	}

}