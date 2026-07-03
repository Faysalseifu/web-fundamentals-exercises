const express = require('express');
const materialController = require('../controllers/material.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

const router = express.Router();

router.post('/', authenticate, authorize('ADMIN'), materialController.create);
router.get('/', authenticate, materialController.getAll);
router.get('/:id', authenticate, materialController.getById);
router.patch('/:id', authenticate, authorize('ADMIN'), materialController.update);
router.delete('/:id', authenticate, authorize('ADMIN'), materialController.delete);

module.exports = router;
