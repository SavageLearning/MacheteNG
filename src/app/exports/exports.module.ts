import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportsComponent } from './exports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import {ExportsRoutingModule} from './exports-routing.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';

import { ExportsOptionsComponent } from './exports-options.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    TabViewModule,
    ChartModule,
    TableModule,
    CalendarModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    InputSwitchModule,
    InputTextareaModule,
    ExportsRoutingModule
  ],
  declarations: [ExportsComponent, ExportsOptionsComponent]
})
export class ExportsModule {
  constructor() {
    console.log('.ctor: ExportsModule');
  }
}
