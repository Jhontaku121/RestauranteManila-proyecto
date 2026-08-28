import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Encabezado } from './encabezado/encabezado';
import { Estrellas } from './estrellas/estrellas';
import { Footer } from './footer/footer';
import { filter } from 'rxjs';
import { InfoInicio } from './info-inicio/info-inicio';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Encabezado, Estrellas, Footer, InfoInicio],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  ngOnInit(): void {
    document.documentElement.style.backgroundImage = "url('imgs/fondo.png')";
  }
  protected readonly title = signal('Beta');
  private router = inject(Router);
  esRutaInicio = true
  //esformuemplea = true;

  constructor() {
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        //this.esformuemplea = event.urlAfterRedirects === '/empleados' ;
        this.esRutaInicio = event.urlAfterRedirects === '/' ;
      });
  }
}
