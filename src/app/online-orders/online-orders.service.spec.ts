import { TestBed, inject } from '@angular/core/testing';

import { OnlineOrdersService } from './online-orders.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WorkOrderService } from './work-order/work-order.service';
import { EmployersService } from '../employers/employers.service';
import { AuthService } from '../shared/index';
import { WorkAssignmentsService } from './work-assignments/work-assignments.service';
import { HttpClientModule } from '@angular/common/http';
import { WorkOrderServiceSpy, EmployersServiceSpy, AuthServiceSpy, WorkAssignmentsServiceSpy } from "../shared/testing";

describe('OnlineOrdersService', () => {
  let service: OnlineOrdersService;
  let httpMock: HttpTestingController;
  let baseref: string  = environment.dataUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OnlineOrdersService,
        { provide: WorkOrderService, useClass: WorkOrderServiceSpy },
        { provide: EmployersService, useClass: EmployersServiceSpy },
        { provide: AuthService, useClass: AuthServiceSpy },
        { provide: WorkAssignmentsService, useClass: WorkAssignmentsServiceSpy }
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
    service = TestBed.get(OnlineOrdersService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should ...', inject([OnlineOrdersService], (service1: OnlineOrdersService) => {
    expect(service1).toBeTruthy();
  }));
});
