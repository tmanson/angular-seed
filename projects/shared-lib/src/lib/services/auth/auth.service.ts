import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './user';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpService} from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpService
  ) {
    this._currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  private _currentUser: BehaviorSubject<User>;

  get currentUser(): User {
    return this._currentUser.value;
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(user: User) {
    return this.http.post<any>('https://127.0.0.1:8000/login', {username: user.userName, password: user.password})
      .pipe(map(userAuth => {
        // login successful if there's a jwt token in the response
        if (userAuth && userAuth.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loggedIn.next(true);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }

}
