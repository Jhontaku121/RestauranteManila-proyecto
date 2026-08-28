import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Service()
export class EnviarCarrito {

    private carritoSubject = new BehaviorSubject<any[]>([]); // lista de productos
    public carrito$ = this.carritoSubject.asObservable();

    // Agregar un producto al carrito
    agregarProducto(producto: any) {
        const carritoActual = this.carritoSubject.value; // obtiene la lista actual
        const nuevoCarrito = [...carritoActual, producto]; // agrega el nuevo producto
        this.carritoSubject.next(nuevoCarrito); // emite la lista actualizada
    }
    eliminarPorId(id: string) {
        const carritoActual = this.carritoSubject.value;
        const nuevoCarrito = carritoActual.filter(p => p.id !== id);
        this.carritoSubject.next(nuevoCarrito);
    }
}
