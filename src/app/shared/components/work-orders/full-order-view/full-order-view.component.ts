import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WorkOrder } from '../../../models/work-order';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'full-order-view',
  templateUrl: './full-order-view.component.html',
  styleUrls: ['./full-order-view.component.css']
})
export class FullOrderViewComponent implements OnChanges {
  @Input() order: WorkOrder;
  @Input() transportLabel: string;
  @Input() workerCount: number;
  @Input() transportCost: number;
  @Input() laborCost: number;
  @Input() showPayPal: boolean;

  constructor(private messageService: MessageService) {  
    console.log('.ctor');
   }

    ngOnChanges() {
      if (this.showPayPal && this.transportCost > 0 && this.order.ppState != 'created') {
        const detail = 'Please pay the transport costs by PayPal or Credit Card by clicking on "PayPal Checkout"';
        this.messageService.add({severity: 'warn', summary: 'Transport costs due', detail: detail});
      } else {

      }
    }

}

