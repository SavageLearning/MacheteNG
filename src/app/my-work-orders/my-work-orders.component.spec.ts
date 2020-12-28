import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWorkOrdersComponent } from './my-work-orders.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { RouterSpy } from '../shared/testing/index';

describe('MyWorkOrdersComponent', () => {
  let component: MyWorkOrdersComponent;
  let fixture: ComponentFixture<MyWorkOrdersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWorkOrdersComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    // .overrideComponent(MyWorkOrdersComponent, {
    //   set: {
    //     providers: [

    //     ]
    //   }
    // })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWorkOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
