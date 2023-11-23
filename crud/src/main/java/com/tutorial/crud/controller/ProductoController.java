package com.tutorial.crud.controller;

import com.tutorial.crud.dto.Mensaje;
import com.tutorial.crud.dto.ProductoDto;
import com.tutorial.crud.entity.ProductoEntity;
import com.tutorial.crud.services.ProductoService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/producto")
@CrossOrigin(origins = "http://localhost:40200")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping("/lista")
    public ResponseEntity<List<ProductoEntity>> list(){
        List<ProductoEntity> list = productoService.list();
        return new ResponseEntity<List<ProductoEntity>>(list, HttpStatus.OK);
    }
    @GetMapping("/details/{id}")
    public ResponseEntity<ProductoEntity> getById(@PathVariable("id")  Integer id){

        if(!productoService.existById(id)){
            return new ResponseEntity(new Mensaje("El id que esta consultando no existe!!"), HttpStatus.NOT_FOUND);
        }else{
            ProductoEntity productoEntity = productoService.getOne(id).get();
            return new ResponseEntity<ProductoEntity>(productoEntity, HttpStatus.OK);
        }
    }

    @GetMapping("/detailsName/{nombre}")
    public ResponseEntity<ProductoEntity> getByNombre(@PathVariable("nombre")  String nombre){

        if(!productoService.existByNombre(nombre)){
            return new ResponseEntity(new Mensaje("El nombre del producto que esta consultando no existe!!"), HttpStatus.NOT_FOUND);
        }else{
            ProductoEntity productoEntity = productoService.getByNombre(nombre).get();
            return new ResponseEntity<ProductoEntity>(productoEntity, HttpStatus.OK);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@Validated  @RequestBody  ProductoDto productoDto){

        if(StringUtils.isBlank(productoDto.getNombre())){
            return new ResponseEntity(new Mensaje("El nombre del producto es obligatorio!!"), HttpStatus.BAD_REQUEST);
        }
        if(productoDto.getPrecio() <= 0){
            return new ResponseEntity(new Mensaje("El precio obligatorio o debe ser mayor que 0!!"), HttpStatus.BAD_REQUEST);
        }
        if(productoService.existByNombre(productoDto.getNombre())){
            return new ResponseEntity(new Mensaje("El nombre ya esta siendo usado en el sistema!!"), HttpStatus.BAD_REQUEST);
        }

        ProductoEntity productoEntity = new ProductoEntity();
        productoEntity.setNombre(productoDto.getNombre());
        productoEntity.setPrecio(productoDto.getPrecio());
        productoService.save(productoEntity);
        return new ResponseEntity<>(new Mensaje("El producto fue registrado de forma exitosa!!!"), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id")int id, @RequestBody ProductoDto productoDto){
        if(!productoService.existById(id))
            return new ResponseEntity(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        if(productoService.existByNombre(productoDto.getNombre()) && productoService.getByNombre(productoDto.getNombre()).get().getId() != id)
            return new ResponseEntity(new Mensaje("ese nombre ya existe"), HttpStatus.BAD_REQUEST);
        if(StringUtils.isBlank(productoDto.getNombre()))
            return new ResponseEntity(new Mensaje("el nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        if(productoDto.getPrecio()==null || productoDto.getPrecio()<0 )
            return new ResponseEntity(new Mensaje("el precio debe ser mayor que 0"), HttpStatus.BAD_REQUEST);

        ProductoEntity productoEntity = productoService.getOne(id).get();
        productoEntity.setNombre(productoDto.getNombre());
        productoEntity.setPrecio(productoDto.getPrecio());
        productoService.save(productoEntity);
        return new ResponseEntity(new Mensaje("producto actualizado"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id){
         if(!productoService.existById(id)){
            return new ResponseEntity<>(new Mensaje("El id del producto no existe"), HttpStatus.NOT_FOUND);
         }else{
             productoService.delete(id);
             return new ResponseEntity<>(new Mensaje("Producto eliminado de forma exitosa"), HttpStatus.OK);
         }
    }

}
