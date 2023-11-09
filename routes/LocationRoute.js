const express = require('express');
const LocationController = require('../controllers/LocationController');
const router = express.Router();
const { validate, locationValidators } = require('../middleware/validators');

router.get('/locations', LocationController.listLocations);
router.get('/locations/:id', validate(locationValidators.getLocation), LocationController.getLocation);
router.post('/locations', validate(locationValidators.createLocation), LocationController.createLocation);
router.put('/locations/:id', validate(locationValidators.updateLocation), LocationController.updateLocation);
router.delete('/locations/:id', validate(locationValidators.deleteLocation), LocationController.deleteLocation);

module.exports = router;