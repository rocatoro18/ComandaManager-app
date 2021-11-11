const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');
const productoController = require('../controller/productoController');


//GET
router.get('/',isLoggedIn,productoController.indexProductos);
router.get('/add',isLoggedIn,productoController.addProducto);
router.get('/edit/:id',isLoggedIn,productoController.editProducto);
router.get('/delete/:id',isLoggedIn,productoController.deleteProducto);

//POST
router.post('/add',isLoggedIn,productoController.insertarProducto);
router.post('/edit/:id',isLoggedIn,productoController.editarProducto);


module.exports = router;