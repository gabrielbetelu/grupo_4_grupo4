const fs = require ('fs');
const path = require ('path');
const rutaJSON = path.resolve('./src/database/users.json');
let datos = JSON.parse (fs.readFileSync(rutaJSON));
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");


module.exports = {
    login : (req, res) => {
        return res.render('./users/login')

    },
    processLogin : (req, res) => {
      const usuario = datos.find((row)=> row.email == req.body.email)
      console.log("proceso de Login")
//      console.log(usuario)
//      console.log(req.body)
      if (usuario){
//        console.log(req.body.contrasenia)
//        console.log(usuario.contrasenia)
        if (bcrypt.compareSync(req.body.contrasenia, usuario.contrasenia)){
            delete usuario.contrasenia
            req.session.usuarioLogeado = usuario
            console.log('contraseña correcta')
//            console.log(usuario)
//            console.log(req.session)
            if (req.body.cookie) {
                console.log("se crea cookie recordame")
                res.cookie("recordame", usuario.email, {maxAge: 1000*60*60})
               // return res.redirect('/')
            }
            return res.redirect('/')
            
        }else{
            console.log('error datos')
            return res.render('./users/login', {
                errors: {
                    datosMal: {
                        msg: "Datos Incorrectos"
                    }
                }
            })
        }
    }else{
        console.log("error mail")
        return res.render('./users/login', {
            errors: {
                datosMal: {
                    msg: "Datos Incorrectos"
                }
            }
        })
    }

        /*}else{
            console.log('sin datos')
            return res.redirect('login')
                
        } */

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
            imagen: req.file ? req.file.filename : "avatar.png",
            categoria: "usuario",
            borrado: false
        }
        const rdoValidacion = validationResult(req);
        console.log("errores de validationResult");
//        console.log(rdoValidacion.errors);

        if(rdoValidacion.errors.length > 0) {
            return res.render('./users/registro', { errors: rdoValidacion.mapped(), oldData: req.body })
        }
//        console.log(user);
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), JSON.stringify([...datos, user], null, 2))
        return res.redirect('/')
    },

    perfil :(req, res) => {
        console.log("entraste a editar el usuario", req.params.id);
        const userId = datos.find (elemento => elemento.id == req.params.id);
        
        return res.render('./users/perfil', {
            usuario: req.session.usuarioLogeado
        }); 
    },
    
    logout :(req, res) => {
        req.session.destroy();
        res.clearCookie('recordame');
//        console.log(req.session);
//        console.log(req.cookie);
        datos = JSON.parse (fs.readFileSync(rutaJSON));     
        return res.redirect('/');
    },

    editarPerfil: (req, res)=> {
        console.log("entraste a modificar el perfil" , req.body.id);
        const userId = datos.find (elemento => elemento.id == req.body.id);
        console.log(req.body);
        let arrayImg = [];
        let oldImagen = userId.imagen;
            if (req.files.length > 0) {
                req.files.forEach((file) => {
                    arrayImg.push("/images/" + file.filename);
            })
            } else {
                arrayImg = oldImagen;
            }
        userId.imagen = arrayImg;
        for (let propiedad in req.body) {
            if (propiedad == "id") {
                userId[propiedad] = Number(req.body[propiedad]);
            } else if (propiedad == "guardar") {
            } else {
            userId[propiedad] = req.body[propiedad];
            }
        }
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'),JSON.stringify(datos, null , 2));

        return res.render('/')
    }
};