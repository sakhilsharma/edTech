const jwt = require('jsonwebtoken');
const User = require('../userdata/user.js');//User model
const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
       
        // Find user
        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(400).json({ message: "User does not exist" });

        // Compare passwords
        const isMatch = await user.comparePassword(password);  // bcrypt.compare handles hashing internally
        if (!isMatch) return res.status(400).json({ message: "password no match" });
        console.log("Password Match:", isMatch);//check whether got a password matching or not

        // Generate token
        const token = jwt.sign({ userId:user._id }, "jjjjeeee5555", { expiresIn: "2d" });
        //if user exist return auth token and user details
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = userlogin;