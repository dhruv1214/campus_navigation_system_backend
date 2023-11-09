const express = require('express');
const PathController = require('../controllers/PathController');
const router = express.Router();
const { validate, pathValidators } = require('../middleware/validators');

router.get('/paths', PathController.listPaths);
router.get('/paths/:id', validate(pathValidators.getPath), PathController.getPath);
router.post('/paths', validate(pathValidators.createPath), PathController.createPath);
router.put('/paths/:id', validate(pathValidators.updatePath), PathController.updatePath);
router.delete('/paths/:id', validate(pathValidators.deletePath), PathController.deletePath);

module.exports = router;