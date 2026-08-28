import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Comidas } from '../servicios/comidas';
import { Bebidas } from '../servicios/bebidas';

@Component({
  selector: 'app-juego',
  imports: [],
  providers: [Comidas, Bebidas],
  templateUrl: './juego.html',
  styleUrl: './juego.css',
})
export class Juego implements OnInit{
  constructor(private cd: ChangeDetectorRef, private apicomidas: Comidas, private apibebidas: Bebidas){}
  imageR:string = "https://assets.pokemon.com/static-assets/content-assets/cms2-es-xl/img/cards/web/SWSH11/SWSH11_LA_97.png";
  ganador1:string = "";
  ganador2:string = "";
  perder:string = "https://assets.pokemon.com/static-assets/content-assets/cms2-es-xl/img/cards/web/ME05/ME05_LA_116.png";
  posicion11:number[]=[0,0];
  posicion22:number[]=[0,0];
  encontrados:number = 0;
  mensaje2: string;
  ngOnInit(): void {
    this.random();
    this.mensaje2="";
    this.darvalor();
    this.cd.detectChanges()
    this.cd.detectChanges()
    this.cd.detectChanges()
  }
  random(){
    this.posicion11[0] = Math.floor(Math.random() * 4) + 1;
    this.posicion11[1] = Math.floor(Math.random() * 4) + 1;
    this.posicion22[0] = Math.floor(Math.random() * 4) + 1;
    this.posicion22[1] = Math.floor(Math.random() * 4) + 1;
    if(this.posicion11==this.posicion22){
      this.random();
    }
  }
  darvalor(){
    this.apicomidas.random().subscribe((dato:any) => {
      this.ganador1 = dato.meals[0].strMealThumb; 
      this.cd.detectChanges();
    });
    this.apibebidas.random().subscribe((dato:any) => {
      this.ganador2 = dato.drinks[0].strDrinkThumb;
      this.cd.detectChanges();
    });
  }
  async descubrir4x4(p: number, r:number) {
    const bolita = document.getElementById("ts"+p+r) as HTMLImageElement;
    if ((p == this.posicion11[0] && r==this.posicion11[1])) {
      bolita.src = this.ganador1;
      this.encontrados++;
    } else if ((p == this.posicion22[0] && r==this.posicion22[1])){
      bolita.src = this.ganador2;
      this.encontrados++;
    }else {
      bolita.src = this.perder;
    }
    if(this.encontrados==2){
      this.mensaje2="Ganaste";
      await new Promise(resolve => setTimeout(resolve, 3000));
      this.reiniciar4x4();
      this.encontrados=0;
    }
  }
  reiniciar4x4(){
    for(var i=1; i<=4;i++){
      for(var p=1; p<=4;p++){
        const bolita = document.getElementById("ts"+i+p) as HTMLImageElement;
        bolita.src = this.imageR;
      }
    }
    this.ngOnInit();
  }

}
