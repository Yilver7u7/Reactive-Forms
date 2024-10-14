import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {

  constructor( private fb: FormBuilder ){}

  public myForm: FormGroup = this.fb.group({
    name: ['',],
    price: [0,],
    inStorage: [0],
  })

  onSave = () => {
    console.log( this.myForm.value );
  }

  // Forma comun de hacer formularios reactivos
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(''),
  // });



}
