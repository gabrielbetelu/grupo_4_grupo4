const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const logMiddleware = require('../middlewares/logMiddleware')
const {body}= require('express-validator');
const regValidation = require('../middlewares/regValidation');

const controller = require("../controllers/userController");

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

//RUTAS LOGIN
router.get('/login', controller.login);
router.post('/login', controller.processLogin);

//RUTAS REGISTRO DE USUARIO
router.get('/registro', controller.registro);
router.post('/registro', controller.processRegister);

//RUTA PERFIL DE USUARIO

//RUTA ADMINISTRADOR DE PERFILES

module.exports = router;
