const bcrypt = require("bcryptjs");
const College = require('../database/college.js');//college model
const jwt = require('jsonwebtoken');
// Controller for college registration
const registerCollege = async (req, res) => {
    const { name, email, contact, password, location } = req.body;

    // Check if the college already exists
    const existingCollege = await College.findOne({ email });
    if (existingCollege) {
        return res.status(400).json({ message: "College with this email already exists." });
    }

    try {
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new college
        const newCollege = new College({
            name: name,
            email: email,
            contact: contact,
            password: hashedPassword,
            location: location,
        });

        // Save the college
        await newCollege.save();

       
        // Send a success response
        res.status(201).json({ message: "College registered successfully", collegeId: newCollege._id });
    } catch (error) {
        res.status(500).json({ message: "Error registering college", error });
    }
};
module.exports = registerCollege;
