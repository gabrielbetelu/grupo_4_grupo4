const logMiddleware = (req, res, next) => {
  
    if (!req.session.usuarioLogeado ) {    
      res.locals.isLogged = false;
//        return res.redirect('/user/login')
//        return res.render('./users/login');
          next();
      } else {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.usuarioLogeado
        next();
      }
}

module.exports = logMiddleware;