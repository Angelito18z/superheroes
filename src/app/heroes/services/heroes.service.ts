import { Injectable } from "@angular/core";
import { environments } from "../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
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
}

