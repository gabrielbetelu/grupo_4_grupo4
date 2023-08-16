const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
//const datos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
const Users = db.User; 
//const CategoriaUser = db.CategoriaUser;

const cookieExiste = async (req, res, next) => {
    try {
        if (!req.session.usuarioLogeado && req.cookies.recordame){
            const usuario = await Users.findOne({
                where: {
                correo: req.cookies.recordame
            }})
          
            //const usuario = datos.find((row) => row.correo == req.cookies.recordame);
            delete usuario.contrasenia;
            req.session.usuarioLogeado = usuario;
        }
        next()
        
    } catch (error) {
        console.log(error)
        
    }
    
}

module.exports = cookieExiste;

    

    
