import { TestBed, inject } from '@angular/core/testing';

import { ScheduleRulesService } from './schedule-rules.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('ScheduleRulesService', () => {
  let httpMock: HttpTestingController;
  let baseref: string  = environment.dataUrl;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScheduleRulesService
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', inject([ScheduleRulesService], (service: ScheduleRulesService) => {
    expect(service).toBeTruthy();
  }));
});
