const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account.controller');

router.get('/', accountController.index);

router.get('/login', accountController.login);
router.post('/login', accountController.postLogin)

router.get('/register', accountController.register);
router.post('/create', accountController.create);

module.exports = router;
