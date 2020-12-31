import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersRoutingModule } from './workers-routing.module';
import { FormsModule } from '@angular/forms';

import { WorkersComponent } from './workers.component';
import { SkillsListComponent } from './skills-list/skills-list.component';
import { WorkersInSkillComponent } from './workers-in-skill/workers-in-skill.component';

import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    WorkersComponent,
    SkillsListComponent,
    WorkersInSkillComponent,
  ],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    MenuModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    FormsModule,
    DialogModule
  ],
  providers: [
  ]
})
export class WorkersModule { }
