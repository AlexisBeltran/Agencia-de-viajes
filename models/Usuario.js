import Sequelize from "sequelize";
import db from "../config/db.js";

export const usuario = db.define('usuario', {
    cve_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre_usuario: {
        type: Sequelize.STRING
    },
    correo_usuario: {
        type: Sequelize.STRING
    },
    contraseña_usuario: {
        type: Sequelize.STRING
    },
    fechaCreacion_usuario: {
        type: Sequelize.DATE
    },
    fechaModificacion_usuario: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName : true
});