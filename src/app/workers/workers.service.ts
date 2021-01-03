import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Skill } from '../shared/models/skill';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  private uri = `${environment.dataUrl}/api/workers`;


  constructor(private http: HttpClient) { }

  getSkills(): Observable<Skill[]> {
    return this.http
      .get<Skill[]>(`${this.uri}/skills`, { withCredentials: true });
  }

  getWorkersInSkill(skillId: number): Observable<Worker[]> {
    return this.http
      .get<Worker[]>(`${this.uri}/in-skill?skillId=${skillId}`, { withCredentials: true });
  }
}
