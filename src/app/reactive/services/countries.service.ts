import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { Observable, of, tap, map, combineLatest } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  // URL base de la API
  private baseUrl = 'https://restcountries.com/v3.1/';

  // Regiones disponibles
  private _regions: Region[] = [Region.Africa, Region.Europe, Region.Asia, Region.Americas, Region.Oceania];

  constructor(private httpClient: HttpClient) {}

  // Método para obtener las regiones
  get regions(): Region[] {
    return [...this._regions];
  }

  // Método para obtener países por región
  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]); // Retorna un arreglo vacío si la región no es válida

    const url: string = `${this.baseUrl}region/${region}?fields=cca3,name,borders`;

    return this.httpClient.get<Country[]>(url).pipe(
      map(countries => countries.map(country => ({
        name: country.name.common, // Obtener el nombre común del país
        cca3: country.cca3,        // Código de país de 3 letras
        borders: country.borders ?? [] // Operador de coalescencia nula
      }))),
      tap(response => console.log(response)) // Loguea la respuesta
    );
  }

  //Obtiene el CCA para posteriormente de esa informacion conseguir los nombre de los paises
  getCountryByAlphaCode( alphaCode: string ): Observable<SmallCountry>{
    const url = `${this.baseUrl}alpha/${alphaCode}?fields=cca,name,borders`;
    //Retorna el limite del pais
    return this.httpClient.get<Country>( url )
    .pipe(
      map( country =>({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders?? [],
      }))
    )
  }

  getCountriesBordersByCodes( borders: string[] ): Observable<SmallCountry[]>{
    // En caso tal el elemento enviado no es el tipo esperando retorna un elemento vacio
    if( !borders || borders.length === 0) return of ([]);

    //Un arreglo que almacena todos los arreglos o consultas que hicimos para obtener los borders
    const countriesRequests:Observable<SmallCountry>[] = [];
    //Para cada uno de los elementos de nuestra consulta los agregamos en nuestro arreglo
    borders.forEach(( code ) => {
      const request = this.getCountryByAlphaCode( code );
      countriesRequests.push( request );
    })
//Causa todos los Obsevables al mismo tiempo no
    return combineLatest( countriesRequests );

  }


}
