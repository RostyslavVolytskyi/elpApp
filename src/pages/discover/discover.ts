import { Component } from '@angular/core';
import {App, IonicPage, NavController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service/auth-service";
import {LoginPage} from "../login/login";

/**
 * Generated class for the DiscoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})
export class DiscoverPage {

  username = '';
  email = '';

  constructor(private navCtrl: NavController, private auth: AuthService, public appCtrl: App) {
    let info = this.auth.getUserInfo();

    if (info) {
      this.username = info['name'];
      this.email = info['email'];
    }
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      // this.navCtrl.setRoot('LoginPage');
      // this.navCtrl.popToRoot();
      // this.navCtrl.setRoot(LoginPage);
      this.appCtrl.getRootNav().push(LoginPage);
      // this.navCtrl.popToRoot();
    });
  }

}
