import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProductoComponent } from './components/listar-producto/listar-producto.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ActualizarProductoComponent } from './components/actualizar-producto/actualizar-producto.component';

const routes: Routes = [
  { path: '', component: ListarProductoComponent },
  { path: 'detalle/:id', component: DetalleProductoComponent },
  { path: 'nuevo', component: CrearProductoComponent },
  { path: 'actualizar/:id', component: ActualizarProductoComponent },
  { path: '**', redirectTo:'', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
