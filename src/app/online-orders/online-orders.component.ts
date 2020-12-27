import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {OnlineOrdersService} from './online-orders.service';
import {FormBuilder} from '@angular/forms';
import { WorkAssignmentsService } from './work-assignments/work-assignments.service';
import { WorkOrderService } from './work-order/work-order.service';
import { EmployersService } from '../employers/employers.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-online-orders',
  templateUrl: './online-orders.component.html',
  styleUrls: ['./online-orders.component.scss'],
  providers: [
    WorkOrderService,
    WorkAssignmentsService,
    FormBuilder
  ]
})
export class OnlineOrdersComponent implements OnInit {
  items: MenuItem[];
  activeIndex = 0;
  confirmation = false;

  constructor(
    private onlineService: OnlineOrdersService,
    private router: Router) {
      // router.events.subscribe(event => {
      //   // NavigationEnd event occurs after route succeeds
      //   if (event instanceof NavigationEnd) {
      //     switch (event.urlAfterRedirects) {
      //       case '/online-orders/introduction': { this.activeIndex = 0; break; }
      //       case '/online-orders/intro-confirm': { this.activeIndex = 1; break; }
      //       case '/online-orders/work-order': { this.activeIndex = 2; break; }
      //       case '/online-orders/work-assignments': { this.activeIndex = 3; break; }
      //       case '/online-orders/order-confirm': { this.activeIndex = 4; break; }
      //     }
      //   }
      // });
  }

  ngOnInit() {
    this.items = [
      {label: 'Intro', routerLink: ['introduction']},
      {label: 'Confirm', routerLink: ['intro-confirm']},
      {label: 'site details', routerLink: ['work-order']},
      {label: 'job details', routerLink: ['work-assignments']},
      {label: 'confirm', routerLink: ['order-confirm']}
    ];
  }

}
