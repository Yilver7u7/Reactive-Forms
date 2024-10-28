import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
//Para crear validaciones asincronas les otorgamos la herencia desde AsyncValidator
export class EmailValidator implements AsyncValidator{

  //Es la forma en la que podemos hacer una evaluacion del correo en el Backend
 validate(control: AbstractControl ): Observable<ValidationErrors | null> {

    const email = control.value;
    console.log({ email })

    const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {
      console.log( {email})

      if( email === 'yilversgg@gmail.com'){
        subscriber.next({ emailTaken: true});
        subscriber.complete();
        return;
      }
      //En caso tal lo que la persona acaba de escribir no existe, entonces se pone
      //Que este no a sigo tomado
      subscriber.next(null);

    });

    return httpCallObservable.pipe(
      delay( 2000 )
    );

  }

//  validate(control: AbstractControl ): Observable<ValidationErrors | null> {

//     const email = control.value;
//     console.log({ email })

//     return of({
//       emailTaken: true
//     }).pipe(
//       delay( 2000 )
//     );

//   }


}



