import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import {AuthService, User} from "../../providers/auth-service/auth-service";
import {HttpErrorResponse} from "@angular/common/http";
import {SuccessLogin} from "../../models/success-login.model";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe((success: SuccessLogin) => {
      console.log('login', success);
        if (success) {
          this.auth.currentUser = new User(success.user.firstName, success.user.email);
          this.navCtrl.setRoot('DiscoverPage');
          this.navCtrl.popToRoot();
        } else {
          this.showError("Access Denied");
        }
      },
      (error: HttpErrorResponse) => {
        this.showError(error.error.message);
      });
  }

  showLoading(): void {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
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
}
