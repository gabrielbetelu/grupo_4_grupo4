const fs = require ('fs');
const path = require ('path');
const rutaJSON = path.resolve('./src/database/users.json');
const datos = JSON.parse (fs.readFileSync(rutaJSON));



module.exports = {
    login : (req, res) => {
        return res.render('./users/login')

    },
    processLogin : (req, res) => {
      const 
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
            contrasenia: req.body.contrasenia,
            imagen: req.body.imagen,
            categoria: "usuario",
            borrado: false
        }
        console.log(user);
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), JSON.stringify([...datos, user], null, 2))
        return res.redirect('/')
    }
    
    
};