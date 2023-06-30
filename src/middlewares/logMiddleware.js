const logMiddleware = (req, res, next) => {
    if (!req.session.usuarioLogeado ) {
        return res.redirect('/user/login')
      } else {
        next();
      }
}

module.exports = logMiddleware;