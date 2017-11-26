import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {BACKEND_API} from "../../config/apiCongig";
import {RegisterCredentials} from "../../models/register-credentials.model";
import {LoginCredentials} from "../../models/login-credentials.model";


export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;

  constructor(private httpClient: HttpClient){}

  public login(credentials: LoginCredentials): Observable<any> {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      const email = credentials.email,
        password = credentials.password;
      return this.httpClient.post(BACKEND_API.login, {email, password});
    }
  }

  public register(credentials: RegisterCredentials): Observable<any>  {
    if (credentials.email === null || credentials.password === null || credentials.firstName === null || credentials.lastName === null) {
      return Observable.throw("Please insert all required fields");
    } else {
      const email = credentials.email,
        password = credentials.password,
        firstName = credentials.firstName,
        lastName = credentials.lastName;
      return this.httpClient.post(BACKEND_API.signup, {email, password, firstName, lastName});
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
