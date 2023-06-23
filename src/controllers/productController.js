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
        return res.render('./products/productos')
        
    },
    edicion: (req, res) => {
        console.log("Entró por edicion")
        return res.render('./products/edicion')
        
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
        console.log(req.params);
        console.log("entraste a buscar el item" , req.params.id);
        let codigo = req.params.id
       const producto = products.find (elemento => elemento.id == req.params.id);
        console.log(producto);
        return res.render('./products/edicion',{prod: productoId})
    },

    processEdit: (req , res)=> {
        console.log("entraste a editar el item" , req.params.id);
        const productoId = products.find (elemento => elemento.id == req.params.id);
        console.log(productoId);
        return res.render('products/edicion',{prod: productoId})
    }
};