import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class Comidas {
    constructor(private servicioApi: HttpClient){}

    xnombre="https://www.themealdb.com/api/json/v1/1/search.php?s=";
    xingrediente="https://www.themealdb.com/api/json/v1/1/filter.php?i=";
    xid="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    rando="https://www.themealdb.com/api/json/v1/1/random.php";

    buscarxnombre(nombre : string): Observable<any>{
        return this.servicioApi.get(this.xnombre+nombre)
    }
    buscarxingrediente(ingrediente : string){
        return this.servicioApi.get(this.xingrediente+ingrediente)
    }
    buscarPorId(id:string){
        return this.servicioApi.get(this.xingrediente+id)
    }
    random(){
        return this.servicioApi.get(this.rando);
    }
}
