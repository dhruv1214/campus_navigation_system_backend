const express = require('express');
const AnnouncementController = require('../controllers/AnnouncementController');
const router = express.Router();
const { validate, announcementValidators } = require('../middleware/validators');

router.get('/announcements', AnnouncementController.listAnnouncements);
router.get('/announcements/:id', validate(announcementValidators.getAnnouncement), AnnouncementController.getAnnouncement);
router.post('/announcements', validate(announcementValidators.createAnnouncement), AnnouncementController.createAnnouncement);
router.put('/announcements/:id', validate(announcementValidators.updateAnnouncement), AnnouncementController.updateAnnouncement);
router.delete('/announcements/:id', validate(announcementValidators.deleteAnnouncement), AnnouncementController.deleteAnnouncement);

module.exports = router;