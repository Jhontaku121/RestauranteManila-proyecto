import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navegador',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navegador.html',
  styleUrl: './navegador.css',
})
export class Navegador {}
