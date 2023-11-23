package com.tutorial.crud.services;

import com.tutorial.crud.entity.ProductoEntity;
import com.tutorial.crud.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductoService {

    @Autowired
    public ProductoRepository productoRepository;

    public List<ProductoEntity> list(){
        return productoRepository.findAll();
    }

    public Optional<ProductoEntity> getOne(int id){
        return productoRepository.findById(id);
    }

    public Optional<ProductoEntity> getByNombre(String nombre){
        return productoRepository.findByNombre(nombre);
    }

    public void save(ProductoEntity productoEntity){
        productoRepository.save(productoEntity);
    }

    public void delete(int id){
        productoRepository.deleteById(id);
    }

    public boolean existById(int id){
        return  productoRepository.existsById(id);
    }

    public boolean existByNombre(String nombre){
        return  productoRepository.existsByNombre(nombre);
    }

}
