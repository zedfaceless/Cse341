const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

// GET all contacts
router.get('/', controller.getAllContacts);

// GET contact by ID
router.get('/:id', controller.getContactById);

module.exports = router;