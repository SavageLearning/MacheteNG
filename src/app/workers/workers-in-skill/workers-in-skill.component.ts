import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-workers-in-skill',
  templateUrl: './workers-in-skill.component.html',
  styleUrls: ['./workers-in-skill.component.css']
})
export class WorkersInSkillComponent implements OnInit {
  // workers list
  workers: Worker[];

  // route
  endpointQueryParam: number;

  constructor(
    private route: ActivatedRoute,
    private workerService: WorkersService
  ) { }

  loadWorkersInSkill(skillId: number) {
    this.workerService.getWorkersInSkill(skillId)
      .subscribe(
        //success
        (response: Worker[]) => {
          this.workers = response;
          console.table(this.workers);
        },
        // error
        (err) => console.log(err)
      );
  }

  // Lifecycle
  ngOnInit(): void {
    this.endpointQueryParam = Number(this.route.snapshot.paramMap.get('id'));
    this.loadWorkersInSkill(this.endpointQueryParam);
    console.log(this.endpointQueryParam);
  }

}
