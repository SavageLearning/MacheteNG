import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MegaMenuItem } from 'primeng/api';  //required when using MegaMenu

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [{
        label: 'Workers',
        icon: 'pi pi-fw pi-user',
        items: [
          {

            label: 'Skills List',
            icon: 'pi pi-list',
            routerLink: ['skills'],
            routerLinkActiveOptions: { exact: true }
          }]
    }]
  }

}
