// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const app = express();
const userController = require('../controllers/userController');

router.post('/submitUserData', userController.submitUserData);
router.get('/getAllUserData', userController.getAllUserData);
router.post('/changePassword', userController.changePassword);

module.exports = router;
