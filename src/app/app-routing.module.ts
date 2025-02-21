import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import path from 'node:path';

//Definir las rutas principales de la aplicación
const routes: Routes = [
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full' //asegura que la redirecciión solo ocurra si la ruta esta completamente vacía
  },
  {
    path: 'auth', //Ruta padre para autenticación
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    //Lazy loading carga el módulo de autenticación solo cuando se accede a auth
  },
  {
    path: 'heroes', //Ruta padre para heroes
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule)
    //Lazy loading carga el módulo de autenticación solo cuando se accede a heroes
  },
  {
    path: '404', //Ruta para la página error 404
    component: Error404PageComponent,
  },
  {
    path: '**', //ruta comodin, se usa cuando ninguna de las rutas anteriores coincide
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
