const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controller = require("../controllers/productController");

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


router.get('/carrito', controller.carrito);
router.get('/producto', controller.producto);
router.get('/productos', controller.productos);

//FORM EDICION
router.get('/edicion', controller.edicion);
router.post('/producto/:id', controller.editId);
router.get('/producto/:id/edit', controller.processEdit);

//FORM CREACION
router.get('/creacion', controller.creacion);
router.post('/producto', fileUpload.array('img'), controller.processCreate);

module.exports = router;
