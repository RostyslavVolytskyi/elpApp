import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {TabsPage} from '../pages/tabs/tabs';
import {DiscoverPage} from '../pages/discover/discover';
import {MyDishesPage} from "../pages/my-dishes/my-dishes";
import {MyPlacesPage} from "../pages/my-places/my-places";
import {AllDishesPage} from "../pages/all-dishes/all-dishes";
import {ProfilePage} from "../pages/profile/profile";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPageModule} from "../pages/login/login.module";
import { AuthService } from '../providers/auth-service/auth-service';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MyPlacesPage,
    MyDishesPage,
    AllDishesPage,
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MyPlacesPage,
    MyDishesPage,
    AllDishesPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {
}
