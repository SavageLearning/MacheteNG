import { Component, OnInit } from '@angular/core';
import { MyWorkOrdersService } from '../my-work-orders.service';
import { WorkOrder } from '../../shared/models/work-order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-order-datatable',
  templateUrl: './work-order-datatable.component.html',
  styleUrls: ['./work-order-datatable.component.css']
})
export class WorkOrderDatatableComponent implements OnInit {
  orders: WorkOrder[];
  constructor(
    private workOrderService: MyWorkOrdersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.workOrderService.getOrders()
    .subscribe(
      data => {
        this.orders = data;
      });
  }

  viewOrder(order: WorkOrder) {
    console.log(order);
    this.router.navigate([`/my-work-orders/${order.id}`]);
  }
}
