import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullOrderViewComponent } from './full-order-view/full-order-view.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    InputSwitchModule
  ],
  declarations: [
    FullOrderViewComponent
  ],
  exports: [
    FullOrderViewComponent
  ]
})
export class WorkOrdersModule { }
