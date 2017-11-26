import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {AuthService, User} from "../../providers/auth-service/auth-service";
import {HttpErrorResponse} from "@angular/common/http";

/**
 * Generated class for the LoginNetworksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-networks',
  templateUrl: 'login-networks.html',
})
export class LoginNetworksPage {
  createSuccess = false;

  constructor(public navCtrl: NavController, private fb: Facebook, private auth: AuthService, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginNetworksPage');
  }

  goToLoginPage(): void {
    this.navCtrl.push('LoginPage');
  }

  facebookLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
      if(res.status === 'connected') {
        this.getUserData();
      } else {
        console.log('Error logging into Facebook');
      }
    })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  //  TODO: if email exists then try to login
  getUserData() {
    this.fb.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', [])
      .then(profile => {
        // Save id as password
        const fbData = {email: profile['email'], firstName: profile['first_name'], lastName: profile['last_name'], password: profile['id']};
        this.auth.register(fbData).subscribe((success: any) => {
            if (success) {
              this.auth.currentUser = new User(success.user.firstName, success.user.email);
              this.createSuccess = true;
              this.navCtrl.setRoot('DiscoverPage');
              this.showPopup("Success", "Account created.");
            } else {
              this.showPopup("Error", "Problem creating account.");
            }
          },
          (error: HttpErrorResponse) => {
            this.showPopup("Error", error.error.message);
          });
    });
  }

  showPopup(title, text): void {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
