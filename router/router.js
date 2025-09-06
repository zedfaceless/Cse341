const express = require('express');

const professionalController = require('../controllers/controller');

const router = express.Router();

// GET /feed/posts
router.get('/', professionalController.getData);
// localhost:3000/professional/
module.exports = router;