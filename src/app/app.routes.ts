import { Routes } from '@angular/router';
import { Catcomida } from './catcomida/catcomida';
import { Catbebidas } from './catbebidas/catbebidas';
import { Juego } from './juego/juego';
import { Carrito } from './carrito/carrito';

export const routes: Routes = [
    {path: 'catcomida', component: Catcomida},
    {path: 'catbebidas', component: Catbebidas},
    {path: 'juego', component: Juego},
    {path: 'carrito', component: Carrito},
    {path: '**', redirectTo: ''}
];
