// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

const { validateEventCreate, validateEventUpdate } = require('../middleware/validation');
const jwtAuth = require('../middleware/jwtAuth');

// Public
router.get('/', getEvents);
router.get('/:id', getEventById);

// Protected (requires JWT)
router.post('/', jwtAuth, validateEventCreate, createEvent);
router.put('/:id', jwtAuth, validateEventUpdate, updateEvent);
router.delete('/:id', jwtAuth, deleteEvent);

module.exports = router;
