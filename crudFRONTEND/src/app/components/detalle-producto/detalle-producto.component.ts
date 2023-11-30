import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
import { Producto } from 'src/app/models/producto';
import { ServicioProductoService } from 'src/app/service/servicio-producto.service';
import { SharedDataService } from 'src/app/service/shared-data-service.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {

  //atributos
  producto: any;
  @Input() id: number | undefined;

  currentId: any | undefined;
  private idSubscription: Subscription;
 
  constructor(
     private modalService: NgbModal,
     private productoService: ServicioProductoService,
     private toastr: ToastrService,
     private router: Router,
     private activeRoute: ActivatedRoute,
     private sharedDataService: SharedDataService
     ){
      this.idSubscription = this.sharedDataService.currentId.subscribe((id) => {
        this.currentId = id;
      });
     }

   ngOnInit(): void {
    const id = this.activeRoute.snapshot.params['id'];
    console.log("ID"+id);
    this.productoService.details(this.currentId).subscribe(
      data => {
        this.producto = data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.volver();
      }
    );
   }

  abrirDetalleProductoModal() {
    const modalRef = this.modalService.open(DetalleProductoComponent, {
      backdrop: 'static',
      keyboard: false,
      // Puedes agregar otras opciones según tus necesidades
    });
    // También puedes ajustar el ancho y alto del modal directamente en el ElementRef
    modalRef.componentInstance['width'] = '800px';  // Cambia '800px' según tus necesidades
    modalRef.componentInstance['height'] = '1000px';  // Cambia '600px' según tus necesidades
    // Cerrar el modal después de la operación
    this.cerrarModal();
    this.router.navigate(['/']);
    modalRef.result.then((result) => {
      // Manejar el resultado si es necesario
    }).catch((reason) => {
      // Manejar la razón si es necesario
    });
  }
 
 volver(): void {
  this.router.navigate(['/']);
 }


 cerrarModal() {
  this.modalService.dismissAll();
  this.router.navigate(['/']);
 }


 ngOnDestroy() {
  // Desuscribe el componente cuando se destruye
  this.idSubscription.unsubscribe();
} 







}
