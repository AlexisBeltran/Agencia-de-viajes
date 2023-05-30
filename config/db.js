import Sequelize from "sequelize";
import dotenv from 'dotenv';

dotenv.config({path: '.env'});
const {DATABASE, USERNAME, PASSWORD, HOST, PORT} = process.env;
console.log("DATABASE: ", DATABASE);
console.log("USER NAME: ", USERNAME);
console.log("PASSWORD: ", PASSWORD);
console.log("HOST: ", HOST);
console.log("PORT: ", PORT);

const db = new Sequelize(DATABASE, USERNAME, PASSWORD,{
    host: HOST,
    port: PORT,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: 0
});

export default db;