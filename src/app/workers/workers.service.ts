import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Skill } from '../shared/models/skill';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  private uri = environment.dataUrl + '/api/workers/skills';


  constructor(private http: HttpClient) { }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.uri, { withCredentials: true });
  }
}
