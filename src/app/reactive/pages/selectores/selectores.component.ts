import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-selectores',
  templateUrl: './selectores.component.html',
})
export class SelectoresPageComponent {

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  })


  constructor(
    private fb: FormBuilder,
  ){}

  onSave(): void {
    
  }

}
