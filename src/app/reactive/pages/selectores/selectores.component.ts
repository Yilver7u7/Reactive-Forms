import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';
import { switchMap, catchError, tap } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-selectores',
  templateUrl: './selectores.component.html',
})
export class SelectoresPageComponent implements OnInit {

  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];

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

  // onRegionChanged(): void {
  //   this.myForm.get('region')!.valueChanges
  //     .pipe(
  //       tap(() => this.myForm.get('country')!.setValue('')), // Resetea el campo country
  //       switchMap(region => {
  //         // Llama al servicio para obtener los países de la región seleccionada
  //         return this.countriesService.getCountriesByRegion(region).pipe(
  //           catchError(err => {
  //             console.error('Error fetching countries', err);
  //             return of([]); // Retorna un arreglo vacío en caso de error
  //           })
  //         );
  //       })
  //     )
  //     .subscribe(countries => {
  //       // Ordena los países alfabéticamente antes de asignarlos
  //       this.countriesByRegion = countries.sort((a, b) => a.name.localeCompare(b.name));
  //       console.log({ countries: this.countriesByRegion });
  //     });
  // }

  onRegionChanged(): void {
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('country')!.setValue('') ),
        tap( () => this.borders = [] ),
        switchMap( (region) => this.countriesService.getCountriesByRegion(region) ),
      )
      .subscribe( countries => {
        this.countriesByRegion = countries;
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
