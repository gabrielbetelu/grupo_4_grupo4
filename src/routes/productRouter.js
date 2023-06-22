const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controller = require("../controllers/productController");
const productController = require('../controllers/productController');

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


router.get('/carrito', productController.carrito);
router.get('/producto', productController.producto);
router.get('/productos', productController.productos);

//FORM EDICION
router.get('/edicion', productController.edicion);
router.get('/edicion', productController.processEdit);
router.get('/edicion/:id', fileUpload.array('img'), productController.processEdit);
//FORM CREACION
router.get('/creacion', productController.creacion);
router.post('/productos', fileUpload.array('img'), productController.processCreate);

module.exports = router;
