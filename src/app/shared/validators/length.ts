/* eslint-disable brace-style */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function lengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any | null} => {
    if (control.value == null) { return null; }
    if (control.value.length <= length) { return null; }
    return {length: `Must be less than ${length} characters`}

  };
}
