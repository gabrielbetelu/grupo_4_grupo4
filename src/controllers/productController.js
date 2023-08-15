const fs = require ('fs');
const path = require ('path');
const db = require('../database/models');
const { log, Console } = require('console');
const { isNumberObject } = require('util/types');
const sequelize = db.sequelize;
const rutaJSON = path.resolve('./src/database/products.json');
const productos = JSON.parse (fs.readFileSync(rutaJSON));

const Products = db.Product;
const ProductTalleColor = db.ProductTalleColor;
const Marca = db.Marca;
const Talles = db.Talle;
const Colores = db.Color;
const CategoriasProduct = db.CategoriaProduct;
const CategoriaProducto = db.CategoriaProducto;



// Leo el JSON de categoriasProduct
const rutaCategoriasJSON = path.resolve('./src/database/categoriasProduct.json');
const categoriasProducts = JSON.parse (fs.readFileSync(rutaCategoriasJSON));

// Leo el JSON de marca
const rutaMarcaJSON = path.resolve('./src/database/marca.json');
const marcas = JSON.parse (fs.readFileSync(rutaMarcaJSON));

// Leo el JSON de talles
const rutaTallesJSON = path.resolve('./src/database/talles.json');
const talle = JSON.parse (fs.readFileSync(rutaTallesJSON));

// Leo el JSON de colores
const rutaColoresJSON = path.resolve('./src/database/colores.json');
const color = JSON.parse (fs.readFileSync(rutaColoresJSON));


