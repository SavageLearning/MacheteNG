import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModule } from 'primeng/table';

import { FullOrderViewComponent } from './full-order-view.component';
import { WorkOrder } from '../../../../shared/models/work-order';
import { MessageService } from 'primeng/api';
import { MessageServiceSpy } from '../../../testing';

describe('FullOrderViewComponent', () => {
  let component: FullOrderViewComponent;
  let fixture: ComponentFixture<FullOrderViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FullOrderViewComponent ],
      imports: [TableModule],
    }).overrideComponent(FullOrderViewComponent, {
      set: {
        providers: [
          { provide: MessageService, useClass: MessageServiceSpy},
        ]
      }
    });

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullOrderViewComponent);
    component = fixture.componentInstance;
    component.order = new WorkOrder();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
