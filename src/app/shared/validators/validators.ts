// Como los inputs quedan amarrados a un control
// Mediante el formBuider lo que hacemos es evaluarlo
// Anteriormente revisamos el string que llegaba porque tomabamos el valor

import { FormControl, ValidationErrors } from "@angular/forms";

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


// Directamente, ahora lo tomamos desde la instancia
//Vamos a regresar un error de validacion o null
export const cantBeStrinder = ( control: FormControl ): ValidationErrors | null => {
// Simplemente revisamos si el campo es
  const value: string = control.value.trim().toLowerCase();

  if ( value === 'strider' ) {
    return {
      noStrider: true,
    }
  }
  //Si regresa el valor de la validación

  //En caso tal no sea el objeto deseado devolvemos un null
  return null;

}








