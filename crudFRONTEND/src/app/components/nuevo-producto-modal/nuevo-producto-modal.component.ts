import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ServicioProductoService } from 'src/app/service/servicio-producto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nuevo-producto-modal',
  templateUrl: './nuevo-producto-modal.component.html',
  styleUrls: ['./nuevo-producto-modal.component.css']
})
export class NuevoProductoModalComponent {

  nombre: string = '';
  precio: number = 0;

  constructor(
     private productoService: ServicioProductoService,
     private toastr: ToastrService,
     private router: Router,
     public activeModal: NgbActiveModal
    ){}

   ngOnInit(): void {}


   onCreate():void{
      const producto = new Producto(this.nombre,this.precio);
      this.productoService.create(producto).subscribe(
        data => {
          this.toastr.success('Producto Creado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
           // Cerrar el modal después de la operación
           this.cerrarModal();
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

   cerrarModal() {
    this.activeModal.dismiss();
    this.router.navigate(['/']);
  }

}
