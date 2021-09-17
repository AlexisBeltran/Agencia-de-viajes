import nodemailer from 'nodemailer';

export const paginaDetalleContacto = async (req, res) => {
    const Transporte = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        service: 'gmail',
        auth: {
            user: 'alexisprueba025@gmail.com',
            pass: 'beltran066',
        },
    });

    const {nombre, correo, asunto, mensaje} = req.body;
    let Errores = [];

    if(nombre.trim() === ''){
        Errores = [...Errores, {mensaje: 'El nombre es obligatorio'}];
    }
    if(correo.trim() === ''){
        Errores = [...Errores, {mensaje: 'El correo es obligatorio'}];
    }
    if(asunto.trim() === ''){
        Errores = [...Errores, {mensaje: 'El asunto es obligatorio'}];
    }
    if(mensaje.trim() === ''){
        Errores = [...Errores, {mensaje: 'El mensaje es obligatorio'}];
    }

    if(Errores.length > 0){
        res.render('contacto', {
            pagina: 'Contacto',
            nombre,
            correo, 
            asunto, 
            mensaje,
            Errores
        });
    }else{
        const mailOptions = {
            from: `${nombre} <${correo}>`,
            to: `alexis.bhja@gmail.com`,
            subject: asunto,
            text: mensaje
        }
        Transporte.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                res.redirect('/contacto');
                console.log('Email enviado: ' + info.response);
            }
        });
    }

}
