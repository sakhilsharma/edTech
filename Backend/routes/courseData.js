const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const courses = require("../database/courses.js");//courses model
const User = require('../userdata/user.js');//User model
const College = require('../database/college.js');//college model
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
//sorting routes
const userregister = require("./userregister.js");
const userlogin = require('./userlogin.js');
const instituteRegister = require('./instituteRegister.js');
const instituteLogin = require("./instituteLogin.js");
const verifyTokenUser = require('./verifytokenUser.js');

//fetch information of test courses to be displyed on front page
router.get('/', async (req, res) => {
  const data = await courses.find({}); //will give all backend data;
  console.log(data);

  res.status(200).json({ data });
})


//register
router.post('/register', userregister);

//login user
router.post("/login", userlogin);//create a token and use for subsequent req ...todo

router.get('/userdetail', verifyTokenUser, async (req, res) => {
  //we need to provide token from frontend while fetch
  try {
    //we use this token user data to retrive data from backend 
    const user = req.user;
    //user details access
    const userId = user.userId;
    const UserData = await User.find({ _id: userId });//retreves the data of user from database
    //now we send data to front end to display user
    try {
      //will send full user data to front end
      res.status(200).json({ UserData: UserData });
    } catch {
      (err) => {
        res.status(401).json({ message: "User not found" });
      }
    }

  } catch {
    (err) => {

      res.status(401).json({ message: err.message })
    }
  }
})
//user cliks to get data of scpecific test course
router.get('/data/:course_id', verifyTokenUser, async (req, res) => {
  //we need to send course id to backend  i.e <button key={course._id} onClick={() => handleCourseClick(course._id)}>

  const { course_id } = req.params;  // Extract course_id from URL
  //course id from URL comes as a string which needs to be converted to string using method
  // Ensure that course_id is a valid ObjectId before querying
  if (!mongoose.Types.ObjectId.isValid(course_id)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }
  const courseObjectId = new mongoose.Types.ObjectId(course_id);
  try {
    const courseDatafetch = await courses.findOne({ _id: courseObjectId });
    console.log("fetch course data specific:", courseDatafetch);
    res.status(200).json({ courseDatafetch })
  } catch (err) {
    res.status(401).json({ message: "Course not found" });
  }


}
)
//institute login
router.post('/instuteRegister', instituteRegister);

//go to add student through a button :redirect to('/instuteRegister/addStudent);
//make sure you added token in req.header of frontend on request
//method: "GET",
////headers: {
//  "Authorization": `Bearer ${token}`,  // Send the token in the Authorization header
//  "Content-Type": "application/json"
//}
router.get('/instuteRegister/addStudent', (req, res) => {//verify session based on jwt token
  //we render a differnet page

})
//login institute
router.post("/instituteLogin", instituteLogin);//create a token and use for subsequent req ...todo



module.exports = router;