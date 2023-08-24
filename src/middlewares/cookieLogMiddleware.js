const db = require('../database/models');
//const sequelize = db.sequelize;

const Users = db.User; 

const cookieExiste = async (req, res, next) => {
    try {
        if (!req.session.usuarioLogeado && req.cookies.recordame){
            const usuario = await Users.findOne({
                where: {
                correo: req.cookies.recordame
            }})
          
            delete usuario.contrasenia;
            req.session.usuarioLogeado = usuario;
        }
        next()
        
    } catch (error) {
        console.log(error)
        
    }
    
}

module.exports = cookieExiste;

    

    
