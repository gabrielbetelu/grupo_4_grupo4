const {body} = require('express-validator');
module.export = [
    body('email').notEmpty().withMessage('completar email').isEmail().withMessage('coloque un email valido'),
    body('contrasenia').isStrongPassword({ minLength: 5, minUppercase: 1, minLowercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage('La contraseña no puede estar vacia')
    
]