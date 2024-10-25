import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.minLength(3)]],
    email:['', [Validators.required, ]],
    username:['', [Validators.required, ]],
    password:['', [Validators.required, ]],
    password2:['', [Validators.required, ]],
  })

  constructor( private fb: FormBuilder ){}

  inValidField( field: string ){
    //TODO: Obetener validacion desde un servicio
  }

  onSave(){
    if( this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return
    }
  }


}
