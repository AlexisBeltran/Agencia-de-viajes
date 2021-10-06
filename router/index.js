import express from "express";
import {paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje, paginaContacto} from '../controllers/paginaControllers.js'
import { guardarTestimoniales } from "../controllers/testimonialControllers.js";
import { paginaDetalleContacto } from "../controllers/contactoControllers.js";
import {paginaLogin} from '../controllers/adminControllers.js';
const router = express.Router();

router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros);
router.get('/viajes', paginaViajes);
router.get('/viajes/:viaje', paginaDetalleViaje);
router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimoniales);
router.get('/contacto', paginaContacto)
router.post('/contacto', paginaDetalleContacto);
router.get('/login', paginaLogin);
export default router;
