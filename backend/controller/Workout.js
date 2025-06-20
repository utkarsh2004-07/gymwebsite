import axios from 'axios';
import WorkoutPlan from '../Schema/workoutPlanSchema.js';

const GEMINI_API_KEY = "AIzaSyDHzxPkKlgKzBtNX9iYWwqsyJexp6rROPM";
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro-001:generateContent';

const workoutgenerate = async (req, res) => {
    const { userId, workoutType, duration, intensity } = req.body;

    // Generate workout query for Gemini API
    const query = `Generate a ${workoutType} workout plan for a ${intensity} intensity level. The plan should last for ${duration} minutes. Include exercises with sets and reps.`;

    try {
        // Making request to Gemini API
        const response = await axios.post(
            GEMINI_API_URL,
            {
                query: query
            },
            {
                headers: {
                    'Authorization': `Bearer ${GEMINI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Extract the generated workout plan from the response
        const workoutPlan = response.data.result;

        // Save the workout plan in MongoDB (optional)
        const newPlan = new WorkoutPlan({
            userId,
            workoutType,
            duration,
            intensity,
            exercises: workoutPlan.exercises // Assume the API gives this structure
        });

        await newPlan.save();

        // Return the workout plan response
        res.status(200).json({ message: 'Workout plan generated successfully', plan: workoutPlan });
    } catch (error) {
        console.error('Error generating workout plan:', error);
        res.status(500).json({ error: 'Failed to generate workout plan using Google Gemini' });
    }
};

export default workoutgenerate;
