/* **FUNCIONES** */

function FormatoFecha(fecha){
    const formatoMap = {
        yyyy: fecha.getFullYear(),
        mm: fecha.getMonth() + 1,
        dd: fecha.getDate()
    }

    const {yyyy, mm, dd} = formatoMap;
    return `${yyyy}-${mm}-${dd}`;
}

export{
    FormatoFecha
}