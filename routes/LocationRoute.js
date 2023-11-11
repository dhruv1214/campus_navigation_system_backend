const express = require('express');
const LocationController = require('../controllers/LocationController');
const router = express.Router();
const { validate, locationValidators } = require('../middleware/validators');

router.get('', LocationController.listLocations);
router.get('/:id', validate(locationValidators.getLocation), LocationController.getLocation);
router.post('', validate(locationValidators.createLocation), LocationController.createLocation);
router.put('/:id', validate(locationValidators.updateLocation), LocationController.updateLocation);
router.delete('/:id', validate(locationValidators.deleteLocation), LocationController.deleteLocation);

module.exports = router;