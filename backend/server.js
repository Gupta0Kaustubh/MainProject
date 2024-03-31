// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mailgen = require('mailgen')
const UserData = require('./models/User').UserData;
const Trainer = require('./models/User').Trainer;
const Training = require('./models/User').Training;
const QuizData = require('./models/User').QuizData;
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Creating an instance of the Express app
const app = express();

// Middleware: Parsing JSON and enabling CORS
app.use(express.json());
app.use(cors());


const mongoURI = process.env.mongoURI

// Connect to MongoDB cluster
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));



// Route to handle user data submission
app.post('/submitUserData', async (req, res) => {
    try {
        // Extract user data from the request body
        const { userId, firstName, middleName, lastName, email, phoneNumber, gender, doj, specializations, dob, city, state, experience, userType, subscribeNewsletter, passwords } = req.body;


        // Create a new UserData document
        const newUser = new UserData({
            userId,
            firstName,
            middleName,
            lastName,
            email,
            phoneNumber,
            gender,
            doj,
            specializations,
            dob,
            city,
            state,
            experience,
            userType,
            subscribeNewsletter,
            passwords
        });

        // Save the new user data to the database
      await newUser.save();

        // Send email with the temporary password
        // await sendEmail(email, passwords);

        let testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: "kaustubhgupta9860@gmail.com",
              pass: process.env.password,
            },
          });

          let mailgenerator = new mailgen({
            theme: "default",
            product: {
                name: 'Mailgen',
                link: 'https://mailgen.js/'
            }
          })


          let message = {
            from: 'kaustubhgupta9860@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Welcome to Our Platform", // Subject line
            text: `Hi,
            Welcome to our platform! Your temporary password is: ${passwords}
            Please use the following link to change your password: http://localhost:5173/user-forgot`,
            html: `<p>Hi,</p>
            <p>Welcome to our platform! Your temporary password is: ${passwords}</p>
            <p>Please use the following link to change your password: http://localhost:5173/user-forgot`
          }

          transporter.sendMail(message).then(() =>{
            return res.status(201).json({msg: "You should recieve an email"})
          }).catch(error => {
            return res.status(500).json({error})
          })

        // Respond with a success message
        res.status(201).json({ message: 'User data submitted successfully' });
    } catch (error) {
        // Handle errors if saving user data or sending email fails
        res.status(500).json({ message: 'Failed to submit user data', error: error.message });
    }
});

// Route to fetch all user data
app.get('/getAllUserData', async (req, res) => {
    try {
        // Retrieve all user data from the database
        const allUserData = await UserData.find();

        // If no user data is found, return a 404 status and message
        if (!allUserData || allUserData.length === 0) {
            return res.status(404).json({ message: 'No user data found' });
        }

        // If user data is found, return it in the response
        res.status(200).json({ allUserData });
    } catch (error) {
        // If an error occurs, return a 500 status and error message
        res.status(500).json({ message: 'Failed to fetch user data', error: error.message });
    }
});

// Route to handle changing user password
app.post('/changePassword', async (req, res) => {
    try {
        // Extract email and new password from the request body
        const { email, newPassword } = req.body;

        // Find the user by email in the database
        const user = await UserData.findOne({ email });

        // If user not found, return a 404 status and message
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's password with the new password
        user.passwords = newPassword;
        await user.save();

        // Respond with a success message
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        // If an error occurs, return a 500 status and error message
        res.status(500).json({ message: 'Failed to update password', error: error.message });
    }
});

// Route to handle trainer data submission
app.post('/submitTrainerData', async (req, res) => {
    try {
        // Extract trainer data from the request body
        const { userId, trainerName, trainerDesignation, trainerRating, trainerSpecialization } = req.body;

        // Create a new Trainer document
        const newTrainer = new Trainer({
            userId,
            trainerName,
            trainerDesignation,
            trainerRating,
            trainerSpecialization
        });

        // Save the new trainer data to the database
        await newTrainer.save();

        // Respond with a success message
        res.status(201).json({ message: 'Trainer data submitted successfully' });
    } catch (error) {
        // Handle errors if saving trainer data fails
        res.status(500).json({ message: 'Failed to submit trainer data', error: error.message });
    }
});

// Route to handle training data submission
app.post('/submitTrainingData', async (req, res) => {
    try {
        // Extract training data from the request body
        const { trainingId, trainingName, trainingDescription, trainerId, trainerName, startDate, endDate, optimizedDuration } = req.body;

        // Create a new Training document
        const newTraining = new Training({
            trainingId,
            trainingName,
            trainingDescription,
            trainerId,
            trainerName,
            startDate,
            endDate,
            optimizedDuration
        });

        // Save the new training data to the database
        await newTraining.save();

        // Respond with a success message
        res.status(201).json({ message: 'Training data submitted successfully' });
    } catch (error) {
        // Handle errors if saving training data fails
        res.status(500).json({ message: 'Failed to submit training data', error: error.message });
    }
});

// Route to handle QuizScore data submission
app.post('/submitQuizData', async (req, res) => {
    try {
        // Extract quiz data from the request body
        const {quizName, trainingId, trainingName, questionFile, maxScores, minScores, difficultyLevel } = req.body;

        // Create a new QuizScore document
        const newQuizScore = new QuizData({
            quizName,
            trainingId,
            trainingName,
            questionFile,
            maxScores,
            minScores,
            difficultyLevel
        });

        // Save the new quiz data to the database
        await newQuizScore.save();

        // Respond with a success message
        res.status(201).json({ message: 'Quiz data submitted successfully' });
    } catch (error) {
        // Handle errors if saving quiz data fails
        res.status(500).json({ message: 'Failed to submit quiz data', error: error.message });
    }
});



// Setting up the server to listen on a specified port or defaulting to 3001
const port = 3001;

// Starting the server and logging a message when it's listening
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
