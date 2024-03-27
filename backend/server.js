// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

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
    passwords: [String]
});

// Create a Mongoose model based on the schema
const UserData = mongoose.model('UserData', userDataSchema);

function generateRandomPassword() {
    // Function to generate a random alphanumeric password
    const length = 8; // You can adjust the length of the password
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

async function sendEmail(email, temporaryPassword) {
    // Configure nodemailer transporter (replace with your email service configuration)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kaustubhgupta9860@gmail.com', // Replace with your Gmail email address
        pass: 'kaustubh12345' // Replace with your Gmail password
      }
    });
  
    // Define email options
    const mailOptions = {
      from: 'kaustubhgupta9860@gmail.com', // Replace with your Gmail email address
      to: email,
      subject: 'Welcome to Our Platform',
      html: `<p>Hi,</p>
             <p>Welcome to our platform! Your temporary password is: ${temporaryPassword}</p>
             <p>Please use the following link to change your password: http://localhost:5173/user-forgot`
    };
  
    // Send email
    await transporter.sendMail(mailOptions);
  }

// Route to handle user data submission
app.post('/submitUserData', async (req, res) => {
    try {
        // Create a new UserData document based on the request body
        
        const temporaryPassword = generateRandomPassword();

        const { email } = req.body;
        console.log("email");

        const newUser = new UserData(req.body);
        newUser.passwords.push(temporaryPassword);
        // Save the new user data to the database
        await newUser.save();
        await sendEmail(email, temporaryPassword);
        res.status(201).json({ message: 'User data submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit user data', error: error.message });
    }
});

// Setting up the server to listen on a specified port or defaulting to 3001
const port = 3001;

// Starting the server and logging a message when it's listening
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
