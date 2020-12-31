import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MegaMenuItem } from 'primeng/api';  //required when using MegaMenu

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {
  items: MegaMenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Skills',
        icon: 'pi pi-list',
        routerLink: ['skills'],
        routerLinkActiveOptions: { exact: true }
        // items: [
        //   [
        //     {
        //       label: 'Video 1',
        //       items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }]
        //     },
        //     {
        //       label: 'Video 2',
        //       items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }]
        //     }
        //   ],
        //   [
        //     {
        //       label: 'Video 3',
        //       items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }]
        //     },
        //     {
        //       label: 'Video 4',
        //       items: [{ label: 'Video 4.1' }, { label: 'Video 4.2' }]
        //     }
        //   ]
        // ]
      },
      // {
      //   label: 'Workers In Skill',
      //   icon: 'pi pi-fw pi-users',
      //   routerLink: ['in-skill/1'],
      //   routerLinkActiveOptions: { exact: true }
        // items: [
        //   [
        //     {
        //       label: 'User 1',
        //       items: [{ label: 'User 1.1' }, { label: 'User 1.2' }]
        //     },
        //     {
        //       label: 'User 2',
        //       items: [{ label: 'User 2.1' }, { label: 'User 2.2' }]
        //     },
        //   ],
        //   [
        //     {
        //       label: 'User 3',
        //       items: [{ label: 'User 3.1' }, { label: 'User 3.2' }]
        //     },
        //     {
        //       label: 'User 4',
        //       items: [{ label: 'User 4.1' }, { label: 'User 4.2' }]
        //     }
        //   ],
        //   [
        //     {
        //       label: 'User 5',
        //       items: [{ label: 'User 5.1' }, { label: 'User 5.2' }]
        //     },
        //     {
        //       label: 'User 6',
        //       items: [{ label: 'User 6.1' }, { label: 'User 6.2' }]
        //     }
        //   ]
        // ]
      // }
    ]
  }

}
