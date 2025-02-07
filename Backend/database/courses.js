const express = require('express');
const mongoose = require('mongoose');

//Course Schema 
const CourseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    Entry_level_CTC: {
        type: [Number],  // Array of two numbers
        validate: {
            validator: function (arr) {
                return arr.length === 2 && arr[0] < arr[1]; // Ensure exactly 2 numbers & min < max
            },
            message: "Price range must contain exactly two numbers, and the first must be smaller."
        }
    },
    Mid_level_CTC: {
        type: [Number],  // Array of two numbers
        validate: {
            validator: function (arr) {
                return arr.length === 2 && arr[0] < arr[1]; // Ensure exactly 2 numbers 
            },
            message: "Price range must contain exactly two numbers, and the first must be smaller."
        }
    },
    Senior_level_CTC: {
        type: [Number],
        validate: {
            validator: function (arr) {
                return arr.length === 2 && arr[0] < arr[1];
            },
            message: "Price range must contain exactly two numbers, and the first must be smaller."
        }
    },
    top_companies: {
        type: Array,
        required: true,
    }


})
const courses = mongoose.model("courses", CourseSchema);
module.exports = courses;