import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Lookup } from '../../lookups/models/lookup';
import { LookupsService } from '../../lookups/lookups.service';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-workers-in-skill',
  templateUrl: './workers-in-skill.component.html',
  styleUrls: ['./workers-in-skill.component.css']
})
export class WorkersInSkillComponent implements OnInit {
  // workers list
  workers: Worker[];
  skill: Lookup;

  // route
  endpointQueryParam: number;

  // filter fields
  filterFields = [
      'firstname1',
      'firstname2',
      'lastname1',
      'lastname2',
      'dwccardnum',
      'memberexpirationdate',
      'memberStatusEN',
      'driverslicense',
      'carinsurance',
      'insuranceexpiration',
      'dateupdated',
      'memberStatusID',
      'SkillCodes',
      'ZipCode'
  ]

  constructor(
    private route: ActivatedRoute,
    private workerService: WorkersService,
    private lookupsService: LookupsService
  ) { }

  loadServiceData(skillId: number) {
    const workersInSkill$ = this.workerService.getWorkersInSkill(skillId);
    const lookups$ = this.lookupsService.getLookup(skillId);

    combineLatest([workersInSkill$, lookups$])
      .subscribe(
        // sucess
        (response: [Worker[], Lookup]) => {
          const [workersInSkillRes, lookupsRes] = response;
          this.workers = workersInSkillRes;
          console.table(this.workers);
          this.skill = lookupsRes;
        },
        //error
        err => console.log(err)
      );
  }

  // Lifecycle
  ngOnInit(): void {
    this.endpointQueryParam = Number(this.route.snapshot.paramMap.get('id'));
    this.loadServiceData(this.endpointQueryParam);
  }

}
