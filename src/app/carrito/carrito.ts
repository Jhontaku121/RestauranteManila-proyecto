import { Component, OnInit } from '@angular/core';
import { EnviarCarrito } from '../servicios/enviar-carrito';
import { Ecomida } from '../entidades/ecomida';
import { Ebebidas } from '../entidades/ebebidas';

@Component({
  selector: 'app-carrito',
  imports: [],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {
  constructor(private carritoservice: EnviarCarrito) { }

  comidas: Ecomida[] = []
  bebidas: Ebebidas[] = [];
  orden: any[] = [];

  ngOnInit() {
    this.carritoservice.carrito$.subscribe((lista: any) => {
      console.log('Carrito actualizado:', lista);
      for (var i of lista) {
        if (i.tipo == "c") {
          this.comidas.push(i)
        } else {
          this.bebidas.push(i)
        }
      }
      this.ordenarC();
      console.log(this.comidas)
      console.log(this.bebidas)
    });
  }
  ordenarC() {
    const lista: any[] = [];

    for (const i of this.comidas) {
      // si ya existe en lista, incrementa cantidad
      const index = lista.findIndex(c => c.id === i.id);

      if (index !== -1) {
        lista[index].cant++;
      } else {
        const entidad = {
          id: i.id,          // 👈 importante
          nombre: i.nombre,
          precio: i.precio,
          foto: i.foto,
          cant: 1
        };
        lista.push(entidad);
      }
    }
    console.log("lista:")
    console.log(lista);
  }
}
