import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrderService } from '../work-order/work-order.service';
import { WorkAssignmentsService } from '../work-assignments/work-assignments.service';
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  constructor(private router: Router,
    private onlineService: OnlineOrdersService,
    private orderService: WorkOrderService,
    private assignmentService: WorkAssignmentsService
  ) {}

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(['/online-orders/intro-confirm']);
  }

  onClear() {
    this.onlineService.clearState();
    this.orderService.clearState();
    this.assignmentService.clearState();
  }

}
