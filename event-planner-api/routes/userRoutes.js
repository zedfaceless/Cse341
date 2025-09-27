// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const { validateUserCreate, validateUserUpdate } = require('../middleware/validation');
const jwtAuth = require('../middleware/jwtAuth');

// Public reads
router.get('/', getUsers);
router.get('/:id', getUsersById);

// Create user (registration)
router.post('/', validateUserCreate, createUser);

// Update/Delete - you might want these protected in production
router.put('/:id', jwtAuth, validateUserUpdate, updateUser);
router.delete('/:id', jwtAuth, deleteUser);

module.exports = router;
