package com.tutorial.crud.repository;

import com.tutorial.crud.entity.ProductoEntity;
import com.tutorial.crud.entity.ProductoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<ProductoEntity, Integer> {
    Optional<ProductoEntity> findByNombre(String nombre);
    boolean existsByNombre(String nombre);
}
