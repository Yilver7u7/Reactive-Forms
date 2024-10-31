import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/country.interfaces';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-selectores',
  templateUrl: './selectores.component.html',
})
export class SelectoresPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  })


  constructor(
    private fb: FormBuilder,
    private countriesService:CountriesService
  ){}

  ngOnInit(): void {
    this.onRegionChanged();
  }

  // Apuntamos por referencia al lugar donde tenemos nuestras regiones
  get regions():Region[]{
    return this.countriesService.regions;
  }

  onRegionChanged(): void{
    this.myForm.get('region')!.valueChanges
    .pipe(
      switchMap( region => this.countriesService.getCuntriesByRegion(region))
    )
    .subscribe( countries => {
      console.log({countries});
    })
  }

  onSave(): void {

  }

}
