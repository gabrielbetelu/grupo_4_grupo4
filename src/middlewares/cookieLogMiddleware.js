const fs = require('fs');
const path = require('path');
const datos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));

const cookieExiste = (req, res, next) => {
    if (!req.session.usuarioLogeado && req.cookies.recordame){
        const usuario = datos.find((row) => row.correo == req.cookies.recordame);
        delete usuario.contrasenia;
        req.session.usuarioLogeado = usuario;
    }
    next()
}

module.exports = cookieExiste;