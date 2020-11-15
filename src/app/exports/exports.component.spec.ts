
import {of as observableOf,  Observable } from 'rxjs';
import { waitForAsync, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExportsComponent } from './exports.component';
import { ExportsService } from './exports.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ExportsOptionsComponent } from './exports-options.component';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Report } from '../reports/models/report';
import { Export } from './models/export';

class ExportsServiceSpy {
  getExportsList = jasmine.createSpy('getExportsList')
    .and.callFake(
      () => observableOf(new Array<Export>())
    );
}

describe('ExportsComponent', () => {
  let component: ExportsComponent;
  let fixture: ComponentFixture<ExportsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExportsComponent,
        ExportsOptionsComponent,
      ],
      providers: [HttpClient, HttpHandler ],
      imports: [
        NoopAnimationsModule,
        TableModule,
        DropdownModule,
        TabViewModule,
        CalendarModule,
        DialogModule,
        FormsModule,
        ReactiveFormsModule,
        InputSwitchModule
      ]
    })
    .overrideComponent(ExportsComponent, {
      set: {
        providers: [
          { provide: ExportsService, useClass: ExportsServiceSpy }
        ]
      }
    })
    .compileComponents();
    fixture = TestBed.createComponent(ExportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
