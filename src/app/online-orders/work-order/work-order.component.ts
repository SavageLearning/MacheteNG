
import { combineLatest as observableCombineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WorkOrder } from '../../shared/models/work-order';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrderService } from './work-order.service';
import { ScheduleRule, schedulingDayValidator, requiredValidator, TransportRule } from '../shared';
import { TransportProvider, schedulingTimeValidator } from '../shared';
import { MySelectItem, YesNoSelectItem } from '../../shared/models/my-select-item';
import { Router } from '@angular/router';
import { ScheduleRulesService } from '../schedule-rules.service';
import { zipcodeValidator } from '../shared/validators/zipcode';
import { TransportRulesService } from '../transport-rules.service';
import { phoneValidator } from '../../shared/validators/phone';
import { regexValidator } from '../../shared/validators/regex';
import { lengthValidator } from '../../shared/validators/length';
import { TransportProvidersService } from '../transport-providers.service';
import { transportAvailabilityValidator } from '../shared/validators/transport-availability';
import { DateTime } from 'luxon'; 
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {
  transportMethods: TransportProvider[];
  transportMethodsDropDown: MySelectItem[];
  transportRules: TransportRule[];
  orderForm: FormGroup;
  workOrder: WorkOrder = new WorkOrder();
  dateOfWork: Date;
  timeOfWork: string;
  minOrderDate: Date;
  defaultOrderTime: Date;
  errorMessage: string;
  showErrors = false;
  newOrder = true;
  schedulingRules: ScheduleRule[];
  displayTransportCosts = false;
  displayUserGuide = true;
  yesNoDropDown = [new YesNoSelectItem('no', false), new YesNoSelectItem('yes', true)];
  selectedTransport = 0;
  storageKey = 'machete.work-order.component';
  formErrors = {
    dateOfWork: '',
    timeOfWork: '',
    contactName: '',
    worksiteAddress1: '',
    worksiteAddress2: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    description: '',
    englishRequired: '',
    englishRequiredNote: '',
    transportProviderID: ''
  };
  isHandset$ = false;

  constructor(
    private transportProviderService: TransportProvidersService,
    private orderService: WorkOrderService,
    private onlineService: OnlineOrdersService,
    private schedulingRulesService: ScheduleRulesService,
    private transportRulesService: TransportRulesService,
    private router: Router,
    private fb: FormBuilder,
    private observer: BreakpointObserver) {
    console.log('.ctor');
    let result = sessionStorage.getItem(this.storageKey + '.UG');
    if (result === 'false') {
      this.displayUserGuide = false;
    } else {
      this.displayUserGuide = true;
    }
  }

  showDialog() {
    this.displayTransportCosts = true;
  }

  ackUserGuide() {
    this.displayUserGuide = false;
    sessionStorage.setItem(this.storageKey + '.UG', 'false');
  }

  ngOnInit() {
    this.buildForm();
    observableCombineLatest([ // observables from these services:
      this.transportProviderService.getTransportProviders(),
      this.orderService.getStream(),
      this.schedulingRulesService.getScheduleRules(),
      this.transportRulesService.getTransportRules(),
      this.observer.observe(Breakpoints.Handset) // observe device size
    ]).subscribe(([transportProviders, workOrder, schedulingRules, transportRules, observer]) => { // (order must match above)
      this.workOrder = workOrder;
      if (workOrder.dateTimeofWork) {
        this.dateOfWork = this.getDateOnly(workOrder.dateTimeofWork);
        this.timeOfWork = this.getTime(workOrder.dateTimeofWork);
      }
      this.transportMethods = transportProviders;
      this.schedulingRules = schedulingRules;
      this.transportRules = transportRules;
      this.isHandset$ = observer.matches; // observe device size
      // map transport entries to dropdown
      let items = [new MySelectItem('Select transportation method', null)];
      let transports = transportProviders.map(l => new MySelectItem(l.text, String(l.id)));
      this.transportMethodsDropDown = items.concat(transports);
      this.buildForm(); // bind the properties of the UI
    });

    this.minOrderDate = new Date();
    this.minOrderDate.setDate(this.minOrderDate.getDate() + 1);

    this.defaultOrderTime = new Date();
    this.defaultOrderTime.getDate();
    this.defaultOrderTime.setHours(9, 0).toString();
  }

  getDateOnly(date: Date): Date {
    return DateTime.fromJSDate(date).startOf('day').toJSDate();
  }

  getTime(date: Date): string {
    return DateTime.fromJSDate(date).minus(this.getDateOnly(date)).toFormat('HH:mm');
  }

  buildForm(): void {
    this.selectedTransport = this.workOrder.transportProviderID;
    this.orderForm = this.fb.group({
      dateOfWork: [this.dateOfWork, requiredValidator('Date & time is required.')],
      timeOfWork: [this.timeOfWork, requiredValidator('Date & time is required.')],
      contactName: [this.workOrder.contactName, requiredValidator('Contact name is required')],
      worksiteAddress1: [this.workOrder.worksiteAddress1, [requiredValidator('Address is required'), lengthValidator(50)]],
      worksiteAddress2: [this.workOrder.worksiteAddress2, lengthValidator(50)],
      city: [this.workOrder.city, [requiredValidator('City is required.'), lengthValidator(50)]],
      state: [this.workOrder.state, [
        requiredValidator('State is required.'),
        regexValidator(new RegExp(/^[a-zA-Z]{2,2}$/), 'state', 'State must be two letters')
      ]],
      zipcode: [this.workOrder.zipcode, [requiredValidator('Zipcode is required.')]],
      phone: [this.workOrder.phone, phoneValidator('Phone is required in ###-###-#### format')],
      description: [this.workOrder.description, [requiredValidator('Description is required'), lengthValidator(100)]],
      englishRequired: [this.workOrder.englishRequired],
      englishRequiredNote: [this.workOrder.englishRequiredNote, lengthValidator(100)],
      transportProviderID: [this.workOrder.transportProviderID, [requiredValidator('A transport method is required')]]
    });

    this.orderForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    const form = this.orderForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        for (const key in control.errors) {
          // if (this.showErrors == true){
          //   console.log('onValueChanged.error:' + field + ': ' + control.errors[key]);
          // }
          this.formErrors[field] += control.errors[key] + ' ';
        }
      }
    }
  }

  save() {
    // shimming in ValidatorFn outside of form control // englishRequired: "true"
    let dateCtrl = this.orderForm.get('dateOfWork');
    let dateError = schedulingDayValidator(this.schedulingRules)(dateCtrl);
    let dateError2 = transportAvailabilityValidator(this.transportMethods, ['transportProviderID', 'timeOfWork'])(dateCtrl);
    if (dateError || dateError2) {
      dateCtrl.setErrors({ ...dateError, ...dateError2, ...dateCtrl.errors });
    }
    //
    let timeCtrl = this.orderForm.get('timeOfWork');
    let timeError = schedulingTimeValidator(this.schedulingRules)(timeCtrl);
    if (timeError) {
      timeCtrl.setErrors({ ...timeError, ...timeCtrl.errors });
    }
    //
    let zipCtrl = this.orderForm.get('zipcode');
    let zipError = zipcodeValidator(this.transportRules)(zipCtrl);
    if (zipError) {
      zipCtrl.setErrors({ ...zipError, ...zipCtrl.errors });
    }

    this.onValueChanged();
    if (this.orderForm.status === 'INVALID') {
      console.log('save: INVALID', this.formErrors)
      this.onlineService.setWorkorderConfirm(false);
      this.showErrors = true;
      return;
    }
    this.showErrors = false;

    const order = this.prepareOrderForSave();
    this.orderService.save(order);
    this.onlineService.setWorkorderConfirm(true);
    this.newOrder = false;
    this.router.navigate(['/online-orders/work-assignments']);
  }

  prepareOrderForSave(): WorkOrder {
    const formModel = this.orderForm.value;
    console.log(formModel.dateOfWork, formModel.timeOfWork, formModel.dateTimeofWork);
    const timeInMS = (Number(formModel.timeOfWork.split(':')[0]) * 3600 + Number(formModel.timeOfWork.split(':')[1]) * 60) * 1000;
    const combinedTime = DateTime.fromJSDate(formModel.dateOfWork).plus(timeInMS).toJSDate();
    const order = new WorkOrder({
      id: 0,
      dateTimeofWork: combinedTime,
      contactName: formModel.contactName,
      worksiteAddress1: formModel.worksiteAddress1,
      worksiteAddress2: formModel.worksiteAddress2,
      city: formModel.city,
      state: formModel.state,
      zipcode: formModel.zipcode,
      phone: formModel.phone,
      description: formModel.description,
      englishRequired: formModel.englishRequired,
      englishRequiredNote: formModel.englishRequiredNote,
      transportProviderID: formModel.transportProviderID
    });
    order.englishRequired = formModel.englishRequired; // TypeScript pls
    return order;
  }
}
