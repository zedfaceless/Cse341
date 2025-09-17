const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

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
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    const contactId = new ObjectId(id);

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

// POST create contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const result = await mongodb.getDb().collection('new_user').insertOne(contact);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create contact', error: err.message });
  }
};

// PUT update contact
const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    const contactId = new ObjectId(id);

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await mongodb.getDb().collection('new_user').updateOne(
      { _id: contactId },
      { $set: updatedContact }
    );

    if (result.modifiedCount > 0) {
      res.status(204).send(); // Success, no content
    } else {
      res.status(404).json({ message: 'Contact not found or no changes made' });
    }
  } catch (err) {
    console.error("Error in updateContact:", err);
    res.status(500).json({ message: 'Failed to update contact', error: err.message });
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    const contactId = new ObjectId(id);

    const result = await mongodb.getDb().collection('new_user').deleteOne({ _id: contactId });

    if (result.deletedCount > 0) {
      res.status(204).send(); // Success, no content
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    console.error("Error in deleteContact:", err);
    res.status(500).json({ message: 'Failed to delete contact', error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
