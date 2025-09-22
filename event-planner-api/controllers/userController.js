const user = require('../models/user');

//getting all users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

//get single user using the ID

exports.getUsersById = async (req, res, next) => {
    try {
        const users = await user.findById(req.params.id);
        if (!users) return res.status(404).json({message: 'User not found'});
        res.json(users);
    } catch (error) {
        next(error);
    }
};

//creating new user
exports.createUser = async (req, res, next) => {
    try {
        const User = new user(req.body);
        await User.save();
        res.status(201).json(User);
    } catch (error) {
        next(error);
    }
};

//updating user
exports.updateUser = async (req, res, next) => {
    try {
        const users = await user.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if (!users) return res.status(404).json({message: 'User not found'});
        res.json(users);
    } catch (error) {
        next(error);
    }
};

//deleting user
exports.deleteUser = async (req, res, next) => {
    try {
        const users = await user.findByIdAndDelete(req.params.id);
        if (!users) return res.status(404).json({message: 'User not found'});
        res.json({message: 'User deleted successfully'});
    } catch (error) {
        next(error);
    }
};

// --- END --- IGNORE --- END ---
