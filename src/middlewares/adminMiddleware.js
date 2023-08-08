function adminMiddleware (req, res, next) {
    if (!req.session.usuarioLogeado || req.session.usuarioLogeado.categoria_user != "administrador") {
        return res.redirect('/');
    } 
    next();
    }
    

module.exports=adminMiddleware;