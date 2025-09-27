// controllers/eventController.js
const Event = require('../models/event');

// Get all events
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate('createdBy', 'username email');
    res.json(events);
  } catch (error) {
    next(error);
  }
};

// Get single event using ID
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'username email');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

// Create new event
exports.createEvent = async (req, res, next) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user ? req.user.id : undefined
    };
    const event = new Event(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

// Update event
exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

// Delete an event
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    next(err);
  }
};
