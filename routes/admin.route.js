const express = require('express');
const router = express.Router();

const AdminController = require('../controller/admin.controller');

router.get('/config',AdminController.config);

router.get('/',AdminController.config);

router.get("/pending",AdminController.pending);

router.put("/:id/published",AdminController.published);

router.put("/:id/unpublished",AdminController.unpublished);

router.delete('/:id/delete',AdminController.delete);

module.exports = router;