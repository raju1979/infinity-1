//AgeValidatorDirective
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';


import { Subscription } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';
import _ from "lodash";


/** Duplicate Email validator */
export function validateDuplicateEmailFactory(users: any): ValidatorFn {
  // console.log(users);
  return (control: AbstractControl): {[key: string]: any} | null => {
    const duplicateIndex = _.findIndex(users.users, function(o) { return o.email == control.value; });

    if(duplicateIndex > -1) {
      return {
        appEmailDuplicateValidator: {
          valid: false
        }
      }      
    } else {
      return null;
    }
    
  };
}

@Directive({
  selector: '[appEmailDuplicateValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailDuplicateValidatorDirective, multi: true }
  ]
})
export class EmailDuplicateValidatorDirective implements Validator {

  validator: ValidatorFn;
  users: any;
  subscription: Subscription;

  constructor(private _userService: UserServiceService) {

    
    this.subscription = this._userService.getMessage()
      .subscribe(user => {
        // console.log(user)
        this.users = user;
        // console.log(this.users.users[0]);
      });
  }

  validate(c: FormControl) {
    return (this.users) ? validateDuplicateEmailFactory(this.users)(c) : null;
  }

}
