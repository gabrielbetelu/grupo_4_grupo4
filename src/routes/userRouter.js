const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const multer = require('multer');
const path = require('path');
const regValidation = require('../middlewares/regValidation');
const guestMiddleware = require('../middlewares/guestMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const multerMiddleware = require ('../middlewares/multerMiddleware');
const imageSizeMiddleware = require ('../middlewares/imageSizeMiddleware');

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


//RUTAS LOGIN
router.get('/login', guestMiddleware, controller.login);
router.post('/login',  controller.processLogin);

//RUTAS REGISTRO DE USUARIO

router.get('/registro', guestMiddleware, controller.registro);
router.post('/registro', multerMiddleware.single('imagen'), imageSizeMiddleware, regValidation, controller.processRegister);
 
//RUTA PERFIL DE USUARIO
router.get('/perfil', authMiddleware, controller.perfil);
router.put('/perfil/:id', multerMiddleware.single('imagen'), imageSizeMiddleware, regValidation, controller.editarPerfil);
router.delete('/perfil/eliminar/:id', controller.eliminarPerfil);
router.delete('/perfil/delete/:id', controller.destroyPerfil);

//LOGOUT
router.get('/logout', controller.logout);

//RUTA ADMINISTRADOR DE PERFILES


//RUTAS DE CATEGORIAS DE USUARIO

router.get('/categorias', adminMiddleware, controller.categorias);
router.post('/categorias', controller.processCategoriasUser);
router.post('/categorias/:id', adminMiddleware, controller.editCategoriasUser);
router.put('/categorias/update/:id', adminMiddleware, controller.updateCategoriasUser);
router.get('/categorias/delete/:id', adminMiddleware, controller.deleteCategoriaUser);
router.delete('/categorias/delete/:id', adminMiddleware, controller.destroyCategoriaUser);

module.exports = router;
