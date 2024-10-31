import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})

export class CountriesService {

  //URL
  private baseUrl = 'https://restcountries.com/v3.1/';

  private _regions: Region[] = [ Region.Africa, Region.Europe, Region.Asia, Region.Americas, Region.Oceania];

  constructor(private httpClient: HttpClient) { }

  // Nos permite tener una lista de opciones sin que nos la puedan mutar
  // los usuarios
  get regions(): Region[] {
    return [...this._regions ];
  }

  getCuntriesByRegion( region: Region ):Observable <SmallCountry[]> {
    if( !region ) return of ([]);//Regresamos el arreglo vacio en caso tal envien un valor que no existe

    const url: string = `${this.baseUrl}region/${ region }?fields=cca3,name,borders`;

    return this.httpClient.get<SmallCountry[]>( url )
    .pipe(
      tap( response => console.log( response ))
    )

  }



}



