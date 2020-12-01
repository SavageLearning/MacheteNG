
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { WorkOrder } from '../shared/models/work-order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Confirm } from './shared/models/confirm';
import { loadConfirms } from './shared/rules/load-confirms';

@Injectable()
export class OnlineOrdersService {
  private initialConfirmSource: BehaviorSubject<Confirm[]>;
  private workOrderConfirmSource = new BehaviorSubject<boolean>(false);
  private workAssignmentsConfirmSource = new BehaviorSubject<boolean>(false);

  storageKey = 'machete.online-orders-service';
  initialConfirmKey = this.storageKey + '.initialconfirm';
  workOrderConfirmKey = this.storageKey + '.workorderconfirm';
  workAssignmentConfirmKey = this.storageKey + '.workassignmentsconfirm';
  constructor(
    private http: HttpClient
  ) {
    console.log('.ctor: OnlineOrdersService');
    // this loads static data from a file. will replace later.

    this.loadConfirmState();
  }

  getInitialConfirmedStream(): Observable<Confirm[]> {
    return this.initialConfirmSource.asObservable();
  }

  getWorkOrderConfirmedStream(): Observable<boolean> {
    return this.workOrderConfirmSource.asObservable();
  }

  getWorkAssignmentConfirmedStream(): Observable<boolean> {
    return this.workAssignmentsConfirmSource.asObservable();
  }

  loadConfirmState() {
    // This pattern is ugly; should be able to simplify, perhaps use BehaviorSubjectSource instead
    // of companion private variable
    let loadedConfirms =  JSON.parse(sessionStorage.getItem(this.initialConfirmKey)) as Confirm[];
    if (loadedConfirms != null && loadedConfirms.length > 0) {
      this.initialConfirmSource = new BehaviorSubject<Confirm[]>(loadedConfirms);
    } else {
      this.initialConfirmSource = new BehaviorSubject<Confirm[]>(loadConfirms());
    }

    // notify the subscribers
    this.workOrderConfirmSource.next(
      sessionStorage.getItem(this.workOrderConfirmKey) === 'true');
    this.workAssignmentsConfirmSource.next(
      sessionStorage.getItem(this.workAssignmentConfirmKey) === 'true');
  }

  clearState() {
    console.log('OnlineOrdersService.clearState-----');
    this.setInitialConfirm(loadConfirms());
    this.setWorkorderConfirm(false);
    this.setWorkAssignmentsConfirm(false);
  }

  setInitialConfirm(choice: Confirm[]) {
    //console.log('setInitialConfirm:', choice);
    sessionStorage.setItem(this.initialConfirmKey, JSON.stringify(choice));
    this.initialConfirmSource.next(choice);
  }

  setWorkorderConfirm(choice: boolean) {
    //console.log('setWorkOrderConfirm:', choice);
    sessionStorage.setItem(this.workOrderConfirmKey,
      JSON.stringify(choice));
    this.workOrderConfirmSource.next(choice);
  }

  setWorkAssignmentsConfirm(choice: boolean) {
    //console.log('setWorkAssignmentsConfirm:', choice);
    sessionStorage.setItem(this.workAssignmentConfirmKey,
      JSON.stringify(choice));
    this.workAssignmentsConfirmSource.next(choice);
  }

  createOrder(order: WorkOrder): Observable<WorkOrder> {
    let url = environment.dataUrl + '/api/onlineorders';
    let postHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<WorkOrder>(url, JSON.stringify(order), {
      headers: postHeaders, withCredentials: true
    }).pipe(map((data) => {
      return data['data'] as WorkOrder;
    }));
  }
}
