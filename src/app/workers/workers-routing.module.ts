import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkersComponent } from './workers.component';
import { AuthGuardService } from '../shared';

const workersRoute: Routes = [
  {
    path: 'workers',
    component: WorkersComponent,
    canLoad: [AuthGuardService],
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(workersRoute)
  ],
  exports: [
    RouterModule
  ]
})
export class WorkersRoutingModule { }
