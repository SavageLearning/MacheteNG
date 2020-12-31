import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersComponent } from './workers.component';



@NgModule({
  declarations: [
    WorkersComponent,
  ],
  imports: [
    CommonModule,
    WorkersRoutingModule,
  ]
})
export class WorkersModule {}
