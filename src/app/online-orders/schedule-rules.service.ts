
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScheduleRule } from './shared/index';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

@Injectable()
export class ScheduleRulesService {
  uriBase = environment.dataUrl + '/api/schedulerules';
  rules = new Array<ScheduleRule>();
  rulesAge = 0;
  constructor(private http: HttpClient) {
    console.log('.ctor');
  }

  isStale(): boolean {
    if (this.rulesAge > Date.now() - 3600 * 1000) {
        return false;
    }
    return true;
  }

  isNotStale(): boolean {
    return !this.isStale();
  }

  getScheduleRules(): Observable<ScheduleRule[]> {
    if (this.isNotStale()) {
      return of(this.rules);
    }

    return this.http.get(this.uriBase, { withCredentials: true }).pipe(
      map(res => {
        this.rules = res['data'] as ScheduleRule[];
        this.rulesAge = Date.now();
        return res['data'] as ScheduleRule[];
      }));
  }
}
