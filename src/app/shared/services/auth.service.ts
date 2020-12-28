/* eslint-disable brace-style */
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  _redirectRoute = '';
  private _user: User;

  constructor(private http: HttpClient) {
  }

  /** Checks against the API to see if a user is authenticated. This method does not log a user in. */
  authorize(): Observable<User> {
    const user$ = this.getUser();
    return user$.pipe(
      mergeMap((user: User) => {
        if (!user.expired) {
          return of(user);
        } else {
          console.log('user expired; attempting to authenticate...');
          return this.http.get(environment.dataUrl + '/id/authorize', { observe: 'response', withCredentials: true }).pipe(
            map(response => {
              let claims = JSON.parse(window.atob(response.body['access_token'].split('.')[1]));
              // JSON.parse will return a string if there's only one member, so:
              user.profile.roles = user.profile.roles.concat(claims['role']);
              user.profile.preferred_username = claims['preferredUserName'];
              user.expired = false;

              console.log('...success!');
              this._user = user;

              return user;
          }));
        }
      })
    );
  }

  /** Logs out the user. Returns an observable of the user being signed out,
   * unless the user is already signed out, in which case it throws an exception. */
  signoutUser(): Observable<User> {
    return this.getUser().pipe(
      mergeMap((user: User) => {
        if (!user.expired) {
          return this.http.get(environment.dataUrl + '/id/logoff', { observe: 'response', withCredentials: true })
            .pipe(map(() => {
              user.expired = true;
              user.state = '/welcome';
              return user;
            }));
        } else {
          return Observable.throw('Not logged in!');
        }
      })
    );
  }

  /** Returns an Observable stream indicating whether a user is still
   *  logged in. Can be used wherever a check vs.
   *
   *  `authService.authenticate().subscribe(func => !func.expired)`
   *
   * could otherwise be made. */
  isLoggedIn(): Observable<boolean> {
    return this.authorize().pipe(map(user => !user.expired));
  }

  /** Deprecated. Set the redirect route for an unauthorized user.
   * Going forward, should be part of the expired user's state. Synchronous method. */
  setRedirectRoute(route: string) {
    this._redirectRoute = route;
  }

  /** Deprecated. Dereference the user state. This probably means there has been an error. This method runs synchronously. */
  removeUser() {
    this._user = null;
  }

  /** Returns an Observable stream of the _user field. */
  private getUser(): Observable<User> {
    if (!this._user) { this._user = new User(); }
    return of(this._user);
  }
}
