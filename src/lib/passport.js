const passport = require('passport'); // Permite verificacion a traves de redes sociales
//const LocalStrategy = ('passport-local').Strategy;
var localStrategy   = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new localStrategy({
    usernameField: 'NOMBRE_USUARIO',
    passwordField: 'PASSWORD',
    passReqToCallback: true
}, async (req,NOMBRE_USUARIO,PASSWORD,done) => {
    const rows = await pool.query('SELECT * FROM empleados WHERE NOMBRE_EMPLEADO = ?',[NOMBRE_USUARIO]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(PASSWORD,user.PASSWORD);
        if(validPassword){
            done(null,user,req.flash('success','Bienvenido '+user.NOMBRE_USUARIO));
        } else {
            done(null,false,req.flash('message','Contraseña Incorrecta'));
        }
    } else {
        return done(null,false,req.flash('message','El nombre de usuario no existe'));
    }
}));

passport.use('local.signup',new localStrategy({
    usernameField: 'NOMBRE_USUARIO',
    passwordField: 'PASSWORD',
    passReqToCallback: true
}, async (req,NOMBRE_USUARIO,PASSWORD,done) =>{
    const {NOMBRE_EMPLEADO,APELLIDOS_EMPLEADO,TELEFONO_EMPLEADO,CORREO_EMPLEADO} = req.body;
    const newUser = {
        NOMBRE_USUARIO,
        PASSWORD,
        NOMBRE_EMPLEADO,
        APELLIDOS_EMPLEADO,
        TELEFONO_EMPLEADO,
        CORREO_EMPLEADO
    };
    newUser.PASSWORD = await helpers.encryptPassword(PASSWORD);
    const result = await pool.query('INSERT INTO empleados SET ?',[newUser]);
    newUser.ID_EMPLEADO = result.insertId;
    return done(null,newUser);
}));


passport.serializeUser((user,done)=>{
    done(null, user.ID_EMPLEADO);
});

passport.deserializeUser( async (ID_EMPLEADO,done)=>{
    const rows = await pool.query('SELECT * FROM empleados WHERE ID_EMPLEADO = ?',ID_EMPLEADO);
    done(null,rows[0]);
});
