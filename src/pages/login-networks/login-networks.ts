import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {AuthService, User} from "../../providers/auth-service/auth-service";
import {HttpErrorResponse} from "@angular/common/http";
import {SuccessLogin} from "../../models/success-login.model";

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
  loading: Loading;
  createSuccess = false;

  constructor(public navCtrl: NavController, private fb: Facebook, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
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

  getUserData() {
    this.fb.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', [])
      .then(profile => {
        // Save id as password
        const fbData = {email: profile['email'], firstName: profile['first_name'], lastName: profile['last_name'], password: profile['id']};
        this.showLoading();
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
          (error: HttpErrorResponse | any) => {
            // Login if user with this email is registered
            if(error.error.code === 11000) {
              this.auth.login(fbData).subscribe((success: SuccessLogin) => {
                if (success) {
                  this.auth.currentUser = new User(success.user.firstName, success.user.email);
                  this.navCtrl.setRoot('DiscoverPage');
                  this.navCtrl.popToRoot();
                } else {
                  this.showError("Access Denied");
                }
              }, (error: HttpErrorResponse) => {
                this.showError(error.error.message);
              })
            } else {
              this.showPopup("Error", error.message);
            }
          });
    });
  }


  // TODO: Difference showPopup and showError?
  showPopup(title, text): void {
    this.loading.dismiss();
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

  showError(text): void {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  showLoading(): void {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
