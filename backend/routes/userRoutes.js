// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const app = express();
const userController = require('../controllers/userController');

app.post('/submitUserData', userController.submitUserData);
app.get('/getAllUserData', userController.getAllUserData);
app.post('/changePassword', userController.changePassword);

module.exports = router;
