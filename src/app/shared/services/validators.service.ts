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

  //Verificar que ambos campos sean iguales
  isFIeldOneEqualFieldTwo( field1: string, field2: string){

    //Es solo una funcion que retorna una funcion que de forma asincrona hace la validacion
    return ( formGroup: FormGroup ): ValidationErrors | null => {

      // Obtenemos los valores de los campos
      const fieldValue1 = formGroup.get( field1 )?.value;
      const fieldValue2 = formGroup.get( field2 )?.value;

      //Hacemos las respectivas validaciones
      if( fieldValue1 !== fieldValue2 ){
        //Regresamos el error
        formGroup.get( field2 )?.setErrors({ notEqual: true})
        return { notEqual: true }
      }

      formGroup.get( field2 )?.setErrors(null)
      return null;
    }
  }

  //Extraemos del formulario el field que queremos validar y lo validamos
  public isValidField( form: FormGroup, field: string ){
    return form.controls[ field ].errors
     && form.controls[ field ].touched;
  }


}


