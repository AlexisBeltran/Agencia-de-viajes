import {Viaje} from '../models/Viaje.js'
import {usuario} from '../models/Usuario.js';
import {compare, encrypt} from './helpers/handleBcrypt.js';
import {FormatoFecha, Autenticar} from './helpers/functions.js';
let Admin;
const paginaAdmin = async (req, res) => {
    const Viajes = await Viaje.findAll();
    res.render('admin', {
        pagina: 'Información',
        Viajes  
    });
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
const guardarLogin = async(req, res, next) => {
    let Errores = [];
    const {correo, password} = req.body;
    if(correo.trim() === ''){
        Errores = [...Errores, {mensaje: 'El correo es obligatorio'}];
    }
    if(password.trim() === ''){
        Errores = [...Errores, {mensaje: 'La contraseña es obligatoria'}];
    }

    //Validation users
    try{
        const User = await usuario.findOne({where: {correo_usuario: correo}});
        if(!User){
            Errores = [...Errores, {mensaje: 'Correo no registrado'}];
        }else{
            const CheckPassword = await compare(password, User.contrasenia_usuario);
            if(CheckPassword){  
                //Autenticar el usuario
                req.session.correo = correo;
                req.session.admin = true;
                const Auten = Autenticar(req.session, correo);
                if(Auten){
                    returnSession(req.session.admin);
                    res.redirect('/admin'); 
                }
            }
            else{
                Errores = [...Errores, {mensaje: 'Contraseña Incorrecta'}];
            }
        }
    }catch(Error){
        console.log(Error);
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
    if(password.trim() === ''|| confircontra.trim() === ''){
        Errores = [...Errores , {mensaje: 'La contraseña es obligatorio'}];
    }
    if(password.trim() !== confircontra.trim()){
        Errores = [...Errores, {mensaje: 'Las contraseñas no coiciden'}];
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
            const Hoy = new Date();
            const Fecha = FormatoFecha(Hoy);
            let passwordHash = await encrypt(password);
            await usuario.create({
                nombre_usuario : nombre,
                correo_usuario : correo,
                contrasenia_usuario : passwordHash,
                fechaCreacion_usuario : Fecha
            });
            res.redirect('/login');
        }catch(Error){
            console.log(Error);
        }
    }
}
const logout = async (req, res) => {
    req.session.destroy();
    Admin = false;
    res.redirect('/');
}

function returnSession(admin){
    Admin = admin;
}

function getSession(){
    return Admin;
    
}


export{
    paginaAdmin,
    paginaLogin,
    paginaRegistro,
    guardarLogin,
    guardarRegistro, 
    logout, 
    getSession
}