import express from "express";
import session from 'express-session';
import cookieParser from 'cookie-parser';


import {paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje, paginaContacto} from '../controllers/paginaControllers.js'
import { guardarTestimoniales } from "../controllers/testimonialControllers.js";
import { paginaDetalleContacto } from "../controllers/contactoControllers.js";
import {paginaAdmin, paginaLogin, guardarLogin, paginaRegistro, guardarRegistro, logout, getSession} from '../controllers/adminControllers.js';
const router = express.Router();

router.use(cookieParser());
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

router.use((req, res, next)=>{
    let Admin = getSession();
    if(Admin){
        res.locals.admin = true;
    }else{
        res.locals.admin = false;
    }
    next();
});

/* ***ZONA PUBLICA */
router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros);
router.get('/viajes', paginaViajes);
router.get('/viajes/:viaje', paginaDetalleViaje);
router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimoniales);
router.get('/contacto', paginaContacto)
router.post('/contacto', paginaDetalleContacto);

/* **ZONA ADMIN */
router.get('/admin', paginaAdmin);
router.get('/login', paginaLogin);
router.post('/login', guardarLogin);
router.get('/registro', paginaRegistro);
router.post('/registro', guardarRegistro);
router.get('/logout', logout);
//router.get('login/:numpages', paginadorAdmin);
export default router;
