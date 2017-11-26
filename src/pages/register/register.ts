import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import {AuthService, User} from "../../providers/auth-service/auth-service";
import {HttpErrorResponse} from "@angular/common/http";
import {SuccessLogin} from "../../models/success-login.model";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { email: '', password: '', firstName: '', lastName: '' };

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) { }

  public register(): void {
    this.auth.register(this.registerCredentials).subscribe((success: any) => {
        if (success) {
          this.auth.currentUser = new User(success.user.firstName, success.user.email);
          this.createSuccess = true;
          this.nav.setRoot('DiscoverPage');
          this.showPopup("Success", "Account created.");
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
      (error: HttpErrorResponse) => {
        this.showPopup("Error", error.error.message);
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
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
