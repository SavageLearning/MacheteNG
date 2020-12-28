/* eslint-disable brace-style */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function regexValidator(regex: RegExp, key: string, message: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

    if (regex.test(control.value)) { return null; }
    return {key: message}

  };
}
// attempt to get key dynamically; parent sometimes null
// export function getControlName(c: AbstractControl): string | null {
//   const formGroup = c.parent.controls;
//   return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
// }
