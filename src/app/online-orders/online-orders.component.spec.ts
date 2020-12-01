import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OnlineOrdersComponent } from './online-orders.component';
import { StepsModule } from 'primeng/steps';
import { OnlineOrdersService } from './online-orders.service';
import { OnlineOrdersServiceSpy, RouterSpy } from '../shared/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

describe('OnlineOrdersComponent', () => {
  let component: OnlineOrdersComponent;
  let fixture: ComponentFixture<OnlineOrdersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineOrdersComponent ],
      imports: [
        StepsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
    .overrideComponent(OnlineOrdersComponent, {
      set: {
        providers: [
          { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy },
          { provide: Router, useClass: RouterSpy }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
