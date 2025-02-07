const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email"
            ]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
            
        },
        role: {
            type: String,
            enum: ["user"], // Define roles
            default: "user"
        },
        //we need to edit it and add validations so that we could check wheather the student is registerd with the college or not//
        collegeId: {
            type: "String"//edit later????????????????????????????
        },
    },
    { timestamps: true }
);


// **Compare Passwords**
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// **Generate JWT Token**
UserSchema.methods.generateAuthToken = function () {//we need to set value to this .
    // env var JWT_SECRET
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
