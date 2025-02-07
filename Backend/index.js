const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path:"../.env"});  // Load the .env file
//console.log("JWT_SECRET:", process.env.JWT_SECRET);
const app = express();
//cors 
const cors = require('cors');
app.use(cors());
//parses
app.use(express.json());
//mongoose
const mongoose = require('mongoose');
const main = async () => {
    (await mongoose.connect('mongodb://127.0.0.1:27017/edtechDB'))
}
main().then((res) => console.log(res)).catch((err) => console.log(err));
//env variables
const port = process.env.PORT || 5000


app.listen(port, (req, res) => {
    console.log(`server running at the ${port} `)
})
//router to set routes
app.use("/api/courseData", require('./routes/courseData'));