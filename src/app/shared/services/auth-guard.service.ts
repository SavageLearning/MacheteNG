import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
      console.log('.ctor: AuthGuardService');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      //console.log(state);
      return this.authService.authorize().pipe(map(user => {
        if (user.expired) {
          this.authService.setRedirectRoute(state.url);
          this.router.navigate(['unauthorized']);
        }

        return !user.expired;
      }));
    }
}
