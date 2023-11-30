import { Component } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { NuevoProductoModalComponent } from './components/nuevo-producto-modal/nuevo-producto-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crudFRONTEND';
  
  constructor(private modalService: NgbModal) { }



  abrirNuevoProductoModal() {
    const modalRef = this.modalService.open(NuevoProductoModalComponent, {
      backdrop: 'static',
      keyboard: false,
      // Puedes agregar otras opciones según tus necesidades
    });
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
