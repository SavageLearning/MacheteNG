import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployersComponent } from './employers.component';
import { EmployersService } from './employers.service';
import { Observable } from 'rxjs';
import { LookupsService } from '../lookups/lookups.service';
import { Employer } from '../shared/models/employer';
import { Lookup } from '../lookups/models/lookup';
import { DropdownModule } from 'primeng/dropdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmployersServiceSpy, LookupsServiceSpy, RouterSpy } from '../shared/testing';
import { Router } from '@angular/router';

describe('EmployersComponent', () => {
  let component: EmployersComponent;
  let fixture: ComponentFixture<EmployersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployersComponent ],
      imports: [
        ReactiveFormsModule,
        DropdownModule,
        NoopAnimationsModule
      ]
    })
    .overrideComponent(EmployersComponent, {
      set: {
        providers: [
          { provide: EmployersService, useClass: EmployersServiceSpy },
          { provide: LookupsService, useClass: LookupsServiceSpy },
          { provide: Router, useClass: RouterSpy }
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(EmployersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
