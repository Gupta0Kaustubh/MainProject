// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const app = express();
const userController = require('../controllers/userController');

router.post('/submitUserData', userController.submitUserData);
router.get('/getAllUserData', userController.getAllUserData);
router.post('/changePassword', userController.changePassword);
router.post('/forgotPassword', userController.forgotPassword);
router.get('/getAllTrainingData', userController.getAllTrainingData);
router.get('/getAllAdminUserData', userController.getAllAdminUserData);
router.get('/getAllQuizData', userController.getAllQuizData);
router.post('/submitTrainerData', userController.submitTrainerData);
router.post('/submitTrainingData', userController.submitTrainingData);
router.post('/submitQuizData', userController.submitQuizData);
router.get('/totaldata', userController.totaldata);
router.delete('/deleteUser', userController.deleteUser);

module.exports = router;
