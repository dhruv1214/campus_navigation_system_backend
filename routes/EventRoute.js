const express = require('express');
const EventController = require('../controllers/EventController');
const router = express.Router();
const { validate, eventValidators } = require('../middleware/validators');

router.get('/events', EventController.listEvents);
router.get('/events/:id', validate(eventValidators.getEvent), EventController.getEvent);
router.post('/events', validate(eventValidators.createEvent), EventController.createEvent);
router.put('/events/:id', validate(eventValidators.updateEvent), EventController.updateEvent);
router.delete('/events/:id', validate(eventValidators.deleteEvent), EventController.deleteEvent);

module.exports = router;