import { waitForAsync, TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { EmployersService } from './employers.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../shared/index';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceSpy } from '../shared/testing';

describe('EmployersService', async () => {
  let service: EmployersService;
  let httpMock: HttpTestingController;
  let baseref: string  = environment.dataUrl;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        EmployersService,
        { provide: AuthService, useClass: AuthServiceSpy },
        HttpClient],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(EmployersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
