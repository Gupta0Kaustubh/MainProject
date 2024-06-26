// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mailgen = require('mailgen')
const UserData = require('./models/Models').UserData;
const Trainer = require('./models/Models').Trainer;
const Training = require('./models/Models').Training;
const QuizData = require('./models/Models').QuizData;
const AdminUserView = require('./models/Models').AdminUserView;
const TotalInfo = require('./models/Models').TotalInfo;
const dotenv = require('dotenv');
const { exec } = require('child_process');
const path = require('path');

const { spawn } = require('child_process');

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


// Route to handle forgot password submission
app.post('/forgotPassword', async (req, res) => {
    try {
        // Extract user data from the request body
        const { email, password } = req.body;


        // Create a new UserData document
        const newUser = new UserData({
            email,
            password
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
            Welcome to our platform! Your temporary password is: ${password}
            Please use the following link to change your password: http://localhost:5173/user-forgot`,
            html: `<p>Hi,</p>
            <p>Welcome to our platform! Your temporary password is: ${password}</p>
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

// Route to fetch all training data
app.get('/getAllTrainingData', async (req, res) => {
    try {
        // Retrieve all user data from the database
        const allTrainingData = await Training.find();

        // If no user data is found, return a 404 status and message
        if (!allTrainingData || allTrainingData.length === 0) {
            return res.status(404).json({ message: 'No training data found' });
        }

        // If user data is found, return it in the response
        res.status(200).json({ allTrainingData });
    } catch (error) {
        // If an error occurs, return a 500 status and error message
        res.status(500).json({ message: 'Failed to fetch user data', error: error.message });
    }
});

// Route to fetch all admin user data
app.get('/getAllAdminUserData', async (req, res) => {

    try {
        // Retrieve all user data from the database
        const allUserData = await AdminUserView.find();

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

// Route to fetch all quiz data
app.get('/getAllQuizData', async (req, res) => {

    try {
        // Retrieve all user data from the database
        const allQuizData = await QuizData.find();

        // If no user data is found, return a 404 status and message
        if (!allQuizData || allQuizData.length === 0) {
            return res.status(404).json({ message: 'No quiz data found' });
        }

        // If user data is found, return it in the response
        res.status(200).json({ allQuizData });
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

// Route to handle adminuserspcific data submission
app.post('/submitAllAdminUserData', async (req, res) => {
    try {
        // Extract trainer data from the request body
        const { userId, Name, email, gender, specializations, doj, state, experience, trainingName, trainerName, optimizedDuration, trainingStatus, assessment_percentage_done, assessment_completion_time_in_hours, scoreAchievedInQuiz, quizPassedOrFailed, ratingGivenByTrainer } = req.body;

        // Create a new Trainer document
        const newData = new AdminUserView({
            userId,
            Name,
            email,
            gender,
            specializations,
            doj,
            state,
            experience,
            trainingName,
            trainerName,
            optimizedDuration,
            trainingStatus,
            assessment_percentage_done,
            assessment_completion_time_in_hours,
            scoreAchievedInQuiz,
            quizPassedOrFailed,
            ratingGivenByTrainer
        });

        // Save the new trainer data to the database
        await newData.save();

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
        const { trainingId, trainingName, trainingDescription, trainerId, startDate, endDate, optimizedDuration, timingOfTraining } = req.body;

        // Create a new Training document
        const newTraining = new Training({
            trainingId,
            trainingName,
            trainingDescription,
            trainerId,
            trainerName,
            startDate,
            endDate,
            optimizedDuration,
            timingOfTraining
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

// Endpoint to execute the SSMS Python script
app.post('/execute-python-script', (req, res) => {
    // Execute the Python script
    // const pythonProcess = spawn('python', ['C:/Users/KaustubhGupta/Desktop/KG/Main Project/MainProject/ConversionAndRetrieval/Retrieval.py']);
    const pythonProcess = spawn('python', ['D:/JMAN/MainProject/ConversionAndRetrieval/Retrieval.py']);   /* home */
  
    // Handle script output
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python script output: ${data}`);
    });
  
    // Handle script errors
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error executing Python script: ${data}`);
    });
  
    // Send response
    res.send('Python script execution initiated');
  });
// Endpoint to execute the SnowFlake Python script
app.post('/execute-snow-python-script', (req, res) => {
    // Execute the Python script
    // const pythonProcess = spawn('python', ['C:/Users/KaustubhGupta/Desktop/KG/Main Project/MainProject/ConversionAndRetrieval/ingestion-mongo-snowflake.py']);
    const pythonProcess = spawn('python', ['D:/JMAN/MainProject/ConversionAndRetrieval/ingestion-mongo-snowflake.py']);   /* home */
  
    // Handle script output
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python script output: ${data}`);
    });
  
    // Handle script errors
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error executing Python script: ${data}`);
    });
  
    // Send response
    res.send('Python script execution initiated');
  });

// Define a route to trigger the DBT execution
const dbtMainProjectFolderPath = path.join(__dirname, '..', 'DBT', 'main_project');
app.get('/rundbt', (req, res) => {
    // Change the working directory to the main_project folder
    process.chdir(dbtMainProjectFolderPath);

    // Execute the DBT command
    exec('dbt run', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('DBT execution failed');
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return res.status(500).send('DBT execution failed');
        }
        console.log(`DBT output: ${stdout}`);
        res.send('DBT execution successful');
    });
});

// Get ALL INFO DATA
app.get('/totaldata', async (req, res) => {
    try {
        // Retrieve data from the MongoDB collection (replace 'CollectionName' with your actual collection name)
        const data = await TotalInfo.find();

        // If no data is found, return a 404 status and message
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }

        // If data is found, return it in the response
        res.status(200).json({ data });
    } catch (error) {
        // If an error occurs, return a 500 status and error message
        res.status(500).json({ message: 'Failed to fetch data', error: error.message });
    }
});

// Route to handle deleting a user by user ID or email
app.delete('/deleteUser', async (req, res) => {
    try {
        // Extract user ID or email from the request body
        const { userInput } = req.body;
        console.log('data', userInput)

        let user;

        // Check if userInput is a valid email
        if (/^\S+@\S+\.\S+$/.test(userInput)) {
            // If userInput is an email, find the user by email
            user = await UserData.findOne({ email: userInput });
        } else {
            // If userInput is not an email, assume it's a user ID
            user = await UserData.findOne({ userId: userInput });
        }

        // If user not found, return a 404 status and message
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user from the UserData collection
        await UserData.deleteOne({ _id: user._id });

        // Also, delete all related records from the AdminUserView collection
        await AdminUserView.deleteMany({ userId: user.userId });

        // Also, delete all related records from the TotalInfo collection
        await TotalInfo.deleteMany({ userId: user.userId });

        // Respond with a success message
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        // If an error occurs, return a 500 status and error message
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
});



// Setting up the server to listen on a specified port or defaulting to 3001
const port = 3001;

// Starting the server and logging a message when it's listening
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
