import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Define las rutas de la aplicación utilizando la interfaz Routes
const routes: Routes = [
  // Ruta para la sección 'reactive'
  {
    path: 'reactive',
    // Carga el módulo ReactiveModule de forma diferida (lazy loading)
    loadChildren: () => import('./reactive/reactive.module')
      .then(m => m.ReactiveModule)
  },
  // Ruta para la sección 'auth' (autenticación)
  {
    path: 'auth',
    // Carga el módulo AuthModule de forma diferida (lazy loading)
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule)
  },
  // Ruta comodín que captura cualquier ruta no definida previamente
  {
    path: '**',
    // Redirige a la ruta 'reactive' si la ruta ingresada no coincide con ninguna definida
    redirectTo: 'reactive'
  }
];

// Decorador NgModule que configura el módulo de enrutamiento de la aplicación
@NgModule({
  // Importa RouterModule configurado con las rutas definidas
  imports: [RouterModule.forRoot(routes)],
  // Exporta RouterModule para que esté disponible en otros módulos de la aplicación
  exports: [RouterModule]
})
export class AppRoutingModule { }
