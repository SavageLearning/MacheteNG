import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModule } from 'primeng/table';

import { FullOrderViewComponent } from './full-order-view.component';
import { WorkOrder } from '../../../../shared/models/work-order';
import { MessageService } from 'primeng/api';
import { MessageServiceSpy } from '../../../testing';
import { Component } from '@angular/core';

// Arrange host wrapper component
@Component({
  template: `<full-order-view
    [transportLabel]="transportLabel"
    [workerCount]="workerCount"
    [transportCost]="transportCost"
    [laborCost]="laborCost"
    [order]="order"
    [showPayPal]="true">
  </full-order-view>`,
})

export class TestWrapperComponent {
  order: WorkOrder;
  transportLabel: string;
  workerCount: number;
  transportCost: number;
  laborCost: number;
}

describe('FullOrderViewComponent', () => {
  let component: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;
  let testWoDate: Date;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FullOrderViewComponent, TestWrapperComponent ],
      imports: [TableModule],
    }).overrideComponent(FullOrderViewComponent, {
      set: {
        providers: [
          { provide: MessageService, useClass: MessageServiceSpy},
        ]
      }
    });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.componentInstance;
    component.order = new WorkOrder();
    component.order.contactName = 'testEmp';
    testWoDate = new Date();
    component.order.dateTimeofWork = testWoDate;
    component.transportLabel = '';
    component.workerCount = 2;
    component.transportCost = 15;
    component.laborCost = 150;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display members', () => {
    expect(component.order.contactName).toEqual('testEmp');
    expect(component.order.dateTimeofWork).toEqual(testWoDate);
    expect(component.transportLabel).toEqual('');
    expect(component.workerCount).toEqual(2);
    expect(component.transportCost).toEqual(15);
    expect(component.laborCost).toEqual(150);
  });
});
