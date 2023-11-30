import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ServicioProductoService {

  //url
  //urlApi = "http://localhost:8080/v1/producto";

  urlApi = 'http://localhost:8080/v1/producto/';
          

  constructor(private httpClient: HttpClient) { }

  
  public lista2(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.urlApi + 'lista');
  }
 

  public lista(): Observable<Producto[]> {
      return this.httpClient.get<Producto[]>(this.urlApi +'lista');
  }

  public details(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(this.urlApi +`detail/${id}`);
  }

  public detailName(nombre: string): Observable<Producto> {
    return this.httpClient.get<Producto>(this.urlApi + `detailname/${nombre}`);
  }

  public create(producto: Producto): Observable<any> {
    return this.httpClient.post<Producto>(this.urlApi + 'create', producto);
  }


  public update(id: number, producto: Producto): Observable<any> {
    return this.httpClient.put<any>(this.urlApi + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<Producto>(this.urlApi + `delete/${id}`);
  }


}
