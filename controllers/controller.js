const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('new_user').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    console.error("Error in getAllContacts:", err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

// GET contact by ID
const getContactById = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('new_user').find({ _id: contactId });
    const lists = await result.toArray();
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    console.error("Error in getContactById:", err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

module.exports = { getAllContacts, getContactById };
