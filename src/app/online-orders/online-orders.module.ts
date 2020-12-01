import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction/introduction.component';
import { OnlineOrdersComponent } from './online-orders.component';
import { IntroConfirmComponent } from './intro-confirm/intro-confirm.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { WorkAssignmentsComponent } from './work-assignments/work-assignments.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { OnlineOrdersRoutingModule } from './online-orders-routing.module';

import { StepsModule } from 'primeng/steps';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MessageService } from 'primeng/api';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlineOrdersService } from './online-orders.service';
import { ScheduleRulesService } from './schedule-rules.service';
import { TransportRulesService } from './transport-rules.service';
import { OrderNotFoundComponent } from './order-not-found/order-not-found.component';
import { WorkOrdersModule } from '../shared/components/work-orders/work-orders.module';
import { ProfileGuard } from './guards/profile.guard';

@NgModule({
  imports: [
    CommonModule,
    StepsModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    InputSwitchModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    CheckboxModule,
    ToggleButtonModule,
    OnlineOrdersRoutingModule,
    WorkOrdersModule
  ],
  declarations: [
    IntroductionComponent,
    OnlineOrdersComponent,
    IntroConfirmComponent,
    WorkOrderComponent,
    WorkAssignmentsComponent,
    OrderConfirmComponent,
    OrderNotFoundComponent
  ],
  providers: [
    OnlineOrdersService,
    ScheduleRulesService,
    TransportRulesService,
    MessageService, //PrimeNG Service
    ProfileGuard
  ]
})
export class OnlineOrdersModule { }
