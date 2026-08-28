import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bebidas } from '../servicios/bebidas';
import { Ebebidas } from '../entidades/ebebidas';
import { EnviarCarrito } from '../servicios/enviar-carrito';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-catbebidas',
  imports: [CommonModule, FormsModule],
  providers: [Bebidas],
  templateUrl: './catbebidas.html',
  styleUrl: './catbebidas.css',
})
export class Catbebidas implements OnInit {
  ngOnInit(): void {
    this.categorias();
    this.xcategoriasBebidas();
  }
  constructor(private servicioApi: Bebidas, private cd: ChangeDetectorRef,
    private carrito: EnviarCarrito, private snackBar: MatSnackBar) { }

  titulo: string = "";
  mensaje: string = "";
  selectItem: any = null;
  api: any[] = [];
  categoria: any[] = [];
  ebebida: Ebebidas = new Ebebidas;
  ebebidas: Ebebidas[] = [];
  buscador: string = "";
  filtro0: string = "Nombre";
  filtro1: string = "Con Alcohol";
  filtro2: string = "Beer";
  mostrarSection: boolean = false;
  selectedItem: any = null;

  buscar() {
    if (this.filtro0 == "Nombre") {
      this.buscarxnombre();
    } else {
      this.buscarxingrediente();
    }
  }
  buscarxnombre() {
    this.servicioApi.buscarxnombre(this.buscador).subscribe(dato => {
      this.api = dato.drinks;
      this.ebebidas = []
      for (var i of dato.drinks) {
        if (i.idDrink != null) {
          this.ebebida.id = i.idDrink;
          this.ebebida.nombre = i.strDrink;
          this.ebebida.precio = Math.floor(Math.random() * 2000) * 50;
          this.ebebida.foto = i.strDrinkThumb;
          this.ebebidas.push({ ...this.ebebida });
        }
      }
      console.log(this.ebebidas)
      this.recargainicial()
      console.log(this.api);
    })
  }
  buscarxingrediente() {
    this.servicioApi.buscarxingrediente(this.buscador).subscribe((dato: any) => {
      this.api = dato.drinks;
      this.ebebidas = []
      for (var i of dato.drinks) {
        if (i.idDrink != null) {
          this.ebebida.id = i.idDrink;
          this.ebebida.nombre = i.strDrink;
          this.ebebida.precio = Math.floor(Math.random() * 2000) * 50;
          this.ebebida.foto = i.strDrinkThumb;
          this.ebebidas.push({ ...this.ebebida });
        }
      }
      console.log(this.ebebidas)
      this.recargainicial();
      console.log(this.api);
    })
  }
  filtroalcohol() {
    var str: string = "Alcoholic";
    if (this.filtro1 == "Con Alcohol") {
      str = "Alcoholic";
    } else {
      str = "Non_Alcoholic";
    }
    this.servicioApi.alcoholica(str).subscribe((dato: any) => {
      this.api = dato.drinks;
      this.ebebidas = []
      for (var i of dato.drinks) {
        if (i.idDrink != null) {
          this.ebebida.id = i.idDrink;
          this.ebebida.nombre = i.strDrink;
          this.ebebida.precio = Math.floor(Math.random() * 2000) * 50;
          this.ebebida.foto = i.strDrinkThumb;
          this.ebebidas.push({ ...this.ebebida });
        }
      }
      console.log(this.ebebidas);
      console.log(this.api);
    })
    this.recargainicial();
  }
  xcategoriasBebidas() {
    this.ebebidas = [];

    this.servicioApi.categorias().subscribe((res: any) => {
      const listaCategorias = res.drinks.map((c: any) => c.strCategory);

      // construimos un array de observables
      const observables = listaCategorias.map((cat: string) =>
        this.servicioApi.buscarxcategoria(cat)
      );

      forkJoin(observables).subscribe((resultados: any) => {
        resultados.forEach((data: any) => {
          for (const i of data.drinks) {
            this.ebebida = new Ebebidas; // 👈 crea nueva entidad cada vez
            this.ebebida.id = i.idDrink;
            this.ebebida.nombre = i.strDrink;
            this.ebebida.foto = i.strDrinkThumb;
            this.ebebida.precio = Math.floor(Math.random() * 2000) * 50;
            this.ebebidas.push({...this.ebebida});
          }
        });

        this.recargainicial();
      });
    });
  }
  filtrocategorias() {
    this.servicioApi.buscarxcategoria(this.filtro2).subscribe((dato: any) => {
      this.api = dato.drinks;
      this.ebebidas = []
      for (var i of dato.drinks) {
        if (i.idDrink != null) {
          this.ebebida.id = i.idDrink;
          this.ebebida.nombre = i.strDrink;
          this.ebebida.precio = Math.floor(Math.random() * 2000) * 50;
          this.ebebida.foto = i.strDrinkThumb;
          this.ebebidas.push({ ...this.ebebida });
        }
      }
      this.recargainicial();
      console.log(this.ebebidas);
      console.log(this.api);
    })
  }
  detalles(item: any) {
    this.servicioApi.buscarxnombre(item.nombre).subscribe(dato => {
      this.abrirModal(dato.drinks[0]);
      this.recargainicial();
    })
  }
  getIngredientes(item: any): string[] {
    const ingredientes = [
      item.strIngredient1, item.strIngredient2, item.strIngredient3, item.strIngredient4,
      item.strIngredient5, item.strIngredient6, item.strIngredient7, item.strIngredient8,
      item.strIngredient9, item.strIngredient10, item.strIngredient11, item.strIngredient12,
      item.strIngredient13, item.strIngredient14, item.strIngredient15
    ];
    return ingredientes.filter(i => i && i.trim() !== "");
  }
  categorias() {
    this.servicioApi.categorias().subscribe((dato: any) => {
      this.categoria = dato.drinks;
      console.log(this.categoria);
    })
  }
  addcarro(valor: any, nd: string) {
    var element = document.getElementById(nd) as HTMLInputElement;
    let valorActual = parseInt(element.value, 10);
    for (var i = 0; i < valorActual; i++) {
      this.carrito.agregarProducto(valor);
    }
    element.value = "1";
    this.snackBar.open('🛒 Producto agregado al carrito', 'Cerrar', {
      duration: 4000, // se oculta en 2 segundos
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-exito']
    });
  }
  recargainicial() {
    setTimeout(() => {
      this.cd.detectChanges();
      if (this.ebebidas.length == 0) {
        this.mostrarSection = true;
      } else {
        this.mostrarSection = false;
      }
      this.cd.detectChanges();
    }, 750);
  }
  abrirModal(item: any) {
    setTimeout(() => {
      this.selectedItem = item;
      this.titulo = item.strDrink;
      var ultimoFocoId = "btn-" + item.idDrink;
      const modalElement = document.getElementById('myModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);

        modalElement.addEventListener('hidden.bs.modal', () => {
          // mueve el foco a un elemento visible fuera del modal
          const destino = document.getElementById(ultimoFocoId);
          destino?.setAttribute('tabindex', '0');
          destino?.focus();
        });
        modal.show();
      }
    }, 250);
  }
  incrementar(nd: string) {
    var element = document.getElementById(nd) as HTMLInputElement;
    let valorActual = parseInt(element.value, 10);
    valorActual++;
    element.value = valorActual.toString();
  }

  decrementar(nd: string) {
    var element = document.getElementById(nd) as HTMLInputElement;
    let valorActual = parseInt(element.value, 10);
    if (valorActual > 1) { // evita que baje de 1
      valorActual--;
      element.value = valorActual.toString();
    }
  }
}