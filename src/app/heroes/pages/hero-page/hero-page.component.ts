import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeoresService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  standalone: false,
  styleUrl: 'hero-page.scss',
  
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {
public hero?: Hero;
//Declara una variable publica que almacenara los datos del heroe seleccionado

constructor(
  private HeroesService: HeoresService,
  //Inyecta el servicio para obtener la informacion del heroe
  
  private ActivatedRoute: ActivatedRoute,
  //Inyecta ActivatedRoute para acceder a los parámetros de la URL

  private router:Router,
  //Inyecta Router para redirigir a otra página si el hero no existe
){  }

  ngOnInit(): void {
    //Método que se ejecuta automaticamente cuando el componente de inicializa
    
    this.ActivatedRoute.params //Obtiene los parametros de la URL
    
    .pipe(
      switchMap(({id}) => this.HeroesService.getHeroById(id)), 
    //Toma el ID del heroe y lo pasa a getHero para obtener información
    )
    .subscribe( hero =>{
      //Se "suscribe" al observable devuelto por getHero y recibe el heroe encontrado

      if(!hero) return this.router.navigate(['/heroes/list']);
      //si el heroe no existe redirige a a llista de heroes

      this.hero = hero;
      //almacena la informacion del heroe en la variable hero
      console.log({hero});

      return;
    })
  }

}
