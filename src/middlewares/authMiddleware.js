function authMiddleware (req, res, next) {
    if (!req.session.usuarioLogeado) {
        return res.redirect('/user/login');
    }
    next();
    }

module.exports=authMiddleware;