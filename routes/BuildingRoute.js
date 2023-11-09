const express = require('express');
const router = express.Router();
const BuildingController = require('../controllers/BuildingController');
const { validate, buildingValidators } = require('../middleware/validators');

router.get('/buildings', BuildingController.listBuildings);
router.get('/buildings/:id', validate(buildingValidators.getBuilding), BuildingController.getBuilding);
router.post('/buildings', validate(buildingValidators.createBuilding), BuildingController.createBuilding);
router.put('/buildings/:id', validate(buildingValidators.updateBuilding), BuildingController.updateBuilding);
router.delete('/buildings/:id', validate(buildingValidators.deleteBuilding), BuildingController.deleteBuilding);

module.exports = router;
