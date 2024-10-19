import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent implements OnInit {

  constructor( private fb: FormBuilder ){}

  ngOnInit(): void {
    this.dynamicForm.reset();
  }

  public dynamicForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.maxLength(3) ], ],
    //Trabajamos con un objeto para los que estaran listados en un campo

    //Esto internamente crea un objeto que dentro de la propiedad controls
    //Siendo estos llamados luego en el HTML median el metodo get
    //Permite acceder al array y manipularlo
    favoriteGames: this.fb.array([
      [ 'Metal Gear', Validators.required ],
      [ 'God of War', Validators.required ],
      [ 'God of War', Validators.required ],
    ])
  })

  get favoriteGames(){
    //Esto es para que el sepa que se trata de un array y permita iterarlo
    return this.dynamicForm.get('favoriteGames') as FormArray;
  }

  onSubmit(): void{
    if( this.dynamicForm.invalid ){
      this.dynamicForm.markAllAsTouched();
      return
    }

  }


}
