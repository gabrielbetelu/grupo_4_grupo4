const {body} = require('express-validator');
//console.log(body);
//console.log(body('contrasenia'));
module.exports = [
    body('email').notEmpty().withMessage('Completar email').isEmail().withMessage('coloque un email valido'),
    body('contrasenia').notEmpty().withMessage('La contraseña no puede estar vacia').isStrongPassword({ minLength: 5, minUppercase: 1, minLowercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage('La contraseña debe tener mínimo 5 caracteres, mínimo 1 minúscula, 1 mayúscula , 1 número y 1 caracter especial'),
    body('nombre').notEmpty().withMessage('Campo obligatorio'),
    body('apellido').notEmpty().withMessage('Campo obligatorio')
]