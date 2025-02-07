const express = require('express');
const mongoose = require('mongoose');
const courses = require("./courses.js");

//initial data for the course
mongoose.connect('mongodb://127.0.0.1:27017/edtechDB');

const insertCourses = async () => {
    await courses.insertMany(
        [
            {
                title: "Software Engineer (Full Stack/Backend/Frontend)",
                description: "Master full-stack development using the MERN stack and build scalable web applications.",
                price: 1500,
                Entry_level_CTC: [4, 7],
                Mid_level_CTC: [10, 15],
                Senior_level_CTC: [20, 35],
                top_companies: ["TCS", "Infosys", "Wipro", "Accenture", "HCL", "Capgemini", "Cognizant", "IBM", "Amazon", "Google"]
            },
            {
                title: "Data Analyst",
                description: "Learn data analysis techniques, SQL, and visualization tools to interpret and present data insights.",
                price: 1500,
                Entry_level_CTC: [4, 6],
                Mid_level_CTC: [8, 12],
                Senior_level_CTC: [15, 25],
                top_companies: ["Deloitte", "EY", "PwC", "KPMG", "Fractal Analytics", "Mu Sigma", "Wipro", "TCS", "Amazon"]
            },
            {
                title: "Cloud Engineer",
                description: "Gain expertise in cloud computing, AWS, Azure, and Google Cloud to design scalable cloud solutions.",
                price: 1500,
                Entry_level_CTC: [5, 8],
                Mid_level_CTC: [10, 15],
                Senior_level_CTC: [18, 30],
                top_companies: ["Microsoft", "AWS", "Google Cloud", "Infosys", "HCL", "TCS", "Accenture", "Capgemini"]
            },
            {
                title: "Cybersecurity Analyst",
                description: "Learn ethical hacking, risk assessment, and security best practices to protect organizations from cyber threats.",
                price: 1500,
                Entry_level_CTC: [5, 7],
                Mid_level_CTC: [10, 15],
                Senior_level_CTC: [18, 28],
                top_companies: ["IBM", "Palo Alto", "TCS", "Infosys", "Wipro", "Accenture", "EY", "KPMG"]
            },
            {
                title: "DevOps Engineer",
                description: "Master CI/CD pipelines, Docker, Kubernetes, and cloud infrastructure automation for efficient deployment.",
                price: 1500,
                Entry_level_CTC: [6, 8],
                Mid_level_CTC: [12, 18],
                Senior_level_CTC: [20, 35],
                top_companies: ["AWS", "Google", "Microsoft", "Infosys", "TCS", "HCL", "Cognizant", "Accenture"]
            },
            {
                title: "AI/ML Engineer",
                description: "Learn machine learning, deep learning, and AI model development to build intelligent applications.",
                price: 1500,
                Entry_level_CTC: [6, 9],
                Mid_level_CTC: [12, 20],
                Senior_level_CTC: [20, 40],
                top_companies: ["Google", "Microsoft", "Amazon", "TCS", "Wipro", "HCL", "Accenture", "Fractal Analytics"]
            },
            {
                title: "Quality Assurance (QA) Engineer",
                description: "Understand software testing methodologies, automation testing, and debugging for quality software delivery.",
                price: 1500,
                Entry_level_CTC: [4, 6],
                Mid_level_CTC: [8, 12],
                Senior_level_CTC: [15, 20],
                top_companies: ["TCS", "Infosys", "Cognizant", "Accenture", "Wipro", "HCL", "Capgemini"]
            },
            {
                title: "Business Intelligence (BI) Developer",
                description: "Develop expertise in data visualization, ETL processes, and BI tools like Power BI and Tableau.",
                price: 1500,
                Entry_level_CTC: [5, 7],
                Mid_level_CTC: [10, 15],
                Senior_level_CTC: [18, 30],
                top_companies: ["Microsoft", "Oracle", "SAP", "Deloitte", "EY", "PwC", "KPMG", "TCS", "Infosys"]
            },
            {
                title: "Network Engineer",
                description: "Learn network protocols, security, and troubleshooting to maintain and optimize network infrastructure.",
                price: 1500,
                Entry_level_CTC: [4, 6],
                Mid_level_CTC: [8, 12],
                Senior_level_CTC: [15, 20],
                top_companies: ["Cisco", "Juniper Networks", "IBM", "TCS", "Infosys", "Wipro", "HCL"]
            },
            {
                title: "Technical Support Engineer",
                description: "Develop troubleshooting skills, IT support expertise, and customer service techniques for tech support roles.",
                price: 1500,
                Entry_level_CTC: [3, 5],
                Mid_level_CTC: [6, 10],
                Senior_level_CTC: [12, 18],
                top_companies: ["Dell", "HP", "Cisco", "IBM", "TCS", "Infosys", "Wipro", "Accenture"]
            }


        ]);
    console.log("Courses added!");
    mongoose.disconnect();
};

insertCourses();

module.exports = insertCourses;