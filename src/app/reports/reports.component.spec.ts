
import { Observable } from 'rxjs';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ReportsComponent } from './reports.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ReportsService } from './reports.service';
import { Report } from './models/report';

class ReportsServiceSpy {
  getReportList = jasmine.createSpy('getReportList')
    .and.callFake(
      () => Observable.of(new Array<Report>())
    );
  getReportData = jasmine.createSpy('')
    .and.callFake(
      () => Observable.of(new Array<any>())
    );
}

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [
        ReportsComponent
      ],
      imports: [
        NoopAnimationsModule,
        TableModule,
        DropdownModule,
        TabViewModule,
        CalendarModule,
        DialogModule,
        FormsModule,
        HttpClientModule,
      ],
      providers: [
        HttpClient,
        HttpHandler,
      ]
    })
    .overrideComponent(ReportsComponent, {
      set: {
        providers: [
          { provide: ReportsService, useClass: ReportsServiceSpy }
        ]
      }
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


});

