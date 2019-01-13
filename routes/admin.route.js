const express = require('express');
const router = express.Router();

const AdminController = require('../controller/admin.controller');

router.get('/config',AdminController.config);

router.get('/',AdminController.config);

router.delete('/:id/delete',AdminController.delete);

module.exports = router;