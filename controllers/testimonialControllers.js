import { Testimoniales } from "../models/Testimoniales.js";
export const guardarTestimoniales = async (req, res) =>{
    const {nombre, correo, mensaje} = req.body;
    const Testimonial = await Testimoniales.findAll();
    let Errores = [];

    if(nombre.trim() === ''){
        Errores = [...Errores, {mensaje: 'El nombre esta vacio'}];
    }
    if(correo.trim() === ''){
        Errores = [...Errores, {mensaje: 'El correo esta vacio'}];
    }
    if(mensaje.trim() === ''){
        Errores = [...Errores, {mensaje: 'El mensaje esta vacio'}];
    }

    if(Errores.length > 0){
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            nombre,
            correo, 
            mensaje,
            Errores, 
            Testimonial
        })
    }
    else{
        //Almacenarlo en la base de datos
        try{
            await Testimoniales.create({
                nombre, 
                correo, 
                mensaje,
            });
            res.redirect('/testimoniales');
        }catch(Error){
            console.log(Error);
        }
    }
    

} 