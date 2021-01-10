
import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateLocation]',
  // if we want to use this valid directive as a directive from the list of angular validators which is inside of the forms
  // as NG_VAlIDATORS which is a token, that represents a list of every validator that angular supports,
  // if we need to add a validator to the app we need to add it to this NG_VALIDATORS service(list of services) essentially with specific syntax;

  // to do that we need to use dependancy injections as in componentsbut just provide third argument as multi: true,
  // which will add this validator to existing list instead of overwriting it
  providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}]
})
export class LocationValidator implements Validator {
validate(formGroup: FormGroup): { [key: string]: any } {
  const addressControl = formGroup.controls.address;
  const cityControl = formGroup.controls.city;
  const countryControl = formGroup.controls.country;
  // since this is a sibling node of location (ngModelGroup) and we need to point the root which is form as parent
  // and then go to point sibling by indicating type and root ...(<FormGroup>formGroup.root)...;
  const onlineUrlControl = (formGroup.root as FormGroup).controls.onlineUrl;

  if ((addressControl && addressControl.value &&
    cityControl && cityControl.value &&
    countryControl && countryControl.value) ||
    (onlineUrlControl && onlineUrlControl.value)) {
      return null;
    } else {
      return {validateLocation: false};
    }
}
  constructor() { }

}
