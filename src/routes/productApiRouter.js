const express = require('express');
const router = express.Router();
const controller = require("../controllers/productApiController");
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', adminMiddleware, controller.list)
router.get('/:id', adminMiddleware, controller.detail)

module.exports = router;