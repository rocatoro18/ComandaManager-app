const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');
const comandaController = require('../controller/comandaController');
const {body,validationResult} = require('express-validator');

//GET
router.get('/',isLoggedIn,comandaController.indexComandas);
router.get('/add',isLoggedIn,comandaController.addComanda);
router.get('/edit/:id',isLoggedIn,comandaController.editComanda);
router.get('/delete/:id',isLoggedIn,comandaController.deleteComanda);

//POST
router.post('/add',[
    body('numero_mesa','Ingrese un numero de mesa')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .custom((value,{req})=>{
            if((value >= 1 && value <= 20)){
                return true
            }
            throw new Error('Numero de mesa no valido')
        }),
    body('numero_personas','Ingrese un numero de personas')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .custom((value,{req})=>{
            if((value >= 1 && value <= 8)){
                return true
            }
            throw new Error('Numero de personas no valido')
        }),
    body('anotacion_comanda','Ingrese la anotacion de comanda')
        .exists()
        .not()
        .isEmpty()
        .custom((value,{req})=>{
            if(value.length > 4 && value.length < 50 ){
                return true
            }
            throw new Error('Anotacion de comanda no valida')
        }),
    body('cantidad_comanda','Ingrese una cantidad de comanda')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .custom((value,{req})=>{
            if((value >= 1 && value <= 100000)){
                return true
            }
            throw new Error('Cantidad no valida')
        }),
    body('importe_comanda','Ingrese un importe de comanda')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .custom((value,{req})=>{
            if((value >= 1 && value <= 100000)){
                return true
            }
            throw new Error('Importe no valido')
        })
    ],(req,res,next)=>{ /*const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }*/ const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(req.body);
        const valores = req.body;
        const validaciones = errors.array();
        res.render('comandas/add',{validaciones:validaciones,valores:valores});
    } else{
        next();
    }
    },isLoggedIn,comandaController.insertarComanda);

router.post('/edit/:id',isLoggedIn,comandaController.editarComanda);


module.exports = router;