const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');
const producto = require('../model/producto');
//const {id} = req.params;

module.exports = {
    indexProductos:function (req,res) {
        producto.obtener(pool,function (err,datos) {
            res.render('productos/list',{productos:datos});
        });
    },
    addProducto:function (req,res) {
        res.render('productos/add');
    },
    editProducto:function (req,res) {
        const {id} = req.params;
        producto.editar(pool,id,function (err,datos) {
            res.render('productos/edit',{producto:datos[0]});
        });
    },
    deleteProducto:function (req,res) {
        const {id} = req.params;
        producto.eliminar(pool,id,function (err,datos) {
            req.flash('success','Eliminado con éxito');
            res.redirect('/productos');
        });
    },
    insertarProducto:function (req,res) {
        const {nombre_producto, cantidad_producto, precio_compra, precio_venta} = req.body;
        const newProducto = {
        nombre_producto,
        cantidad_producto,
        precio_compra,
        precio_venta,
        //ID_USUARIO: req.user.ID_USUARIO
        };
        producto.insertar(pool,newProducto, function (err) {
            req.flash('success', 'Guardado con éxito');
            res.redirect('/productos');
        });
    },
    editarProducto:function (req,res){
        const {id} = req.params;
        const {nombre_producto, cantidad_producto, precio_compra, precio_venta} = req.body;
        const newProducto = {
        nombre_producto,
        cantidad_producto,
        precio_compra,
        precio_venta
    };
        producto.editarProducto(pool,id,newProducto, function (err){
            req.flash('success','Actualizado con éxito');
            res.redirect('/productos');
        });
    }
}