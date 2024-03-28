// controllers/userController.js

const UserData = require('../models/User');

// Handle user data submission
exports.submitUserData = async (req, res) => {
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

        // Respond with a success message
        res.status(201).json({ message: 'User data submitted successfully' });
    } catch (error) {
        // Handle errors if saving user data fails
        res.status(500).json({ message: 'Failed to submit user data', error: error.message });
    }
};

// Fetch all user data
exports.getAllUserData = async (req, res) => {
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
};

// Handle changing user password
exports.changePassword = async (req, res) => {
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
};
