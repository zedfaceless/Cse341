// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get single user by ID
exports.getUsersById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Create new user
exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName, role } = req.body;
    let passwordHash;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    const newUser = new User({
      username,
      email,
      passwordHash,
      firstName,
      lastName,
      role
    });

    await newUser.save();

    const userToReturn = newUser.toObject();
    delete userToReturn.passwordHash;

    res.status(201).json(userToReturn);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    next(error);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.passwordHash = await bcrypt.hash(updateData.password, salt);
      delete updateData.password;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
