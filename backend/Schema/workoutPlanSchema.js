// const mongoose = require('mongoose');
import mongoose from 'mongoose';

// Define the schema for the WorkoutPlan
const workoutPlanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    workoutType: {
        type: String,
        enum: ['Strength', 'Cardio', 'Flexibility'],
        required: true
    },
    duration: {
        type: Number,  // Duration in minutes
        required: true
    },
    intensity: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    },
    exercises: [{
        name: {
            type: String,
            required: true
        },
        sets: {
            type: Number,
            required: true
        },
        reps: {
            type: Number,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the WorkoutPlan model
const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

export default WorkoutPlan
