import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import {ReportsRoutingModule } from './reports-routing.module';
import {CardModule} from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MessagesModule } from 'primeng/messages';
import { InplaceModule } from 'primeng/inplace';
import { DividerModule } from 'primeng/divider';
import { EditorComponent } from './editor/editor.component';
import { ReportsListComponent } from './reports-list/reports-list.component';



@NgModule({
  declarations: [
    ReportsComponent,
    EditorComponent,
    ReportsListComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    ChartModule,
    TableModule,
    CalendarModule,
    FormsModule,
    HttpClientJsonpModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    InputTextareaModule,
    ReportsRoutingModule,
    CardModule,
    TooltipModule,
    MenubarModule,
    InputTextModule,
    MessagesModule,
    InplaceModule,
    DividerModule,
    MonacoEditorModule.forRoot() // use forRoot() in main app module only.
  ],
  bootstrap: []
})
export class ReportsModule {
  constructor() {
    console.log('.ctor: ReportsModule');
  }
}
