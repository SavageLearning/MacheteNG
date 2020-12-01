import { WorkAssignment } from '../shared/models/work-assignment';
import { OnlineOrdersService } from './online-orders.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineOrdersComponent } from './online-orders.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { IntroConfirmComponent } from './intro-confirm/intro-confirm.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { WorkAssignmentsComponent } from './work-assignments/work-assignments.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { WorkOrderGuard } from './guards/work-order.guard';
import { WorkOrderService } from './work-order/work-order.service';
import { EmployersService } from '../employers/employers.service';
import { WorkAssignmentsService } from './work-assignments/work-assignments.service';
import { WorkAssignmentsGuard } from './guards/work-assignments.guard';
import { OrderConfirmGuard } from './guards/order-confirm.guard';
import { OrderNotFoundComponent } from './order-not-found/order-not-found.component';
import { ProfileGuard } from './guards/profile.guard';

const onlineOrderRoutes: Routes = [
  {
    path: 'online-orders',
    component: OnlineOrdersComponent,
    //canLoad: [AuthGuardService],
    canActivate: [AuthGuardService, ProfileGuard],
    children: [
      {
        path: 'introduction',
        component: IntroductionComponent,
      },
      {
        path: 'intro-confirm',
        component: IntroConfirmComponent,
      },
      {
        path: 'work-order',
        component: WorkOrderComponent,
        canActivate: [WorkOrderGuard]
      },
      {
        path: 'work-assignments',
        component: WorkAssignmentsComponent,
        canActivate: [WorkAssignmentsGuard]
      },
      {
        path: 'order-confirm',
        component: OrderConfirmComponent,
        canActivate: [OrderConfirmGuard]
      },

      {
        path: 'order-not-found',
        component: OrderNotFoundComponent,
      },
      {
        path: '**', redirectTo: 'order-not-found'
      }
    ]
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(onlineOrderRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    [
      WorkOrderGuard,
      WorkAssignmentsGuard,
      OrderConfirmGuard,
      OnlineOrdersComponent,
      WorkOrderService
    ]
  ]
})
export class OnlineOrdersRoutingModule { }
