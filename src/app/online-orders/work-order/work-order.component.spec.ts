import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderComponent } from './work-order.component';
import { Observable } from 'rxjs';
import { WorkOrderService } from './work-order.service';
import { LookupsService } from '../../lookups/lookups.service';
import { Lookup } from '../../lookups/models/lookup';
import { WorkOrder } from '../../shared/models/work-order';
import { Employer } from '../../shared/models/employer';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OnlineOrdersService } from '../online-orders.service';
import { ScheduleRule } from '../shared/models/schedule-rule';
import { ConfigsService } from '../../configs/configs.service';
import { TransportRulesServiceSpy, TransportProvidersServiceSpy, ScheduleRulesServiceSpy } from '../../shared/testing';
import { WorkOrderServiceSpy, LookupsServiceSpy, ConfigsServiceSpy, OnlineOrdersServiceSpy, RouterSpy } from '../../shared/testing';

import { Router } from '@angular/router';
import { ScheduleRulesService } from '../schedule-rules.service';
import { TransportRulesService } from '../transport-rules.service';
import { TransportProvidersService } from '../transport-providers.service';

describe('WorkOrderComponent', () => {
  let component: WorkOrderComponent;
  let fixture: ComponentFixture<WorkOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        CalendarModule,
        DropdownModule,
        DialogModule,
        ToggleButtonModule
      ]
    })
    .overrideComponent(WorkOrderComponent, {
      set: {
        providers: [
          { provide: WorkOrderService, useClass: WorkOrderServiceSpy },
          { provide: TransportProvidersService, useClass: TransportProvidersServiceSpy },
          { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy },
          { provide: ConfigsService, useClass: ConfigsServiceSpy },
          { provide: Router, useClass: RouterSpy},
          { provide: ScheduleRulesService, useClass: ScheduleRulesServiceSpy },
          { provide: TransportRulesService, useClass: TransportRulesServiceSpy }

        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save', () => {
    expect(component.orderForm.dirty).toBeFalsy();
  });
});
