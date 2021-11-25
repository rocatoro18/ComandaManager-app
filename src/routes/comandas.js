const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');
const comandaController = require('../controller/comandaController');


//GET
router.get('/',isLoggedIn,comandaController.indexComandas);
router.get('/add',isLoggedIn,comandaController.addComanda);
router.get('/edit/:id',isLoggedIn,comandaController.editComanda);
router.get('/delete/:id',isLoggedIn,comandaController.deleteComanda);

//POST
router.post('/add',isLoggedIn,comandaController.insertarComanda);
router.post('/edit/:id',isLoggedIn,comandaController.editarComanda);


module.exports = router;