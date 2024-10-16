import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

const rtx5090 = {
  name: 'RX5090',
  price: 3000,
  inStorage: 0
}


@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  constructor( private fb: FormBuilder ){}

  //En el ciclo de vida de los componentes es preferible mediante el metodo reset
  //Reset the form
  ngOnInit(): void {
    //Este metodo funciona siempre y cuando los atributos
    //del objeto se encuentren dentro del form control
    this.myForm.reset(rtx5090);

    //Esta funcion la puedes usar para comprobar que todas
    //las validaciones estan funcionando
    // this.myForm.markAllAsTouched()
  }

  public myForm: FormGroup = this.fb.group({
    // Con Validators contamos con un gripo de funciones
    //Que nos permite facilitar las validaciones
    name: ['',[ Validators.required, Validators.minLength(3) ] ],
    price: [0, [Validators.required, Validators.min(0) ] ],
    inStorage: [0, [Validators.required, Validators.min(0) ] ],
  })

  onSave = () => {
    //Hacemos una pequeña verificacion de que este funcionando nuestro validador
    if( this.myForm.invalid ) return
    this.myForm.markAllAsTouched();
    console.log( this.myForm.value );
  }

  isValidField( field: string ): boolean | null{
    //Mediante este metodo revisamos si los campos cuenta con algun error
    //Es decir que no estan cumpliendo con las validaciones
    return this.myForm.controls[ field ].errors
    && this.myForm.controls[ field ].touched
  }

  getFieldError( field: string ): string | null{
    //Hacemos una vaalidacion para saber si recibimos o no correctamen
    //El field correspondiente entre los controls
    if( !this.myForm.controls[field] ) return null;

    //Asignamos el valor que nos envian en una variable
    const errors = this.myForm.controls[field].errors ||{};

    //Mediante la iteracion de los errores
    //Podemos enviar un mensaje especifico
    //Con cada uno de los errores de validacion que se presenten
    for( const key of Object.keys(errors) ){
      switch( key){
        case 'required':
           return 'Este campo es requerido';

        case 'minlength':
           return `Minimo ${ errors['minlength'].requiredLength} caracteres. `
      }
      console.log(key)
    }
    return null
  }



  // Forma comun de hacer formularios reactivos
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(''),
  // });



}
