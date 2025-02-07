const jwt = require('jsonwebtoken');
const User = require('../../userdata/user.js');//User model
const userlogout = async (req, res) => {
    //need to use client side removal of token
    //localStorage.removeItem("token"); 
    //window.location.href = "/login"; ..........// Redirect to login page
}

module.exports = userlogout;
