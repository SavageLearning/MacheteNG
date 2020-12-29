/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { TransportRule } from '../index';

export function zipcodeValidator(rules: TransportRule[]): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if (control.value == null) {
        return null;
    }
    const rule = rules.find(s => s.zipcodes.includes(control.value));
    if (rule == null || rule === undefined) {
      return {zipcode: 'Zipcode not found in service range.'}
    }

    return null;
  };
}
