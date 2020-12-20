import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WorkOrder } from '../../../models/work-order';
import {MessageService} from 'primeng/api';

interface EmployerInfo {
  name: string,
  worksite1: string,
  worksite2: string,
  city: string,
  state: string,
  zip: string,
  phone: string
}

interface JobDetails {
  description: string,
  englishRequired: string,
  tranportMethod: string,
  workerCount: number
}

interface OrderCost {
  feeName: string,
  fee: number,
  due: string
}

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

  employerInfo: EmployerInfo;
  jobInfo: JobDetails[] = new Array<JobDetails>();
  orderCost: OrderCost[] = new Array<OrderCost>();

  constructor(private messageService: MessageService) {  
    console.log('.ctor');
   }

    ngOnChanges() {
      if (this.showPayPal && this.transportCost > 0 && this.order.ppState != 'created') {
        const detail = 'Please pay the transport costs by PayPal or Credit Card by clicking on "PayPal Checkout"';
        this.messageService.add({severity: 'warn', summary: 'Transport costs due', detail: detail});
      } else {

      }
      this.employerInfo = {
        name: this.order.contactName,
        worksite1: this.order.worksiteAddress1,
        worksite2: this.order.worksiteAddress2,
        city: this.order.city,
        state: this.order.state,
        zip: this.order.zipcode,
        phone: this.order.phone
      };
      this.jobInfo = [{
        description: this.order.description,
        englishRequired: this.order.englishRequired ? 'yes' : 'no',
        tranportMethod: this.transportLabel,
        workerCount: this.workerCount
      }];
      this.orderCost = [{
        feeName: 'Transport Cost',
        fee: this.transportCost,
        due: 'Due now and payable with Paypal, debit or credit'
      }, {
        feeName: 'Labor Cost',
        fee: this.laborCost,
        due: 'To be paid directly to workers in cash at the end of the work day'
      }];
    }

    print(printArea: string) {
      let popupWinindow = document.getElementById(printArea).innerHTML;
      window.print();
    }

}
