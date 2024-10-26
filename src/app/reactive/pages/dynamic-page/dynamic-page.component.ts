  import { Component, OnInit } from '@angular/core';
  import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
  import { ValidatorsService } from '../../../shared/services/validators.service';

  @Component({
    templateUrl: './dynamic-page.component.html',
    styles: ``
  })
  export class DynamicPageComponent {

    constructor( private fb: FormBuilder, private validatorServices: ValidatorsService ){}

    public newFavorite: FormControl = new FormControl('', Validators.required)

    public dynamicForm: FormGroup = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3) ], ],
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

    /**
   * Verifica si un campo específico en el formulario es válido.
   *
   * @param {string} field - El nombre del campo en el formulario.
   * @returns {boolean | null} - Retorna `true` si el campo tiene errores y ha sido tocado;
   * `false` si está bien o no ha sido tocado; o `null` si el campo no se encuentra en el formulario.
   */
  isValidField(field: string) {
    // Verifica si el campo tiene errores y ha sido tocado
    return this.validatorServices.isValidField( this.dynamicForm, field );
  }

  //Verifica si el campo especifico dentro del FormArray válido.
    isValidFieldInArray( formArray: FormArray, index: number ) {
      return formArray.controls[index].errors
          && formArray.controls[index].touched;
    }


    getFieldError( field: string ): string | null {

      if ( !this.dynamicForm.controls[field] ) return null;

      const errors = this.dynamicForm.controls[field].errors || {};

      for (const key of Object.keys(errors) ) {
        switch( key ) {
          case 'required':
            return 'Este campo es requerido';

          case 'minlength':
            return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
        }
      }

      return null;
    }

    //Hace referencia a todo el formulario y luego lo elimina
    onDeleteField( index: number ): void{
      this.favoriteGames.removeAt( index );
    }


    onAddFavoriteGame(){
      if( this.newFavorite.invalid ) return;

      const newGame = this.newFavorite.value;

      this.favoriteGames.push(
        this.fb.control( newGame, Validators.required)
      )
    }

    onSubmit(): void{
      if( this.dynamicForm.invalid ){
        this.dynamicForm.markAllAsTouched();
        return
      }
      console.log(this.dynamicForm.value)
      this.dynamicForm.reset();

    }


  }
