import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EnviarCarrito } from '../servicios/enviar-carrito';
import { Ecomida } from '../entidades/ecomida';
import { Ebebidas } from '../entidades/ebebidas';
import { DecimalPipe } from '@angular/common';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FormsModule } from '@angular/forms';
import { Persona } from '../entidades/persona';

@Component({
  selector: 'app-carrito',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {
  constructor(private carritoservice: EnviarCarrito,
    private carri: EnviarCarrito,
    private cd:ChangeDetectorRef
  ) { }

  persona: Persona = new Persona;
  comidas: Ecomida[] = [];
  infoc: any[] = [];
  infob: any[] = [];
  listatotal: any[] = [];
  bebidas: Ebebidas[] = [];
  orden: any[] = [];
  total: number = 0;
  logoBase64: string | null = null;

  ngOnInit() {
    this.comidas = [];
    this.bebidas = [];
    this.listatotal = [];
    this.total = 0;
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
      this.ordenarb();
      this.calcular();
      this.cd.detectChanges();
    });
  }
  calcular() {
    var listatotal: any[] = [];
    this.infob.forEach(e => listatotal.push(e));
    this.infoc.forEach(e => listatotal.push(e));
    for (var i of listatotal) {
      this.total = (this.total + (i.precio * i.cant));
    }
    this.listatotal=listatotal;
    console.log("listaTotal:")
    console.log(listatotal)
    console.log("total:")
    console.log(this.total)
  }
  ordenarC() {
    const lista: any[] = [];

    for (const i of this.comidas) {
      // si ya existe en lista, incrementa cantidad
      const index = lista.findIndex(c => c.id === i.id);

      if (index != -1) {
        lista[index].cant++;
      } else {
        const entidad = {
          tipo: i.tipo,
          id: i.id,          // 👈 importante
          nombre: i.nombre,
          precio: i.precio,
          foto: i.foto,
          cant: 1
        };
        lista.push(entidad);
      }
    }
    this.infoc = lista;
    console.log("lista comidas:")
    console.log(this.infoc);
  }
  borrar(item:any){
    this.carri.eliminarPorId(item.id);
    this.ngOnInit();
  }
  ordenarb() {
    const lista: any[] = [];

    for (const i of this.bebidas) {
      const index = lista.findIndex(c => c.id === i.id);
      if (index != -1) {
        lista[index].cant++;
      } else {
        const entidad = {
          tipo: i.tipo,
          id: i.id,
          nombre: i.nombre,
          precio: i.precio,
          foto: i.foto,
          cant: 1
        };
        lista.push(entidad);
      }
    }
    this.infob = lista;
    console.log("lista bebidas:")
    console.log(this.infob);
  }
  comprobar(){
    if(this.persona.cel!="" && this.persona.direccion!="" && this.persona.nombre!=""){
      this.generarPDF();
    }else{
      alert("querido cliente llena los datos")
    }
  }
  generarPDF() {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const title = "Recivo";
  const textWidth = doc.getTextWidth(title);

  const img = new Image();
  img.src = "https://jhontaku121.github.io/RestauranteManila-proyecto/imgs/LogoSF.png"; // ruta absoluta

  img.onload = () => {
    // 1️⃣ Logo primero, arriba a la izquierda
    doc.addImage(img, 'PNG', 10, 10, 40, 40);

    // 2️⃣ Título centrado, pero más abajo para no chocar con el logo
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(title, (pageWidth - textWidth) / 2, 55);

    // 3️⃣ Tabla debajo del título
    const body = this.listatotal.map(item => [
      item.nombre,
      '$'+item.precio.toLocaleString('es-CO'),
      item.cant,
      { content: '$'+(item.precio * item.cant).toLocaleString('es-CO'), styles: { halign: 'right', fontStyle: 'bold' } }
    ]);

    const total1 = this.listatotal.reduce((acc, item) => acc + item.precio, 0);
    body.push([
      { content: 'TOTAL', colSpan: 3, styles: { halign: 'left', fontStyle: 'bold' } },
      { content: '$'+total1.toLocaleString('es-CO'), styles: { halign: 'right', fontStyle: 'bold' } }
    ]);
    autoTable(doc, {
      startY: 60,
      head: [['Nombre(cliente)','Direccion','Celular']],
      body: [
        [
          this.persona.nombre,
          this.persona.direccion,
          this.persona.cel
        ]
      ]
    });
    autoTable(doc, {
      startY: 75,
      head: [['Producto','xUni','Cant',{content:'Precio',styles:{halign:'right',fontStyle:'bold'}}]],
      body: body
    });

    doc.save("carrito.pdf");
  };
}
}
