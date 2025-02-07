const Student = require('../../database/student');

const addstudent = async (req, res)=>{
    try {
        const { students } = req.body; // Receive students array
        const instituteId = req.user.college_Id; // Get institute ID from auth token
        console.log("req.user:", req.user);
        //check if it is an array
        if (!students || !Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ message: "Invalid student data" });
        }

        // Add instituteId to each student entry
        const studentsWithInstitute = students.map(student => ({ ...student, instituteId }));

        // Insert many students at once
        const insertedStudents = await Student.insertMany(studentsWithInstitute);

        res.status(201).json({ message: "Students added successfully", students: insertedStudents });
    } catch (error) {
        res.status(500).json({ message: "Error adding students", error: error.message });
    }
}
module.exports = addstudent;
//note::;for bunch of student we will add in future the CSV file add method