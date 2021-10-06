import {Viaje} from '../models/Viaje.js'
const paginaLogin = async (req, res) => {
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

export{
    paginaLogin
}