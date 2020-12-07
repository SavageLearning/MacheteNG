import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lookup } from '../../../lookups/models/lookup';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  @Input() skills: Lookup[];
  @Input() hasSelection: boolean;
  @Output() selectedOption = new EventEmitter<number>();

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {

  }

  onSkillSelect(item: Lookup) {
    this.confirmSelect(item.text_EN);
    this.selectedOption.emit(item.id);
  }

  confirmSelect(skill: string) {
    this.messageService.add({
      life: 10000,
      key: 'bc',
      severity: 'success',
      summary: `${skill} selected`,
      detail: 'Choose additional details below to continue'
    });
  }

}
