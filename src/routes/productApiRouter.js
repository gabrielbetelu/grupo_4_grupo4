const express = require('express');
const router = express.Router();
const controller = require("../controllers/productApiController");
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', controller.list)
router.get('/:id', controller.detail)

module.exports = router;