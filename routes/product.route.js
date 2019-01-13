const express = require('express');
const router = express.Router();

const ProductController = require('../controller/product.controller');
router.get('/',ProductController.home);
router.get('/edit',ProductController.edit);
router.get('/add',ProductController.add);
router.post('/add',ProductController.create);

router.get('/:page',ProductController.home);
router.get('/:id/view',ProductController.show);

module.exports = router;

