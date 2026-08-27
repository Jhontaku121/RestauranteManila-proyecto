import { Component } from '@angular/core';
import { Navegador } from '../navegador/navegador';

@Component({
  selector: 'app-encabezado',
  imports: [Navegador],
  templateUrl: './encabezado.html',
  styleUrl: './encabezado.css',
})
export class Encabezado {}
