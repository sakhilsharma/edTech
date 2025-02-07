const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const courses = require("../database/courses.js");//courses model
const User = require('../userdata/user.js');//User model
const College = require('../database/college.js');//college model
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
//sorting routes
const userregister = require("./userroutes/userregister.js");
const userlogin = require('./userroutes/userlogin.js');
const userlogout = require('./userroutes/userlogout.js')
const instituteRegister = require('./instituteroute/instituteRegister.js'); //need to make furthur
const instituteLogin = require("./instituteroute/instituteLogin.js");
const verifyTokenUser = require('./userroutes/verifytokenUser.js');
const verifyTokenInstitute = require('./instituteroute/verifyTokenInstitute.js')
const testdata = require('./testcoursedata.js');
const userdata = require('./userroutes/fetchuserdetails.js') //gives user data from backend on verifying the token
const addstudent = require('./instituteroute/addstudent.js')

//fetch information of test courses to be displyed on front page
router.get('/', async (req, res) => {
  const data = await courses.find({}); //will give all backend data;
  console.log(data);

  res.status(200).json({ data });
})


//register new user
router.post('/register', userregister);

//login user
router.post("/login", userlogin);//create a token and use for subsequent req ...todo
router.post("/logout", userlogout); //just remove token from client side

router.get('/userdetail', verifyTokenUser, userdata);

//user cliks to get data of scpecific test course
router.get('/data/:course_id', verifyTokenUser, testdata);
//institute login
router.post('/instuteRegister', instituteRegister);

//go to add student through a button :redirect to('/instuteRegister/addStudent);
//make sure you added token in req.header of frontend on request
//method: "GET",
////headers: {
//  "Authorization": `Bearer ${token}`,  // Send the token in the Authorization header
//  "Content-Type": "application/json"
//}
router.get('/instuteRegister/addStudent', verifyTokenInstitute, (req, res) => {//verify session based on jwt token
  //we render a differnet page

})
//login institute
router.post("/instituteLogin", instituteLogin);//create a token and use for subsequent req ...todo

//add student
router.post("/addstudent", verifyTokenInstitute, addstudent)



module.exports = router;