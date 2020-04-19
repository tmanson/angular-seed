import {Injectable} from '@angular/core';
import {User} from './user';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpService} from '../http/http.service';
import * as jwt_decode from 'jwt-decode';

export const CURRENT_USER = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = new BehaviorSubject<boolean>(false);
  private url = 'https://127.0.0.1:8000/login';
  private _currentUser: BehaviorSubject<User>;

  constructor(private http: HttpService) {
    this._currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(CURRENT_USER)));
  }


  get currentUser(): User {
    return this._currentUser.value;
  }

  get isLoggedIn(): Observable<boolean> {
    if (AuthService.isTokenExpired()) {
      this.logout();
    } else {
      const user = AuthService.getUser();
      if (!user) {
        this.logout();
      } else {
        this.loggedIn.next(true);
      }
    }
    return this.loggedIn.asObservable();
  }

  private static getUser(): User {
    const userString = localStorage.getItem(CURRENT_USER);
    if (!userString) {
      return undefined;
    }
    return JSON.parse(userString);
  }

  private static getToken(): string {
    const user = AuthService.getUser();
    if (!user) {
      return undefined;
    }
    const token = user.token;
    if (!token) {
      return undefined;
    }
    return token;
  }

  private static getTokenExpirationDate(): Date {
    const token = AuthService.getToken();
    if (!token) {
      return undefined;
    }
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return undefined;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  private static isTokenExpired(): boolean {
    const date = AuthService.getTokenExpirationDate();
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  login(user: User) {
    return this.http.post<any>(this.url, {username: user.userName, password: user.password})
      .pipe(map(userAuth => {
        // login successful if there's a jwt token in the response
        if (userAuth && userAuth.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(CURRENT_USER, JSON.stringify(userAuth));
          this.loggedIn.next(true);
        }
        return userAuth;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(CURRENT_USER);
    this.loggedIn.next(false);
  }

}
