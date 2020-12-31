import { Component, OnInit } from '@angular/core';
import { Skill } from '../../shared/models/skill';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.css']
})
export class SkillsListComponent implements OnInit {

  constructor(
    private workerService: WorkersService) { }

  ngOnInit(): void {
  }

  loadSkills(): void {
    this.workerService.getSkills()
      .subscribe((response: Skill[]) => console.table(response));
  }
}
