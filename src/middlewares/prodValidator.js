const {check} = require('express-validator');
const db = require('../database/models');
const Products = db.Product;
const sequelize = db.sequelize;
console.log("Entró a prodValidator")
module.exports = [
    check('nombre').notEmpty().isLength({ min:5 }).withMessage('Campo obligatorio, minimo 5 caracteres'),
    check('descripcion').notEmpty().isLength({ min:20 }).withMessage('Campo obligatorio, minimo 20 caracteres'),
    
    check('image').custom((value, {req}) => {
        //        if (req.fileError || req.file.size > (1024 * 1024 * 3)) {
                if (req.fileError) {
                    console.log(req.fileError)
                    throw new Error ('La imagen debe tener un formato valido');
        //            throw new Error ('La imagen debe tener un formato valido y su tamaño ser menor a 3Mb');
                };
                if (req.fileSizeError) {
                    console.log(req.fileSizeError)
                    throw new Error (req.fileSizeError);
                }
        
                // SI RETORNA TRUE SIGNIFICA QUE NO HUBO ERROR
                return true
            })
]