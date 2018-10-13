import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
      console.log('.ctor');
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        //console.log(state);
        let isLoggedIn = this.authService.isLoggedInObs();
        isLoggedIn.subscribe((loggedin) => {
            if (!loggedin) {
                //console.log('canActivate NOT loggedIn: url:', state)
                // state.url: where they were going before they got here
                this.authService.setRedirectUrl(state.url);
                this.router.navigate(['unauthorized']);
            }
            });
        return isLoggedIn;

    }

    // canLoad(route: Route): boolean {
    //     console.log("foo");
    //     return false;
    // }

}
