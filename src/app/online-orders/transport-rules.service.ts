
import { Observable, of } from 'rxjs';

import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransportRule } from './shared/index';
import { environment } from '../../environments/environment';

@Injectable()
export class TransportRulesService {
  uriBase = environment.dataUrl + '/api/transportrules';
  rules = new Array<TransportRule>();
  rulesAge = 0;
  constructor(private http: HttpClient) {
    console.log('.ctor');
  }

  isStale(): boolean {
    if (this.rulesAge > Date.now() - 300 * 1000) {
        return false;
    }
    return true;
  }

  isNotStale(): boolean {
    return !this.isStale();
  }

  getTransportRules(): Observable<TransportRule[]> {
    if (this.isNotStale()) {
      console.log('returning cache', this.rulesAge);
      return of(this.rules);
    }

    return this.http.get(this.uriBase, { withCredentials: true }).pipe(
      map(res => {
        this.rules = res['data'] as TransportRule[];
        this.rulesAge = Date.now();
        return res['data'] as TransportRule[];
      }));
  }
}
