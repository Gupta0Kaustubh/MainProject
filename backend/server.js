// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mailgen = require('mailgen')


// Creating an instance of the Express app
const app = express();

// Middleware: Parsing JSON and enabling CORS
app.use(express.json());
app.use(cors());

// MongoDB connection URI (replace <username>, <password>, and <dbname> with your credentials)
const mongoURI = 'mongodb+srv://kaustubhgupta9860:kaustubh12345@cluster0.9erybbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB cluster
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a Mongoose schema for your data
const userDataSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    gender: String,
    dob: Date,
    city: String,
    state: String,
    subscribeNewsletter: Boolean,
    passwords: String
});

// Create a Mongoose model based on the schema
const UserData = mongoose.model('UserData', userDataSchema);




// Route to handle user data submission
app.post('/submitUserData', async (req, res) => {
    try {
        // Extract user data from the request body
        const { firstName, lastName, email, phoneNumber, gender, dob, city, state, subscribeNewsletter, passwords } = req.body;


        // Create a new UserData document
        const newUser = new UserData({
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            dob,
            city,
            state,
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
              pass: "bkzcfjagemaqjtvx",
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



// Setting up the server to listen on a specified port or defaulting to 3001
const port = 3001;

// Starting the server and logging a message when it's listening
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
