// Importa los módulos necesarios desde Angular core y el enrutador
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes que se utilizarán en las rutas
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { SwitchesPageComponent } from './pages/switches-page/switches-page.component';

// Define las rutas específicas para este módulo utilizando la interfaz Routes
const routes: Routes = [
  {
    // Ruta base del módulo
    path: '',
    children: [
      // Ruta para la página 'basic'
      { path: 'basic',component: BasicPageComponent },
      // Componente que se renderizará al navegar a 'basic'

      // Ruta para la página 'dynamic'
      {path: 'dynamic', component: DynamicPageComponent },
      // Componente que se renderizará al navegar a 'dynamic'


      // Ruta para la página 'switches'
      { path: 'switches',component: SwitchesPageComponent },
        // Componente que se renderizará al navegar a 'switches'

      // Ruta comodín que captura cualquier ruta no definida previamente dentro de este módulo
      {  path: '**', redirectTo: 'basic' },
      // Redirige a la ruta 'basic' si la ruta ingresada no coincide con ninguna definida
    ]
  }
];

// Decorador NgModule que configura el módulo de enrutamiento
@NgModule({
  // Importa RouterModule configurado con las rutas definidas utilizando forChild, indicando que es un módulo de características
  imports: [RouterModule.forChild(routes)],
  // Exporta RouterModule para que esté disponible en otros módulos que importen ReactiveRoutingModule
  exports: [RouterModule]
})
export class ReactiveRoutingModule { }
