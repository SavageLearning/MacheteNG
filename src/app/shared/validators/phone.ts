/* eslint-disable brace-style */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { AbstractControl, ValidatorFn } from '@angular/forms';


export function phoneValidator(message: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let phoneNumRx = new RegExp(/^[\d]{3,3}-[\d]{3,3}-[\d]{4,4}$/);

    if (phoneNumRx.test(control.value)) { return null; }
    return {phone: message}

  };
}

export function phoneOrEmptyValidator(message: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let phoneNumRx = new RegExp(/^$|[\d]{3,3}-[\d]{3,3}-[\d]{4,4}$/);

    if (control.value === null || phoneNumRx.test(control.value)) { return null; }
    return {phone: message}

  };
}
