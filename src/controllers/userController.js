const fs = require ('fs');
const path = require ('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const rutaJSON = path.resolve('./src/database/users.json');
let datos = JSON.parse (fs.readFileSync(rutaJSON));

const Users = db.Userconst; 
const CategoriaUser = db.CategoriaUser;

// Leo el JSON de categoriasUser
const rutaCategoriaJSON = path.resolve('./src/database/categoriasUser.json');
let categorias = JSON.parse (fs.readFileSync(rutaCategoriaJSON));


const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");



module.exports = {
    login : (req, res) => {
        return res.render('./users/login')

    },
    processLogin : (req, res) => {
      const usuario = datos.find((row)=> row.correo == req.body.email)
      console.log("proceso de Login")
      console.log(usuario)
      console.log(req.body)
      if (usuario){
        console.log(req.body.contrasenia)
        console.log(usuario.contrasenia)
        if (bcrypt.compareSync(req.body.contrasenia, usuario.contrasenia)){
            delete usuario.contrasenia
            req.session.usuarioLogeado = usuario
            console.log('contraseña correcta')
//            console.log(usuario)
//            console.log(req.session)
            if (req.body.cookie) {
                console.log("se crea cookie recordame")
                res.cookie("recordame", usuario.correo, {maxAge: 1000*60*60})
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

    /*processRegister :(req, res) => {
    

        const user = {
            id: datos.length+1, 
            first_name: req.body.nombre,
            last_name: req.body.apellido,
            direccion: req.body.domicilio,
            cuil: req.body.cuit,
            fecha_nacimiento: req.body.nacimiento,
            correo: req.body.email,
            contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
            image: req.file ? req.file.filename : "avatar.png",
            categoria: "usuario",
            borrado: false
        }
        const rdoValidacion = validationResult(req);
        console.log("errores de validationResult");
//        console.log(rdoValidacion.errors);

        if(rdoValidacion.errors.length > 0) {
            return res.render('./users/registro', { errors: rdoValidacion.mapped(), oldData: req.body })
           // return res.redirect('/user/registro', { errors: rdoValidacion.mapped(), oldData: req.body })   
        }
//        console.log(user);
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), JSON.stringify([...datos, user], null, 2))
        return res.redirect('/')*/

        processRegister: async (req,res) => {
        const rdoValidacion = validationResult(req);
        console.log("errores de validationResult");
//        

        if(rdoValidacion.errors.length > 0) {
            return res.render('./users/registro', { errors: rdoValidacion.mapped(), oldData: req.body })
             
        }
            console.log('entraste por creacion de usuario')
            console.log(req.body.nombre)
            try {
            await Users.create(
                {
                    first_name: req.body.nombre,
                    last_name: req.body.apellido,
                    correo: req.body.email,
                    contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
                    image: req.file ? req.file.filename : "avatar.png",
                    cuil: req.body.cuit,
                    direccion: req.body.nacimiento,
                    fecha_nacimiento: req.body.nacimiento,
                    id_categoria_user: parseInt(2),
                    borrado: 0
                })
             
        } catch (error) {
            console.log(error);
        }
        res.redirect('/user/login') 
    },
                          

    perfil :(req, res) => {
        datos = JSON.parse (fs.readFileSync(rutaJSON));
        console.log("entraste a editar el usuario", req.session.usuarioLogeado.id);
//        const userId = datos.find (elemento => elemento.id == req.session.usuarioLogeado.id);
      console.log(req.session.usuarioLogeado)  
        return res.render('./users/perfil', {
            usuario: req.session.usuarioLogeado
        }); 
    },
    
    logout :(req, res) => {
        req.session.destroy();
        res.clearCookie('recordame');
        datos = JSON.parse (fs.readFileSync(rutaJSON));     
        return res.redirect('/');
    },

    editarPerfil: (req, res)=> {
        console.log("entraste a modificar el perfil" , req.session.usuarioLogeado.id);
        datos = JSON.parse (fs.readFileSync(rutaJSON));
        const userId = datos.find (elemento => elemento.id == req.session.usuarioLogeado.id);
        let oldContrasenia = userId.contrasenia;
        let oldImagen = userId.imagen;
        let nuevaImg= req.file ? req.file.filename : oldImagen;
        userId.imagen = nuevaImg;
        for (let propiedad in req.body) {
            if (propiedad == "id") {
                userId[propiedad] = Number(req.body[propiedad]);
            } else if (propiedad == "guardar") {
            } else if (propiedad == "confirm-contrasenia") {
            }             
            else if (propiedad == "contrasenia") {
                if (req.body[propiedad] != "") {
                    userId.contrasenia = bcrypt.hashSync(req.body.contrasenia, 10);
                } else {
                    userId.contrasenia = oldContrasenia;
                }                 
            } else {
            userId[propiedad] = req.body[propiedad];
            }
        }
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'),JSON.stringify(datos, null , 2));
        return res.redirect('/');
    },

    eliminarPerfil: (req, res) => {
        console.log("entraste a eliminar el perfil" , req.params.id);
        const pefilEliminado = datos.find (elemento => elemento.id == req.params.id);
        pefilEliminado.borrado = true;
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'),JSON.stringify(datos, null , 2));
        req.session.destroy();
        res.clearCookie('recordame');
        datos = JSON.parse (fs.readFileSync(rutaJSON));
        return res.redirect('/');
    },    
      

    categorias : async (req, res) => {
        console.log("Entró por creacion de categorias de usuarios");
        const nameCategorias = await CategoriaUser.findAll();
        console.log(nameCategorias);
        return res.render('./users/categoriausers', {nameCategorias : nameCategorias , categoriaEdit : "vacio"});     



    //        return res.render('./users/categorias')
            
    },

//    processCategoria :(req, res) => {
//        const categoria = {
//            id: categorias.length+1, 
//            categoria: req.body.tipo,
//            borrado: false
//        }
//        const rdoValidacion = validationResult(req);
//        console.log("errores de validationResult");
//        console.log(rdoValidacion.errors);
//
//        if(rdoValidacion.errors.length > 0) {
//            return res.render('./users/categorias', { errors: rdoValidacion.mapped(), oldData: req.body })
           // return res.redirect('/user/registro', { errors: rdoValidacion.mapped(), oldData: req.body })   
//        }
//        console.log(categoria);
//        fs.writeFileSync(path.resolve(__dirname, '../database/categoriasUser.json'), JSON.stringify([...categorias, //categoria], null, 2))
//        return res.redirect('/')
//    },

    processCategoriasUser: async (req,res) => {
        console.log("entraste por creacion de categoria usuario");
        console.log(req.body.tipo)
       
       try {
            await CategoriaUser.create({
               'categoria': req.body.tipo,
               'borrado': 0
           })
        }                     
        catch (error) {
            console.log(error)
        }
        console.log(req.body.tipo)
        return res.redirect('/product/tablasadmin');

   }, 

   editCategoriasUser: async (req, res) => {
       console.log("entraste por edicion de Categoria");
       console.log(req.body.categoria);
       if(req.body.categoria){
       let categoriaId = parseInt(req.body.categoria);
       let categoriaEditar = await CategoriaUser.findByPk(categoriaId);
       let categoriaEdit = categoriaEditar.dataValues
   //    console.log(categoriaEdit)
       return res.render('./users/categoriausers' , {categoriaEdit})
       } else {
           const nameCategorias = await CategoriaUser.findAll();
           return res.render('./users/categoriausers' , {nameCategorias : nameCategorias , categoriaEdit : "vacio"});
       }
   },

   updateCategoriasUser:async (req , res) => {
    console.log("entraste por modificacion de categoria de usuarios");
    //    console.log(req.body);
        try {
            await CategoriaUser.update({
                'categoria': req.body.tipo,
                'borrado': 0
            },
            {
                where: {id: req.params.id}
            }
            );
        } catch (error) {
            console.log(error)
        }
        return res.redirect('/product/tablasadmin');

   },

   deleteCategoriaUser:  async (req , res) => {
       console.log("entraste por vista delete de categoría de usuario");
   //    console.log(req.params.id)
       try {
           const categoriaEdit = await CategoriaUser.findByPk(req.params.id)
   //        console.log(categoriaEdit.dataValues);
           return res.render('./users/categoriasDelete' , {categoriaEdit : categoriaEdit.dataValues })
       } catch (error) {
           console.log(error)
       }
   },

   destroyCategoriaUser: async (req , res) => {
       console.log("entraste por borrado lógico de categoría de usuario");
   //    console.log(req.params.id);
       try {
           const categoriaEliminada = await CategoriaUser.destroy ({
               where: {id: req.params.id}
           })
   //        console.log(categoriaEliminada);
           return res.redirect('/product/tablasadmin');
       } catch (error) {
           console.log(error)
       }
   }



}