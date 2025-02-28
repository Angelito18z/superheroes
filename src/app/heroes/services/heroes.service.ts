import { Injectable } from "@angular/core";
import { environments } from "../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { Hero } from "../interfaces/hero.interface";

@Injectable({ providedIn: 'root' }) //Esta disponible en todas
export class HeoresService {
    private baseUrl: string = environments.baseURL;

    constructor(private http: HttpClient) { } //Permite hacer solicictudes HTTP

    getHeroes():Observable<Hero[]> { //Metodo que obtiene la lista de heroes
        return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
    }

    getHeroById(id:string): Observable<Hero | undefined>{
        return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
        .pipe(
            catchError(error => of(undefined))
        );
    }

    getSuggestions(query: string): Observable<Hero[]>{
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
    }

    //Actualiza un heroe
    updateHero (hero: Hero):Observable<Hero>{
        if(!hero.id) throw Error('Hero is required');
        return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
    }

    // Agrega un heroe
    addHero(hero: Hero):Observable<Hero>{
        return this.http.post<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
    }

    // Elimina un heroe por id
    deleteHero(id:string):Observable<boolean>{
        return this.http.delete(`${this.baseUrl}/heroes/${id}`).pipe(catchError(Err => of(false)),
    map(resp => true))
    }
}

