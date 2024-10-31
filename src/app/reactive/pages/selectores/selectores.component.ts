import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/country.interfaces';

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
    private countriesService:CountriesService
  ){}

  // Apuntamos por referencia al lugar donde tenemos nuestras regiones
  get regions():Region[]{
    return this.countriesService.regions;
  }

  onSave(): void {

  }

}
