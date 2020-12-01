import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OnlineOrdersService } from '../online-orders.service';
import { Router } from '@angular/router';
import { Confirm } from '../shared/models/confirm';

@Component({
  selector: 'app-intro-confirm',
  templateUrl: './intro-confirm.component.html',
  styleUrls: ['./intro-confirm.component.css']
})
export class IntroConfirmComponent implements OnInit {
  confirmChoices = new Array<Confirm>();
  confirmStatus = false;
  // TODO: Refactor as a service that polls from API

  constructor(private onlineService: OnlineOrdersService, private router: Router) {
    console.log('.ctor');
  }

  ngOnInit() {
    this.onlineService.getInitialConfirmedStream()
    .subscribe(
      confirmed => {
        this.confirmChoices = confirmed;
        this.confirmStatus = this.confirmChoices
            .map(a => a.confirmed)
            .reduce((a, b) => a && b );
      }
    );
  }

  checkConfirm(event: Event) {
    let result =  this.confirmChoices
                            .map(a => a.confirmed)
                            .reduce((a, b) => a && b );
    this.confirmStatus = result;
    this.onlineService.setInitialConfirm(this.confirmChoices);
  }

  nextStep() {
    this.router.navigate(['/online-orders/work-order']);
  }
}
