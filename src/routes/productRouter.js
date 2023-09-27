const express = require('express');
const router = express.Router();


const controller = require("../controllers/productController");
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const imageMiddleware = require('../middlewares/imageMiddleware');
const prodValidator = require('../middlewares/prodValidator');
const prodEditValidator = require('../middlewares/prodEditValidator');
const imageSizeMiddleware = require('../middlewares/imageSizeMiddleware');
const uploadFile = require ('../middlewares/multerMiddleware')



router.get('/carrito', authMiddleware ,controller.carrito);
router.get('/producto/:id', controller.producto);
router.get('/productos', controller.productos);
router.get('/productos/abrigos', controller.abrigos);
router.get('/productos/pantalones', controller.pantalones);
router.get('/productos/calzado', controller.calzado);
router.get('/productos/camping', controller.camping);
router.get('/productos/mochilas', controller.mochilas);
router.get('/productos/accesorios', controller.accesorios);
router.get('/productos/mujer', controller.mujer);
router.get('/productos/hombre', controller.hombre);
router.get('/productos/ninios', controller.ninios);

//FORM EDICION
router.get('/edicion', adminMiddleware ,controller.edicion);
router.post('/buscar', controller.buscar);
router.post('/productoedit', controller.editId);
router.put('/producto/:id/edit', uploadFile.any('imagen'), prodEditValidator, adminMiddleware, controller.processModificar);
router.delete('/delete/:id' , controller.eliminar)
router.delete('/eliminar/:id' , controller.destroy);

//FORM CREACION
router.get('/creacion', adminMiddleware, controller.creacion);
router.post('/producto', uploadFile.any('imagen'), prodValidator, adminMiddleware, controller.processCreate);


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
router.post('/colores/:id', adminMiddleware, controller.editColores);
router.put('/colores/update/:id', adminMiddleware, controller.updateColores);
router.get('/colores/delete/:id', adminMiddleware, controller.deleteColor);
router.delete('/colores/delete/:id', adminMiddleware, controller.destroyColor);

//RUTAS DE STOCK DE PRODUCTOS
router.get('/stock', adminMiddleware, controller.stock);
router.post('/stock', adminMiddleware, controller.processStock);


module.exports = router;
