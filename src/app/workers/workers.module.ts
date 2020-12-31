import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersComponent } from './workers.component';
import { SkillsListComponent } from './skills-list/skills-list.component';
import { WorkersInSkillComponent } from './workers-in-skill/workers-in-skill.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';



@NgModule({
  declarations: [
    WorkersComponent,
    SkillsListComponent,
    WorkersInSkillComponent,
  ],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    MegaMenuModule,
    MenuModule
  ]
})
export class WorkersModule {}
