// models/Trainer.Schema.js

import mongoose from 'mongoose';

const TrainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true,
        min: 0
    },

    contactNumber: {
        type: Number,
        required: true
    },

    availability: {
        type: String,
        required: true
    },
    // rate: {
    //     type: Number,
    //     required: true,
    //     min: 0
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Trainer = mongoose.model('Trainer', TrainerSchema);

export default Trainer;