module.exports = {
    carrito:(req, res) => {
            return res.render('./products/carrito')        
    },
    producto : (req, res) => {
        return res.render('./products/producto')
        
    },
    productos : (req, res) => {
        console.log("entraste a productos" );
        return res.render('./products/productos' , {prod : productos})
        
    },
    edicion: (req, res) => {
        console.log("Entró por edicion")
        return res.render('./products/edicion' , {prod : "vacio"})
        
    },
    creacion: async (req, res) => {
        console.log("Entró por creacion")
        const nameCategorias = await CategoriasProduct.findAll();
        return res.render('./products/creacion', {nameCategorias : nameCategorias});         
         
    },
    /*processCreate: (req, res) => {
        console.log("entraste por creacion de item");
        let arrayImg = [];
        if (req.files.length > 0) {
            req.files.forEach((file) => {
                arrayImg.push("/images/" + file.filename);                        
        })
        }
        let productoNuevo = { 
            'id': products.length +1, 
            'nombre_producto': req.body.nombre,
            'detalle': req.body.descripcion,
            'imagenes_producto': arrayImg,
            'categoria': req.body.categoria,
            'precio_producto': req.body.precio,
            'borrado': false
        }
        products.push(productoNuevo);
        fs.writeFileSync(path.resolve(__dirname, '../database/products.json'),JSON.stringify(products, null , 2));
        return res.render('products/creacion')*/
        processCreate: async (req, res) => {
            console.log("entraste por creacion de item");
            console.log(req.body)
            let arrayImg = [];
            if (req.files.length > 0) {
                req.files.forEach((file) => {
                    arrayImg.push("/images/" + file.filename);                        
            })
        
            
            stringImg = JSON.stringify(arrayImg);
            console.log(stringImg)
            try {
                const newProducts = await Products.create({
                nombre_producto: req.body.nombre,
                detalle: req.body.descripcion,
                imagenes_producto: stringImg,
                precio_producto: req.body.precio,
                id_marca: parseInt(1),
                borrado: false
                })
                console.log(req.body.categoria[0])
                console.log(newProducts.id)

                for (let i = 0; i < req.body.categoria.length; i++) {
                    console.log(req.body.categoria[i])

                        await CategoriaProducto.create({
                        id_product: newProducts.id, 
                        id_categoriaproduct: req.body.categoria[i]
                    })
                }
                
                /*await CategoriaProducto.create({
                    id_product: newProducts.id, 
                    id_categoriaproduct: req.body.categoria[0]
                })*/
            } catch (error) {
                console.log(error)
                
            }       
            const nameCategorias = await CategoriasProduct.findAll();
            return res.render('./products/creacion', {nameCategorias : nameCategorias});   
            }
        },   
                              
    

    editId: (req , res)=> {
        console.log("entraste a buscar el item" , req.body.codigo);
        let productoNoEncontrado = true;
        for (i = 0 ; i < products.length ; i++) {
            products[i].id == req.body.codigo ? productoNoEncontrado = false : "";
        }
        if (req.body.codigo == '' || productoNoEncontrado) {return res.render('./products/edicion' , {prod : "vacio"})};
        const producto = products.find (elemento => elemento.id == req.body.codigo);
        return res.render('./products/edicion', {prod: producto})
    },

    processEdit: (req , res)=> {
        console.log("entraste a editar el item", req.params.id);
        const productoId = products.find (elemento => elemento.id == req.params.id);
        return res.render('products/edicion',{prod: productoId})
    },

    processModificar: (req , res)=> {
        console.log("entraste a modificar el item" , req.body.id);
        const productoId = products.find (elemento => elemento.id == req.body.id);    
        let arrayImg = [];
        let oldImagen = productoId.imagenes_producto;
            if (req.files.length > 0) {
                req.files.forEach((file) => {
                    arrayImg.push("/images/" + file.filename);                        
            })
            } else {
                arrayImg = oldImagen;
            }
        productoId.imagenes_producto = arrayImg;
        for (let propiedad in req.body) {
            if (propiedad == "id") {
                productoId[propiedad] = Number(req.body[propiedad]) ;    
            } else if (propiedad == "guardar") {
            } else {
                let propiedadProducto = ""
                switch (propiedad) {
                    case "nombre":
                        propiedadProducto = "nombre_producto";
                        break;
                    case "descripcion":
                        propiedadProducto = "detalle";
                        break;
                    case "precio":
                        propiedadProducto = "precio_producto";
                        break;
                    case "categoria":
                        propiedadProducto = "categoria";
                        break;
                    default:
                        break;
                }
                


            productoId[propiedadProducto] = req.body[propiedad];    
            }
        }
        fs.writeFileSync(path.resolve(__dirname, '../database/products.json'),JSON.stringify(products, null , 2));
        return res.render('products/edicion' , {prod : "vacio"})
    },
    eliminar: (req , res)=> {
        console.log("entraste a eliminar el item" , req.params.id);
        const producto = products.find (elemento => elemento.id == req.params.id);
        producto.borrado = true;
        fs.writeFileSync(path.resolve(__dirname, '../database/products.json'),JSON.stringify(products, null , 2));
        return res.render('./products/edicion', {prod: producto})
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
   /* processCategorias: (req, res) => {
        console.log("entraste por creacion de categoria");
        let categoriaNueva = { 
            'id': categoriasProducts.length +1, 
            'categoria': req.body.categoria,
            'borrado': false
        }
        categoriasProducts.push(categoriaNueva);
        fs.writeFileSync(path.resolve(__dirname, '../database/categoriasProduct.json'),JSON.stringify(categoriasProducts, null , 2));
        return res.render('products/categorias')*/
        
     processCategorias:async(req,res)=>{
             console.log("entraste por proceso de creacion de categoria");
    //         console.log(req.body.categoria)
            
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
    //    console.log(req.body.categoria);
        if(req.body.categoria){
        let categoriaId = parseInt(req.body.categoria);
        let categoriaEditar = await CategoriasProduct.findByPk(categoriaId);
        let categoriaEdit = categoriaEditar.dataValues
    //    console.log(categoriaEdit)
        return res.render('./products/categorias' , {categoriaEdit})
        } else {
            const nameCategorias = await CategoriasProduct.findAll();
            return res.render('./products/categorias' , {nameCategorias : nameCategorias , categoriaEdit : "vacio"});
        }

    },

    updateCategorias: async (req, res) =>{
        console.log("entraste por modificacion de categoria");
    //    console.log(req.body.categoria);
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
    //    console.log(req.params.id)
        try {
            const categoriaEdit = await CategoriasProduct.findByPk(req.params.id)
    //        console.log(categoriaEdit.dataValues);
            return res.render('./products/categoriasDelete' , {categoriaEdit : categoriaEdit.dataValues })
        } catch (error) {
            console.log(error)
        }
    },

    destroyCategoria: async (req , res) => {
        console.log("entraste por borrado lógico de categoría");
    //    console.log(req.params.id);
        try {
            const categoriaEliminada = await CategoriasProduct.destroy ({
                where: {id: req.params.id}
            })
    //        console.log(categoriaEliminada);
            return res.redirect('/product/tablasadmin');
        } catch (error) {
            console.log(error)
        }
    },




    marcas: async (req, res) => {
        console.log("Entró por edición de marcas")
        const nameMarcas = await Marca.findAll();
    //    console.log(nameMarcas);
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

/*        console.log("entraste por creacion de marca");
        let marcaNueva = { 
            'id': marcas.length +1, 
            'nombre': req.body.marca,
            'borrado': false
        }
        marcas.push(marcaNueva);
        fs.writeFileSync(path.resolve(__dirname, '../database/marca.json'),JSON.stringify(marcas, null , 2));
        return res.render('products/marcas')
*/
    },

    editMarcas: async (req, res) => {
        console.log("entraste por edicion de marca");
    //    console.log(req.body.marca);
        if(req.body.marca){
        let marcaId = parseInt(req.body.marca);
        let marcaEditar = await Marca.findByPk(marcaId);
        let marcaEdit = marcaEditar.dataValues
    //    console.log(marcaEdit)
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
    //    console.log(req.params.id)
        try {
            const marcaEdit = await Marca.findByPk(req.params.id)
    //        console.log(marcaEdit.dataValues);
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
    //    return res.render('./products/talles')

         
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

        /*
        console.log("entraste por creacion de marca");
        let talleNuevo = { 
            'id': talle.length +1, 
            'nombre': req.body.talle,
            'descripcion': req.body.detalle,
            'borrado': false
        }
        talle.push(talleNuevo);
        fs.writeFileSync(path.resolve(__dirname, '../database/talles.json'),JSON.stringify(talle, null , 2));
        return res.render('products/talles') */
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
    //    console.log(req.body.categoria);
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
        //    console.log(req.params.id)
            try {
                const talleEdit = await Talles.findByPk(req.params.id)
        //        console.log(categoriaEdit.dataValues);
                return res.render('./products/tallesDelete' , {categoriaEdit : talleEdit.dataValues })
            } catch (error) {
                console.log(error)
            }
    },


    destroyTalle: async (req, res) => {
        console.log("entraste por borrado lógico de talle");
    //    console.log(req.params.id);
        try {
            const talleEliminado = await Talles.destroy ({
                where: {id: req.params.id}
            })
    //        console.log(talleEliminado);
            return res.redirect('/product/tablasadmin');
        } catch (error) {
            console.log(error)
        }
    },


    colores: async (req, res) => {
        console.log("Entró por creacion de colores");
        const nameColores = await Colores.findAll();
        return res.render('./products/colores', {nameColores : nameColores , categoriaEdit : "vacio"});  
    //    return res.render('./products/colores')         
    },    
    
    /*processColores: (req, res) => {
        console.log("entraste por creacion de color");
        let colorNuevo = { 
            'id': color.length +1, 
            'nombre': req.body.color,
            'descripcion': req.body.detalle,
            'borrado': false
        }
        color.push(colorNuevo);
        fs.writeFileSync(path.resolve(__dirname, '../database/colores.json'),JSON.stringify(color, null , 2));
        return res.render('products/colores')
    }*/
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
        //    console.log(req.params.id)
            try {
                const colorEdit = await Colores.findByPk(req.params.id)
        //        console.log(colorEdit.dataValues);
                return res.render('./products/coloresDelete' , {categoriaEdit : colorEdit.dataValues })
            } catch (error) {
                console.log(error)
            }
    },


    destroyColor: async (req, res) => {
        console.log("entraste por borrado lógico de color");
    //    console.log(req.params.id);
        try {
            const colorEliminado = await Colores.destroy ({
                where: {id: req.params.id}
            })
    //        console.log(talleEliminado);
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
        //console.log(req.body)
        //console.log(req.body.detalle)
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
       // console.log(req.body.color)
        return res.redirect('/product/tablasadmin');
    }


    

}
