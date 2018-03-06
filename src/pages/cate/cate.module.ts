import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatePage } from './cate';

@NgModule({
  declarations: [
    CatePage,
  ],
  imports: [
    IonicPageModule.forChild(CatePage),
  ],
})
export class CatePageModule {}
