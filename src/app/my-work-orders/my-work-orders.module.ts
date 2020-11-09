import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWorkOrdersComponent } from './my-work-orders.component';
import { WorkOrdersRoutingModule } from './my-work-orders-routing.module';
import { DataTableModule, ButtonModule } from 'primeng/primeng';
import { MomentModule } from 'ngx-moment';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { WorkOrdersModule } from '../shared/components/work-orders/work-orders.module';
import { WorkOrderDatatableComponent } from './work-order-datatable/work-order-datatable.component';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
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
