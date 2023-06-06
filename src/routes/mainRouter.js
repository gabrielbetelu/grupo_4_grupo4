const express = require('express');
const router = express.Router();

const controller = require("../controllers/mainControllers");
router.get('/', controller.home);
router.get('/login', controller.login);
router.get('/registro', controller.registro);
router.get('/carrito', controller.carrito);
router.get('/producto', controller.producto);
router.get('/productos', controller.productos);
router.get('/edicion', controller.edicion);

module.exports = router;
