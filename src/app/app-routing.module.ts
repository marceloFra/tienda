import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { DeudasComponent } from './components/deudas/deudas.component';


const routes: Routes = [

  { path: '', component: ProductoComponent},
  { path: 'productos', component: ProductoComponent},
  { path: 'clientes', component: ClienteComponent},
  { path: 'deudas/:idcliente', component: DeudasComponent},
  // { path: 'deudas', component: DeudasComponent},

  { path: '**', redirectTo: 'productos'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
