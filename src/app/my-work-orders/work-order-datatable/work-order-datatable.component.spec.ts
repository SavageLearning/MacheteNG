
import {of as observableOf,  Observable } from 'rxjs';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkOrderDatatableComponent } from './work-order-datatable.component';
import { WorkOrder } from '../../shared/models/work-order';
import { MyWorkOrdersService } from '../my-work-orders.service';
import { DataTableModule } from 'primeng/primeng';
import { TransportRulesService } from '../../online-orders/transport-rules.service';
import { TransportRulesServiceSpy, RouterSpy } from '../../shared/testing/services.spy';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentModule } from 'ngx-moment';
import { Router } from '@angular/router';
class WorkOrdersServiceSpy {
  getOrders = jasmine.createSpy('getOrders')
    .and.callFake(
      () => observableOf(new Array<WorkOrder>())
    );
}
describe('WorkOrderDatatableComponent', () => {
  let component: WorkOrderDatatableComponent;
  let fixture: ComponentFixture<WorkOrderDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderDatatableComponent ],
      imports: [
        DataTableModule,
        MomentModule        
      ]
    })
    .overrideComponent(WorkOrderDatatableComponent, {
      set: {
        providers: [
          { provide: MyWorkOrdersService, useClass: WorkOrdersServiceSpy },
          { provide: Router, useClass: RouterSpy } 
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(WorkOrderDatatableComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
