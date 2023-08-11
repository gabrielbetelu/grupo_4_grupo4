const fs = require ('fs');
const path = require ('path');
const db = require('../database/models');
const { log, Console } = require('console');
const { isNumberObject } = require('util/types');
const sequelize = db.sequelize;
const rutaJSON = path.resolve('./src/database/products.json');
const products = JSON.parse (fs.readFileSync(rutaJSON));

const Products = db.Producto;

const Marca = db.Marca;
const Talles = db.Talle;
const Colores = db.Color;
const CategoriasProduct = db.CategoriaProduct;



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
        return res.render('./products/productos' , {prod : products})
        
    },
    edicion: (req, res) => {
        console.log("Entró por edicion")
        return res.render('./products/edicion' , {prod : "vacio"})
        
    },
    creacion: (req, res) => {
        console.log("Entró por creacion")
        return res.render('./products/creacion')
         
    },
    processCreate: (req, res) => {
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
        return res.render('products/creacion')
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

    categorias: (req, res) => {
        console.log("Entró por creacion de categorias")
        return res.render('./products/categorias')
         
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
             console.log("entraste por creacion de categoria");
             console.log(req.body.categoria)
            
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


    marcas: async (req, res) => {
        console.log("Entró por edición de marcas")
        const nameMarcas = await db.Marca.findAll();
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
        let marcaId = parseInt(req.body.marca);
    
        let marcaEditar = await Marca.findByPk(marcaId);
        let marcaEdit = marcaEditar.dataValues
        console.log(marcaEdit)

    //    try {
    //        await Marca.create({
    //            'nombre': req.body.marca,
    //            'borrado': 0
    //        });
    //    } catch (error) {
    //        console.log(error)
    //    }
        return res.render('./products/marcas' , {marcaEdit})
    //    return res.redirect('/product/tablasadmin');
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




    talles: (req, res) => {
        console.log("Entró por creacion de talles")
        return res.render('./products/talles')
         
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

    colores: (req, res) => {
        console.log("Entró por creacion de colores")
        return res.render('./products/colores')
         
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
    }
}
