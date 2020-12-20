import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullOrderViewComponent } from './full-order-view/full-order-view.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { NgxPrintModule } from 'ngx-print';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    InputSwitchModule,
    ButtonModule,
    NgxPrintModule
  ],
  declarations: [
    FullOrderViewComponent
  ],
  exports: [
    FullOrderViewComponent
  ]
})
export class WorkOrdersModule { }
