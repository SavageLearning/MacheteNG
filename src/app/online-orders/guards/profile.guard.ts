
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnlineOrdersService } from '../online-orders.service';
import { EmployersService } from '../../employers/employers.service';
import { Employer } from '../../shared/models/employer';

@Injectable()
export class ProfileGuard implements CanActivate {

  constructor(private employersService: EmployersService, private router: Router) {
    console.log('.ctor');

  }

  canActivate(): Observable<boolean> {
    return this.employersService.fetchEmployer().pipe(
      map((em: Employer) => {
        console.log('canActivate->getEmployer:', em)
        let exists = em ? true : false;
        if (!exists) {
          this.router.navigate(['/employers']);
        }
        console.log('canActivate:', exists)
        return exists;
        }));
  }
}
