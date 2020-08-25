const express = require('express');
const router = express.Router();

const authController = require('../../app/controllers/auth.controller');

router.get('/google/callback', authController.googleCallback);
router.get('/google', authController.google);

module.exports = router;
