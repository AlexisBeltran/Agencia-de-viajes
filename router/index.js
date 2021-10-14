import express from "express";
import {paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje, paginaContacto} from '../controllers/paginaControllers.js'
import { guardarTestimoniales } from "../controllers/testimonialControllers.js";
import { paginaDetalleContacto } from "../controllers/contactoControllers.js";
import {paginaAdmin, paginaLogin, guardarLogin, paginaRegistro, guardarRegistro} from '../controllers/adminControllers.js';
const router = express.Router();

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
//router.get('login/:numpages', paginadorAdmin);
export default router;
