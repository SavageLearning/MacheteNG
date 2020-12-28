import { Component, OnInit } from '@angular/core';
import { EmployersService } from './employers.service';
import { Employer } from '../shared/models/employer';
import { FormGroup, FormBuilder } from '@angular/forms';
import { YesNoSelectItem } from '../shared/models/my-select-item';
import { Router } from '@angular/router';
//import { phoneValidator } from '../shared/validators/phone';
import { requiredValidator } from '../online-orders/shared/index';
import { phoneValidator, phoneOrEmptyValidator } from '../shared/validators/phone';
import { regexValidator } from '../shared/validators/regex';
import { lengthValidator } from '../shared/validators/length';


@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.css'],
  providers: []
})
export class EmployersComponent implements OnInit {
  employer: Employer = new Employer();
  employerForm: FormGroup;
  showErrors = false;
  yesNoDropDown = [new YesNoSelectItem('no', false), new YesNoSelectItem('yes', true)];
  formErrors = {
    address1: '',
    address2: '',
    'blogparticipate?': '',
    business: '',
    businessname: '',
    cellphone: '',
    city: '',
    email: '',
    fax: '',
    name: '',
    phone: '',
    referredBy: '',
    referredByOther: '',
    state: '',
    zipcode: ''
  };

  constructor(
    private employersService: EmployersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this.employersService.getEmployer()
      .subscribe(
        data => {
          this.employer = data || new Employer();
          this.buildForm();
        });
  }

  buildForm(): void {
    this.employerForm = this.formBuilder.group({
    //'id': [this.employer.id],
    address1: [this.employer.address1, [requiredValidator('Address is required'), lengthValidator(50)]],
    address2: [this.employer.address2, lengthValidator(50)],
    blogparticipate: [this.employer.blogparticipate],
    business: [this.employer.business],
    businessname: [this.employer.businessname],
    cellphone: [this.employer.cellphone, phoneOrEmptyValidator('Cell is optional, but requires ###-###-#### format')],
    city: [this.employer.city, [requiredValidator('City is required'), lengthValidator(50)]],
    email: [{value: this.employer.email, disabled: true}, requiredValidator('Email is required')],
    fax: [this.employer.fax],
    name: [this.employer.name, [requiredValidator('Name is required'), lengthValidator(50)]],
    phone: [this.employer.phone, phoneValidator('Phone is required in 999-999-9999 format')],
    referredBy: [this.employer.referredBy],
    referredByOther: [this.employer.referredByOther, lengthValidator(50)],
    state: [this.employer.state, [
      requiredValidator('State is required'),
      regexValidator(new RegExp(/^[a-zA-Z]{2,2}$/), 'state', 'State must be two letters')]],
    zipcode: [this.employer.zipcode, [requiredValidator('zipcode is required'), lengthValidator(10)]]
    });

    this.employerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    const form = this.employerForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        for (const key in control.errors) {
          if (this.showErrors === true){
            console.log('onValueChanged.error:' + field + ': ' + control.errors[key]);
          }
          this.formErrors[field] += control.errors[key] + ' ';
        }
      }
    }
  }

  saveEmployer() {
    console.log('saveEmployer: called');
    this.onValueChanged();
    if (this.employerForm.status === 'INVALID') {
      this.showErrors = true;
      return;
    }
    console.log('saveEmployer: form status valid');
    this.showErrors = false;
    const formModel = this.employerForm.value;
    this.employersService.save(formModel)
      .subscribe(
        data => {
          console.log('employerService.save returned:', data);
          this.router.navigate(['/online-orders/introduction']);
        }
      );
  }
}
