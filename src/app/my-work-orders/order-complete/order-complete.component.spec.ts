/* eslint-disable brace-style */
/* eslint-disable arrow-body-style */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCompleteComponent } from './order-complete.component';
import { FullOrderViewComponent } from '../../shared/components/work-orders/full-order-view/full-order-view.component';
import { TableModule } from 'primeng/table';
import { LookupsService } from '../../lookups/lookups.service';
import { LookupsServiceSpy, MyWorkOrdersServiceSpy, ActivatedRouteSpy, RouterSpy, ConfigsServiceSpy } from '../../shared/testing';
import { TransportProvidersServiceSpy, MessageServiceSpy } from '../../shared/testing';
import * as paypal from 'paypal-checkout';
import { MyWorkOrdersService } from '../my-work-orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigsService } from '../../configs/configs.service';
import { MessageService } from 'primeng/api';
import { TransportProvidersService } from '../../online-orders/transport-providers.service';

describe('OrderCompleteComponent', () => {
  let component: OrderCompleteComponent;
  let fixture: ComponentFixture<OrderCompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderCompleteComponent,
        FullOrderViewComponent
      ],
      imports: [TableModule]
    })
    .overrideComponent(OrderCompleteComponent, {
      set: {
        providers: [
          { provide: TransportProvidersService, useClass: TransportProvidersServiceSpy},
          { provide: MyWorkOrdersService, useClass: MyWorkOrdersServiceSpy },
          { provide: ConfigsService, useClass: ConfigsServiceSpy},
          { provide: MessageService, useClass: MessageServiceSpy },
          { provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get: (id) => { return 1; }
              }
            }
          }
        },
          { provide: Router, useClass: RouterSpy }
        ]
      }
    })
    .compileComponents();
    spyOn(paypal.Button, 'render').and.callFake(
      () => { }
    );
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(OrderCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
