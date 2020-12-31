/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Skill } from '../../shared/models/skill';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.css']
})
export class SkillsListComponent implements OnInit {
  //Skills List
  skills: Skill[];

  // table controls
  specialtyFilterOn = false;
  activeFilterOn = false;
  filterActiveOpt = {
    iconOn: 'pi pi-check',
    iconOff: 'pi pi-times',
    labelOn: 'Active Filter On',
    labelOff: 'Active Filter Off',
  }
  filterSepecialtyOpt = {
    iconOn: 'pi pi-check',
    iconOff: 'pi pi-times',
    labelOn: 'Specialized Filter On',
    labelOff: 'Specialized Filter Off',
  }

  // help dialog
  display = false;

  constructor(
    private workerService: WorkersService,
  ) { }

  loadSkills(): void {
    this.workerService.getSkills()
      .subscribe(
        //sucess
        (response: Skill[]) => {
          this.skills = response;
          // console.table(this.skills);
        },
        // error
        (err) => console.log(err));
  }

  workersInSKill(id: number): void {
    console.log(id);
  }

  logFilterChanges(filters: any) {
    console.table(filters);
  }

  showHelpDialog() {
    this.display = true;
  }

  // Lifecycle
  ngOnInit(): void {
    this.loadSkills();
  }
}
