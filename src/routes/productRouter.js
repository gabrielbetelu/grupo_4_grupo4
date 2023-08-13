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


//RUTA DE ADMINISTRADOR DE TABLAS DE PRODUCTOS
 router.get('/tablasadmin', adminMiddleware, controller.tablas);

//RUTAS DE CATEGORIAS DE PRODUCTOS
router.get('/categorias', adminMiddleware, controller.categorias);
router.post('/categorias', controller.processCategorias);
router.post('/categorias/:id', adminMiddleware, controller.editCategorias);
router.put('/categorias/update/:id', adminMiddleware, controller.updateCategorias);
router.get('/categorias/delete/:id', adminMiddleware, controller.deleteCategoria);
router.delete('/categorias/delete/:id', adminMiddleware, controller.destroyCategoria);

//RUTAS DE MARCAS DE PRODUCTOS
router.get('/marcas', adminMiddleware, controller.marcas);
router.post('/marcas', controller.processMarcas);
router.post('/marcas/:id', adminMiddleware, controller.editMarcas);
router.put('/marcas/update/:id', adminMiddleware, controller.updateMarcas);
router.get('/marcas/delete/:id', adminMiddleware, controller.deleteMarca);
router.delete('/marcas/delete/:id', adminMiddleware, controller.destroyMarca);


//RUTAS DE TALLES DE PRODUCTOS
router.get('/talles', adminMiddleware, controller.talles);
router.post('/talles', controller.processTalles);
router.post('/talles/:id', adminMiddleware, controller.editTalles);
router.put('/talles/update/:id', adminMiddleware, controller.updateTalles);
router.get('/talles/delete/:id', adminMiddleware, controller.deleteTalle);
router.delete('/talles/delete/:id', adminMiddleware, controller.destroyTalle);

//RUTAS DE COLORES DE PRODUCTOS
router.get('/colores', adminMiddleware, controller.colores);
router.post('/colores', controller.processColores);


module.exports = router;
