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
    this.myForm.reset(rtx5090);
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
    console.log( this.myForm.value );
  }

  // Forma comun de hacer formularios reactivos
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(''),
  // });



}
