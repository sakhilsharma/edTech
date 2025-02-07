const User = require('../../userdata/user.js');
const userdata = async (req, res) => {
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
  }
  module.exports = userdata;