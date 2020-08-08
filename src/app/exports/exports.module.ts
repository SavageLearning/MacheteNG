import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportsComponent } from './exports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import {ExportsRoutingModule} from './exports-routing.module';
import {
  ButtonModule, DropdownModule, DataTableModule, SharedModule, ChartModule,
  DialogModule, TabViewModule, CalendarModule, InputTextareaModule, InputSwitchModule
} from 'primeng/primeng';
import { ExportsOptionsComponent } from './exports-options.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    TabViewModule,
    ChartModule,
    DataTableModule,
    SharedModule,
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
