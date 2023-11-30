import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ServicioProductoService } from 'src/app/service/servicio-producto.service';
import { DetalleProductoComponent } from '../detalle-producto/detalle-producto.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/shared-data-service.service';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent {

   //atributos de la clase
   producto: Producto[] = [];

   constructor(
    private productoService: ServicioProductoService,
    private sharedDataService: SharedDataService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router
    ){}

   ngOnInit(): void {
     this.cargarProductos();
   }

   cargarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.producto = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: any) {
    this.productoService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  abrirDetalleProductoModal(id: any) {
    const modalRef = this.modalService.open(DetalleProductoComponent, {
      backdrop: 'static',
      keyboard: false,
      // Puedes agregar otras opciones según tus necesidades
    });
    this.sharedDataService.changeId(id);
    modalRef.componentInstance.id = id;
    // También puedes ajustar el ancho y alto del modal directamente en el ElementRef
    modalRef.componentInstance['width'] = '800px';  // Cambia '800px' según tus necesidades
    modalRef.componentInstance['height'] = '1000px';  // Cambia '600px' según tus necesidades
    modalRef.result.then((result) => {
      // Manejar el resultado si es necesario
    }).catch((reason) => {
      // Manejar la razón si es necesario
    });
  } 






}
