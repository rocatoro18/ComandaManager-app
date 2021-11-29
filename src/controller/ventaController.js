const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');
const venta = require('../model/venta');


module.exports = {
    indexVentas:function (req,res) {
        /*producto.obtener(pool,function (err,datos) {
            res.render('productos/list',{productos:datos});
        });*/
        venta.obtener(pool,function (err,datos){
            res.render('ventas/list',{venta:datos});
        });
    },
    addVenta:function (req,res) {
        res.render('ventas/add');
    },
    editVenta:function (req,res) {
        /*const {id} = req.params;
        producto.editar(pool,id,function (err,datos) {
            res.render('productos/edit',{producto:datos[0]});
        });*/
        const {id} = req.params;
        venta.editar(pool,id,function (err,datos){
            res.render('ventas/edit',{venta:datos[0]});
        });
    },
    deleteVenta:function (req,res) {
        /*const {id} = req.params;
        producto.eliminar(pool,id,function (err,datos) {
            req.flash('success','Eliminado con éxito');
            res.redirect('/productos');
        });*/
        const {id} = req.params;
        venta.eliminar(pool,id, function (err,datos){
            req.flash('success','Eliminada con éxito');
            res.redirect('/ventas');
        });
    },
    insertarVenta:function (req,res) {
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
        const {total_venta} = req.body;
        const newVenta = {
            total_venta
        };
        venta.insertar(pool,newVenta,function (err){
            req.flash('success','Guardada con éxito');
            res.redirect('/ventas');
        });
    },
    editarVenta:function (req,res){
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
        const {total_venta} = req.body;
        const newVenta = {
            total_venta
        };
        venta.editarVenta(pool,id,newVenta,function (err){
            req.flash('success','Actualizada con éxito');
            res.redirect('/ventas');
        });
    }
}