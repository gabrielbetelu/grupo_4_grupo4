const {check} = require('express-validator');
const db = require('../database/models');
const Users = db.User;
const sequelize = db.sequelize;



module.exports = [
    check('nombre').notEmpty().isLength({ min:2 }).withMessage('Campo obligatorio, minimo 2 caracteres'),
    check('apellido').notEmpty().isLength({ min:2 }).withMessage('Campo obligatorio, minimo 2 caracteres'),
    
    check('email').notEmpty().withMessage('Completar email').isEmail().withMessage('coloque un email valido')
    .custom(async (value) => {
        const existingUser = await Users.findOne({ where: { correo: value }});
        if (existingUser) {
          throw new Error('Este email ya está registrado');
        }
        return true;
      }),
    
    check('contrasenia').notEmpty().withMessage('La contraseña no puede estar vacia').isStrongPassword
    ({ minLength: 8, minUppercase: 1, minLowercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage
    ('La contraseña debe tener mínimo 8 caracteres, mínimo 1 minúscula, 1 mayúscula , 1 número y 1 caracter especial'),
    
    check('image').custom((value, {req}) => {
               if (req.fileError || req.file.size > (1024 * 1024 * 3)) {
                //  if (req.fileError) {
                    throw new Error ('La imagen debe tener un formato valido');
        //            throw new Error ('La imagen debe tener un formato valido y su tamaño ser menor a 3Mb');
                };
                if (req.fileSizeError) {
                    throw new Error (req.fileSizeError);
                }
        
                // SI RETORNA TRUE SIGNIFICA QUE NO HUBO ERROR
                return true
            })
]