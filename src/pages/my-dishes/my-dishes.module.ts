import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyDishesPage } from './my-dishes';

@NgModule({
  declarations: [
    MyDishesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDishesPage),
  ],
})
export class MyDishesPageModule {}
