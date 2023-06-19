const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controller = require("../controllers/mainControllers");

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


router.get('/', controller.home);


module.exports = router;
