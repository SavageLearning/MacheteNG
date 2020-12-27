import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OnlineOrdersComponent } from './online-orders.component';
import { StepsModule } from 'primeng/steps';
import { OnlineOrdersService } from './online-orders.service';
import { OnlineOrdersServiceSpy, RouterSpy } from '../shared/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { OnlineOrdersRoutingModule } from './online-orders-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { WorkOrdersModule } from '../shared/components/work-orders/work-orders.module';
import { CardModule } from 'primeng/card';
import { LayoutModule } from '@angular/cdk/layout';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { DataViewModule } from 'primeng/dataview';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { IntroductionComponent } from './introduction/introduction.component';
import { SkillsComponent } from './work-assignments/skills/skills.component';
import { OrderNotFoundComponent } from './order-not-found/order-not-found.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { WorkAssignmentsComponent } from './work-assignments/work-assignments.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { ScheduleRulesService } from './schedule-rules.service';
import { TransportRulesService } from './transport-rules.service';
import { MessageService } from 'primeng/api';
import { ProfileGuard } from './guards/profile.guard';

describe('OnlineOrdersComponent', () => {
  let component: OnlineOrdersComponent;
  let fixture: ComponentFixture<OnlineOrdersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        OnlineOrdersComponent,
        IntroductionComponent,
        IntroductionComponent,
        WorkOrderComponent,
        WorkAssignmentsComponent,
        OrderConfirmComponent,
        OrderNotFoundComponent,
        SkillsComponent
       ],
      imports: [
        StepsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: OnlineOrdersService, useClass: OnlineOrdersServiceSpy },
        { provide: Router, useClass: RouterSpy }
      ]
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
