const College = require('../../database/college.js');//college model
const jwt = require('jsonwebtoken');
const collegelogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const college = await College.findOne({ email }).select("+password");//to get a password field along with email 
        if (!college) return res.status(400).json({ message: "college does not exist" });
         console.log(college);
        // Compare passwords
        const isMatch = await college.comparePassword(password);  // bcrypt.compare handles hashing internally
        if (!isMatch) return res.status(400).json({ message: "password no match" });

          // Generate token
        const token = jwt.sign({ college_Id: college._id }, "jjjjeeee5555", { expiresIn: "2d" });
        res.status(200).json({ college ,token });//we send in rsponse a token
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = collegelogin;

//note***
// Entered password: nith123
// Stored password (hashed): $2a$10$/prRHlZ/pDWb8kr3lJGnwu3ne3L7TGsyZXK5bGaAduJHH0KvbKQoG
// bcrypt.compare result: true
//This behavior is expected and secure. The actual password is never stored or transmitted in plain text, only the hashed version.

