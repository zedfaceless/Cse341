const Event = require('../models/event');

// Get all events
exports.getEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        next(error);
    }
};
  //get single event using ID
exports.getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({message: 'Event not found'});
        res.json(event);
    } catch (err) {
            next(err);
        }
};

// create new event
exports.createEvent = async (req, res, next) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        next(err);
    }
};

// update event 

exports.updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!event) return res.status(404).json({message: 'Event not found'});
        res.json(event);
    } catch (err) {
        next(err);
    }
};

// deleting an event
exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({message: 'Event not found'});
        res.json({message: 'Event deleted successfully'});
    } catch (err) {
        next(err);
    }
};

// --- END --- IGNORE --- END ---
