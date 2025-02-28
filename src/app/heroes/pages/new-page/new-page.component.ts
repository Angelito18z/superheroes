import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeoresService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-page',
  standalone: false,
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss']
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<string>(''),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),  // Corregido de first_appareance a first_appearance
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  private heroId: string | null = null;  // Variable para almacenar el ID del héroe

  constructor(
    private heroesService: HeoresService,
    private route: ActivatedRoute // Para obtener el ID del héroe desde la URL
  ) {}

  ngOnInit(): void {
    // Obtener el ID del héroe desde los parámetros de la URL
    this.heroId = this.route.snapshot.paramMap.get('id');

    if (this.heroId) {
      // Si existe un ID en la URL, obtenemos los datos del héroe y rellenamos el formulario
      this.heroesService.getHeroById(this.heroId).subscribe(hero => {
        // Verificar si 'hero' es undefined antes de intentar acceder a sus propiedades
        if (hero) {
          this.heroForm.patchValue({
            id: hero.id,
            superhero: hero.superhero,
            publisher: hero.publisher,
            alter_ego: hero.alter_ego,
            first_appearance: hero.first_appearance,  // Corregido de first_appareance a first_appearance
            characters: hero.characters,
            alt_img: hero.alt_img,
          });
        }
      });
    }
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      // Si existe el ID, estamos editando un héroe
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          console.log('Héroe actualizado:', hero);
          // Aquí puedes agregar lógica para mostrar un mensaje de éxito al usuario.
        });
    } else {
      // Si no existe ID, estamos creando un nuevo héroe
      this.heroesService.addHero(this.currentHero)
        .subscribe(hero => {
          console.log('Héroe agregado:', hero);
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito.
        });
    }
  }
}
