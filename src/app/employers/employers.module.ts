import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployersComponent } from './employers.component';
import { EmployersRoutingModule } from './employers-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    EmployersRoutingModule,
    KeyFilterModule,
    CardModule,
    InputMaskModule
  ],
  declarations: [EmployersComponent]
})
export class EmployersModule {
  // Diagnostic only: inspect router configuration
  constructor() {
    console.log('.ctor: EmployersModule');
  }
}
