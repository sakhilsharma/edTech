const User = require('../../userdata/user.js');//User model
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const verifyemail = require('../../domainverify/domain.js');
const userregister = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log("user register");
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create new user
            const user = new User(
                {
                    name: name,
                    email: email,
                    password: hashedPassword,
                    role: role,
                });
            await user.save();//created new instance/user

           console.log("logging email")
            res.status(201).json({ user });
        
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = userregister;