import { Component, OnInit } from '@angular/core';
import { Skill } from '../shared/models/skill';
import { WorkersService } from './workers.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  constructor(private workerService: WorkersService) { }

  ngOnInit(): void {
    this.workerService.getSkills()
      .subscribe((response: Skill[]) => console.table(response));
  }

}
