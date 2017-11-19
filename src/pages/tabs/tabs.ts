import {Component} from '@angular/core';

import {DiscoverPage} from "../discover/discover";
import {MyPlacesPage} from "../my-places/my-places";
import {MyDishesPage} from "../my-dishes/my-dishes";
import {AllDishesPage} from "../all-dishes/all-dishes";
import {ProfilePage} from "../profile/profile";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  discoverRoot = DiscoverPage;
  myPlacesRoot = MyPlacesPage;
  myDishesRoot = MyDishesPage;
  allDishesRoot = AllDishesPage;
  profileRoot = ProfilePage;

  constructor() {

  }
}
