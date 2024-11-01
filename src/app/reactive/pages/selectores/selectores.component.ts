import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { switchMap, catchError } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-selectores',
  templateUrl: './selectores.component.html',
})
export class SelectoresPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.onRegionChanged();
  }

  // Apuntamos por referencia al lugar donde tenemos nuestras regiones
  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        switchMap(region => {
          // Limpiar los campos de country y borders cuando cambia la región
          this.myForm.get('country')!.reset();
          this.myForm.get('borders')!.reset();

          return this.countriesService.getCountriesByRegion(region).pipe(
            catchError(err => {
              console.error('Error fetching countries', err);
              return of([]); // Retorna un arreglo vacío en caso de error
            })
          );
        })
      )
      .subscribe(countries => {
        this.countriesByRegion = countries;
        console.log({ countries });
        // Aquí podrías manejar la lógica para actualizar la lista de países en el formulario
      });
  }

  onSave(): void {
    // Lógica para guardar el formulario
    if (this.myForm.valid) {
      console.log('Formulario guardado:', this.myForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
