import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchListPage } from './search-list';

@NgModule({
  declarations: [
    SearchListPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchListPage),
  ],
})
export class SearchListPageModule {}
