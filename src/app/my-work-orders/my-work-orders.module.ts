import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWorkOrdersComponent } from './my-work-orders.component';
import { WorkOrdersRoutingModule } from './my-work-orders-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MomentModule } from 'ngx-moment';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { WorkOrdersModule } from '../shared/components/work-orders/work-orders.module';
import { WorkOrderDatatableComponent } from './work-order-datatable/work-order-datatable.component';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    WorkOrdersRoutingModule,
    MomentModule,
    WorkOrdersModule
  ],
  declarations: [
    MyWorkOrdersComponent,
    OrderCompleteComponent,
    WorkOrderDatatableComponent,
  ]
})
export class MyWorkOrdersModule { }
