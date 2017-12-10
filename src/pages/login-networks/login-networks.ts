import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {AuthService, User} from "../../providers/auth-service/auth-service";
import {HttpErrorResponse} from "@angular/common/http";
import {SuccessLogin} from "../../models/success-login.model";
// import {GooglePlus} from "@ionic-native/google-plus";

/**
 * Generated class for the LoginNetworksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare const gapi: any;

@IonicPage()
@Component({
  selector: 'page-login-networks',
  templateUrl: 'login-networks.html',
})
export class LoginNetworksPage {
  loading: Loading;
  createSuccess = false;
  private auth2: any;

  // Do we need here googlePlus injection?
  constructor(public navCtrl: NavController,
              private fb: Facebook,
              // private googlePlus: GooglePlus,
              private auth: AuthService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    try {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '728041399465-8nhavuesi19t573dpntl0p0p8cvf6nms.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          'scope': 'profile email'
        });

        this.auth2.attachClickHandler('google-signin', {},
          (googleUser: any) => {
            const userData = {
              email: googleUser.getBasicProfile().getEmail(),
              firstName: googleUser.getBasicProfile().getGivenName(),
              lastName: googleUser.getBasicProfile().getFamilyName(),
              password: googleUser.getBasicProfile().getId(),
              image: googleUser.getBasicProfile().getImageUrl()
            };
            this.showLoading();
            this.auth.login(userData).subscribe((success: SuccessLogin) => {
              if (success) {
                this.auth.currentUser = new User(success.user.firstName, success.user.email);
                this.navCtrl.setRoot('DiscoverPage');
                this.navCtrl.popToRoot();
                this.showPopup("Success", "User logged in.");

              } else {
                this.showError("Access Denied");
              }
            }, (error: HttpErrorResponse) => {
              if(error.error && error.error.message === "User doesn't exist") {
                this.auth.register(userData).subscribe((success: any) => {
                  if (success) {
                    this.auth.currentUser = new User(success.user.firstName, success.user.email);
                    this.createSuccess = true;
                    this.navCtrl.setRoot('DiscoverPage');
                    this.showPopup("Success", "Account created.");
                  } else {
                    this.showPopup("Error", "Problem creating account.");
                  }
                }, (err) => {
                  this.showPopup("Error", "Problem creating account.");
                })
              }
            })
          }, (error: any) => {
            console.log(error);
          }
        );
      });
    } catch (err) {
      console.log('catch err', err);
    }
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
        this.auth.login(fbData).subscribe((success: any) => {
            if (success) {
              this.auth.currentUser = new User(success.user.firstName, success.user.email);
              this.createSuccess = true;
              this.navCtrl.setRoot('DiscoverPage');
              this.showPopup("Success", "User logged in.");
            } else {
              this.showPopup("Error", "Problem creating account.");
            }
          },
          (error: HttpErrorResponse | any) => {
            // Login if user with this email is registered
            if(error.error && error.error.message === "User doesn't exist") {
              this.auth.register(fbData).subscribe((success: SuccessLogin) => {
                if (success) {
                  this.auth.currentUser = new User(success.user.firstName, success.user.email);
                  this.navCtrl.setRoot('DiscoverPage');
                  this.navCtrl.popToRoot();
                  this.showPopup("Success", "Account created.");
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
