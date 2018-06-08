//AgeValidatorDirective
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';


// validation function
function validateAgeFactory() : ValidatorFn {
  return (c: AbstractControl) => {
    
    let isValid = (c.value >= 18 && c.value <= 45);
    
    if(isValid) {
      return null;
    } else {
      return {
        ageValidator: {
          valid: false
        }
      };
    }

  }
}


@Directive({
  selector: '[ageValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: AgeValidatorDirective, multi: true }
  ]
})
export class AgeValidatorDirective implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateAgeFactory();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}