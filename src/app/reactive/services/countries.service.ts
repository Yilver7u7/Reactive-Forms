import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Region } from '../interfaces/country.interfaces';

@Injectable({providedIn: 'root'})

export class CountriesService {

  private _regions: Region[] = [ Region.Africa, Region.Europe, Region.Asia, Region.Americas, Region.Oceania];

  // constructor(private httpClient: HttpClient) { }

  // Nos permite tener una lista de opciones sin que nos la puedan mutar
  // los usuarios
  get regions(): Region[] {
    return [...this._regions ];
  }

}



