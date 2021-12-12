const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');
const comanda = require('../model/comanda');


module.exports = {
    indexComandas:function (req,res) {
        /*producto.obtener(pool,function (err,datos) {
            res.render('productos/list',{productos:datos});
        });*/
        comanda.obtener(pool,function (err,datos){
            res.render('comandas/list',{comandas:datos});
        });
    },
    addComanda:function (req,res) {
        res.render('comandas/add');
    },
    editComanda:function (req,res) {
        /*const {id} = req.params;
        producto.editar(pool,id,function (err,datos) {
            res.render('productos/edit',{producto:datos[0]});
        });*/
        const {id} = req.params;
        comanda.editar(pool,id,function (err,datos){
            res.render('comandas/edit',{comandas:datos[0]});
        });
    },
    deleteComanda:function (req,res) {
        /*const {id} = req.params;
        producto.eliminar(pool,id,function (err,datos) {
            req.flash('success','Eliminado con éxito');
            res.redirect('/productos');
        });*/
        const {id} = req.params;
        comanda.eliminar(pool,id, function (err,datos){
            req.flash('success','Eliminado con éxito');
            res.redirect('/comandas');
        });
    },
    insertarComanda:function (req,res) {
       /* const {nombre_producto, cantidad_producto, precio_compra, precio_venta} = req.body;
        const newProducto = {
        nombre_producto,
        cantidad_producto,
        precio_compra,
        precio_venta,
        //ID_USUARIO: req.user.ID_USUARIO
        };*/
        /*producto.insertar(pool,newProducto, function (err) {
            req.flash('success', 'Guardado con éxito');
            res.redirect('/productos');
        });*/
        const {id} = req.params;
        const {numero_mesa,numero_personas,anotacion_comanda,cantidad_comanda,importe_comanda} = req.body;
        const newComanda = {
            numero_mesa,
            numero_personas,
            anotacion_comanda,
            cantidad_comanda,
            importe_comanda
        };
        comanda.insertar(pool,newComanda,function (err){
            req.flash('success','Guardado con éxito');
            res.redirect('/comandas');
        });
    },
    editarComanda:function (req,res){
       /* const {id} = req.params;
        const {nombre_producto, cantidad_producto, precio_compra, precio_venta} = req.body;
        const newProducto = {
        nombre_producto,
        cantidad_producto,
        precio_compra,
        precio_venta
    };*/
        /*producto.editarProducto(pool,id,newProducto, function (err){
            req.flash('success','Actualizado con éxito');
            res.redirect('/productos');
        });*/
        const {id} = req.params;
        const {numero_mesa,numero_personas,anotacion_comanda,cantidad_comanda,importe_comanda} = req.body;
        const newComanda = {
            numero_mesa,
            numero_personas,
            anotacion_comanda,
            cantidad_comanda,
            importe_comanda
        };
        comanda.editarComanda(pool,id,newComanda,function (err){
            req.flash('success','Actualizado con éxito');
            res.redirect('/comandas');
        });
    }
}