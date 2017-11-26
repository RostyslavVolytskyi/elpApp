import {LocationModel} from "./location.model";
import {Meal} from "./meal.model";
import {Place} from "./place.model";

export interface User {
  accountType: string;
  // appUser: boolean;
  email: string;
  firstName: string;
  image: string;   // not in app
  lastName: string;
  location: LocationModel; // not in app
  registrationTime: Date;
  registrationType: string; // not in app
  meals: Array<Meal>;
  password: string;
  places: Array<Place>;
}
