import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllDishesPage } from './all-dishes';

@NgModule({
  declarations: [
    AllDishesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllDishesPage),
  ],
})
export class AllDishesPageModule {}
