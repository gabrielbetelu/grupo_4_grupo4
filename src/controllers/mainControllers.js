module.exports = {
    home : (req, res) => {
        return res.render('home')
    },
    login : (req, res) => {
        return res.render('login')
    },
    registro :(req, res) => {
            return res.render('registro')        
    },
    carrito:(req, res) => {
            return res.render('carrito')        
    },
    producto : (req, res) => {
        return res.render('producto')
        
    },
    productos : (req, res) => {
        return res.render('productos')
        
    },
    edicion: (req, res) => {
        return res.render('edicion')
        
    },
    creacion: (req, res) => {
        return res.render('creacion')
        
    }
};