
import {combineLatest as observableCombineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WorkOrder } from '../../shared/models/work-order';
import { OnlineOrdersService } from '../online-orders.service';
import { WorkOrderService } from './work-order.service';
import { ScheduleRule, schedulingDayValidator, requiredValidator, TransportRule, TransportProvider, schedulingTimeValidator} from '../shared';
import { ConfigsService } from '../../configs/configs.service';
import { MySelectItem } from '../../shared/models/my-select-item';
import { Router } from "@angular/router";
import { ScheduleRulesService } from '../schedule-rules.service';
import { zipcodeValidator } from '../shared/validators/zipcode';
import { TransportRulesService } from '../transport-rules.service';
import { phoneValidator } from '../../shared/validators/phone';
import { regexValidator } from '../../shared/validators/regex';
import { lengthValidator } from '../../shared/validators/length';
import { TransportProvidersService } from '../transport-providers.service';
import { transportAvailabilityValidator } from '../shared/validators/transport-availability';
import { startOfDay, differenceInMilliseconds, format, addMilliseconds } from 'date-fns';

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
  order: WorkOrder = new WorkOrder();
  dateOfWork: Date;
  timeOfWork: string;
  errorMessage: string;
  showErrors = false;
  newOrder = true;
  schedulingRules: ScheduleRule[];
  displayTransportCosts = false;
  displayUserGuide = true;
  engReqToggle = false;
  selectedTransport: number = 0;
  storageKey = 'machete.work-order.component';
  formErrors = {
    'dateOfWork': '',
    'timeOfWork': '',
    'contactName':  '',
    'worksiteAddress1':  '',
    'worksiteAddress2':  '',
    'city':  '',
    'state':  '',
    'zipcode':  '',
    'phone':  '',
    'description':  '',
    'englishRequired': '',
    'englishRequiredNote':  '',
    'transportProviderID': ''
  };



  showDialog() {
      this.displayTransportCosts = true;
  }

  ackUserGuide() {
    this.displayUserGuide = false;
    sessionStorage.setItem(this.storageKey + '.UG', 'false');
  }

  constructor(
    private transportProviderService: TransportProvidersService, 
    private orderService: WorkOrderService,
    private onlineService: OnlineOrdersService,
    private configsService: ConfigsService,
    private schedulingRulesService: ScheduleRulesService,
    private transportRulesService: TransportRulesService,
    private router: Router,
    private fb: FormBuilder) {
      console.log('.ctor'); 
      let result = sessionStorage.getItem(this.storageKey + '.UG');
      if (result === 'false')
      {
        this.displayUserGuide = false;
      } else {
        this.displayUserGuide = true;
      }
    }

  ngOnInit() {
    this.buildForm();
    observableCombineLatest(
      this.transportProviderService.getTransportProviders(),
      this.orderService.getStream(),
      this.schedulingRulesService.getScheduleRules(),
      this.transportRulesService.getTransportRules()
    ).subscribe(([l, o, s, t]) => {
      this.order = o;
      if (o.dateTimeofWork) {
        this.dateOfWork = this.getDateOnly(o.dateTimeofWork);
        this.timeOfWork = this.getTime(o.dateTimeofWork);
      }
      this.engReqToggle = o.englishRequired;
      this.transportMethods = l;
      this.schedulingRules = s;
      this.transportRules = t;
      // map transport entries to dropdown
      let items = [new MySelectItem('Select transportion', null)];
      let transports = l.map(l =>
        new MySelectItem(l.text, String(l.id)));
      this.transportMethodsDropDown = items.concat(transports);       
      this.buildForm();
    });
  }

  getDateOnly(date: Date): Date {
    return startOfDay(date);
  }

  getTime(date: Date): string {
    return format(differenceInMilliseconds(date, this.getDateOnly(date)), 'HH:mm');
  }

  buildForm(): void {
    this.selectedTransport = this.order.transportProviderID;
    this.orderForm = this.fb.group({
      'dateOfWork': [this.dateOfWork, requiredValidator('Date & time is required.')],
      'timeOfWork': [this.timeOfWork, requiredValidator('Date & time is required.')],      
      'contactName': [this.order.contactName, requiredValidator('Contact name is required')],
      'worksiteAddress1': [this.order.worksiteAddress1, [requiredValidator('Address is required'), lengthValidator(50)]],
      'worksiteAddress2': [this.order.worksiteAddress2, lengthValidator(50)],
      'city': [this.order.city, [requiredValidator('City is required.'), lengthValidator(50)]],
      'state': [this.order.state, [
        requiredValidator('State is required.'), 
        regexValidator(new RegExp(/^[a-zA-Z]{2,2}$/), 'state', "State must be two letters")
      ]],
      'zipcode': [this.order.zipcode, [requiredValidator('Zipcode is required.')]],
      'phone': [this.order.phone, phoneValidator('Phone is required in ###-###-#### format')],
      'description': [this.order.description, [requiredValidator('Description is required'),lengthValidator(100)]],
      'englishRequired': [this.order.englishRequired],
      'englishRequiredNote': [this.order.englishRequiredNote, lengthValidator(100)],
      'transportProviderID': [this.order.transportProviderID, [requiredValidator('A transport method is required')]]
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
    // shimming in ValidatorFn outside of form control
    let dateCtrl = this.orderForm.get('dateOfWork');
    let dateError = schedulingDayValidator(this.schedulingRules)(dateCtrl);
    let dateError2 = transportAvailabilityValidator(this.transportMethods, ['transportProviderID', 'timeOfWork'])(dateCtrl);
    if (dateError || dateError2) {
      dateCtrl.setErrors({...dateError, ...dateError2, ...dateCtrl.errors});
    }
    //
    let timeCtrl = this.orderForm.get('timeOfWork');
    let timeError = schedulingTimeValidator(this.schedulingRules)(timeCtrl);
    if (timeError) {
      timeCtrl.setErrors({...timeError, ...timeCtrl.errors});
    }
    //
    let zipCtrl = this.orderForm.get('zipcode');
    let zipError = zipcodeValidator(this.transportRules)(zipCtrl);
    if (zipError) {
      zipCtrl.setErrors({...zipError, ...zipCtrl.errors});
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
    const timeInMS = (Number(formModel.timeOfWork.split(':')[0])*3600+Number(formModel.timeOfWork.split(':')[1])*60)*1000;
    const order = new WorkOrder({
      id: 0,
      dateTimeofWork: addMilliseconds(formModel.dateOfWork, timeInMS),
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
    return order;
  }
}
