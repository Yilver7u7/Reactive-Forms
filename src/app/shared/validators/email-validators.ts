import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
//Para crear validaciones asincronas les otorgamos la herencia desde AsyncValidator
export class EmailValidator implements AsyncValidator{

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value();
    console.log(email);

    return of({
      emailTaken: true
    })

  }


}



