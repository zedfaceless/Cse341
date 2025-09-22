const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const { model } = require('mongoose');

// theses are the routes for users
router.get('/', getUsers);
router.get('/:id', getUsersById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
// --- END --- IGNORE --- END ---