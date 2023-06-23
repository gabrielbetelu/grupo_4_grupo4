const fs = require ('fs');
const path = require ('path');
const rutaJSON = path.resolve('./src/database/products.json');
const products = JSON.parse(fs.readFileSync(rutaJSON));

module.exports = {
    carrito:(req, res) => {
            return res.render('./products/carrito')        
    },
    producto : (req, res) => {
        return res.render('./products/producto')
        
    },
    productos : (req, res) => {
        console.log(products)
        return res.render('./products/productos', {productos: products});
        
    },
    edicion: (req, res) => {
        console.log(products)
        const editando = products.find((row) => row.id == req.params.id);
        console.log('edicion')
        console.log(editando)
        
        return res.render('./products/productos', {productos:editando});
       
       // return res.render('./products/edicion')
        
    },
    processEdit: (req, res) => {
        console.log('processEdit')
        console.log(products)
        console.log(req.params.id)
        const prod = productos.find((row)=> row.id == req.params.id)
        
        for(let propiedad in req.body) {
            prod[propiedad] = req.body[propiedad]
        }
        fs.writeFileSync(path.resolve(__dirname,'../database/products.json'),JSON.stringify([productos], null, 2));
       return res.redirect('/');
        
    },

    creacion: (req, res) => {
        console.log("Entró por creacion")
        return res.render('./products/creacion')
         
    },

    processCreate: (req, res) => {
        let productoNuevo = { 
            'id': productos.length +1, 
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