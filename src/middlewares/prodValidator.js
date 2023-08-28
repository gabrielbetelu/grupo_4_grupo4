const {check} = require('express-validator');
const db = require('../database/models');
const fileFilter = require('./imageMiddleware');
const Products = db.Product;
const sequelize = db.sequelize;
console.log("Entró a prodValidator")
module.exports = [
    check('nombre').notEmpty().withMessage('Campo obligatorio, minimo 5 caracteres').isLength({ min:5 }).withMessage('Campo obligatorio, minimo 5 caracteres'),
    check('descripcion').notEmpty().withMessage('Campo obligatorio, minimo 20 caracteres').isLength({ min:20 }).withMessage('Campo obligatorio, minimo 20 caracteres'),
    check('precio').notEmpty().withMessage('Campo obligatorio').isDecimal().withMessage('Debe ingresar un valor mayor a cero.').custom(value => parseFloat(value) > 0).withMessage('El campo debe ser mayor a cero').custom(value => parseFloat(value) < 99999999.99).withMessage('El campo debe ser menor a 99999999.99'),
    check('image').custom((value, {req}) => {
        //        if (req.fileError || req.file.size > (1024 * 1024 * 3)) {
        //    console.log(req.fileError);
                if (req.fileImgError) {
        //            console.log("***   req.fileImgError  ******************************");
        //            console.log(req.fileimgError);
                    throw new Error ('Se debe ingresar al menos una imágen');
                    
        //            throw new Error ('La imagen debe tener un formato valido y su tamaño ser menor a 3Mb');
                };
                if (req.fileError) {
        //            console.log("***   req.fileError  ******************************");
        //            console.log(req.fileError);
                    throw new Error ('La imagen debe tener un formato valido');
                    
        //            throw new Error ('La imagen debe tener un formato valido y su tamaño ser menor a 3Mb');
                };
                if (req.fileSizeError) {
        //            console.log("***   req.fileSizeError  ******************************");
        //            console.log(req.fileSizeError)
                    throw new Error (req.fileSizeError);
                }
        
                // SI RETORNA TRUE SIGNIFICA QUE NO HUBO ERROR
                return true
            })
]