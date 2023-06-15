const fs = require ('fs');
const path = require ('path');
const rutaJSON = path.resolve('./src/database/products.json');
const products = JSON.parse (fs.readFileSync(rutaJSON));



module.exports = {
    home : (req, res) => {
        return res.render('home')
    },
    login : (req, res) => {
        return res.render('./users/login')
    },
    registro :(req, res) => {
            return res.render('./users/registro')        
    },
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
        return res.render('./products/edicion')
        
    },
    creacion: (req, res) => {
        return res.render('./products/creacion')
        
    },
    processCreate: (req, res) => {
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
    }
};