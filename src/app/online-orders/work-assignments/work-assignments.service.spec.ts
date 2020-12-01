
import { of as observableOf, Observable } from 'rxjs';
import { TestBed, inject } from '@angular/core/testing';
import { WorkAssignmentsService } from './work-assignments.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { WorkAssignment } from '../../shared/models/work-assignment';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrderService } from '../work-order/work-order.service';
import { EmployersService } from '../../employers/employers.service';
import { AuthService } from '../../shared/index';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LookupsService } from '../../lookups/lookups.service';
import { Lookup } from '../../lookups/models/lookup';
import { WorkOrder } from '../../shared/models/work-order';
import { TransportRule, CostRule } from '../shared/index';
import {
  AuthServiceSpy, EmployersServiceSpy,
  WorkOrderServiceSpy, OnlineOrdersServiceSpy, LookupsServiceSpy, TransportRulesServiceSpy, TransportProvidersServiceSpy
} from '../../shared/testing';
import { TransportRulesService } from '../transport-rules.service';
import { TransportProvidersService } from '../transport-providers.service';
import { MessageService } from 'primeng/api';

describe('WorkAssignmentsService', () => {
  let service: WorkAssignmentsService;
  let httpMock: HttpTestingController;
  let baseref: string = environment.dataUrl;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        //
        // this method of testing instantiates real objects then spies on the methods below
        WorkAssignmentsService,
        WorkOrderService,
        LookupsService,
        OnlineOrdersService,
        MessageService,
        //TransportRulesService,
        { provide: TransportRulesService, useClass: TransportRulesServiceSpy },
        { provide: TransportProvidersService, useClass: TransportProvidersServiceSpy },
        { provide: EmployersService, useClass: EmployersServiceSpy },
        { provide: AuthService, useClass: AuthServiceSpy },

      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    sessionStorage.removeItem('machete.workassignments');
    spyOn(WorkOrderService.prototype, 'getStream')
      .and.returnValue(observableOf(
        new WorkOrder({ transportProviderID: 32, zipcode: '12345' })));

    let transportRules = new Array<TransportRule>();
    let costRules = new Array<CostRule>();

    costRules.push(new CostRule({ minWorker: 0, maxWorker: 100, cost: 15 }));
    transportRules.push(new TransportRule({
      lookupKey: 'transport_van',
      costRules: costRules,
      zipcodes: ['12345']
    }));

    let transports = new Array<Lookup>();
    transports.push(new Lookup({ id: 32, key: 'transport_van' }));
    spyOn(LookupsService.prototype, 'getLookups')
      .and.returnValue(observableOf(transports));

    spyOn(TransportRulesService.prototype, 'getTransportRules')
      .and.returnValue(observableOf(transportRules));

    service = TestBed.inject(WorkAssignmentsService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', inject([WorkAssignmentsService], (service: WorkAssignmentsService) => {
    expect(service).toBeTruthy();
  }));

  it('should save a record to sessions storage', () => {
    let wa = new WorkAssignment({ id: 123 });
    service.save(wa);
    let data = sessionStorage.getItem(service.storageKey);
    let result = JSON.parse(data);
    expect(result[0].id).toBe(1, 'expected record just created to be id=1 in storage');
  });

  it('should getAll a record', () => {
    let wa = new WorkAssignment({ id: 123 });
    service.save(wa);
    let result = service.getAll();
    expect(result[0].id).toBe(1, 'expected record just created to be id=1');
  });

  it('should delete a record', () => {
    service.save(new WorkAssignment({ id: 1 }));
    service.save(new WorkAssignment({ id: 2 }));
    service.save(new WorkAssignment({ id: 3 }));
    service.delete(<WorkAssignment>{ id: 2 });
    let result = service.getAll();
    expect(result.find(f => f.id === 1)).toBeTruthy('expected to find record id=1');
    expect(result.find(f => f.id === 2)).toBeTruthy('expected to find record id=2');
    expect(result.find(f => f.id === 3)).toBeFalsy('expected to NOT find record id=3');
  });

  it('should compact and order ids', () => {
    service.save(new WorkAssignment({ id: 1 }));
    service.save(new WorkAssignment({ id: 3 }));
    service.save(new WorkAssignment({ id: 4 }));
    service.compactRequests();
    let result = service.getAll();
    expect(result.find(f => f.id === 1)).toBeTruthy('expected to find record id=1');
    expect(result.find(f => f.id === 2)).toBeTruthy('expected to find record id=2');
    expect(result.find(f => f.id === 3)).toBeTruthy('expected to find record id=3');
  });

});
