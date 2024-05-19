const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

// Route for creating an announcement
router.post('/', announcementController.createAnnouncement);

// Route for fetching announcements for a tenant
router.get('/tenant/:userEmail/:managerEmail', announcementController.getAnnouncementsForTenant);

module.exports = router;
