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
  @ViewChild('dt') table: Table;
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
      .subscribe((response: Skill[]) => {
        this.skills = response;
        console.table(this.skills);
      });
  }

  workersInSKill(id: number): void {
    console.log(id);
  }

  filterTable() {
    if (this.activeFilterOn) {
      this.table.filter(this.activeFilterOn, 'active', 'equals');
    } else {
      this.table.clear();
    }

    if (this.specialtyFilterOn) {
      this.table.filter(this.specialtyFilterOn, 'speciality', 'equals');
    } else {
      this.table.clear();
    }
  }

  showHelpDialog() {
    this.display = true;
  }

  // Lifecycle
  ngOnInit(): void {
    this.loadSkills();
  }
}
