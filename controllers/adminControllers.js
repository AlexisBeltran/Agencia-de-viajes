import {Viaje} from '../models/Viaje.js'
import bcryptjs from 'bcryptjs';
import {usuario} from '../models/Usuario.js';

const paginaAdmin = async (req, res) => {
    const Viajes = await Viaje.findAll();
    try{
        res.render('login', {
            pagina: 'Información',
            Viajes
        });
    }catch(Error){
        console.log(Error);
    }
}

const paginaLogin = async (req, res) => {
    res.render('login', {
        pagina: "login"
    });
}

const paginaRegistro = (req, res) => {
    res.render('registro', {
        pagina: 'Registro de usuario',
    });
    
}
const guardarLogin = async(req, res) => {
    let Errores = [];
    const {correo, password} = req.body;
    if(correo.trim() === ''){
        Errores = [...Errores, {mensaje: 'El correo es obligatorio'}];
    }
    if(password.trim() === ''){
        Errores = [...Errores, {mensaje: 'La contraseña es obligatoria'}];
    }
    if(Errores.length > 0){
        res.render('login', {
            Errores
        });
    }
}

const guardarRegistro = async(req, res) => {
    let Errores = [];
    const {nombre, correo, password, confircontra} = req.body;
    if(nombre.trim() === ''){
        Errores = [...Errores , {mensaje: 'El nombre es obligatorio'}];
    } 
    if(correo.trim() === ''){
        Errores = [...Errores , {mensaje: 'El correo es obligatorio'}];
    }
    if(password.trim() === ''|| confircontra === ''){
        Errores = [...Errores , {mensaje: 'La contraseña es obligatorio'}];
    }

    if(Errores.length > 0) {
        res.render('registro', {
            nombre, 
            correo,
            password,
            confircontra,
            Errores
        });
    }else{
        try{
            const Fecha = new Date();
            let passwordHash = await bcryptjs.hash(password, 8);
            await usuario.create({
                nombre_usuario : nombre,
                correo_usuario : correo,
                contraseña_usuario : passwordHash,
                fechaCreacion_usuario : Fecha.getUTCFullYear(),
            });
            res.redirect('/login');
        }catch(Error){
            console.log(Error);
        }
    }
}

export{
    paginaAdmin, 
    paginaLogin,
    paginaRegistro,
    guardarLogin,
    guardarRegistro
}