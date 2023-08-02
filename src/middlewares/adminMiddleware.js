function adminMiddleware (req, res, next) {
    if (!req.session.usuarioLogeado || req.session.usuarioLogeado.categoria != "administrador") {
        return res.redirect('/');
    } 
    next();
    }
    

module.exports=adminMiddleware;