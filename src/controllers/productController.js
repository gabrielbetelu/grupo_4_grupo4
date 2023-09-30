const path = require ('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');
//const {Op} = require('sequelize')
//const Op = sequelize.Op
const { validationResult } = require("express-validator");


const Products = db.Product;
const ProductTalleColor = db.ProductTalleColor;
const Marca = db.Marca;
const Talles = db.Talle;
const Colores = db.Color;
const Fotos = db.Foto;
const CategoriasProduct = db.CategoriaProduct;
const CategoriaProducto = db.CategoriaProducto;
const Categorias = db.CategoriaProduct;


module.exports = {
    carrito:(req, res) => {
            return res.render('./products/carrito')        
    },

//    procesoCompra:(req, res) => {


//        return res.render('./products/carrito')        
//    },    

    producto : async (req, res) => {
        console.log("entraste a producto" , req.params.id);
        try {
            const productoBuscado = await Products.findByPk ( req.params.id ,{ 
                include: [{
                model: CategoriasProduct,
                as: 'categoriasproductos',
                attributes: ['id']
                } , {
                    model: Fotos,
                    as: 'productoFoto',
                    attributes: ['id']
                }]
                }
            )
            let idProductoBuscado = parseInt(req.params.id)
            const imagenesProducto = await Fotos.findAll(
                {
                where:{id_producto:idProductoBuscado}
            })
               
            return res.render('./products/producto' , {prod : productoBuscado , foto : imagenesProducto} )
            
        } catch (error) {
            console.log(error)
        }

        
        
    },

    productos : async (req, res) => {
        console.log("entraste a productos" );
        try {
            const productos = await Products.findAll(
                {include: [
                    {association: 'productoFoto'}
                ]
            });
            const productitoCat= await Categorias.findAll({include: [{association:'productos'}]});
            console.log(productos)
            console.log("****** Productos Categoria  ***********************************")
        //    console.log(productitoCat[0].categoria)
        //    console.log(productitoCat[0].productos)
            for (i = 0 ; i < productitoCat.length ; i++ ) {
                console.log("********** Productito ", productitoCat[i].categoria ,  "*************")
                for (j = 0 ; j < productitoCat[i].productos.length ; j++){
                    for (k = 0 ; k < productos.length ; k++){
                        if(productos[k].id == productitoCat[i].productos[j].id){
                            productitoCat[i].productos[j].productoFoto = productos[k].productoFoto
                        }
                    }
                //    console.log(productos[0])
                    
                }
            }
    
            return res.render('./products/productos' , {prod : productitoCat})
        //    return res.render('./products/productos' , {prod : productos})  
            
        } catch (error) {
            console.log(error)
        }
    },

    abrigos : async (req, res) => {
        console.log("entraste a productos" );
        try {
            const productos = await Products.findAll(
                {include: [
                    {association: 'productoFoto'}
                ]
            });
            const productitoCat= await Categorias.findAll({
                where : { categoria : "Abrigos"},
                include: [{association:'productos'}]
            });
                for (i = 0 ; i < productitoCat.length ; i++ ) {
                    console.log("********** Productito ", productitoCat[i].categoria ,  "*************")
                    for (j = 0 ; j < productitoCat[i].productos.length ; j++){
                        for (k = 0 ; k < productos.length ; k++){
                            if(productos[k].id == productitoCat[i].productos[j].id){
                                productitoCat[i].productos[j].productoFoto = productos[k].productoFoto
                            }
                        }
                //        console.log(productitoCat[i].productos[j])
                        }
                    return res.render('./products/productos' , {prod : productitoCat})
                    }
            } catch (error) {
                console.log(error)
        }
    },
    
    pantalones : async (req, res) => {
        console.log("entraste a productos" );
        try {
            const productos = await Products.findAll(
                {include: [
                    {association: 'productoFoto'}
                ]
            });
            const productitoCat= await Categorias.findAll({
                where : { categoria : "Pantalones"},
                include: [{association:'productos'}]
            });
                for (i = 0 ; i < productitoCat.length ; i++ ) {
                    console.log("********** Productito ", productitoCat[i].categoria ,  "*************")
                    for (j = 0 ; j < productitoCat[i].productos.length ; j++){
                        for (k = 0 ; k < productos.length ; k++){
                            if(productos[k].id == productitoCat[i].productos[j].id){
                                productitoCat[i].productos[j].productoFoto = productos[k].productoFoto
                            }
                        }
                //        console.log(productitoCat[i].productos[j])
                        }
                    return res.render('./products/productos' , {prod : productitoCat})
                    }
            } catch (error) {
                console.log(error)
        }
    },

    calzado : async (req, res) => {
        console.log("entraste a productos" );
        try {
            const productos = await Products.findAll(
                {include: [
                    {association: 'productoFoto'}
                ]
            });
            const productitoCat= await Categorias.findAll({
                where : { categoria : "Calzado"},
                include: [{association:'productos'}]
            });
                for (i = 0 ; i < productitoCat.length ; i++ ) {
                    console.log("********** Productito ", productitoCat[i].categoria ,  "*************")
                    for (j = 0 ; j < productitoCat[i].productos.length ; j++){
                        for (k = 0 ; k < productos.length ; k++){
                            if(productos[k].id == productitoCat[i].productos[j].id){
                                productitoCat[i].productos[j].productoFoto = productos[k].productoFoto
                            }
                        }
                //        console.log(productitoCat[i].productos[j])
                        }
                    return res.render('./products/productos' , {prod : productitoCat})
                    }
            } catch (error) {
                console.log(error)
        }
    },

    camping : async (req, res) => {
        console.log("entraste a productos" );
        try {
            const productos = await Products.findAll(
                {include: [
                    {association: 'productoFoto'}
                ]
            });
            const productitoCat= await Categorias.findAll({
                where : { categoria : "Camping"},
                include: [{association:'productos'}]
            });
                for (i = 0 ; i < productitoCat.length ; i++ ) {
                    console.log("********** Productito ", productitoCat[i].categoria ,  "*************")
                    for (j = 0 ; j < productitoCat[i].productos.length ; j++){
                        for (k = 0 ; k < productos.length ; k++){
                            if(productos[k].id == productitoCat[i].productos[j].id){
                                productitoCat[i].productos[j].productoFoto = productos[k].productoFoto
                            }
                        }
                //        console.log(productitoCat[i].productos[j])
                        }
                    return res.render('./products/productos' , {prod : productitoCat})
                    }
            } catch (error) {
                console.log(error)
        }
    },
    
    mochilas : async (req, res) => {
        console.log("entraste a productos" );
        try {
            const productos = await Products.findAll(
                {include: [
                    {association: 'productoFoto'}
                ]
            });
            const productitoCat= await Categorias.findAll({
                where : { categoria : "Mochilas"},
                include: [{association:'productos'}]
            });
                for (i = 0 ; i < productitoCat.length ; i++ ) {
                    console.log("********** Productito ", productitoCat[i].categoria ,  "*************")
                    for (j = 0 ; j < productitoCat[i].productos.length ; j++){
                        for (k = 0 ; k < productos.length ; k++){
                            if(productos[k].id == productitoCat[i].productos[j].id){
                                productitoCat[i].productos[j].productoFoto = productos[k].productoFoto
                            }
                        }
                //        console.log(productitoCat[i].productos[j])
                        }
                    return res.render('./products/productos' , {prod : productitoCat})
                    }
            } catch (error) {
                console.log(error)
        }
    },

    accesorios : async (req, res) => {
        console.log("entraste a productos" );
        try {
            const productos = await Products.findAll(
                {include: [
                    {association: 'productoFoto'}
                ]
            });
            const productitoCat= await Categorias.findAll({
                where : { categoria : "Accesorios"},
                include: [{association:'productos'}]
            });
                for (i = 0 ; i < productitoCat.length ; i++ ) {
                    console.log("********** Productito ", productitoCat[i].categoria ,  "*************")
                    for (j = 0 ; j < productitoCat[i].productos.length ; j++){
                        for (k = 0 ; k < productos.length ; k++){
                            if(productos[k].id == productitoCat[i].productos[j].id){
                                productitoCat[i].productos[j].productoFoto = productos[k].productoFoto
                            }
                        }
                //        console.log(productitoCat[i].productos[j])
                        }
                    return res.render('./products/productos' , {prod : productitoCat})
                    }
            } catch (error) {
                console.log(error)
        }
    },

    mujer : async (req, res) => {
        console.log("entraste a productos" );
        try {
            const productos = await Products.findAll(
                {include: [
                    {association: 'productoFoto'}
                ]
            });
            const productitoCat= await Categorias.findAll({
                where : { categoria : "Mujer"},
                include: [{association:'productos'}]
            });
                for (i = 0 ; i < productitoCat.length ; i++ ) {
                    console.log("********** Productito ", productitoCat[i].categoria ,  "*************")
                    for (j = 0 ; j < productitoCat[i].productos.length ; j++){
                        for (k = 0 ; k < productos.length ; k++){
                            if(productos[k].id == productitoCat[i].productos[j].id){
                                productitoCat[i].productos[j].productoFoto = productos[k].productoFoto
                            }
                        }
                //        console.log(productitoCat[i].productos[j])
                        }
                    return res.render('./products/productos' , {prod : productitoCat})
                    }
            } catch (error) {
                console.log(error)
        }
    },
    
    hombre : async (req, res) => {
        console.log("entraste a productos" );
        try {
            const productos = await Products.findAll(
                {include: [
                    {association: 'productoFoto'}
                ]
            });
            const productitoCat= await Categorias.findAll({
                where : { categoria : "Hombre"},
                include: [{association:'productos'}]
            });
                for (i = 0 ; i < productitoCat.length ; i++ ) {
                    console.log("********** Productito ", productitoCat[i].categoria ,  "*************")
                    for (j = 0 ; j < productitoCat[i].productos.length ; j++){
                        for (k = 0 ; k < productos.length ; k++){
                            if(productos[k].id == productitoCat[i].productos[j].id){
                                productitoCat[i].productos[j].productoFoto = productos[k].productoFoto
                            }
                        }
                //        console.log(productitoCat[i].productos[j])
                        }
                    return res.render('./products/productos' , {prod : productitoCat})
                    }
            } catch (error) {
                console.log(error)
        }
    },

    ninios : async (req, res) => {
        console.log("entraste a productos" );
        try {
            const productos = await Products.findAll(
                {include: [
                    {association: 'productoFoto'}
                ]
            });
            const productitoCat= await Categorias.findAll({
                where : { categoria : "Niño"},
                include: [{association:'productos'}]
            });
                for (i = 0 ; i < productitoCat.length ; i++ ) {
                    console.log("********** Productito ", productitoCat[i].categoria ,  "*************")
                    for (j = 0 ; j < productitoCat[i].productos.length ; j++){
                        for (k = 0 ; k < productos.length ; k++){
                            if(productos[k].id == productitoCat[i].productos[j].id){
                                productitoCat[i].productos[j].productoFoto = productos[k].productoFoto
                            }
                        }
                //        console.log(productitoCat[i].productos[j])
                        }
                    return res.render('./products/productos' , {prod : productitoCat})
                    }
            } catch (error) {
                console.log(error)
        }
    },

    edicion: async (req, res) => {
        console.log("Entró por edicion")    
        return res.render('./products/edicion');           
    },

    buscar: async (req, res) => {
        console.log("Entró por buscador");
        
        try {
            const productosBuscados = await Products.findAll({
                where: {
                    nombre_producto: {
                        [Op.like]: '%' + req.body.texto + '%'}}
            });
            return res.render('./products/edicionbuscar', {nameProducts: productosBuscados , prod : "vacio"});  
        } catch (error) {
            console.log(error)
        }       
    },            

    creacion: async (req, res) => {
        console.log("Entró por creacion")
        try {
            const nameCategorias = await CategoriasProduct.findAll();
            const nameMarcas = await Marca.findAll();
            return res.render('./products/creacion', {nameCategorias : nameCategorias , nameMarcas : nameMarcas}); 
        } catch (error) {
            console.log(error)
        }    
    },
        processCreate: async (req, res) => {
            const rdoValidacion = validationResult(req);
            if(rdoValidacion.errors.length > 0) {
                const nameCategorias = await CategoriasProduct.findAll();
                const nameMarcas = await Marca.findAll();
                return res.render('./products/creacion', { errors: rdoValidacion.mapped(), oldData: req.body, nameCategorias : nameCategorias , nameMarcas : nameMarcas })
            }

            console.log("entraste por creacion de item");
            if (req.files.length > 0) {
                let arrayFotos = [];
                for (let i = 0 ; i < req.files.length ; i++) {
                        arrayFotos.push({imagen_producto: "/images/"+req.files[i].filename});
                    }  
                try {
                    const newProducts = await Products.create(
                    {
                        nombre_producto: req.body.nombre,
                        detalle: req.body.descripcion,
                        precio_producto: req.body.precio,
                        id_marca: parseInt(req.body.marca),
                        borrado: false,
                    },
                    {
                        include: [{ association: "productoFoto" }], 
                    }
                    )
                    for (let i = 0 ; i < arrayFotos.length ; i++) {
                        await newProducts.createProductoFoto(arrayFotos[i]);
                    }      

                    for (let i = 0; i < req.body.categoria.length; i++) {
                            await CategoriaProducto.create({
                            id_product: newProducts.id, 
                            id_categoriaproduct: req.body.categoria[i]
                        })
                    }
                } catch (error) {
                    console.log(error)
                }       
                const nameCategorias = await CategoriasProduct.findAll();
                const nameMarcas = await Marca.findAll();
                console.log("Pasa a la vista de creación")
                return res.render('./products/creacion', {nameCategorias : nameCategorias , nameMarcas : nameMarcas});   
            }
        },   

    editId: async(req , res)=> {
        console.log("entraste a buscar el item" , req.body.idProducto);
        if (!req.body.idProducto) {
            return res.render('./products/edicion');
        } 
        try {            
            const productoBuscado = await Products.findByPk ( req.body.idProducto ,{ 
                    include: [{
                    model: CategoriasProduct,
                    as: 'categoriasproductos',
                    attributes: ['id']
                    }]
                }
            )
            const nameCategorias = await CategoriasProduct.findAll();
            const nameMarcas = await Marca.findAll();
            let arrayImages = [];
            let idProductoBuscado = parseInt(req.body.idProducto)
            const imagenesProducto = await Fotos.findAll(
                {
                where:{id_producto:idProductoBuscado}
            }
            );
            for ( let i = 0 ; i < imagenesProducto.length ; i++) {
                arrayImages.push((imagenesProducto[i].imagen_producto))
            }
            return res.render('./products/edicionproducto', {prod: productoBuscado , nameCategorias : nameCategorias , nameMarcas : nameMarcas , arrayImages : arrayImages})
        } catch (error) {
            console.log(error)
        }
    },

    processModificar: async (req , res)=> {
        const rdoValidacion = validationResult(req);
        console.log("entraste a modificar el item" , req.body.id);    
        let arrayImg = [];
        if(rdoValidacion.errors.length > 0) {
            const nameCategorias = await CategoriasProduct.findAll();
            const nameMarcas = await Marca.findAll();
            const productoBuscado = await Products.findByPk ( req.body.id ,{ 
                include: [{
                model: CategoriasProduct,
                as: 'categoriasproductos',
                attributes: ['id']
                }]
            })
            let arrayImages = [];

            let idProductoBuscado = parseInt(req.body.id)
            const imagenesProducto = await Fotos.findAll(
                {
                where:{id_producto:idProductoBuscado}
            }
            );
            for ( let i = 0 ; i < imagenesProducto.length ; i++) {
                arrayImages.push((imagenesProducto[i].imagen_producto))
            }
            return res.render('./products/edicionproducto', { errors: rdoValidacion.mapped(), prod: productoBuscado ,oldData: req.body, nameCategorias : nameCategorias , nameMarcas : nameMarcas , arrayImages : arrayImages})
        }
     
        try {
            const productoModificado = await Products.findByPk (req.body.id);
            if (req.files.length > 0){
                try {
                    const fotosProductoOld = await Fotos.findAll({
                        where : {id_producto: req.body.id }

                    })  
                    if ( fotosProductoOld.length > 0) {
                        await Fotos.destroy ({
                            where: {id_producto: req.body.id}
                            })
                        console.log("Borró registro/s")
                    }
                    
                    } catch (error) {
                        console.log(error)  
                }
                
            }

                try {
                    for (let i = 0 ; i < req.files.length ; i++) {
                        await Fotos.create({
                            imagen_producto: "/images/"+req.files[i].filename,
                            id_producto:parseInt(req.body.id)
                        })
                    }                    
                } catch (error) {
                    console.log(error)
                }

            await Products.update({
                'nombre_producto': req.body.nombre,
                'detalle': req.body.descripcion,
                'precio_producto': req.body.precio,
                'id_marca': req.body.marca
            },{
             where: {
                    id: req.body.id
                }
            })
    
            const relacionesGuardadas = await CategoriaProducto.findAll()
        
            for (let i = 0; i < relacionesGuardadas.length; i++) {
                let relacionEncontrada = 0;
                
                for (let j = 0 ; j < req.body.categoria.length; j++) {
                    if (req.body.id == relacionesGuardadas[i].id_product && req.body.categoria[j] == relacionesGuardadas[i].id_categoriaproduct){
                 
                        indice = j;
                        relacionEncontrada = 1;
                    }
                }
                if (relacionEncontrada == 0 && req.body.id == relacionesGuardadas[i].id_product){
        
                    await CategoriaProducto.destroy({
                        where: {id: relacionesGuardadas[i].id}
                    })
                }
            }   

            for (let i = 0; i < req.body.categoria.length; i++) {
        
            let relacionEncontrada = 0;
                for (let j = 0 ; j < relacionesGuardadas.length; j++) {  
              
                    if (req.body.id == relacionesGuardadas[j].id_product && req.body.categoria[i] == relacionesGuardadas[j].id_categoriaproduct){
    
                        relacionEncontrada = 1;                        
                    }
                }
       
                if (relacionEncontrada == 0){
                        await CategoriaProducto.create({
                        id_product: req.body.id, 
                        id_categoriaproduct: req.body.categoria[i]
                    })
                }
            } 
            
        } catch (error) {
            console.log(error)
        }   
           
        return res.render('products/edicion' , {prod : "vacio"})
    },

    eliminar:  async (req , res) => {
        console.log("entraste por vista delete de producto");
   
        try {
            const productoEliminar = await Products.findByPk(req.params.id)
            console.log(productoEliminar.dataValues);
            return res.render('./products/edicionDelete' , {prod : productoEliminar.dataValues })
        } catch (error) {
            console.log(error)
        }
    },

    destroy: async (req , res)=> {
        console.log("entraste a eliminar el item" , req.params.id);
        try {
            const productoEliminado = await Products.destroy ({
                where: {id: req.params.id}
            })
            return res.render('./products/edicion', {prod: "vacio"})
        } catch (error) {
            console.log(error)
        }
   
    },

    tablas: (req, res) => {
        console.log("Entró por creacion de tablas")
        return res.render('./products/tablaAdmin')
    },

    categorias: async (req, res) => {
        console.log("Entró por creacion de categorias");
        const nameCategorias = await CategoriasProduct.findAll();
        return res.render('./products/categorias', {nameCategorias : nameCategorias , categoriaEdit : "vacio"});         
    },
           
     processCategorias:async(req,res)=>{
             console.log("entraste por proceso de creacion de categoria");
              
            try {
                await CategoriasProduct.create({
                    
                    categoria: req.body.categoria,
                    borrado: 0
                    
                })
                                   
            } catch (error) {
               console.log(error)
            }
             return res.redirect('/product/tablasadmin');
    
        }, 

    editCategorias: async (req, res) => {
        console.log("entraste por edicion de Categoria");  

        if(req.body.categoria){
        let categoriaId = parseInt(req.body.categoria);
        let categoriaEditar = await CategoriasProduct.findByPk(categoriaId);
        let categoriaEdit = categoriaEditar.dataValues
    
        return res.render('./products/categorias' , {categoriaEdit})
        } else {
            const nameCategorias = await CategoriasProduct.findAll();
            return res.render('./products/categorias' , {nameCategorias : nameCategorias , categoriaEdit : "vacio"});
        }

    },

    updateCategorias: async (req, res) =>{
        console.log("entraste por modificacion de categoria");
   
        try {
            await CategoriasProduct.update({
                'categoria': req.body.categoria,
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

    deleteCategoria:  async (req , res) => {
        console.log("entraste por vista delete de categoría");
    
        try {
            const categoriaEdit = await CategoriasProduct.findByPk(req.params.id)
    
            return res.render('./products/categoriasDelete' , {categoriaEdit : categoriaEdit.dataValues })
        } catch (error) {
            console.log(error)
        }
    },

    destroyCategoria: async (req , res) => {
        console.log("entraste por borrado lógico de categoría");
   
        try {
             await CategoriasProduct.destroy ({
                where: {id: req.params.id}
            })

            return res.redirect('/product/tablasadmin');
        } catch (error) {
            console.log(error)
        }
    },




    marcas: async (req, res) => {
        console.log("Entró por edición de marcas")
        const nameMarcas = await Marca.findAll();
   
        return res.render('./products/marcas' , {nameMarcas : nameMarcas , marcaEdit : "vacio"});
         
    },
    processMarcas: async (req, res) => {
        console.log("entraste por creacion de marca");
        console.log(req.body.marca);
        try {
            await Marca.create({
                'nombre': req.body.marca,
                'borrado': 0
            });
        } catch (error) {
            console.log(error)
        }
        return res.redirect('/product/tablasadmin');
    },

    editMarcas: async (req, res) => {
        console.log("entraste por edicion de marca");
    
        if(req.body.marca){
        let marcaId = parseInt(req.body.marca);
        let marcaEditar = await Marca.findByPk(marcaId);
        let marcaEdit = marcaEditar.dataValues
    
        return res.render('./products/marcas' , {marcaEdit})
        } else {
            const nameMarcas = await db.Marca.findAll();
            return res.render('./products/marcas' , {nameMarcas : nameMarcas , marcaEdit : "vacio"});
        }
    },

    updateMarcas: async (req, res) => {
        console.log("entraste por modificacion de marca");
        console.log(req.body.marca);
        try {
            await Marca.update({
                'nombre': req.body.marca,
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

    deleteMarca:  async (req , res) => {
        console.log("entraste por vista delete de marca");
        try {
            const marcaEdit = await Marca.findByPk(req.params.id)
   
            return res.render('./products/marcasDelete' , {marcaEdit : marcaEdit.dataValues })
        } catch (error) {
            console.log(error)
        }
    },

    destroyMarca: async (req , res) => {
        console.log("entraste por borrado lógico de marca");
        console.log(req.params.id);
        try {
            const marcaEliminada = await Marca.destroy ({
                where: {id: req.params.id}
            })
            console.log(marcaEliminada);
            return res.redirect('/product/tablasadmin');
        } catch (error) {
            console.log(error)
        }
    },


    talles: async (req, res) => {
        console.log("Entró por creacion de talles");
        const nameTalles = await Talles.findAll();
        return res.render('./products/talles', {nameTalles : nameTalles , categoriaEdit : "vacio"});   
   

         
    },
    processTalles: async (req, res) => {

        console.log("entraste por creacion de talles");

        try {
            await Talles.create({
                'nombre': req.body.talle,
                'descripcion': req.body.detalle,
                'borrado': 0
            })
        } catch (error) {
            console.log(error)
        }
        console.log(req.body.talle)
        return res.redirect('/product/tablasadmin');

           },

    editTalles: async (req, res) => {
        console.log("entraste por edicion de Talle");
            console.log(req.body.talle);
            if(req.body.talle){
            let talleId = parseInt(req.body.talle);
            let talleEditar = await Talles.findByPk(talleId);
            let talleEdit = talleEditar.dataValues
            console.log(talleEdit)
            return res.render('./products/talles' , {categoriaEdit : talleEdit})
            } else {
                const nameTalles = await Talles.findAll();
                return res.render('./products/talles', {nameTalles : nameTalles , categoriaEdit : "vacio"}); 
               
            }

    },

    updateTalles: async (req, res) => {
        console.log("entraste por modificacion de talles");
        try {
            await Talles.update({
                'nombre': req.body.talle,
                'descripcion': req.body.detalle,
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

    deleteTalle: async (req, res) => {
        console.log("entraste por vista delete de talle");
            try {
                const talleEdit = await Talles.findByPk(req.params.id)
       
                return res.render('./products/tallesDelete' , {categoriaEdit : talleEdit.dataValues })
            } catch (error) {
                console.log(error)
            }
    },


    destroyTalle: async (req, res) => {
        console.log("entraste por borrado lógico de talle");
    
        try {
             await Talles.destroy ({
                where: {id: req.params.id}
            })
    
            return res.redirect('/product/tablasadmin');
        } catch (error) {
            console.log(error)
        }
    },


    colores: async (req, res) => {
        console.log("Entró por creacion de colores");
        const nameColores = await Colores.findAll();
        return res.render('./products/colores', {nameColores : nameColores , categoriaEdit : "vacio"});  
             
    },    
    
    
    processColores: async (req, res) => {
        console.log("entraste por creacion de color");
        console.log(req.body.color)
        console.log(req.body.detalle)
        try {
            await Colores.create({
                'nombre': req.body.color,
                'descripcion': req.body.detalle,
                'borrado': 0
            })
        }
        catch (error) {
            console.log(error)
        }
        console.log(req.body.color)
        return res.redirect('/product/tablasadmin');
    },

    editColores: async (req, res) => {
        console.log("entraste por edicion de Color");
            console.log(req.body.color);
            if(req.body.color){
            let colorId = parseInt(req.body.color);
            let colorEditar = await Colores.findByPk(colorId);
            let colorEdit = colorEditar.dataValues
            console.log(colorEdit)
            return res.render('./products/colores' , {categoriaEdit : colorEdit})
            } else {
                const nameColores = await Colores.findAll();
            return res.render('./products/colores', {nameColores : nameColores , categoriaEdit : "vacio"});  
               
            }

    },

    updateColores: async (req, res) => {
        console.log("entraste por modificacion de colores");
        console.log(req.body.color);
        try {
            await Colores.update({
                'nombre': req.body.color,
                'descripcion': req.body.detalle,
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

    deleteColor: async (req, res) => {
        console.log("entraste por vista delete de color");
        
            try {
                const colorEdit = await Colores.findByPk(req.params.id)
        
                return res.render('./products/coloresDelete' , {categoriaEdit : colorEdit.dataValues })
            } catch (error) {
                console.log(error)
            }
    },


    destroyColor: async (req, res) => {
        console.log("entraste por borrado lógico de color");
    
        try {
            const colorEliminado = await Colores.destroy ({
                where: {id: req.params.id}
            })
    
            return res.redirect('/product/tablasadmin');
        } catch (error) {
            console.log(error)
        }
    },
    stock: async(req,res) => {
        console.log("Entró por ingreso por vista de stock de producto");
        const nameTalles = await Talles.findAll();
        const nameColores = await Colores.findAll();
        const nameProducts = await Products.findAll();
        return res.render('./products/stock', {nameTalles : nameTalles , nameColores: nameColores, nameProducts: nameProducts  }); 
    },
    processStock : async(req,res) => {
        console.log("entraste a proceso de carga de stock");
        
        try {
        
        await ProductTalleColor.create({
                'id_product': req.body.productoId,
                'id_talle': req.body.talleId,
                'id_color': req.body.colorId,
                'stock': req.body.cantidad
            })
        }
        catch (error) {
            console.log(error)
        }
       
        return res.redirect('/product/tablasadmin');
    }


    

}
