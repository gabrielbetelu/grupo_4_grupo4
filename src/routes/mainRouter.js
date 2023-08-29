const express = require('express');
const router = express.Router();
const controller = require("../controllers/mainControllers");


router.get('/', controller.home);


module.exports = router;
