import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-workers-in-skill',
  templateUrl: './workers-in-skill.component.html',
  styleUrls: ['./workers-in-skill.component.css']
})
export class WorkersInSkillComponent implements OnInit {
  endpointQueryParam: string;

  constructor(
    private route: ActivatedRoute,
   ) { }

  ngOnInit(): void {
    this.endpointQueryParam = this.route.snapshot.paramMap.get('id');
    console.log(this.endpointQueryParam);
  }

}
