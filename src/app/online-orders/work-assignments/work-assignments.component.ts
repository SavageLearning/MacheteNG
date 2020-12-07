
import {combineLatest as observableCombineLatest,  Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {WorkAssignment} from '../../shared/models/work-assignment';
import { LookupsService } from '../../lookups/lookups.service';
import { Lookup, LCategory } from '../../lookups/models/lookup';
import {OnlineOrdersService} from '../online-orders.service';
import { WorkAssignmentsService } from './work-assignments.service';
import { WorkOrderService } from '../work-order/work-order.service';
import { TransportRule, requiredValidator, TransportProvider } from '../shared';
import { MySelectItem } from '../../shared/models/my-select-item';
import { hoursValidator } from '../shared/validators/hours';
import { loadSkillRules } from '../shared/rules/load-skill-rules';
import { TransportRulesService } from '../transport-rules.service';
import { SkillRule } from '../shared/models/skill-rule';
import { TransportProvidersService } from '../transport-providers.service';
import { lengthValidator } from '../../shared/validators/length';
@Component({
  selector: 'app-work-assignments',
  templateUrl: './work-assignments.component.html',
  styleUrls: ['./work-assignments.component.css']
})
export class WorkAssignmentsComponent implements OnInit {
  skills: Lookup[]; // Lookups from Lookups Service
  transports: TransportProvider[];
  skillsDropDown: MySelectItem[];
  skillsToDisplay: Lookup[]
  skillsRules: SkillRule[];
  selectedSkill: Lookup = new Lookup();
  requestList: WorkAssignment[] = new Array<WorkAssignment>(); // list built by user in UI
  request: WorkAssignment = new WorkAssignment(); // composed by UI to make/edit a request
  selectedRequest: WorkAssignment;
  errorMessage: string;
  newRequest = true;
  requestForm: FormGroup;
  showErrors = false;
  hasRequests = false;
  transportRules: TransportRule[];
  private combinedSource: Observable<[TransportRule[], Lookup[], TransportProvider[]]>;
  formErrors = {
    'skillId': '',
    'skill': '',
    'hours': '',
    'description': '',
    'requiresHeavyLifting': '',
    'hourlyWage': ''
  };
  inputSliderVal: number;

  constructor(
    private lookupsService: LookupsService,
    private transportProviderService: TransportProvidersService,
    private waService: WorkAssignmentsService,
    private onlineService: OnlineOrdersService,
    private transportRulesService: TransportRulesService,
    private router: Router,
    private fb: FormBuilder) {
      console.log('.ctor');
  }

  ngOnInit() {
    console.log('ngOnInit');
    // waService.transportRules could fail under race conditions

    this.combinedSource = observableCombineLatest([
      this.transportRulesService.getTransportRules(),
      this.lookupsService.getLookups(LCategory.SKILL),
      this.transportProviderService.getTransportProviders()]);

    const subscribed = this.combinedSource.subscribe(
      values => {
        const [rules, skills, transports] = values;
        //
        this.transportRules = rules;
        //
        this.skills = skills;
        this.skillsToDisplay = skills.filter(l =>
          l.category === 'skill'
        );
        console.table(this.skillsToDisplay);
        this.skillsDropDown = skills.map(l =>
          new MySelectItem(l.text_EN, String(l.id)));
        this.skillsRules = skills.map(l => new SkillRule(l));
        //
        this.transports = transports;
        this.buildForm();
      }
    );
    // this.transportRulesService.getTransportRules()
    //   .subscribe(
    //     data => this.transportRules = data,
    //     // When this leads to a REST call, compactRequests will depend on it
    //     error => console.error('ngOnInit.getTransportRules.error' + error),
    //     () => console.log('ngOnInit:getTransportRules onCompleted'));

    // this.lookupsService.getLookups(LCategory.SKILL)
    //   .subscribe(
    //     listData => {
    //       this.skills = listData;
    //       this.skillsDropDown = listData.map(l =>
    //         new MySelectItem(l.text_EN, String(l.id)));
    //       this.skillsRules = listData.map(l => new SkillRule(l));
    //       console.log(this.skillsRules);
    //     },
    //     error => this.errorMessage = <any>error,
    //     () => console.log('ngOnInit:skills onCompleted'));
    // this.transportProviderService.getTransportProviders()
    //   .subscribe(
    //     data =>  this.transports = data,
    //     error => this.errorMessage = <any>error,
    //     () => console.log('ngOnInit:transports onCompleted'));
    this.requestList = this.waService.getAll();
    this.setHasRequests();
    this.buildForm();
    this.inputSliderVal = Number(this.requestForm.controls['hours']);
  }

  buildForm(): void {
    this.requestForm = this.fb.group({
      'id': '',
      'skillId': ['', requiredValidator('Please select the type of work to be performed.')],
      'skill': [''],
      'hours': ['', hoursValidator(this.skillsRules, this.skills, 'skillId', 'hours')],
      'description': ['', lengthValidator(1000)], // !! Todo: should be provided by API
      'requiresHeavyLifting': [false],
      'hourlyWage': ['']
    });

    this.requestForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  setHasRequests() {
    if (this.requestList.length > 0) {
      this.hasRequests = true;
    } else {
      this.hasRequests =  false;
    }
  }
  onValueChanged(data?: any) {
    const form = this.requestForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        for (const key in control.errors) {
          console.log('onValueChanged.error:' + field + ': ' + control.errors[key]);
            this.formErrors[field] += control.errors[key] + ' ';
        }
      }
    }
  }

  selectSkill(skillId: number) {
    console.log('selectSkill.skillId:' + String(skillId));
    const skill = this.skills.filter(f => f.id === Number(skillId)).shift();
    if (skill === null || skill === undefined) {
      throw new Error('Can\'t find selected skill in component\'s list');
    }
    this.selectedSkill = skill;
    this.requestForm.controls['skillId'].setValue(skill.id);
    this.requestForm.controls['skill'].setValue(skill.text_EN);
    this.requestForm.controls['hourlyWage'].setValue(skill.wage);
  }

  // loads an existing item into the form fields
  editRequest(request: WorkAssignment) {
    this.requestForm.controls['id'].setValue(request.id);
    this.requestForm.controls['skillId'].setValue(request.skillId);
    this.requestForm.controls['skill'].setValue(request.skill);
    this.requestForm.controls['hours'].setValue(request.hours);
    this.requestForm.controls['description'].setValue(request.description);
    this.requestForm.controls['requiresHeavyLifting'].setValue(request.requiresHeavyLifting);
    this.requestForm.controls['hourlyWage'].setValue(request.hourlyWage);
    this.newRequest = false;
  }

  deleteRequest(request: WorkAssignment) {
    this.waService.delete(request);
    this.requestList = [...this.waService.getAll()];
    this.requestForm.reset();
    this.newRequest = true;
    if (this.requestList == null || this.requestList.length === 0) {
      this.onlineService.setWorkAssignmentsConfirm(false);
    }
    this.setHasRequests();
  }

  saveRequest() {
    this.onValueChanged();
    if (this.requestForm.status === 'INVALID') {
      this.showErrors = true;
      //this.onlineService.setWorkAssignmentsConfirm(false);
      return;
    }
    this.showErrors = false;
    const formModel = this.requestForm.value;

    const saveRequest: WorkAssignment = {
      id: formModel.id || 0,
      skillId: formModel.skillId,
      skill: formModel.skill,
      hours: formModel.hours,
      description: formModel.description,
      requiresHeavyLifting: formModel.requiresHeavyLifting,
      hourlyWage: formModel.hourlyWage,
      transportCost: 0,
      days: 1// We currently only support 1 day on employer portal
    };

    this.waService.save(saveRequest);
    this.onlineService.setWorkAssignmentsConfirm(true);
    this.requestList = [...this.waService.getAll()];
    this.requestForm.reset();
    this.selectedSkill = new Lookup();
    this.buildForm();
    this.newRequest = true;
    this.setHasRequests();
  }

  onRowSelect(event) {
    this.newRequest = false;
    this.request = this.cloneRequest(event.data);
  }

  cloneRequest(c: WorkAssignment): WorkAssignment {
    let request = new WorkAssignment();
    for (let prop in c) {
      request[prop] = c[prop];
    }
    return request;
  }

  finalize() {
    this.router.navigate(['/online-orders/order-confirm']);

  }
}
