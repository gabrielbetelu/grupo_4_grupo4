const path = require ('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const Users = db.User; 
const CategoriaUser = db.CategoriaUser;


module.exports = {
    login : (req, res) => {
        console.log("Entraste al Login")
        return res.render('./users/login')

    },
    processLogin : async (req, res) => {
        console.log("Entraste al processLogin")
        try {
            console.log(req.body.email)
            const usuario = await Users.findOne({
                where: {
                    correo: req.body.email
                }
            })        
    
          console.log("proceso de Login")
    
          console.log(req.body)
          if (usuario){
            console.log(req.body.contrasenia)
            console.log(usuario.contrasenia)
            if (bcrypt.compareSync(req.body.contrasenia, usuario.contrasenia)){
                delete usuario.contrasenia
                req.session.usuarioLogeado = usuario
                console.log('contraseña correcta')
   
                if (req.body.cookie) {
                    console.log("se crea cookie recordame")
                    res.cookie("recordame", usuario.correo, {maxAge: 1000*60*60})
                   
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
            
        } catch (error) {
            console.log(error)
            
        }

    },    
      
    registro :(req, res) => {
        console.log("Entraste al Registro de usuario")
        return res.render('./users/registro')
            
    },

    processRegister: async (req,res) => {
        const rdoValidacion = validationResult(req);
        console.log("errores de validationResult");
        

        if(rdoValidacion.errors.length > 0) {
            console.log('no se registra usuario errorrr')
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

    perfil :async (req, res) => {
        try {
        
        console.log("entraste a editar el usuario", req.session.usuarioLogeado.id);
         
                return res.render('./users/perfil', {
                    usuario: req.session.usuarioLogeado
                });
            
        } catch (error) {
            console.log(error)
            
        } 
    },
    
    logout :(req, res) => {
        req.session.destroy();
        res.clearCookie('recordame');    
        return res.redirect('/');
    },

    editarPerfil: async (req, res)=> {
        const rdoValidacion = validationResult(req);
        const erroresValidacion = rdoValidacion.errors
        console.log("errores de validationResult");
        console.log(erroresValidacion)
        for (let i = 0 ; i < erroresValidacion.length ; i++) {
            console.log(erroresValidacion[i].path)
            if (erroresValidacion[i].path == 'image' && erroresValidacion[i].value == undefined){
                erroresValidacion.splice(i , 1)
            }
        }
        for (let i = 0 ; i < erroresValidacion.length ; i++) {
            console.log(erroresValidacion[i].path)
            
            if (erroresValidacion[i].path == 'contrasenia' && erroresValidacion[i].value == ""){
                erroresValidacion.splice(i , 1)
            }
        }
        for (let i = 0 ; i < erroresValidacion.length ; i++) {
            console.log(erroresValidacion[i].path)
            
            if (erroresValidacion[i].path == 'contrasenia' && erroresValidacion[i].value == ""){
                erroresValidacion.splice(i , 1)
            }
        }
        for (let i = 0 ; i < erroresValidacion.length ; i++) {
            console.log(erroresValidacion[i].path)
            
            if (erroresValidacion[i].path == 'email' && erroresValidacion[i].value == req.session.usuarioLogeado.correo){
                erroresValidacion.splice(i , 1)
            }
        }
        if(rdoValidacion.errors.length > 0) { 
            
            console.log('Se registra usuario errorrr')
            return res.render('./users/perfil', { usuario: req.session.usuarioLogeado , errors: rdoValidacion.mapped(), oldData: req.body })
             
        }
        console.log("entraste a modificar el perfil" , req.session.usuarioLogeado.id);
        console.log("req.session.usuarioLogeado")
        console.log(req.session.usuarioLogeado)
        console.log(req.body.email)
        try {            
            const userId = await Users.findByPk ( req.session.usuarioLogeado.id)
            if(!userId){
                console.log('usuario no encontrado')
                return res.redirect('/')
            }

            let oldContrasenia = userId.contrasenia;
            console.log(oldContrasenia)
            let oldImagen = userId.image;
            let nuevaImg= req.file ? req.file.filename : oldImagen;
            let nuevaContrasenia = ""

            if (req.body.contrasenia != "") {
                nuevaContrasenia = bcrypt.hashSync(req.body.contrasenia, 10);
            } else {
                nuevaContrasenia = oldContrasenia;
            }
            console.log("Valores a actualizar")
            console.log(nuevaImg)
            console.log(req.body.nombre)
            console.log(req.body.apellido)
            console.log(req.body.email)
            console.log(req.body.cuit)
            console.log(req.body.domicilio)
            console.log(req.body.nacimiento)
            console.log(nuevaContrasenia)


            await Users.update({
                'image': nuevaImg,
                'first_name':req.body.nombre,
                'last_name': req.body.apellido,
                'correo': req.body.email,
                'cuil': req.body.cuit,
                'direccion': req.body.domicilio,
                'fecha_nacimiento': req.body.nacimiento,
                'contrasenia': nuevaContrasenia
            },{
            where: {
                id: userId.id
            }
            })
            req.session.usuarioLogeado = {
                'id': userId.id,
                'image': nuevaImg,
                'first_name':req.body.nombre,
                'last_name': req.body.apellido,
                'correo': req.body.email,
                'cuil': req.body.cuit,
                'direccion': req.body.domicilio,
                'fecha_nacimiento': req.body.nacimiento,
            }
            console.log(req.session.usuarioLogeado)
            return res.redirect('/');
                
            } catch (error) {
            console.log(error)   
            }
        //datos = JSON.parse (fs.readFileSync(rutaJSON));
        //const userId  datos.find (elemento => elemento.id == req.session.usuarioLogeado.id);
       // let oldContrasenia = userId.contrasenia;
        //console.log(oldContrasenia)
        //let oldImagen = userId.imagen;
       // let nuevaImg= req.file ? req.file.filename : oldImagen;
       // let nuevaContrasenia = ""
       /* if (req.body.contrasenia != "") {
            nuevaContrasenia = bcrypt.hashSync(req.body.contrasenia, 10);
        } else {
            nuevaContrasenia = oldContrasenia;*/
         /*              
        try {
            await Users.update({
                'image': nuevaImg,
                'first_name':req.body.nombre,
                'last_name': req.body.apellido,
                'correo': req.body.email,
                'cuil': req.body.cuit,
                'direccion': req.body.domicilio,
                'fecha_nacimiento': req.body.nacimiento,
                'contrasenia': nuevaContrasenia
            },{
            where: {
                id: userId.id
            }
            })
            req.session.usuarioLogeado = {
                'image': nuevaImg,
                'first_name':req.body.nombre,
                'last_name': req.body.apellido,
                'correo': req.body.email,
                'cuil': req.body.cuit,
                'direccion': req.body.domicilio,
                'fecha_nacimiento': req.body.nacimiento,
            }
            return res.redirect('/');
                
            } catch (error) {
            console.log(error)   
            }*/
    },

    eliminarPerfil: async (req, res) => {
        console.log("entraste a eliminar el perfil" , req.params.id);
        try {
            const perfilEliminado = await Users.findByPk(req.params.id);
            return res.render('./users/userDelete', {perfilEdit: perfilEliminado.dataValues}) 
                
            
            
        } catch (error) {
            console.log(error)    
        }
       
    },    
      
    destroyPerfil: async (req, res) => {
        console.log("entraste a eliminar el perfil" , req.params.id);
        try {
            req.session.destroy();
            res.clearCookie('recordame');
            await Users.destroy({
                where: {id: req.params.id}  
            })  
            return res.redirect('/');
        } catch (error) {
            console.log(error)
        }
        
    },

    categorias : async (req, res) => {
        console.log("Entró por creacion de categorias de usuarios");
        const nameCategorias = await CategoriaUser.findAll();
        console.log(nameCategorias);
        return res.render('./users/categoriausers', {nameCategorias : nameCategorias , categoriaEdit : "vacio"});     

            
    },

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

       return res.render('./users/categoriausers' , {categoriaEdit})
       } else {
           const nameCategorias = await CategoriaUser.findAll();
           return res.render('./users/categoriausers' , {nameCategorias : nameCategorias , categoriaEdit : "vacio"});
       }
   },

   updateCategoriasUser:async (req , res) => {
    console.log("entraste por modificacion de categoria de usuarios");
   
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
  
       try {
           const categoriaEdit = await CategoriaUser.findByPk(req.params.id)
  
           return res.render('./users/categoriasDelete' , {categoriaEdit : categoriaEdit.dataValues })
       } catch (error) {
           console.log(error)
       }
   },

   destroyCategoriaUser: async (req , res) => {
       console.log("entraste por borrado lógico de categoría de usuario");
   
       try {
           const categoriaEliminada = await CategoriaUser.destroy ({
               where: {id: req.params.id}
           })
   
           return res.redirect('/product/tablasadmin');
       } catch (error) {
           console.log(error)
       }
   }



}