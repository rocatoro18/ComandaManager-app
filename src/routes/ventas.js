const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');
const ventaController = require('../controller/ventaController');


//GET
router.get('/',isLoggedIn,ventaController.indexVentas);
router.get('/add',isLoggedIn,ventaController.addVenta);
router.get('/edit/:id',isLoggedIn,ventaController.editVenta);
router.get('/delete/:id',isLoggedIn,ventaController.deleteVenta);

//POST
router.post('/add',isLoggedIn,ventaController.insertarVenta);
router.post('/edit/:id',isLoggedIn,ventaController.editarVenta);


module.exports = router;