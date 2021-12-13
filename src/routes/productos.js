const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');
const productoController = require('../controller/productoController');
const {body,validationResult} = require('express-validator');

//GET
router.get('/',isLoggedIn,productoController.indexProductos);
router.get('/add',isLoggedIn,productoController.addProducto);
//router.get('/addtest',isLoggedIn,productoController.addProducto);
//router.get('/addtest2',isLoggedIn,productoController.addProducto);
//router.get('/addtest3',isLoggedIn,productoController.addProducto);
//router.get('/addtest4',isLoggedIn,productoController.addProducto);
//router.get('/addtest5',isLoggedIn,productoController.addProducto);
//router.get('/addtest6',isLoggedIn,productoController.addProducto);
router.get('/edit/:id',isLoggedIn,productoController.editProducto);
router.get('/delete/:id',isLoggedIn,productoController.deleteProducto);

//POST
router.post('/add',[
body('nombre_producto','Ingrese un nombre de producto')
    .exists()
    .not()
    .isEmpty()
    .custom((value,{req})=>{
        if(value.length > 4 && value.length < 30 ){
            return true
        }
        throw new Error('Nombre de producto no valido')
    }),
body('categoria_producto','Ingrese una categoria de producto')
    .exists()
    .not()
    .isEmpty()
    .custom((value,{req})=>{
        if(value.length > 4 && value.length < 30 ){
            return true
        }
        throw new Error('Categoria de producto no valida')
    }),
body('cantidad_producto','Ingrese la cantidad de producto')
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .custom((value,{req})=>{
        if((value >= 5 && value <= 100)){
            return true
        }
        throw new Error('Cantidad de producto no valida')
    }),
body('unidad_medida_producto','Ingrese una unidad de medida')
    .exists()
    .not()
    .isEmpty()
    .custom((value,{req})=>{
        if(value.length > 2 && value.length < 16 ){
            return true
        }
        throw new Error('Unidad de medida no valida')
    })
],(req,res,next)=>{ /*const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}*/ const errors = validationResult(req);
if(!errors.isEmpty()){
    console.log(req.body);
    const valores = req.body;
    const validaciones = errors.array();
    res.render('productos/add',{validaciones:validaciones,valores:valores});
} else{
    next();
}
},isLoggedIn,productoController.insertarProducto);

router.post('/edit/:id',isLoggedIn,productoController.editarProducto);


module.exports = router;