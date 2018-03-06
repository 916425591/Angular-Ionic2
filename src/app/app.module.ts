import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { LoginPage } from '../pages/login/login';
import { MerchDetaialPage } from '../pages/merch-detaial/merch-detaial';
import { SearchListPage } from '../pages/search-list/search-list';
import { OrderPage } from '../pages/order/order';
import {PaymentPage} from '../pages/payment/payment'
//服务
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LogoinServiceProvider } from '../providers/logoin-service/logoin-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage,
    LoginPage,
    MerchDetaialPage,
    SearchListPage,
    OrderPage,
    PaymentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
    	backButtonText:'',
    	tabsHideOnSubPages: 'true'
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage,
    LoginPage,
    MerchDetaialPage,
    SearchListPage,
    OrderPage,
    PaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LogoinServiceProvider
  ]
})
export class AppModule {}
