import { HttpClient } from '@angular/common/http';
import { Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class Bebidas {
    constructor(private servicioApi: HttpClient){}

    cat="https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
    xnombre="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    xingrediente="https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
    xcategoria="https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=";
    alcohol="https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=";
    rando="https://www.thecocktaildb.com/api/json/v1/1/random.php";

    categorias(){
        return this.servicioApi.get(this.cat)
    }
    buscarxnombre(nombre : string): Observable<any>{
        return this.servicioApi.get(this.xnombre+nombre)
    }
    buscarxingrediente(ingrediente : string){
        return this.servicioApi.get(this.xingrediente+ingrediente)
    }
    buscarxcategoria(categoria:String){
        return this.servicioApi.get(this.xcategoria+categoria)
    }
    alcoholica(filtro:String){
        return this.servicioApi.get(this.alcohol+filtro)
    }
    random(){
        return this.servicioApi.get(this.rando);
    }
}
