import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-search',
	templateUrl: 'search.html'
})
export class SearchPage {
	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
	}
	searchQuery: string = '';
	items: string[];
	itemData: string[];
	ionViewDidLoad() {
		this.http.get('http://localhost:8100/assets/data/searchList.json')
			.subscribe(search => {
				var itemDa = [];
				for(var i=0;i<search.json().search.length;i++){
					itemDa.push(search.json().search[i].name);
				}
				this.itemData =itemDa; 
			}, error => {
				console.log(error)
			});
	}
    inveritems(){
    	this.items = this.itemData;
    }
	getItems(ev: any) {
		let val = ev.target.value;
		this.inveritems();
		if(val && val.trim() != '') {
			this.items = this.items.filter((item) => {
				return(item.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		} else {
			this.items = [];
		}
	}
}