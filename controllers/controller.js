const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get ALL contacts
const getAllContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // Send all contacts
  });
};

// Get ONE contact by ID
const getContactById = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id); // Grab ID from URL
  const result = await mongodb.getDb().db().collection('user').find({ _id: contactId });
  result.toArray().then((lists) => {
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]); // Send that one contact
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  });
};

module.exports = { getAllContacts, getContactById };