import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeoresService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';

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
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  private heroId: string | null = null;  // Variable para almacenar el ID del héroe
  public formTitle: string = 'Agregar Superhéroe';  // Título por defecto

  constructor(
    private heroesService: HeoresService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar
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
            first_appearance: hero.first_appearance,
            characters: hero.characters,
            alt_img: hero.alt_img,
          });
          this.formTitle = `Editando: ${hero.superhero}`;  // Cambiar título a 'Editando: Nombre del héroe'
        }
      });
    }
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  onSubmit(): void {
    // Verificar que el nombre del héroe no esté vacío
    if (!this.currentHero.superhero) {
      throw Error('El nombre del héroe es obligatorio');
    }

    // Validar que el héroe tenga un id si ya está siendo editado
    if (!this.currentHero.id) {
      // Si no tiene id, significa que estamos creando un nuevo héroe
      this.heroesService.addHero(this.currentHero)
        .subscribe(hero => {
          console.log('Héroe creado:', hero);

          // Abrir el diálogo de confirmación solo si el héroe fue guardado
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: '¡Héroe Guardado!',
              message: 'El héroe ha sido guardado exitosamente.',
              action: null  // No tiene acción, solo un mensaje de éxito
            }
          });

          // Cerrar el diálogo después de que se haya guardado el héroe
          dialogRef.afterClosed().subscribe(() => {
            console.log('Nuevo héroe creado y diálogo cerrado');
          });
        });
    } else {
      // Si tiene id, estamos editando un héroe existente
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          console.log('Héroe actualizado:', hero);

          // Abrir el diálogo de confirmación solo si el héroe fue editado
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
              title: '¡Héroe Editado!',
              message: 'El héroe ha sido editado exitosamente.',
              action: null  // No tiene acción, solo un mensaje de éxito
            }
          });

          // Cerrar el diálogo después de que se haya editado el héroe
          dialogRef.afterClosed().subscribe(() => {
            console.log('Edición completada y diálogo cerrado');
          });
        });
    }
  }

  onDeletedHero() {
    if (!this.currentHero.id) throw Error('Hero is required');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '¿Estás seguro de eliminar al héroe?',
        message: 'Esta acción no se puede deshacer.',
        action: 'Eliminar'
      }
    });
    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.heroesService.deleteHero(this.currentHero.id)),
      )
      .subscribe(() => {
        this.router.navigate(['/heroes']);
      });
  }
  onGoBack(): void {
    // Navegar a la página anterior
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
