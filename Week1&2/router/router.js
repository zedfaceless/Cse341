const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

// GET all contacts
router.get('/', controller.getAllContacts);
// GET contact by ID
router.get('/:id', controller.getContactById);
// POST new contact 
router.post('/', controller.createContact);
// PUT update contact by ID
router.put('/:id', controller.updateContact);
// DELETE contact by ID
router.delete('/:id', controller.deleteContact);

module.exports = router;