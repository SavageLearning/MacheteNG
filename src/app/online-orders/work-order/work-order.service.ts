import { Injectable } from '@angular/core';
import {Observable,  BehaviorSubject } from 'rxjs';
import {WorkOrder} from '../../shared/models/work-order';
import { EmployersService} from '../../employers/employers.service';
import { Employer } from '../../shared/models/employer';

@Injectable()
export class WorkOrderService {
  order: WorkOrder;
  orderSource = new BehaviorSubject<WorkOrder>(null);
  //order$ = this.orderSource.asObservable();

  storageKey = 'machete.workorder';
  constructor(private employerService: EmployersService) {
    let data = sessionStorage.getItem(this.storageKey);
    let order = new WorkOrder(JSON.parse(data));
    // check that data's not null first
    if (data && order && order.isNotEmpty()) {
      console.log('.ctor->Loading existing order', order);
      order.dateTimeofWork = new Date(order.dateTimeofWork); // deserializing date
      this.order = order;
      this.orderSource.next(this.order);
    } else {
      console.log('.ctor->Create work order from employer');
      this.employerService.getEmployer()
        .subscribe(res => {
          // loading employer data as the defaults for
          // the new workorder
          this.order = this.mapOrderFrom(res || new Employer());
          this.orderSource.next(this.order);
        });
    }
  }

  getStream(): Observable<WorkOrder> {
    return this.orderSource.asObservable();
  }

  get(): WorkOrder {
    console.log('get called');
    let data = sessionStorage.getItem(this.storageKey);
    if (data) {
      let order: WorkOrder = JSON.parse(data);
      //console.log('get: returning stored order', order);
      order.dateTimeofWork = new Date(order.dateTimeofWork);
      return order;
    } else {
      return this.order;
    }
  }

  mapOrderFrom(employer: Employer): WorkOrder {
    const order = new WorkOrder();
    order.contactName = employer.name;
    order.worksiteAddress1 = employer.address1;
    order.worksiteAddress2 = employer.address2;
    order.city = employer.city;
    order.state = employer.state;
    order.zipcode = employer.zipcode;
    order.phone = employer.phone || employer.cellphone;
    return order;
  }

  save(order: WorkOrder) {
    console.log('save', order);
    sessionStorage.setItem(this.storageKey, JSON.stringify(order));
    this.order = order;
    this.orderSource.next(this.order);
  }

  // TODO: Call clear when order expires, is completed, removed.
  clearState() {
    this.order = new WorkOrder();
    console.log('WorkOrdersService.clearState-----');

    sessionStorage.removeItem(this.storageKey);
    this.orderSource.next(this.order);
  }
}
