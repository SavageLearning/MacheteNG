import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Skill} from '../shared/models/skill';
import {ApiRequestParams} from './models/api-request-params';
import {ApiResponse} from './models/api-response';
import {Worker} from '../shared/models/worker';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  private uri = `${environment.dataUrl}/api/workers`;


  constructor(private http: HttpClient) {
  }

  getSkills(): Observable<Skill[]> {
    return this.http
      .get<Skill[]>(`${this.uri}/skills`, {withCredentials: true});
  }

  getWorkersInSkill(skillId: number, requestParams: ApiRequestParams): Observable<ApiResponse<Worker>> {
    let params = WorkersService.assignToHTTPParams(requestParams);
    return this.http
      .get<ApiResponse<Worker>>(`${this.uri}/in-skill/${skillId}?`, {withCredentials: true, params});
  }

  private static assignToHTTPParams(requestParams: ApiRequestParams) : HttpParams  {
    let params = new HttpParams();
    if (requestParams.pageNumber > 0) {
      params = params.append('pageNumber', requestParams.pageNumber.toString())
    }
    if (requestParams.pageSize > 0) {
      params = params.append('pageSize', requestParams.pageSize.toString())
    }
    if (requestParams.sortField != null) {
      params = params.append('sortField', requestParams.sortField.toString())
    }
    if (requestParams.sortDesc !== null) {
      params = params.append('sortDesc', requestParams.sortDesc.toString())
    }
    if (requestParams.search != null) {
      params = params.append('search', requestParams.search.toString())
    }
    if (requestParams.dwcardnum != null) {
      params = params.append('dwccardnum', requestParams.dwcardnum.toString())
    }
    if (requestParams.statusId != null) {
      params = params.append('statusId', requestParams.statusId.toString())
    }
    console.log(params);
    return params;
  }
}
