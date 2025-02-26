const { registerUser, loginUser } = require('../controllers/userController');
const { validateAuthInput, checkUserExists, verifyPassword } = require('../middleware/auth');
const { errorHandler } = require('../middleware/errorHandler');
const express = require('express')
const router = express.Router();

router.post('/register', validateAuthInput, checkUserExists, registerUser);
router.post('/login', validateAuthInput, verifyPassword, loginUser);
router.use(errorHandler);

module.exports = router;