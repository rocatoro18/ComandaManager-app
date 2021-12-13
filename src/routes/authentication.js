const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');
const authenticationController = require('../controller/authenticationController');
const {body,validationResult} = require('express-validator');

//GET
router.get('/signup',isNotLoggedIn,authenticationController.signup);
router.get('/signin',isNotLoggedIn,authenticationController.signin);
router.get('/profile',isLoggedIn,authenticationController.profile);
router.get('/logout',authenticationController.logout);

//POST
router.post('/signup',[
    body('NOMBRE_EMPLEADO','Ingrese un nombre')
        .exists()
        .not()
        .isEmpty(),
    body('APELLIDOS_EMPLEADO','Ingrese los apellidos')
        .exists()
        .not()
        .isEmpty(),
    body('TELEFONO_EMPLEADO','Ingrese un número de telefono')
        .exists()
        .not()
        .isEmpty()
        .isNumeric()
        .custom((value,{req})=>{
            if((value.lenght == 10)){
                throw new Error('Número de telefono no valido')
            }
            return true
        }),
    body('CORREO_EMPLEADO','Ingrese un correo electronico')
        .exists()
        .not()
        .isEmpty()
        .isEmail(),
    body('NOMBRE_USUARIO','Ingrese un nombre de usuario')
        .exists()
        .isLength({min:4}),
    body('PASSWORD','Ingrese una contraseña')
        .exists()
        .not()
        .isEmpty()
        .custom((value,{req})=>{
            if(value.lenght > 4 && value.lenght < 16 ){
                throw new Error('Contraseña no valida')
            }
            return true
        })
],(req,res,next)=>{ /*const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }*/ const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(req.body);
        const valores = req.body;
        const validaciones = errors.array();
        res.render('auth/signup',{validaciones:validaciones,valores:valores});
    } else{
        next();
    }
},isNotLoggedIn,authenticationController.signupR);

router.post('/signin',[
    body('NOMBRE_USUARIO','Ingrese un nombre de usuario')
        .exists()
        .isLength({min:4})
],isNotLoggedIn,(req,res,next)=>{ /*const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }*/ const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(req.body);
        const valores = req.body;
        const validaciones = errors.array();
        res.render('auth/signin',{validaciones:validaciones,valores:valores});
    } else{
        next();
    }
},authenticationController.signinR);

module.exports = router;