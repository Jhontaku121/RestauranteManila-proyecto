import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Comidas } from '../servicios/comidas';
import { Bebidas } from '../servicios/bebidas';
import { Ecomida } from '../entidades/ecomida';
import { Ebebidas } from '../entidades/ebebidas';

@Component({
  selector: 'app-estrellas',
  imports: [],
  providers:[Comidas, Bebidas],
  templateUrl: './estrellas.html',
  styleUrl: './estrellas.css',
})
export class Estrellas implements OnInit{
  recarga(){
    setTimeout(()=>{
      this.cd.detectChanges();
    }, 1000)
  }
  ngOnInit(): void {
    this.actualizar();
  }
  apicomi: any[] = [];
  apibebi: any[] = [];
  comida: Ecomida = new Ecomida;
  bebida: Ebebidas = new Ebebidas;
  constructor(private cd:ChangeDetectorRef, private apic: Comidas, private apib: Bebidas){}
  actualizar(){
    this.apib.buscarxingrediente("Lager").subscribe((dato:any)=>{
      for (var i of dato.drinks) {
        if (i.idDrink != null) {
          this.bebida.id = i.idDrink;
          this.bebida.nombre = i.strDrink;
          this.bebida.precio = Math.floor(Math.random() * 2000) * 50;
          this.bebida.foto = i.strDrinkThumb;
        }
        console.log(this.bebida)
      }
      this.recarga();
      this.apib.buscarxnombre(this.bebida.nombre).subscribe((dato:any)=>{
        this.apibebi = dato.drinks[0];
        console.log(this.apibebi)
      })
    })
    this.apic.buscarxingrediente("Pepper").subscribe((dato:any)=>{
      for(var i of dato.meals){
        this.comida.nombre = i.strMeal;
        this.comida.foto = i.strMealThumb;
      }
      this.recarga();
      this.apic.buscarxnombre(this.comida.nombre).subscribe((dato:any)=>{
        this.apicomi = dato.meals[0];
      })
    })
  }
  getIngredientesb(item: any): string[] {
    const ingredientes = [
      item.strIngredient1, item.strIngredient2, item.strIngredient3, item.strIngredient4,
      item.strIngredient5, item.strIngredient6, item.strIngredient7, item.strIngredient8,
      item.strIngredient9, item.strIngredient10, item.strIngredient11, item.strIngredient12,
      item.strIngredient13, item.strIngredient14, item.strIngredient15
    ];
    this.recarga();
    return ingredientes.filter(i => i && i.trim() !== "");
  }
  getIngredientesc(item: any): string[] {
    const ingredientes = [
      item.strIngredient1, item.strIngredient2, item.strIngredient3, item.strIngredient4,
      item.strIngredient5, item.strIngredient6, item.strIngredient7, item.strIngredient8,
      item.strIngredient9, item.strIngredient10, item.strIngredient11, item.strIngredient12,
      item.strIngredient13, item.strIngredient14, item.strIngredient15, item.strIngredient16,
      item.strIngredient17, item.strIngredient18, item.strIngredient19, item.strIngredient20
    ];
    this.recarga();
    return ingredientes.filter(i => i && i.trim() !== "");
  }
}
