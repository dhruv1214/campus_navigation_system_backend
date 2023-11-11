const express = require('express');
const PathController = require('../controllers/PathController');
const router = express.Router();
const { validate, pathValidators } = require('../middleware/validators');

router.get('', PathController.listPaths);
router.get('/:id', validate(pathValidators.getPath), PathController.getPath);
router.post('', validate(pathValidators.createPath), PathController.createPath);
router.put('/:id', validate(pathValidators.updatePath), PathController.updatePath);
router.delete('/:id', validate(pathValidators.deletePath), PathController.deletePath);

module.exports = router;