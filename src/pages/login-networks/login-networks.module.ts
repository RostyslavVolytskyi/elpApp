import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginNetworksPage } from './login-networks';

@NgModule({
  declarations: [
    LoginNetworksPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginNetworksPage),
  ],
})
export class LoginNetworksPageModule {}
