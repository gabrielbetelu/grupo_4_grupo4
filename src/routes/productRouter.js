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
        let imageName = Date.now() + path.extname(file.originalname);
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
router.put('/producto/:id/edit', fileUpload.any('imagen'),controller.processModificar);
router.delete('/eliminar/:id' , controller.eliminar);

//FORM CREACION
router.get('/producto/creacion', controller.creacion);
router.post('/producto', fileUpload.array('img'), controller.processCreate);

module.exports = router;
