import { schedulingDayValidator } from './scheduling';
import { AbstractControl, ValidatorFn, FormBuilder, FormGroup } from '@angular/forms';
import { ScheduleRule } from '..';
import { DateTime } from 'luxon';

describe('ScheduleRule', () => {
    let ctrl: AbstractControl;
    let tFunc: ValidatorFn;
    let fb: FormBuilder;
    let fg: FormGroup;
    let today: Date;
    beforeEach(() => {
        fb = new FormBuilder();
        today = new Date();
        tFunc = schedulingDayValidator(new Array<ScheduleRule>(
          new ScheduleRule({
            day: today.getDay(),
            leadHours: 48,
            minStartMin: 420, //7am
            maxEndMin: 1020 // 5pm
          }),
          new ScheduleRule({
            day: (new Date(today.valueOf() + (24 * 60 * 60 * 1000)).getDay()), // shame
            leadHours: 48,
            minStartMin: 420, //7am
            maxEndMin: 1020 // 5pm
          })
        ));
    });

  it('should create an instance', () => {
    const date: Date = DateTime.local().startOf('day').plus({ weeks: 1 }).toJSDate();
    const time: string = DateTime.fromObject(0).toFormat('HH:mm');
    fg = fb.group({
      dateOfWork: date,
      timeOfWork: time,
      transportProviderID: 1
    });
    ctrl = fg.get('dateOfWork');
    const result = tFunc(ctrl);
    expect(result).toBeNull();
  });

  // it('should reject time in the sameday', () => {
  //   const date: Date = DateTime.local().startOf('day').plus({ days: 1 }).toJSDate();
  //   const time: string = DateTime.local().minus({hours: 1}).toFormat('HH:mm');
  //   fg = fb.group({
  //     dateOfWork: date,
  //     timeOfWork: time,
  //     transportProviderID: 1
  //   });

  //   ctrl = fg.get('dateOfWork');
  //   // act
  //   const result = tFunc(ctrl);
  //   //
  //   expect(result['scheduling']).toBe('Date cannot be in the past.');
  // });

  it('should reject time 1 sec before start time', () => {
    const date: Date = DateTime.local().plus({seconds: 1}).toJSDate();
    const time: string = DateTime.local().minus({hours: 1}).toFormat('HH:mm');

    fg = fb.group({
      dateOfWork: date,
      timeOfWork: time,
      transportProviderID: 1
    });

    ctrl = fg.get('dateOfWork');
    ctrl.setValue(date);
    // act
    const result = tFunc(ctrl);
    //
    expect(result['scheduling']).toBe('Lead time of 1 days required.');
  });

  it('should reject time 2 hours before start time', () => {
    const date: Date = DateTime.local().toJSDate();
    const time: string = DateTime.local().plus({hours: 2}).toFormat('HH:mm');
    fg = fb.group({
      dateOfWork: date,
      timeOfWork: time,
      transportProviderID: 1
    });
    ctrl = fg.get('dateOfWork');
    // act
    const result = tFunc(ctrl);
    //
    expect(result['scheduling']).toBe('Lead time of 1 days required.');
  });
});
