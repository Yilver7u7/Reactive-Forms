import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {


  public myForm: FormGroup =this.fb.group({
    gender: [ 'M', Validators.required ],
    wantNotifications: [ true, Validators.required ],
    termAndCondition: [ Validators.required ]
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor( private fb: FormBuilder, private validatorServices: ValidatorsService ) {}

  ngOnInit(): void {
    this.myForm.reset( this.person)
  }

  isValidField( field: string ) {
    return this.validatorServices.isValidField( this.myForm, field );
  }
  

  //ngSubmit
  onSave(){
    if( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }

    //La forma en la que podemos enviar todos los datos a excepcion de un campo
    // Creamos una nueva intancia del formulario y le desestructuramos el campo que deseamos eliminar
    const { termAndCondition, ...newPerson } = this.myForm.value;
    this.person = newPerson;

    console.log( this.myForm.value );
    console.log( newPerson )

    // this.person = this.myForm.value;
    // console.log( this.myForm.value );
    // console.log( this.person )
  }

}
