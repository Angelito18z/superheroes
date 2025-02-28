import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HeoresService } from '../../services/heroes.service';

@Component({
  selector: 'app-search-page',
  standalone: false,
  
  templateUrl: './search-page.component.html',
  styles: `.card {
  display: flex;
  align-items: center;
  gap: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
  flex-direction: column;
}
`
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(
    private HeroesService: HeoresService){

  }

  searchHero(){
    const value: string = this.searchInput.value || '';

    this.HeroesService.getSuggestions(value).subscribe(heroes => this.heroes = heroes);
    
  }

  onSelectedOption(event:MatAutocompleteSelectedEvent):void{
    if (!event.option.value){
      this.selectedHero = undefined;
      return;
    }
  
  const hero: Hero = event.option.value;
  this.searchInput.setValue(hero.superhero);

  this.selectedHero = hero;
  }

}
