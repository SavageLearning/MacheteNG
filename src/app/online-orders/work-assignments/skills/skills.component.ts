import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lookup } from '../../../lookups/models/lookup';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skills: Lookup[];
  selectedSkill: Lookup;

  constructor(private messageService: MessageService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.skills = this.config.data;
  }

  onRowSelect(event) {
    this.ref.close(event.data);
  }

}
