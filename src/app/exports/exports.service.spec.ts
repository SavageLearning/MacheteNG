import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ExportsService } from './exports.service';
import {ExportsOptionsComponent} from './exports-options.component';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Export } from './models/export';

describe('ExportsService', () => {
  let service: ExportsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportsService],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ExportsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should ...', inject([ExportsService], (service1: ExportsService) => {
    expect(service1).toBeTruthy();
  }));

  // it('should catch error from response',
  //     () => {
  //       service.getColumns('activities')
  //         .subscribe((res: any) => {
  //           expect(res.name).toBe('HttpErrorResponse');
  //         });
  //       let req = httpMock.expectOne('/api/exports/activities');
  //       req.error(new ErrorEvent('foo'));
  //       httpMock.verify();
  //     });

  it('should populate the export list',
    () => {
      service.getExportsList()
        .subscribe(rows => {
          expect(rows.length).toBe(2, 'expected 2 in exports list');
        });
      let req = httpMock.expectOne('http://localhost:9876/api/exports'); // 'https://test-api.machetessl.org/api/exports'
      expect(req.request.method).toEqual('GET');

      let testdata = new Array<string>();
      testdata.push('row1');
      testdata.push('row2');
      req.flush({data: testdata});
      httpMock.verify();
    }
  )
});
