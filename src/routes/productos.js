const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/add',isLoggedIn, (req,res) =>{
    res.render('productos/add');
});

router.post('/add',isLoggedIn, async (req,res) =>{
    const {nombre_producto, cantidad_producto, precio_compra, precio_venta} = req.body;
    const newProducto = {
        nombre_producto,
        cantidad_producto,
        precio_compra,
        precio_venta,
        //ID_USUARIO: req.user.ID_USUARIO
    };
    console.log(newProducto);
    await pool.query('INSERT INTO PRODUCTOS SET ?',[newProducto]);
    req.flash('success', 'Guardado con éxito');
    res.redirect('/productos');
});

router.get('/',isLoggedIn, async (req,res)=>{
    const productos = await pool.query('SELECT * FROM PRODUCTOS' /*WHERE ID_USUARIO = ?',[req.user.ID_USUARIO]*/);
    res.render('productos/list',{productos});
});

router.get('/delete/:id',isLoggedIn, async (req, res) =>{
    const {id} = req.params;
    await pool.query('DELETE FROM PRODUCTOS WHERE ID_PRODUCTO = ?',[id]);
    req.flash('success','Eliminado con éxito');
    res.redirect('/productos');
});

router.get('/edit/:id',isLoggedIn, async (req, res) =>{
    const {id} = req.params;
    const producto = await pool.query('SELECT * FROM PRODUCTOS WHERE ID_PRODUCTO = ?',[id]);
    res.render('productos/edit',{producto:producto[0]});
});

router.post('/edit/:id',isLoggedIn, async (req, res) =>{
    const {id} = req.params;
    const {nombre_producto, cantidad_producto, precio_compra, precio_venta} = req.body;
    const newProducto = {
        nombre_producto,
        cantidad_producto,
        precio_compra,
        precio_venta
    };
    req.flash('success','Actualizado con éxito');
    await pool.query('UPDATE PRODUCTOS SET ? WHERE ID_PRODUCTO = ?',[newProducto,id]);
    res.redirect('/productos');
});

module.exports = router;