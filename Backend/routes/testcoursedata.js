const verifyTokenUser = require('./userroutes/verifytokenUser.js');
const mongoose = require('mongoose');

const testdata = async (req, res) => {
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
module.exports = testdata;