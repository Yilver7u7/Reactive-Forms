import { firstNameAndLastnamePattern } from './../../../shared/validators/validators';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Una forma util de llamar a nuestras fuciones que proviene de nuestro helper o validador
import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validators';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  // Recordemos que para hacer una validacion de este tipo tenemos que considerar
  //Si en campo estamos usando Observable o alguna función asincrona
  public myForm: FormGroup = this.fb.group({
    //name:['', [Validators.required, Validators.minLength(3), Validators.pattern( customValidators.firstNameAndLastnamePattern )]],
    //La remplazamos por un services que nos permite tener mas control de las validaciones en los formularios
    name:['', [Validators.required, Validators.minLength(3), Validators.pattern( this.validatorServices.firstNameAndLastnamePattern )]],
    //Las formas recomendadas para desarrollar la validacion en los Email
    //Sin permitir que puedan haber un campo solo por existir un arroba
    // email:['', [Validators.required, Validators.pattern( this.validatorServices.emailPattern ) ], [ new EmailValidator() ]], //Es una validacion mediante un patron de diseño

    //Por la forma de instancia el de arriba afecta mucho mas el performace
    email: ['', [ Validators.required, Validators.pattern( this.validatorServices.emailPattern )], [ this.emailValidator ]],
    username:['', [Validators.required, this.validatorServices.cantBeStrider ]],
    password:['', [Validators.required, ]],
    password2:['', [Validators.required, ]],
  })

  constructor(
    private fb: FormBuilder,
    private validatorServices: ValidatorsService,
    private emailValidator: EmailValidator
     ){}

  //Basicamente aca estamos delegando la funcion en funcion de nuestro servicio
  inValidField( field: string ){
    return this.validatorServices.isValidField( this.myForm, field);
  }

  onSave(){
    console.log( this.myForm.value)
    if( this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return
    }
  }


}
