const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');
const ventaController = require('../controller/ventaController');
const {body,validationResult} = require('express-validator');

//GET
router.get('/',isLoggedIn,ventaController.indexVentas);
router.get('/add',isLoggedIn,ventaController.addVenta);
router.get('/edit/:id',isLoggedIn,ventaController.editVenta);
router.get('/delete/:id',isLoggedIn,ventaController.deleteVenta);

//POST
router.post('/add',[
    body('total_venta','Ingrese una venta')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .custom((value,{req})=>{
            if((value >= 1 && value <= 100000)){
                return true
            }
            throw new Error('Venta no valida')
        })
    ],(req,res,next)=>{ /*const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }*/ const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(req.body);
        const valores = req.body;
        const validaciones = errors.array();
        res.render('ventas/add',{validaciones:validaciones,valores:valores});
    } else{
        next();
    }
    },isLoggedIn,ventaController.insertarVenta);

router.post('/edit/:id',isLoggedIn,ventaController.editarVenta);


module.exports = router;