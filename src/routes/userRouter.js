const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const multer = require('multer');
const path = require('path');
//const logMiddleware = require('../middlewares/logMiddleware');
// const {body}= require('express-validator');
const regValidation = require('../middlewares/regValidation');
const guestMiddleware = require('../middlewares/guestMiddleware');
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



//RUTAS LOGIN
//router.get('/login', controller.login);
router.get('/login', guestMiddleware, controller.login);
router.post('/login',  controller.processLogin);

//RUTAS REGISTRO DE USUARIO

//router.get('/registro', controller.registro);
router.get('/registro', guestMiddleware, controller.registro);
router.post('/registro', fileUpload.single('imagen'), regValidation, controller.processRegister);
//router.post('/registro', regValidation ,controller.processRegister);
 
//RUTA PERFIL DE USUARIO
//router.get('/perfil', controller.perfil);
router.get('/perfil', authMiddleware, controller.perfil);
router.put('/perfil/:id', fileUpload.single ('imagen'), authMiddleware, controller.editarPerfil);
router.delete('/perfil/eliminar/:id', controller.eliminarPerfil);

//LOGOUT
router.get('/logout', controller.logout);

//RUTA ADMINISTRADOR DE PERFILES


//RUTAS DE CATEGORIAS DE USUARIO

router.get('/categorias', guestMiddleware, controller.categorias);
router.post('/categorias', controller.processCategoriasUser);


module.exports = router;
