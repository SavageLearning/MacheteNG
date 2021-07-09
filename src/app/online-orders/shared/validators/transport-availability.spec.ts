import { AbstractControl, ValidatorFn, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ScheduleRule, TransportProvider, TransportProviderAvailability } from '..';
import { transportAvailabilityValidator } from './transport-availability';
import * as moment from 'moment/moment';

describe('TransportAvailability', () => {
    let ctrl: AbstractControl;
    let fb: FormBuilder;
    let fg: FormGroup;
    let tFunc: ValidatorFn;
    let today: Date;
    beforeEach(() => {
      fb = new FormBuilder();
      tFunc = transportAvailabilityValidator( new Array<TransportProvider>(
        new TransportProvider({
          id: 1,
          key: '',
          text: 'transport_van',
          defaultAttribute: true,
          sortorder: 1,
          active: true,
          availabilityRules: new Array<TransportProviderAvailability>(
            new TransportProviderAvailability({day: 0, available: false}),
            new TransportProviderAvailability({day: 1, available: true}),
            new TransportProviderAvailability({day: 2, available: true}),
            new TransportProviderAvailability({day: 3, available: true}),
            new TransportProviderAvailability({day: 4, available: true}),
            new TransportProviderAvailability({day: 5, available: true}),
            new TransportProviderAvailability({day: 6, available: true})
          )
        })
      ), ['dateOfWork']);
    });

  it('should create an instance', () => {
    const date: Date = moment().startOf('day').add(1, 'weeks').isoWeekday(2).toDate();
    const time: string = moment(0).format('HH:mm').toString();
    fg = fb.group({
      dateOfWork: date,
      timeOfWork: time,
      transportProviderID: 1
    });
    ctrl = fg.get('dateOfWork');
    const result = tFunc(ctrl);
    expect(result).toBeNull();
  });

  it('should not show van on Sunday', () => {
    const date: Date = moment().startOf('day').add(1, 'weeks').isoWeekday(0).toDate();
    const time: string = moment(0).format('HH:mm').toString();
    fg = fb.group({
      dateOfWork: date,
      timeOfWork: time,
      transportProviderID: 1
    });

    ctrl = fg.get('dateOfWork');
    const result = tFunc(ctrl);
    expect(result.transportAvailability).toBe('transport_van not available on Sunday.' );
  });
});
