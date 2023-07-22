const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controller = require("../controllers/productController");
//const productController = require('../controllers/productController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


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


router.get('/carrito', authMiddleware , controller.carrito);
router.get('/producto', controller.producto);
router.get('/productos', controller.productos);

//FORM EDICION
router.get('/edicion', adminMiddleware ,controller.edicion);
router.post('/producto/:id', controller.editId);
router.get('/producto/:id/edit', adminMiddleware, controller.processEdit);
router.put('/producto/:id/edit', fileUpload.any('imagen'),controller.processModificar);
router.delete('/eliminar/:id' , controller.eliminar);

//FORM CREACION
router.get('/creacion', adminMiddleware, controller.creacion);
router.post('/producto', fileUpload.any('imagen'), controller.processCreate);

module.exports = router;
