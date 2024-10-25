import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {
    this.myForm.reset( this.person)
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched;
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
