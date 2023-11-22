package com.tutorial.crud.entity;


import javax.persistence.*;

@Entity
@Table(name = "producto")
public class ProductoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre;
    private float precio;

    public ProductoEntity() {
    }

    public ProductoEntity(String nombre, float precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public float getPrecio() {
        return precio;
    }

    public void setPrecio(float precio) {
        this.precio = precio;
    }
    
}
