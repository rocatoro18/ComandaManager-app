const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const { nextTick } = require('process');
const session = require('express-session');
const mysqlstore = require('express-mysql-session');
const {database} = require('./keys');
const passport = require('passport');

// MacOS
// Login test
// a
//ejs
// Inicializaciones 
const app = express();
require('./lib/passport');


// Configuraciones
app.set('port',process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); // le dice a node donde esta la carpeta views
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');

// (Middlewares) Funciones que se ejecutan cuando el cliente manda una petición
app.use(session({
    secret: 'comandamanagersession',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Variables globales
app.use((req,res,next) => {
    app.locals.success = req.flash('success');
    app.locals.success = req.flash('message');
    app.locals.user = req.user;
    next();
});

// Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/productos',require('./routes/productos')); // CHECAR MAS DELANTE

app.use('/comandas',require('./routes/comandas'));
app.use('/ventas',require('./routes/ventas'));

/*
app.use(require('./routes'));
app.use(require('./routes/authentication.js'));
app.use('/links',require('./routes/links.js')); // CHECAR MAS DELANTE
*/
// Publico
app.use(express.static(path.join(__dirname, 'public')));

// Empezar Servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
