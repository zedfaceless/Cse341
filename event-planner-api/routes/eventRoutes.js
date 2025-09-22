const express = require('express');
const router = express.Router();
const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');
const { validateEvent } = require('../middleware/validation');

// these are the routes
router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', validateEvent, createEvent);
router.put('/:id', validateEvent, updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
// --- END --- IGNORE --- END ---   