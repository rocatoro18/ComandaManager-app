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
        //res.render('productos/addtest');
        //res.render('productos/addtest2');
        //res.render('productos/addtest3');
        //res.render('productos/addtest4');
        //res.render('productos/addtest5');
        //res.render('productos/addtest6');
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
        const {nombre_producto, categoria_producto, cantidad_producto, unidad_medida_producto} = req.body;
        const newProducto = {
        nombre_producto,
        categoria_producto,
        cantidad_producto,
        unidad_medida_producto,
        //ID_USUARIO: req.user.ID_USUARIO
        };
        producto.insertar(pool,newProducto, function (err) {
            req.flash('success', 'Guardado con éxito');
            res.redirect('/productos');
        });
    },
    editarProducto:function (req,res){
        const {id} = req.params;
        const {nombre_producto, categoria_producto, cantidad_producto, unidad_medida_producto} = req.body;
        const newProducto = {
        nombre_producto,
        categoria_producto,
        cantidad_producto,
        unidad_medida_producto
    };
        producto.editarProducto(pool,id,newProducto, function (err){
            req.flash('success','Actualizado con éxito');
            res.redirect('/productos');
        });
    }
}