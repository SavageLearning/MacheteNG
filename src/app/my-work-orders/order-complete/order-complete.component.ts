
import {combineLatest as observableCombineLatest,  Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { WorkOrder } from '../../shared/models/work-order';
import { LookupsService } from '../../lookups/lookups.service';
import { LCategory } from '../../lookups/models/lookup';
import * as paypal from 'paypal-checkout';
import { ActivatedRoute, Router } from '@angular/router';
import { MyWorkOrdersService } from '../my-work-orders.service';
import { environment } from '../../../environments/environment';
import { ConfigsService } from '../../configs/configs.service';
import { TransportProvidersService } from '../../online-orders/transport-providers.service';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {

  order = new WorkOrder();
  transportLabel: string;
  workerCount: number;
  transportCost: number = 0;
  laborCost: number;
  // paypal values
  public didPaypalScriptLoad: boolean = false;
  public loading: boolean = true;

  public paypalConfig: any = {
    // The env (sandbox/production) tells the paypal client which URL to use. 
    env: '',
    client: {
      sandbox: '',
      production: ''
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.transportCost, currency: 'USD' } }
          ]
        },
        experience: {
          input_fields: {
              no_shipping: 1
          }
        },
      });
    },
    onAuthorize: (data, actions) => {
      console.log('Payment was successful!', data, actions);
      // TODO: add confirmation notice/spinner
      this.ordersService.executePaypal(this.order.id, data['payerID'], data['paymentID'], data['paymentToken'])
        .subscribe(
          data => {
            console.log('execute paypal returned:', data);
            this.ordersService.getOrder(this.order.id)
              .subscribe(foo => this.order = foo);
          },
          error => console.error('execute paypal errored:', error));
    },
    onCancel: function(data) {
      console.log('The payment was cancelled!', data);
    },
    onError: function(err) {
      console.log('There was an error:', err);
    }
  };

  constructor(
    private ordersService: MyWorkOrdersService,
    private transportProviderService: TransportProvidersService,
    private route: ActivatedRoute,
    private router: Router,
    private configsService: ConfigsService
  ) { 
    console.log('.ctor');    
  }

  ngOnInit() {
    console.log('order-complete.component:ngOnInit');
    const id = +this.route.snapshot.paramMap.get('id');
    observableCombineLatest([
      this.transportProviderService.getTransportProviders(),
      this.ordersService.getOrder(id),
      this.configsService.getConfig('PayPalClientID'),
      this.configsService.getConfig('PayPalEnvironment')
    ]).subscribe(([l,o,id,env])=>{
      console.log('ngOnInit:combineLatest received:', l,o,id,env);
      this.paypalConfig['env'] = env.value;
      this.paypalConfig.client[env.value] = id.value;
      console.log('paypalConfig', this.paypalConfig);
      this.order = o;
      if (o == null) {
        this.router.navigate(['/online-orders/order-not-found'])
        return;
      }
      this.transportLabel = l.find(ll => ll.id == o.transportProviderID).text;
      let wa = o.workAssignments;
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
    },
    error => console.error('error', error));
  }

  public ngAfterViewChecked(): void {
    if(this.transportCost > 0 && !this.didPaypalScriptLoad) {
      //this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
        this.loading = false;
        this.didPaypalScriptLoad = true;
      //});
    }
  }
  // This is a hacky just-in-time load of the 176k checkout.js
  // it blows up the tests because the call isn't mocked.
  // Ignoring for now
  // https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/add-paypal-button/
  // https://github.com/KevinShiCA/ng4-paypal-button/blob/master/src/app/app.component.ts
  // public loadPaypalScript(): Promise<any> {
  //   this.didPaypalScriptLoad = true;
  //   return new Promise((resolve, reject) => {
  //     const scriptElement = document.createElement('script');
  //     scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
  //     scriptElement.onload = resolve;
  //     document.body.appendChild(scriptElement);
  //   });
  // }

}
