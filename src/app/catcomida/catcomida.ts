import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Comidas } from '../servicios/comidas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ecomida } from '../entidades/ecomida';
import { EnviarCarrito } from '../servicios/enviar-carrito';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-catcomida',
  imports: [CommonModule, FormsModule],
  providers: [Comidas],
  templateUrl: './catcomida.html',
  styleUrl: './catcomida.css',
})
export class Catcomida implements OnInit {

  ngOnInit(): void {
    this.buscarxnombre();
  }
  recarga() {
    setTimeout(() => {
      this.cd.detectChanges();
    }, 250);
  }
  constructor(private servicioApi: Comidas, private cd: ChangeDetectorRef, 
    private carrito: EnviarCarrito, private snackBar: MatSnackBar) { }

  filtro: string = "Nombre";
  api: any[] = [];
  comida: Ecomida = new Ecomida;
  comidas:Ecomida[] = [];
  mensaje: string = "";
  titulo: string = "";
  selectedItem: any = null;
  ultimoFocoId: any = null;


  buscar() {
    if (this.filtro == "Nombre") {
      this.buscarxnombre();
    } else if (this.filtro == "Ingrediente") {
      this.buscarxingrediente();
    }
  }
  buscarxnombre() {
    this.servicioApi.buscarxnombre(this.mensaje).subscribe(dato => {
      this.api = dato.meals;
      this.comidas=[];
      for(var i of dato.meals){
        this.comida.id = i.idMeal;
        this.comida.nombre=i.strMeal;
        this.comida.foto=i.strMealThumb;
        this.comida.precio = Math.floor(Math.random() * 2000) * 50;
        this.comidas.push({...this.comida});
      }
      console.log(this.comidas);
      console.log(dato.meals)
      this.recarga();
    })
  }
  buscarxingrediente() {
    this.servicioApi.buscarxingrediente(this.mensaje).subscribe((dato: any) => {
      this.api = dato.meals;
      this.comidas=[];
      for(var i of dato.meals){
        this.comida.id= i.idMeal;
        this.comida.nombre=i.strMeal;
        this.comida.foto=i.strMealThumb;
        this.comida.precio = Math.floor(Math.random() * 2000) * 50;
        this.comidas.push({...this.comida});
      }
      console.log(this.comidas);
      this.recarga();
    })
  }
  detalles(item: any) {
    this.servicioApi.buscarxnombre(item.nombre).subscribe(dato => {
      this.abrirModal(dato.meals[0]);
      this.recarga();
    })
  }
  addcarro(valor: any) {
    this.carrito.agregarProducto(valor);
    this.snackBar.open('🛒 Producto agregado al carrito', 'Cerrar', {
      duration: 4000, // se oculta en 2 segundos
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-exito']
    });
  }
  getIngredientes(item: any): string[] {
    const ingredientes = [
      item.strIngredient1, item.strIngredient2, item.strIngredient3, item.strIngredient4,
      item.strIngredient5, item.strIngredient6, item.strIngredient7, item.strIngredient8,
      item.strIngredient9, item.strIngredient10, item.strIngredient11, item.strIngredient12,
      item.strIngredient13, item.strIngredient14, item.strIngredient15, item.strIngredient16,
      item.strIngredient17, item.strIngredient18, item.strIngredient19, item.strIngredient20
    ];
    return ingredientes.filter(i => i && i.trim() !== "");
  }

  abrirModal(item: any) {
    setTimeout(() => {
      this.selectedItem = item;
      this.titulo = item.strMeal;
      this.ultimoFocoId = "btn-" + item.idMeal;
      const modalElement = document.getElementById('myModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);

        modalElement.addEventListener('hidden.bs.modal', () => {
          // mueve el foco a un elemento visible fuera del modal
          const destino = document.getElementById("btn-"+this.titulo);
          destino?.setAttribute('tabindex', '0');
          destino?.focus();
        });
        modal.show();
      }
    }, 250);
  }
}
