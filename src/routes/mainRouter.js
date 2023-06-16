const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controller = require("../controllers/mainControllers");

const multerDiskStorage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images'))
    },

    filename: function (req, file, cb) {
        let imageName = Data.now() + path.extname(file.originalname);
        cb(null, imageName);
    },
})

const fileUpload = multer ({storage:multerDiskStorage});
/* app.post('/producto', upload.array('img'), function (req, res, next) {
    console.log(req.files) --> esto devuelve un objeto con los datos del archivo
    res.send('Archivos subidos')
})
*/
router.get('/', controller.home);
router.get('/login', controller.login);
router.get('/registro', controller.registro);
router.get('/carrito', controller.carrito);
router.get('/producto', controller.producto);
router.get('/productos', controller.productos);

//FORM EDICION
router.get('/edicion', controller.edicion);
//FORM CREACION
router.get('/creacion', controller.creacion);
router.post('/producto', fileUpload.any('img'), controller.processCreate);

module.exports = router;
