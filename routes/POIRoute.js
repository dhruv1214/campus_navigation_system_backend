const express = require('express');
const POIController = require('../controllers/POIController');
const router = express.Router();
const { validate, poiValidators } = require('../middleware/validators');

router.get('/pois', POIController.listPOIs);
router.get('/pois/:id', validate(poiValidators.getPOI), POIController.getPOI);
router.post('/pois', validate(poiValidators.createPOI), POIController.createPOI);
router.put('/pois/:id', validate(poiValidators.updatePOI), POIController.updatePOI);
router.delete('/pois/:id', validate(poiValidators.deletePOI), POIController.deletePOI);

module.exports = router;