const Announcement = require('../models/Announcement');

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, manager, createdAt } = req.body;
    const newAnnouncement = new Announcement({ title, message, manager, createdAt });
    await newAnnouncement.save();
    res.status(201).json({ message: 'Announcement created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get announcements for a tenant
exports.getAnnouncementsForTenant = async (req, res) => {
  try {
    const { userEmail, managerEmail } = req.params;
    const announcements = await Announcement.find({
      $or: [{ manager: userEmail }, { manager: managerEmail }]
    });
    res.status(200).json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
