import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ServicioProductoService } from 'src/app/service/servicio-producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  nombre: string = '';
  precio: number = 0;

  constructor(
     private productoService: ServicioProductoService,
     private toastr: ToastrService,
     private router: Router
    ){}

   ngOnInit(): void {}


   onCreate():void{
      const producto = new Producto(this.nombre,this.precio);
      this.productoService.create(producto).subscribe(
        data => {
          this.toastr.success('Producto Creado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/']);
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
          this.router.navigate(['/']);
        }
      );
   }

}
