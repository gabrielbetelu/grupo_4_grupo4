const fs = require ('fs');
const path = require ('path');
const rutaJSON = path.resolve('./src/database/products.json');
const products = JSON.parse (fs.readFileSync(rutaJSON));

module.exports = {
    carrito:(req, res) => {
            return res.render('./products/carrito')        
    },
    producto : (req, res) => {
        return res.render('./products/producto')
        
    },
    productos : (req, res) => {
        console.log("entraste a productos" );
        
        console.log(products);

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
        console.log(req)
        let productoNuevo = { 
            'id': producto.length +1, 
            'nombre': req.body.name,
            'descripcion': req.body.desc,
            'img': req.file.filename,
            'abrigo': req.body.abrigos,
            'pantalon': req.body.pantalones,
            'calzado': req.body.calzado,
            'camping': req.body.camping,
            'mochilas': req.body.mochilas,
            'mujer': req.body.mujer,
            'hombre': req.body.hombre,
            'ninio': req.body.niño, 
            'precio': req.body.precio,
            'borrado': false
        }
    },

    editId: (req , res)=> {
        console.log("entraste a buscar el item" , req.body.codigo);
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
        let oldImagen = productoId.imagen;
            if (req.files.length > 0) {
                req.files.forEach((file) => {
                    arrayImg.push("/images/" + file.filename);                        
            })
            } else {
                arrayImg = oldImagen;
            }
        productoId.imagen = arrayImg;
        for (let propiedad in req.body) {
            if (propiedad == "id") {
                productoId[propiedad] = Number(req.body[propiedad]) ;    
            } else if (propiedad == "guardar") {
            } else {
            productoId[propiedad] = req.body[propiedad];    
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
}
