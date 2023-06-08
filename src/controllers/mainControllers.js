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
        
    }
};