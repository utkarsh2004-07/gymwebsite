import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    name: String,
    caloriesBurned: Number,
    date: { type: Date, default: Date.now },
    exercises: [
        {
            name: String,
            sets: Number,
            reps: Number,
            weight: Number
        }
    ]
});

export const Workout = mongoose.model('Workout', WorkoutSchema);