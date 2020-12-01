
import {combineLatest as observableCombineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrder } from '../../shared/models/work-order';
import { WorkOrderService } from '../work-order/work-order.service';
import { WorkAssignmentsService } from "../work-assignments/work-assignments.service";
import { Router } from '@angular/router';
import { TransportProvidersService } from '../transport-providers.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {
  order: WorkOrder = new WorkOrder();
  transportLabel: string;
  workerCount: number;
  transportCost: number;
  laborCost: number;

  constructor(
    private ordersService: WorkOrderService,
    private onlineService: OnlineOrdersService,
    private transportProviderService: TransportProvidersService,
    private assignmentService: WorkAssignmentsService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    const l$ = this.transportProviderService.getTransportProviders();
    const o$ = this.ordersService.getStream();
    const wa$ = this.assignmentService.getStream();

    combineLatest([l$, o$, wa$]).subscribe(([l, o, wa]) => {
      console.log('ngOnInit->combineLatest.subscribe', l, o, wa);
      this.order = o;
      if (o.transportProviderID > 0)
      {
        this.transportLabel = l.find(ll => ll.id == o.transportProviderID).text;
        }
      if (wa != null && wa.length > 0) {
        // sums up the transport  costs
        this.transportCost = 
          wa.map(wa => wa.transportCost)
            .reduce((a, b) => a + b);
        this.workerCount = wa.length;
        // sums up the labor costs
        this.laborCost = 
          wa.map(wa => wa.hourlyWage * wa.hours)
            .reduce((a, b) => a + b);
      } else {
        this.workerCount = 0;
        this.transportCost = 0;
        this.laborCost = 0;
      }
      this.order.workAssignments = wa;
    },
    error => console.error('error', error));

  }

  submit() {
    this.onlineService.createOrder(this.order)
      .subscribe(
        (data) => {
          if (data.id == null)
          {
            console.error('workorder doesn\'t have an ID');
            return;
          }
          this.onlineService.clearState();
          this.ordersService.clearState();
          this.assignmentService.clearState();
          this.router.navigate(['/my-work-orders/' + data.id]);
        },
        (errorRes: HttpErrorResponse) => {
          this.messageService.add({
            severity:'error', 
            summary:`Machete server returned an error`, 
            detail: JSON.stringify(errorRes.error)
          });   
        }
      );
  }

}
