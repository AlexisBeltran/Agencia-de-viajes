import express from 'express';
import router from './router/index.js';
import db from './config/db.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();

router.use(cookieParser());
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


db.authenticate()
    .then(() => console.log('Base de datos conectada exitosamente'))
    .catch(error => console.log(error));

//def port and host
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//Enable Pug
app.set('view engine', 'pug');

//Get actual year
app.use((req, res, next) => {
    const Anio = new Date();
    res.locals.nombreSitio = "Agencia de Viajes"
    res.locals.AñoActual = Anio.getFullYear();
    return next();
});
//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));
//Add router
app.use(express.static('public'));
app.use('/', router);


app.listen(port, host, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});

