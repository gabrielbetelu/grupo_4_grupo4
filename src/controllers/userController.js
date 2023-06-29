const fs = require ('fs');
const path = require ('path');
const rutaJSON = path.resolve('./src/database/users.json');
const datos = JSON.parse (fs.readFileSync(rutaJSON));
const bcrypt = require('bcrypt');


module.exports = {
    login : (req, res) => {
        return res.render('./users/login')

    },
    processLogin : (req, res) => {
      const usuario = datos.find((row)=> row.email == req.body.email)
      console.log(usuario)
      if (usuario){
        if (bcrypt.compareSync(req.body.contrasenia, usuario.contrasenia)){
            delete usuario.contrasenia
            req.session.usuarioLogeado = usuario
            console.log('contraseña correcta')
        }
        if (req.body.cookie) {
            res.cookie("recordame", usuario.email, {maxAge: 1000*60*60})
            
        }
        return res.redirect('/')
      }else{
        return res.redirect('login')
        /* {
            //codigo de errores de validacion
        }*/
      }
    },
    registro :(req, res) => {
            return res.render('./users/registro')
            
    },
    processRegister :(req, res) => {
        const user = {
            id: datos.length+1, 
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
            imagen: req.body.imagen,
            categoria: "usuario",
            borrado: false
        }
        console.log(user);
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), JSON.stringify([...datos, user], null, 2))
        return res.redirect('/')
    }
    
};