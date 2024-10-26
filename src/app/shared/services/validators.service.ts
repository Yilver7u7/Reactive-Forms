import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider( control: FormControl ): ValidationErrors | null {
    // Simplemente revisamos si el campo es
     const value: string = control.value.trim().toLowerCase();

    if ( value === 'strider' ) {
      return {
        noStrider: true,
      }
    }
    //Si regresa el valor de la validación

    //En caso tal no sea el objeto deseado devolvemos un null
      return null
  }

  //Extraemos del formulario el field que queremos validar y lo validamos
  public isValidField( form: FormGroup, field: string ){
    return form.controls[ field ].errors
     && form.controls[ field ].touched;
  }


}


