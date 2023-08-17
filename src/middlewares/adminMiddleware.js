function adminMiddleware (req, res, next) {
    if (!req.session.usuarioLogeado || req.session.usuarioLogeado.id_categoria_user != "1") {
        return res.redirect('/');
    } 
    next();
    }
    

module.exports=adminMiddleware;