const {check} = require('express-validator');
const db = require('../database/models');
const fileFilter = require('./imageMiddleware');
const Products = db.Product;
const sequelize = db.sequelize;
const CategoriasProduct = db.CategoriaProduct;
const Marca = db.Marca;
console.log("Entró a prodValidator")
module.exports = [
    check('nombre').isLength({ min:5 }).withMessage('Campo obligatorio, minimo 5 caracteres'),
    
    check('descripcion').isLength({ min:20 }).withMessage('Campo obligatorio, minimo 20 caracteres'),

    check('precio').notEmpty().withMessage('Campo obligatorio').isFloat({min:0.01, max:999999.99}).withMessage('Debe ingresar un valor mayor a cero y menor a 99999999.99.'),
       
    check('categoria')        
        .custom(async values => {
            if(values){
                const categoriaValida = await CategoriasProduct.findAll({
                        where: {
                            id: values
                        }
                    });
    //                console.log("***  Categorías validadas  ****************")
    //                console.log(values)
    //                console.log(categoriaValida);
                    if (categoriaValida == null) {
                        throw new Error ('Debe ingresar categorías válidas');
                    };
            } else {
                throw new Error ('Debe ingresar al menos una categoría válida');
            };

            



        }  
    ),

    check('marca')        
        .custom(async value => {
            const marcaValida = await Marca.findByPk(value);
    //        console.log("***  Marca validada  ****************")
    //        console.log(value)
    //        console.log(marcaValida);
            if (marcaValida == null) {
                throw new Error ('Debe ingresar una marca válida');
            };
        }  
    ),
    
    check('image').custom((value, {req}) => {
        console.log("*** Files *****************")
        console.log(req.files)
        if (req.files.length > 0) {                
                for (let i = 0 ; i < req.files.length ; i++) {
                    if (req.files[i].size > (1024 * 1024 * 3)) {
                        throw new Error ('La imagen debe tener un tamaño máximo de 3 MB');
                        i = req.files.length
                    }
                }
            } else {
                if (req.fileError) {
                    throw new Error ('La imagen debe tener un formato valido');
                } else {
                throw new Error ('Se debe ingresar al menos una imágen'); 
            }
            } 
            
                                     
                // SI RETORNA TRUE SIGNIFICA QUE NO HUBO ERROR
                return true
            })
]