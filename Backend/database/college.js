//model / schema for institue data;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const instituteSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // For college authentication
    createdAt: { type: Date, default: Date.now }
})
//we recieved a already hashed password.....

// **Compare Passwords**
instituteSchema.methods.comparePassword = async function (enteredPassword) {
    console.log("Comparing passwords:");
    console.log("Entered:", enteredPassword);
    console.log("Stored:", this.password);
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log("Match result:", isMatch);
    return isMatch;
};

const College = mongoose.model("College", instituteSchema);
module.exports = College;