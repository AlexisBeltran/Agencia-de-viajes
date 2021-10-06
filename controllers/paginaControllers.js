import {Viaje} from '../models/Viaje.js'
import { Testimoniales } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => {
    let PromiseDB = []
    PromiseDB = [...PromiseDB, Testimoniales.findAll({limit: 3})];
    PromiseDB = [...PromiseDB, Viaje.findAll({limit: 3})];

    const Testimonial = await Promise.all(PromiseDB);
    
    res.render('inicio', {
        pagina: 'Inicio',
        clase:"home", 
        Testimonial : Testimonial[0],
        viajes: Testimonial[1]
    });
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    const viajes = await Viaje.findAll();
    res.render('viajes', {
        pagina: 'Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => {
    try{
        const Testimonial = await Testimoniales.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            Testimonial
        })
    }catch(Error){
        console.log(Error);
    }
    
}
const paginaDetalleViaje = async(req, res) => {
    const {viaje} = req.params;
    try{
        const Resultado = await Viaje.findOne({where : {slug: viaje}});
        console.log(Resultado);
        res.render('viaje',{
            pagina: 'Información Viaje',
            Resultado
        })
    }catch(Error){
        console.log(Error);
    }
}

const paginaContacto = (req, res) => {
    res.render('contacto', {
        pagina: 'Contacto'
    })
}

export {
    paginaInicio,
    paginaNosotros, 
    paginaViajes, 
    paginaTestimoniales, 
    paginaDetalleViaje, 
    paginaContacto,
}